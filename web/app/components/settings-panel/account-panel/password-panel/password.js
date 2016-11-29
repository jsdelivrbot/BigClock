import './password.css!'

import tmpl from './password.html!text'

import Vue from 'vue'


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            old_password: null,
            new_password: null,
            confim_value: null,
        }
    },
    ready() {
        // window.contact_panel = this
    },
    methods: {
        resize_panel(size) {

        },
    },
    computed: {

    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
        cancel_edit_password(complete) {
            complete()
        },
    }
})
