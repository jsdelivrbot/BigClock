import './notes.css!'

import tmpl from './notes.html!text'

import Vue from 'vue'

import moment from 'moment'


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {}
    },
    components: {

    },
    ready() {
        // window.notes_panel = this
    },
    methods: {
        resize_panel(size) {

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
    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
