import './clock.css!'

import tmpl from './clock.html!text'

import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
    template: tmpl,
    props: [
        'time',
    ],
    data() {
        return {}
    },
    ready() {
        // window.clock_panel = this
    },
    methods: {
        resize_panel(size) {

        }
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
        }
    },
    watch: {

    },
    events: {
        resize(size) {
            this.resize_panel(size);
            return true
        }
    }
})
