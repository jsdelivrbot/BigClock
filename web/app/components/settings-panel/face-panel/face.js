import './face.css!'

import tmpl from './face.html!text'

import Vue from 'vue'

import moment from 'moment'

// –– App panels
import clock_panel from "app/components/clock-panel/clock"


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {}
    },
    components: {
        "clock-panel": clock_panel,
    },
    ready() {
        // window.face_panel = this
    },
    methods: {
        resize_panel(size) {

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
    },
    computed: {

    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
