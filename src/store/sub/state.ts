import { getLocal } from '@/utils/localstorage'
import SessionKey from '../keys'
import { AppState } from './types'

const state: AppState = {
  user: getLocal(SessionKey.USER_KEY),
  auth: getLocal(SessionKey.AUTH_KEY),
  sidebar: {
    opened: !+getLocal('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  routers: null
}

export default state
