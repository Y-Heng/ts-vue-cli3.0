import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import './icons'
import '@/styles/element-variables.scss'
import '@/styles/global.scss' // global css
import Element from 'element-ui'
import i18n from '@/lang'
import './permission.js'
import '@/directive'
import VueLazyload from 'vue-lazyload'
import * as filters from '@/filters/index.ts'

// 全局组册api // 可不是不使用 按需加载
import Api from '@/api/RendererApiInstall'
Vue.use(Api)

Vue.config.productionTip = false

// 全局使用elementUI
Vue.use(Element, {
  size: 'small', // set element-ui default size
  i18n: (key: any, value: any) => i18n.t(key, value)
})

moment.locale('zh-cn')

// 注册过滤器
Object.keys(filters).forEach(key => {
  const f: any = filters
  Vue.filter(key, f[key])
})

// 懒加载 附加没有图时或图片出错时的默认显示图片
Vue.use(VueLazyload, {
  error: require('@/assets/def-img.jpg'),
  loading: require('@/assets/def-img.jpg')
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
