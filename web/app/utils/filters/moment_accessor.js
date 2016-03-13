// –– Dependencies
import moment from 'moment'


// Get and Set Momentjs component values
export default {
  read: function(value, accessor) {
      return value[accessor]()
  },
  write: function(new_value, current_moment, accessor) {
      current_moment[accessor](new_value)
      return current_moment
  }
}
