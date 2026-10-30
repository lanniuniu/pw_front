export default {
  // 服务器渲染
  ssr: true,

  // 监听所有网络接口，允许容器间通信
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // 全局页面标题
  head: {
    title: '诗酒剑歌',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { name: 'referrer', content: 'no-referrer' },
      { hid: 'description', name: 'description', content: '诗酒剑歌 懒牛牛的博客' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/cat.ico' }
    ]
  },

  // 加载全局样式
  css: [
    '~/assets/css/reset.css',
    '~/assets/fontello/css/fontello.css'
  ],

  // 插件
  plugins: [
    '~/plugins/components.js',
    '~/plugins/http.js',
    '~/plugins/cookie.js',
    { src: '~/plugins/mavon-editor.client.js', mode: 'client' }
  ],

  // 模块
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // axios 配置
  axios: {
    proxy: true
  },

  // 开发代理（与原来 webpack devServer 一致）
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true
    }
  },

  // 构建配置
  build: {
    // 兼容 mavon-editor
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
