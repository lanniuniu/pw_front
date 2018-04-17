// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource';//引入vue-resource
import fontello from './assets/fontello/css/fontello.css';//引入字体图标

import navbar from './components/navbar';//引入导航栏组件
import rightMixed from './components/rightMixed';//引入导航栏组件
import modal from './components/modal';//引入modal框组件
import newsTips from './components/publicComponent/newsTips';//引入消息通知newsTips组件
import tooltips from './components/publicComponent/tooltips';//引入tooltips组件
import badge from './components/publicComponent/badge';//引入badge组件
import button from './components/publicComponent/button';//引入button组件
import pagination from './components/publicComponent/pagination';//引入pagination组件
import top from './components/publicComponent/top';//引入top组件
import table from './components/publicComponent/table';//引入list组件'
import mavonEditor from 'mavon-editor';//引入mavon
import 'mavon-editor/dist/css/index.css'//引入mavon css样式


Vue.config.productionTip = false;

Vue.component('navbar-component', navbar);
Vue.component('right-mixed-component', rightMixed);
Vue.component('modal-component', modal);
Vue.component('news-tips-component', newsTips);
Vue.component('tooltips-component', tooltips);
Vue.component('badge-component', badge);
Vue.component('button-component', button);
Vue.component('pagination-component', pagination);
Vue.component('top-component', top);
Vue.component('table-component', table);
Vue.use(fontello);
Vue.use(Resource);
Vue.use(mavonEditor);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
