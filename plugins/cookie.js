import Vue from 'vue'
import Cookies from 'js-cookie'

Vue.prototype.$getCookie = function (key) {
    return Cookies.get(key) || ''
}

Vue.prototype.$getCsrfToken = function () {
    return this.$getCookie('csrfToken')
}
