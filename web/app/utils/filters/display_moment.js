// –– Dependencies
import moment from 'moment'


// Get and Set Momentjs component values
export default {
  read: function(value, accessor, format) {
      // get the component of the moment object by format
      return value.format(format)
  },
  write: function(new_value, old_value, accessor, format, model) {
      // copy old value and parse input
      let current_moment = moment(model),
          new_moment     = moment(new_value, format)

      // if unparsable - fallback on current time
      if( new_moment.isValid() ) {
          // pull parsed value
          let set_value = new_moment[accessor]()

          // set against the old moment (to preserve the other components)
          current_moment[accessor](set_value)
      }

      // may have been modified
      return current_moment
  }
}
