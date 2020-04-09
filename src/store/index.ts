import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import actions from './sub/actions'
import mutations from './sub/mutations'
import state from './sub/state'
import getters from './sub/getters'

Vue.use(Vuex)

const store: Store<any> = new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})

export default store
