import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0cd0978f = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _f62592cc = () => interopDefault(import('..\\pages\\blog\\edit.vue' /* webpackChunkName: "pages/blog/edit" */))
const _4bbe6910 = () => interopDefault(import('..\\pages\\blog\\edit\\_id.vue' /* webpackChunkName: "pages/blog/edit/_id" */))
const _75a50f2e = () => interopDefault(import('..\\pages\\blog\\list.vue' /* webpackChunkName: "pages/blog/list" */))
const _917506ae = () => interopDefault(import('..\\pages\\blog\\detail\\_id.vue' /* webpackChunkName: "pages/blog/detail/_id" */))
const _2c887254 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _0cd0978f,
    name: "about"
  }, {
    path: "/blog/edit",
    component: _f62592cc,
    name: "blog-edit",
    children: [{
      path: ":id?",
      component: _4bbe6910,
      name: "blog-edit-id"
    }]
  }, {
    path: "/blog/list",
    component: _75a50f2e,
    name: "blog-list"
  }, {
    path: "/blog/detail/:id?",
    component: _917506ae,
    name: "blog-detail-id"
  }, {
    path: "/",
    component: _2c887254,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
