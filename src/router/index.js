import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home';
import editBlog from '@/components/editBlog';

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
            path: '/blog/edit',
            name: 'editBlog',
            component: editBlog,
        }
    ]
})
