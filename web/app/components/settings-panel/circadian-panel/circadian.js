import './circadian.css!'

import tmpl from './circadian.html!text'

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
        return {}
    },
    components:{
        "colour-picker": colour_picker,
    },
    ready() {
        // window.circadian_panel = this
    },
    methods: {
        resize_panel(size) {

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
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
