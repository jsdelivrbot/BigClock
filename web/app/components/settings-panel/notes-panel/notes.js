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
        return {
            current_line: 0,
        }
    },
    components: {

    },
    ready() {
        window.notes_panel = this
    },
    methods: {
        resize_panel(size) {

        },
        lines_follow() {
            // line numbers follow textarea scroll position
            this.$els.gutter.scrollTop = this.$els.notes.scrollTop
        },
        which_line() {
            // get cursor index
            let cursor = this.$els.notes.selectionEnd

            // gets the line number by splitting the content up to the index of the cursor
            this.current_line = this.settings.notes.substr(0,cursor).split(/\r*\n/).length-1
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
        lines() {
            return this.settings.notes.split(/\r*\n/)
        },
    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
