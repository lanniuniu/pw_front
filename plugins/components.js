import Vue from 'vue'
import navbar from '~/components/navbar'
import rightMixed from '~/components/rightMixed'
import modal from '~/components/modal'
import newsTips from '~/components/publicComponent/newsTips'
import tooltips from '~/components/publicComponent/tooltips'
import badge from '~/components/publicComponent/badge'
import button from '~/components/publicComponent/button'
import pagination from '~/components/publicComponent/pagination'
import top from '~/components/publicComponent/top'
import table from '~/components/publicComponent/table'

Vue.component('navbar-component', navbar)
Vue.component('right-mixed-component', rightMixed)
Vue.component('modal-component', modal)
Vue.component('news-tips-component', newsTips)
Vue.component('tooltips-component', tooltips)
Vue.component('badge-component', badge)
Vue.component('button-component', button)
Vue.component('pagination-component', pagination)
Vue.component('top-component', top)
Vue.component('table-component', table)
