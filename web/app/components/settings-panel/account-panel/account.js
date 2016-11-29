import './account.css!'

import tmpl from './account.html!text'

import Vue from 'vue'

import request from 'superagent'

// –– App panels
import signin_panel  from "app/components/settings-panel/account-panel/signin-panel/signin"
import contact_panel from "app/components/settings-panel/account-panel/contact-panel/contact"
import password_panel from "app/components/settings-panel/account-panel/password-panel/password"


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            action: null,
            stasis: null,
        }
    },
    components: {
        "signin-panel": signin_panel,
        "contact-panel": contact_panel,
        "password-panel": password_panel,
    },
    ready() {
        window.account_panel = this
    },
    methods: {
        resize_panel(size) {

        },
        sign_out() {
            request.del(this.settings.url+"/rpc/sign-in").withCredentials()
                   .end(() => this.settings.user = null)
        },
        visible_action(option) {
            return this.action == option || this.action == null
        },
        clear() {
            this.action = null
            this.stasis = null
        },
        prepare_action(action) {
            this.action = action
            this.stasis = null
        },
        cancel_action(action) {
            // broadcast submit event
            this.$broadcast("cancel_"+action, this.clear)
        },
        fire_action(action) {
            // put action into stasis to disable buttons
            this.stasis = action
            // broadcast submit event
            this.$broadcast("action_"+action, this.clear)
        },
        toggle_action(action) {
            if(this.action != action) {
                this.prepare_action(action)
            }
            else {
                this.fire_action(action)
            }
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
