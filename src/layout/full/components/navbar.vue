<template>
  <el-menu class="navbar" :class="{ 'is-opened': sidebar.opened }" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <div class="brand-container"></div>
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
      <el-dropdown>
        <div>
          <svg-icon icon-class="language" style="font-size: 19px;" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="$i18n.locale==='zh'">
            <span class="block" @click="$i18n.locale='zh'">中文</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="$i18n.locale==='en'">
            <span class="block" @click="$i18n.locale='en'">English</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="right-menu-item" trigger="click">
        <div class="user">
          {{user && user.name}}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span class="block" @click="logout()">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script lang="ts">
import { Getter } from 'vuex-class'
import Hamburger from '@/components/hamburger/index.vue'
import Screenfull from '@/components/screenfull/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { Hamburger, Screenfull }
})
export default class Navbar extends Vue {
  @Getter sidebar: any
  @Getter user: any

  toggleSideBar() {
    this.$store.dispatch('toggleSideBar')
  }
  logout() {
    this.$store.dispatch('LogOut').then(() => {
      this.$router.replace('/login')
    })
  }
}
</script>
