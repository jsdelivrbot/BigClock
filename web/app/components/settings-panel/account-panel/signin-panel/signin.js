import './signin.css!'

import tmpl from './signin.html!text'

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
        // window.signin_panel = this
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
        set_user(error, response) {
            this.settings.user = response.body.result
        },
        set_error(error, response) {
            this.result = response.body.result
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
