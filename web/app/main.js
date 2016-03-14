// CSS Imports
// –– Root Styles
import './main.css!'

// JS Imports
// –– Vue
import Vue from "vue"
import ResizeMixin from 'vue-resize-mixin'

// –– Dependencies
import moment from 'moment'
import request from 'superagent'

// –– App panels
import clock_panel    from "app/components/clock-panel/clock"
import settings_panel from "app/components/settings-panel/settings"
import log_panel      from "app/components/log-panel/log"

// Vue global settings
Vue.config.debug = true

// –– FILTERS
import display_moment from 'app/utils/filters/display_moment'
Vue.filter('display_moment', display_moment)


// Init App
var app = new Vue({
    mixins: [ResizeMixin],
	el: 'body',
	data() {
        return {
            settings: {
                dim: false,
                time: moment(),
                sunrise: moment().hour(6).minutes(0).seconds(0),
                sunset:  moment().hour(20).minutes(0).seconds(0),
                colours: {
                    sunrise_primary:   '#FFFFFC',
                    sunrise_secondary: '#969685',
                    sunset_primary:    '#333',
                    sunset_secondary:  '#D6D6D4',
                },
                mode: 'digital',
                snap: 600,
                lock: false,
                user: null,
                notes: "",
                url: "https://zoho-timesheet-dev.herokuapp.com/v1",
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

            // check for cycle change
            this.evaluate_time(true)

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
        evaluate_time(exact) {
            if(exact == true) {
                // capture times
                var now     = this.settings.time.format("HH:mm:ss")
                    sunrise = this.settings.sunrise.format("HH:mm:ss")
                    sunset  = this.settings.sunset.format("HH:mm:ss")

                // evaluate for exact match
                if(now == sunrise) light = true
                if(now == sunset)  light = false
            }
            else {
                // capture times
                var now     = this.settings.time.hours(),
                    sunrise = this.settings.sunrise.hours(),
                    sunset  = this.settings.sunset.hours()

                // evaluate between ranges
                var light = ( now > sunrise && now < sunset )
            }

            // set the dimmer based on result (only toggle when light is set)
            if( light === true || light === false ) this.settings.dim = !light
        }
	},
    ready(){
        // start the clock
        setInterval(this.tick_over.bind(this), 1000)

        // evaluate time of day for page load
        this.evaluate_time()

        // get user (with cookie)
        request.get(this.settings.url+"/resources/users").withCredentials()
               .end((error, response) => {
                   if(!error) {
                       this.settings.user = response.body.result
                   }
                   else {
                       console.log(error)
                   }
               })
    },
    events: {
        resize(size) {
            this.$broadcast('resize', size)
        },
    }
})

// window.app = app
