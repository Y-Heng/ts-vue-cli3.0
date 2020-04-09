import { AppState } from './types'
import { GetterTree } from 'vuex'

const getters: GetterTree<AppState, any> = {
  user: (state: AppState) => state.user,
  auth: state => state.auth,
  sidebar: state => state.sidebar,
  device: state => state.device,
  routers: state => state.routers
}

export default getters
