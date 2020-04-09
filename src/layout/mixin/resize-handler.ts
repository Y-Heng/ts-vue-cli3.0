import store from '@/store'
import { Getter } from 'vuex-class'
import { Vue, Component, Watch } from 'vue-property-decorator'

const { body } = document
const WIDTH = 1024
const RATIO = 3

@Component({})
export default class ResizeHandlerMixin extends Vue {
  @Getter device: any
  @Getter sidebar: any

  @Watch('$route')
  private onRouteChange(route: any) {
    if (this.device === 'mobile' && this.sidebar.opened) {
      store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
  isMobile() {
    const rect = body.getBoundingClientRect()
    const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (!!flag || rect.width - RATIO < WIDTH) {
      return true
    } else {
      return false
    }
  }
  resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('closeSideBar', { withoutAnimation: true })
      }
    }
  }
  private mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  }
  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }
}
