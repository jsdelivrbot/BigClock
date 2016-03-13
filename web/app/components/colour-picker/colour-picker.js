import './colour-picker.css!'

import tmpl from './colour-picker.html!text'

import Vue from 'vue'

import moment from 'moment'

// –– Import JSON palette
import html_colors  from './html_colours.json!text'
import user_palette from './palette.json!text'

export default Vue.extend({
    template: tmpl,
    props: [
        'value',
        'default',
        'position'
    ],
    data() {
        return {
            visible: false,
            close_binding: null,
            closable: true,
            palette: JSON.parse(user_palette),
            names: JSON.parse(html_colors),
            selection: this.value,
            reset: this.value,
        }
    },
    ready() {
        // window.colour_picker = this

        // set to the defaults
        if(this.default) this.reset = this.default
        if(!this.selection) this.selection = this.reset

        // add window click listener to close picker
        this.close_binding = this.close.bind(this)
        document.addEventListener('click', this.close_binding)
    },
    beforeDestroy() {
        // clean up close listener
        document.removeEventListener('click', this.close_binding)
    },
    methods: {
        // NOTE: Must have separate open and close evaluate the order of click events with visbility lock
		open() {
            if( this.visible == false ) {
                // temporarily lock picker (if closed)
                this.closable = false
            }
            // toggle
			this.visible = true
		},
        close() {
            // check if locked (means just opened)
            if(!this.closable) {
                // unlock the picker
                this.closable = true
            }
            else {
                // hide the picker
                this.visible = false
            }
        },
        clear_selection() {
            if(this.reset) {
                this.selection = this.reset
            }
            else {
                this.selection = null
            }
        },
        set_opacity(value) {
            // prepare value to be added
            value = value && value < 1 ? ',' + value : ',1'

            // translate to rgb (safe to call if already rgb)
            this.translate_format(this.format,'rgb')

            // cannot add opacity if not in rgb format
            if(this.format == 'rgb') {
                // replace or add the opacity value
                this.selection = this.selection.split(",").splice(0,3).join() + value
            }
        },
        translate_format(before,after) {
            if( before == 'hex' && after == 'rgb' ) {
                this.selection = this.hex_to_rgb(this.selection)
            }
            else if( before == 'rgb' && after == 'hex' ) {
                this.selection = this.rgb_to_hex(this.selection)
            }
            else if( before == 'named' ) {
                // get mapped hex value
                var new_value = this.names[after]

                // set rgb / hex value from name mapping
                if(after == 'rgb') {
                    this.selection = this.hex_to_rgb(new_value)
                }
                else {
                    this.selection = new_value
                }
            }
        },
        hex_to_rgb(hex) {
            // expand hex shorthands
            var shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
            hex = hex.replace(shorthand, function(match, r, g, b) {
                return r + r + g + g + b + b
            })

            // evaluate hex value
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

            // parse to rgb
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
            ].join() : null
        },
        rgb_to_hex(rgb) {
            var result = '#'

            // parse segments
            var i, item, items = rgb.split(",")
            for (i=0; i<3; i++) {
                // convert to hex segment
                item = items[i].toString(16)

                // append result and pad with zero value if needed
                result += segment.length == 1 ? "0" : segment
            }

            // check for valid hex result
            return result.length > 4 ? result : null
        },
        handle_opacity(event) {
            var slider    = this.$els.slider.offsetWidth,
                offset    = event.offsetX,
                new_value = (offset/slider).toFixed(2)

            // set the new opacity
            this.set_opacity(new_value);
        }
    },
    computed: {
        position_property() {
            // above by default
            var result = null

            // check user option
            if(this.position == 'left') {
                result = { bottom: "-53px", left: "-207px" }
            }
            else if(this.position == 'right') {
                result = { bottom: "-53px", left: "35px" }
            }
            else if(this.position == 'bottom') {
                result = { bottom: "-157px", left: "-86px" }
            }

            return result
        },
        handle_position_property() {
            // above by default
            var result = null

            // check user option
            if(this.position == 'left') {
                result = { top: "10px", left: "-15px", transform: "rotate(90deg)" }
            }
            else if(this.position == 'right') {
                result = { top: "10px", left: "21px", transform: "rotate(90deg)" }
            }
            else if(this.position == 'bottom') {
                result = { top: "28px", left: "3px" }
            }

            return result
        },
        selection_property() {
            // check for rbg / rgba
            if(this.format == 'rgb') {
                return this.opacity != null ?
                    'rgba('+this.selection+')' :
                     'rgb('+this.selection+')'
            }
            return this.selection
        },
        opacity_property() {
            // get elements
            var slider  = this.$els.slider.offsetWidth,
                pointer = this.$els.sliderPointer.offsetWidth

            // default
            if(!this.opacity) return { right: '-4px', left: 'auto' }

            // calculater offset
            var adjust = this.opacity > 1 ? 1 : this.opacity
            return { right: 'auto', left: (slider*adjust)-(pointer/2)+'px' }
        },
        opacity() {
            // check for opacity
            if(this.format == 'rgb') {
                var segments = this.selection.split(",")
                if(segments.length > 3) return segments[3]
            }
            return null
        },
        format() {
            // look for recognised formats
            if( !this.selection              ) return 'unknown' // cannot identify a supported colour type
            if( this.selection.includes(',') ) return 'rgb'
            if( this.selection.includes('#') ) return 'hex'
            if( this.selection in this.names ) return 'named'
        },
    },
    watch: {
        selection() {
            this.value = this.selection_property
        },
    }
})
