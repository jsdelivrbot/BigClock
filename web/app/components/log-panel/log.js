import './log.css!'

import tmpl from './log.html!text'

import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
    template: tmpl,
    props: [
        'time',
    ],
    data() {
        return {
            entry: null,
            stamp: null,
            records: [],
        }
    },
    ready() {
        // window.log_panel = this
    },
    methods: {
        resize_panel(size) {

        },
        new_entry() {
            if(!this.entry) return

            // create display object
            var point = {
                content: this.entry,
                  stamp: this.stamp ? this.stamp : this.time
            }

            // add data point
            this.records.push(point)
            // clear
            this.entry = null
        },
        remove_entry(index) {
            // remove data point
            this.records.splice(index,1)
        }
    },
    computed: {
        has_logged() {
            return this.records.length > 0
        }
    },
    watch: {

    },
    events: {
        resize(size) {
            this.resize_panel(size);
            return true
        }
    }
})
