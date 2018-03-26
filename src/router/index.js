import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home';
import addBlog from '@/components/addBlog';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/blog/add',
            name: 'addBlog',
            component: addBlog,
        }
    ]
})
