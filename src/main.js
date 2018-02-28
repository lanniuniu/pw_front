// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fontello from './assets/fontello/css/fontello.css';//引入字体图标
import navbar from './components/navbar';//引入导航栏组件

Vue.config.productionTip = false;

Vue.component('navbar-component', navbar);
Vue.use(fontello);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
