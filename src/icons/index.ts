import Vue from 'vue'
import SvgIcon from '@/components/svg-icon.vue' // svg组件
import generateIconsView from './view' // just for @/views/icons , you can delete it

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)

generateIconsView.generate(iconMap) // just for @/views/icons , you can delete it
