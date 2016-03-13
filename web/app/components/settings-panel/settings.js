import './settings.css!'

import tmpl from './settings.html!text'

import Vue from 'vue'

import moment from 'moment'

// –– App panels
import circadian_panel from "app/components/settings-panel/circadian-panel/circadian"
import face_panel      from "app/components/settings-panel/face-panel/face"
import notes_panel     from "app/components/settings-panel/notes-panel/notes"
import account_panel   from "app/components/settings-panel/account-panel/account"


export default Vue.extend({
    template: tmpl,
    props: [
        'settings',
    ],
    data() {
        return {
            open: true,
            transition: 'swipe-next',
            current_page: 'account',
            pages: [
                'account',
                'circadian',
                'notes',
                'face',
            ],
        }
    },
    components: {
        "circadian-panel": circadian_panel,
        "face-panel": face_panel,
        "notes-panel": notes_panel,
        "account-panel": account_panel,
    },
    ready() {
        window.settings_panel = this
    },
    methods: {
        resize_panel(size) {

        },
		toggle_settings() {
			this.open = !this.open
		},
        transition_page(direction) {
            // debugger
            if(direction == 'previous') {
                // set the directional transition
                this.transition = 'swipe-previous'

                // get the index for the previous page (wrap / catch unknown pages)
                var next_page = this.pages.indexOf(this.current_page) - 1
                if(next_page < 0) next_page = (this.pages.length-1)
            }
            else {
                // set the directional transition
                this.transition = 'swipe-next'

                // get the index for the next page (wrap / catch unknown pages)
                var next_page = this.pages.indexOf(this.current_page) + 1
                if(next_page > (this.pages.length-1) || next_page == -1) next_page = 0
            }

            // set next page
            this.current_page = this.pages[next_page]
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
