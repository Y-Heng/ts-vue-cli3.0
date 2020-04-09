<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" ref="leftMenu" :collapse="isCollapse" :unique-opened="true">
      <sidebar-item :routes="routers" @closeAll="closeAll"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import SidebarItem from './sidebar-item.vue'
import { constantRouterMap } from '@/router'

@Component({
  components: { SidebarItem }
})
export default class Sidebar extends Vue {
  @Getter sidebar: any
  @Getter routers: any
  get isCollapse() {
    return !this.sidebar.opened
  }
  closeAll() {
    const leftMenu: any = this.$refs.leftMenu
    const openedMenus = leftMenu.openedMenus
    openedMenus.forEach((item: any) => {
      leftMenu.closeMenu(item)
    })
  }
}
</script>
