// CSS Imports
// –– Root Styles
import './main.css!'

// JS Imports
// –– Vue
import Vue from "vue"
import ResizeMixin from 'vue-resize-mixin'

// –– Dependencies
import moment from 'moment'

// –– App panels
import clock_panel    from "app/components/clock-panel/clock"
import settings_panel from "app/components/settings-panel/settings"
import log_panel      from "app/components/log-panel/log"

// Vue global settings
Vue.config.debug = true

// –– FILTERS
import display2D from 'app/utils/filters/display2D'
Vue.filter('display2D', display2D)


// Init App
var app = new Vue({
    mixins: [ResizeMixin],
	el: 'body',
	data() {
        return {
            settings: {
                dim: false,
                time: moment(),
                sunrise: moment().hour(20).minutes(0).seconds(0),
                sunset:  moment().hour(6).minutes(0).seconds(0),
                colours: {
                    sunrise_primary:   '#FFFFFC',
                    sunrise_secondary: '#969685',
                    sunset_primary:    '#333',
                    sunset_secondary:  '#D6D6D4',
                },
                mode: 'digital',
                lock: false,
            },
        }
	},
    components: {
        "log-panel": log_panel,
        "clock-panel": clock_panel,
        "settings-panel": settings_panel,
    },
	computed: {
        primary() {
            return this.settings.dim ?
                        this.settings.colours.sunset_primary :
                        this.settings.colours.sunrise_primary
        },
        secondary() {
            return this.settings.dim ?
                        this.settings.colours.sunset_secondary :
                        this.settings.colours.sunrise_secondary
        },
	},
	methods: {
        window_size() {
            return { height: window.innerHeight, width: window.innerWidth }
        },
        tick_over() {
			// set time
			this.settings.time = moment()



            // update document title
            document.title = this.settings.time.format("hh:mm:ss a").toUpperCase()
		},
		set_sunrise(hour,minutes) {
			this.settings.sunrise.hour(hour).minutes(minutes)
		},
		set_sunset(hour,minutes) {
			this.settings.sunset.hour(hour).minutes(minutes)
		},
		toggle_dimmer() {
			this.settings.dim = !this.settings.dim;
		},
        evaluate_time() {
            // re-evaluate time for diming screen
            if( this.settings.time.isSame(this.settings.sunrise,'minute') ) {
            	this.settings.dim = false
            }
            else if( this.settings.time.isSame(this.settings.sunset,'minute') ) {
            	this.settings.dim = true
            }
        }
	},
    ready(){
        // start the clock
        setInterval(this.tick_over.bind(this), 1000)

        // evaluate time of day for page load
        var now  = moment().hours(),
            morn = this.settings.sunrise.hours(),
            eve  = this.settings.sunset.hours()

        if( now <= morn || now >= eve ) this.toggle_dimmer()
    },
    events: {
        resize(size) {
            this.$broadcast('resize', size)
        },
    }
})

// window.app = app
