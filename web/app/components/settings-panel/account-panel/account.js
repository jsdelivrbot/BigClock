import './account.css!'

import tmpl from './account.html!text'

import Vue from 'vue'

import request from 'superagent'


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            username: null,
            password: null,
            authenticated: false,
            result: null,
        }
    },
    components: {

    },
    ready() {
        window.account_panel = this
    },
    methods: {
        resize_panel(size) {

        },
        sign_in() {
            // send login request
            request
                .put("https://zoho-timesheet-dev.herokuapp.com/v1/rpc/login")
                .send({ username:this.username, password:this.password })
                .end((response) => {
                    console.log(response)

                    if(response && response.status) {
                        this.authenticated = response.status.ok
                    }
                })
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
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
    }
})
