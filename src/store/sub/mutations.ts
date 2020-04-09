import { MutationTree } from 'vuex'
import { AppState } from './types'
import SessionKey from '../keys'
import { setLocal, removeLocal } from '@/utils/localstorage'

const mutations: MutationTree<AppState> = {
  SET_AUTH: (state, auth) => {
    state.auth = auth
    setLocal(SessionKey.AUTH_KEY, auth)
  },
  SET_USER: (state, user) => {
    state.user = user
    setLocal(SessionKey.USER_KEY, user)
  },
  SET_ROUTERS: (state, routers) => {
    state.routers = routers
  },
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      setLocal('sidebarStatus', 1)
    } else {
      setLocal('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setLocal('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  REMOVE: state => {
    state.user = undefined
    state.auth = undefined
    state.routers = undefined
    removeLocal(SessionKey.USER_KEY)
    removeLocal(SessionKey.AUTH_KEY)
  }
}

export default mutations
