import './settings.css!'

import tmpl from './settings.html!text'

import Vue from 'vue'

import moment from 'moment'

// –– App panels
import colour_picker from "app/components/colour-picker/colour-picker"


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            open: true,
            sunrise_hour: 6,
            sunrise_minute: 0,
            sunset_hour: 20,
            sunset_minute: 0,
        }
    },
    components:{
        "colour-picker": colour_picker,
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
