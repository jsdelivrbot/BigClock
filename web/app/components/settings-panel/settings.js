import './settings.css!'

import tmpl from './settings.html!text'

import Vue from 'vue'

import moment from 'moment'

// –– App panels
import colour_picker from "app/components/colour-picker/colour-picker"
import clock_panel   from "app/components/clock-panel/clock"


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            open: false,
            current_page: 'circadian',
            pages: [
                'circadian',
                'face_type',
            ],
        }
    },
    components:{
        "colour-picker": colour_picker,
        "clock-panel": clock_panel,
    },
    ready() {
        window.settings_panel = this
    },
    methods: {
        resize_panel(size) {

        },
		toggle_settings() {
			this.open = !this.open
		},
        transition_page(direction) {
            if(direction == 'previous') {
                // get the index for the previous page (wrap / catch unknown pages)
                var next_page = this.pages.indexOf(this.current_page) - 1
                if(next_page < 0) next_page = (this.pages.length-1)
            }
            else {
                // get the index for the next page (wrap / catch unknown pages)
                var next_page = this.pages.indexOf(this.current_page) + 1
                if(next_page > (this.pages.length-1) || next_page == -1) next_page = 0
            }

            // set next page
            this.current_page = this.pages[next_page]
        },
        toggle_lock(type) {
            if(this.settings.lock && this.settings.mode == type) {
                this.settings.lock = false;
            }
            else {
                this.settings.lock = true;
                this.settings.mode = type;
            }
        },
        spoof_settings(type) {
            return {
                time: moment().seconds(0).minutes(0).hours(3),
                mode: type,
                snap: null,
                lock: true,
                colours: {
                    sunrise_primary:   "#FFFFFC",
                    sunrise_secondary: "#969685",
                    sunset_primary:    "#333",
                    sunset_secondary:  "#D6D6D4",
                },
            }
        },
        set_morning(hours, minutes) {
            this.settings.sunrise = moment().hour(hours).minutes(minutes).seconds(0)
        },
        set_evening(hours, minutes) {
            this.settings.sunset  = moment().hour(hours).minutes(minutes).seconds(0)
        },
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
        gradient() {
            var upper   = this.settings.colours.sunrise_primary,
                lower   = this.settings.colours.sunset_primary

            return {
                background: "-webkit-gradient(linear, left top, right bottom, color-stop(50%,"+upper+"), color-stop(50%,"+lower+"))",
                background: "-webkit-linear-gradient(-45deg, "+upper+" 50%, "+lower+" 50%)",
                background:    "-moz-linear-gradient(-45deg, "+upper+" 50%, "+lower+" 50%)",
                background:     "-ms-linear-gradient(-45deg, "+upper+" 50%, "+lower+" 50%)",
                background:      "-o-linear-gradient(-45deg, "+upper+" 50%, "+lower+" 50%)",
                background:         "linear-gradient(135deg, "+upper+" 50%, "+lower+" 50%)",
                filter:     "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+upper+"', endColorstr='"+lower+"',GradientType=1 )",
            }
        },
    },
    watch: {
        // update morning
        sunrise_hour(value){
            console.log(value)
            this.set_morning( value, this.sunrise_hour )
        },
        sunrise_minute(value){
            console.log(value)
            this.set_morning( this.sunrise_minute, value )
        },
        // update evening
        sunset_hour(value){
            console.log(value)
            this.set_evening( value, this.sunset_hour )
        },
        sunset_minute(value){
            console.log(value)
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
