import './settings.css!'

import tmpl from './settings.html!text'

import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
    template: tmpl,
    data() {
        return {
            open: false,
            sunrise_hour: 6,
            sunrise_minute: 0,
            sunset_hour: 20,
            sunset_minute: 0,
        }
    },
    ready() {
        // window.settings_panel = this
    },
    methods: {
        resize_panel(size) {

        },
		toggle_settings() {
			this.open = !this.open
		}
    },
    computed: {

    },
    watch: {
        // update morning
        sunrise_hour(value){
            this.set_morning( value, this.sunrise_hour )
        },
        sunrise_minute(value){
            this.set_morning( this.sunrise_minute, value )
        },
        // update evening
        sunset_hour(value){
            this.set_evening( value, this.sunset_hour )
        },
        sunset_minute(value){
            this.set_evening( this.sunset_minute, value )
        },
    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
