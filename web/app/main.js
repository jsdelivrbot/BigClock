import './main.css!'

import Vue from "vue"

// –– Dependencies  –– //
import moment from 'moment'

// –– Panel Imports –– //
import clock_panel    from "app/components/clock-panel/clock"
import settings_panel from "app/components/settings-panel/settings"
import log_panel      from "app/components/log-panel/log"

var app = new Vue({
	el: 'body',
	data() {
        return {
            dim: false,
            current_time: moment(),
            morning: moment().hour(20).minutes(0).seconds(0),
            evening: moment().hour(6).minutes(0).seconds(0),
        }
	},
    components:{
        "log-panel": log_panel,
        "clock-panel": clock_panel,
        "settings-panel": settings_panel,
    },
	computed: {

	},
	methods: {
        window_size() {
            return { height: window.innerHeight, width: window.innerWidth }
        },
        tick_over() {
			// set time
			this.current_time = moment()

			// re-evaluate time for diming screen
            if( this.current_time.isSame(this.morning,'seconds') ) {
            	this.dim = false
            }
            else if( this.current_time.isSame(this.evening,'seconds') ) {
            	this.dim = true
            }
		},
		set_morning(hour,minutes) {
			this.morning.hour(hour).minutes(minutes)
		},
		set_evening(hour,minutes) {
			this.evening.hour(hour).minutes(minutes)
		},
		toggle_dimmer() {
			this.dim = !this.dim
		},
	},
    watch: {
        // update document title
        current_time(value) {
            document.title = value.format("hh:mm:ss a").toUpperCase()
        },
    },
    ready(){
        // start the clock
        setInterval(this.tick_over.bind(this), 1000)

        // evaluate time of day for page load
        if( moment().hours() > 20 || moment().hours() < 6 ) this.dim = true
    },
    events: {
        resize(size) {
            this.$broadcast('resize', size)
        },
    }
})

// window.app = app
