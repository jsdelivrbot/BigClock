import './clock.css!'

import tmpl from './clock.html!text'

import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            snap_point: 600
        }
    },
    ready() {
        // window.clock_panel = this

        // check snap in settings
        if(this.settings.snap) this.snap_point = this.settings.snap
    },
    methods: {
        resize_panel(size) {
            if(!this.settings.lock && this.snap_point != null) {
                if(window.innerWidth <= this.snap_point) {
                    this.settings.mode = 'analog'
                }
                else {
                    this.settings.mode = 'digital'
                }
            }
        },
		toggle_dimmer() {
			this.settings.dim = !this.settings.dim;
		},
    },
    computed: {
        // clock units
        hours() {
            return this.settings.time.format("hh")
        },
        minutes() {
            return this.settings.time.format("mm")
        },
        seconds() {
            return this.settings.time.format("ss")
        },
        period() {
            return this.settings.time.format("a").toUpperCase()
        },
        hours_degrees() {
            return (this.hours*30) + (this.minutes / 2)
        },
        minutes_degrees() {
            return (this.minutes * 6)
        },
        seconds_degrees() {
            return (this.seconds * 6)
        },
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
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
