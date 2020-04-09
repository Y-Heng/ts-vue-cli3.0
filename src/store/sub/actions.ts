import { ActionTree } from 'vuex'
import { AppState } from './types'
import { constantRouterMap } from '@/router'

function filterAsyncRouter(asyncRouterMap: any, roles: number) {
  const accessedRouters = asyncRouterMap.filter((route: any) => {
    if (!route.meta.roles || (route.meta.roles && route.meta.roles.toString()) === roles.toString()) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const actions: ActionTree<AppState, any> = {
  Login({ commit }, data_obj: any) {
    return new Promise((resolve, reject) => {
      commit('SET_AUTH', {
        token: 'xxxxxxxxxxxxx',
        expire_time: moment()
      })
      commit('SET_USER', {
        name: data_obj.name,
        roles: data_obj.roles
      })
      resolve()
    })
  },
  // 开关条
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 关闭条
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  // 开关屏幕
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 生成动态路由
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data
      const accessedRouters: any[] = filterAsyncRouter(lodash.cloneDeep(constantRouterMap), roles)
      commit('SET_ROUTERS', accessedRouters)
      resolve(accessedRouters)
    })
  },
  RemoveRoutes({ commit }) {
    commit('SET_ROUTERS', null)
  },
  // 前端 登出
  LogOut({ commit }) {
    return new Promise(resolve => {
      commit('REMOVE')
      resolve()
    })
  }
}

export default actions
