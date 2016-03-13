import './clock.css!'

import tmpl from './clock.html!text'

import Vue from 'vue'

import moment from 'moment'


export default Vue.extend({
    template: tmpl,
    props: [
        'time',
        'face',
        'mode',
        'lock',
    ],
    data() {
        return {
            snap: 600, // 600px width for auto switch to analog
        }
    },
    ready() {
        // window.clock_panel = this
    },
    methods: {
        resize_panel(size) {
            if(!this.lock) {
                var current_width = this.$els.clock.innerWidth

                // update the mode if below the snap point
                this.mode = current_width <= this.snap ? 'analog' : 'digital'
            }
        },
    },
    computed: {
        // clock units
        hours() {
            return this.time.format("hh")
        },
        minutes() {
            return this.time.format("mm")
        },
        seconds() {
            return this.time.format("ss")
        },
        period() {
            return this.time.format("a").toUpperCase()
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
    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
