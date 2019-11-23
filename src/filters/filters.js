import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value, format) {
  if (!value) return ''
  return moment(value).format(format)
})
