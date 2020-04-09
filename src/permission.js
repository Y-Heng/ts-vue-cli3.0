import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from './store'
NProgress.configure({
  showSpinner: false
})
// 白名单页面，无需登录即可访问
const whiteList = ['/login', '/svg', '/404', '/log', '/demo']

router.beforeEach((to, from, next) => {
  NProgress.start()
  /* 白名单页面，直接进入 */
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    // 判断是否登录
    if (store.getters.auth) {
      const routers = store.getters.routers
      if (!routers) {
        store.dispatch('GenerateRoutes', store.getters.user).then(() => {
          router.addRoutes(store.getters.routers) // 动态添加可访问路由表
          next({ ...to, replace: true })
        })
      }
      next()
    } else {
      // 非白名单页面，跳转到登录页面
      next({
        path: '/login?redirect=' + encodeURIComponent(to.fullPath)
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
