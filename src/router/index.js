import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home';
import blogEdit from '@/components/blogEdit';
import blogList from '@/components/blogList';
import blogDetail from '@/components/blogDetail';


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
            name: 'blogEdit',
            component: blogEdit,
        },
        {
            path: '/blog/list',
            name: 'blogList',
            component: blogList,
        },
        {
            path: '/blog/detail/:_id',
            name: 'blogDetail',
            component: blogDetail,
        }
    ]
})
