import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home';
import blogEdit from '@/components/blogEdit';
import blogList from '@/components/blogList';
import blogDetail from '@/components/blogDetail';
import config from '../../config/config';//引入配置文件

Vue.use(Router);

//私有方法 用户获取客户端信息
const _getClientInfo = function (userAgent) {
    let clientInfo = {};

    //判断客户端操作系统windows OS linux
    if (userAgent.includes('Windows NT')) {
        clientInfo.system = 'Windows NT';
    } else if (userAgent.includes('MAC OS X')) {
        clientInfo.system = 'MAC OS X';
    } else if (userAgent.includes('Linux')) {
        clientInfo.system = 'Linux';
    } else {
        clientInfo.system = 'unknown';
    }

    //判断所访问的浏览器信息
    if (userAgent.includes('Chrome/') && userAgent.includes('Safari/')) {
        //谷歌
        let chromeRegExp = new RegExp("Chrome/[0-9.]+");
        clientInfo.browser = userAgent.match(chromeRegExp)[0];
    } else if (userAgent.includes('Safari/') && userAgent.includes('Chrome/') === false) {
        //safari
        let safariRegExp = new RegExp("Safari/[0-9.]+");
        clientInfo.browser = userAgent.match(safariRegExp)[0];
    } else if (userAgent.includes('Firefox/')) {
        //Firefox
        let firefoxRegExp = new RegExp("Firefox/[0-9.]+");
        clientInfo.browser = userAgent.match(firefoxRegExp)[0];
    } else if (userAgent.includes('Opera/')) {
        //opera
        let operaRegExp = new RegExp("Opera/[0-9.]+");
        clientInfo.browser = userAgent.match(operaRegExp)[0];
    } else {
        clientInfo.browser = 'unknown'
    }
    return clientInfo;
};

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
            beforeEnter: (to, from, next) => {
                if (to.name === 'blogEdit' && to.fullPath === '/blog/edit') {
                    let clientInfo = _getClientInfo(navigator.userAgent);
                    if (config.whiteBrowser.includes(clientInfo.browser) && config.whiteSystem.includes(clientInfo.system)) {
                        next();
                    } else {
                        location.href = '/'
                    }
                }
            },
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
    ],

})
