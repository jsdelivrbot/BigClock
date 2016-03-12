// JS Imports
// –– Utils
import clamp from 'app/utils/clamp'


// Display numeric input with at least 2 digits
export default {
    read: function(val) {
        // preserve sign
        var negative = (val < 0),
            number   = Math.abs(val)

        // add extra digit
        var result = number < 10 ? "0"+number : number

        // display integers with at least 2 digits
        return negative ? "-"+result : result
    },
    write: function(val, old_val, min, max) {
        // always write to model as integer
        var number = +val.replace(/[^\d.]/g, '')

        // apply limits
        number = clamp(number, min, max)

        // return 0 for NaN values
        return isNaN(number) ? 0 : parseInt(number)
    },
}
