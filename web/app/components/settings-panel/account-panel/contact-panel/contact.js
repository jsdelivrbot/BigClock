import './contact.css!'

import tmpl from './contact.html!text'

import Vue from 'vue'

import request from 'superagent'


export default Vue.extend({
    template: tmpl,
    props: {
        settings: null,
        editing: Boolean,
        user: {
            coerce(user) {
                return {
                    username: user.username,
                    email: user.email,
                }
            },
        },
    },
    data() {
        return {
            image: null,
            error: null,
        }
    },
    ready() {
        window.contact_panel = this
    },
    methods: {
        resize_panel(size) {

        },
        save_details(callback) {
            // request.put(this.$root.settings.url+"/resources/user").withCredentials()
            //        .send(this.user)
            //        .on('error', this.set_error)
            //        .end((error, response) => {
            //            this.set_user(error, response)
            //            if(callback) callback()
            //        })

            setTimeout( callback, 3000 )
        },
        rollback() {
            this.user = {
                username: this.settings.user.username,
                email: this.settings.user.email,
            }
        },
        set_user(error, response) {
            this.user = response.body.result
        },
        set_error(error, response) {
            this.error = "Ellor"//response.body.result
        },
    },
    computed: {

    },
    events: {
        resize(size) {
            this.resize_panel(size)
            return true
        },
        action_edit_user(complete) {
            console.log('call to action')
            this.save_details(complete)
        },
        cancel_edit_user(complete) {
            console.log('call to cancel')
            this.rollback()
            complete()
        },
    }
})
