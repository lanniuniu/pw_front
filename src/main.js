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
import newsTips from './components/newsTips';//引入消息通知newsTips组件
// import tooltips from './components/tooltips';//引入tooltips组件


Vue.config.productionTip = false;

Vue.component('navbar-component', navbar);
Vue.component('right-mixed-component',rightMixed);
Vue.component('modal-component',modal);
Vue.component('news-tips-component',newsTips);
// Vue.component('tooltips-component',tooltips);

Vue.use(fontello);
Vue.use(Resource);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
