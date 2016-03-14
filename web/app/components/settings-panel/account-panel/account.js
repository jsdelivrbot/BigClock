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
            request.post(this.settings.url+"/rpc/sign-in").withCredentials()
                   .send({ username:this.username, password:this.password })
                   .on('error', this.set_error)
                   .end(this.set_user)
        },
        sign_out() {
            request.del(this.settings.url+"/rpc/sign-in").withCredentials()
                   .end(() => this.settings.user = null)
        },
        set_user(error, response) {
            this.settings.user = response.body.result
        },
        set_error(error, response) {
            this.result = response.body.result
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
