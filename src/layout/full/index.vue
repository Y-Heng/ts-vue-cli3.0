<template>
  <div class="app-wrapper" :class="class_obj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import ResizeHandlerMixin from '../mixin/resize-handler'
import { Component, Vue } from 'vue-property-decorator'
import Navbar from '@/layout/full/components/navbar.vue'
import AppMain from '@/layout/full/components/app-main.vue'
import Sidebar from '@/layout/full/components/sidebar/index.vue'

@Component({
  components: { Navbar, Sidebar, AppMain },
  mixins: [ResizeHandlerMixin]
})
export default class LayoutFull extends Vue {
  @Getter sidebar: any
  get class_obj() {
    return {
      hideSidebar: !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/styles/variables.scss';
.app-wrapper {
  background: #f1f4f8;
  clear: both;
  min-height: 100%;
  width: 100%;
  // 主要区域
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 180px;
    padding-top: 50px;
  }
  // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: $--menu-bg;
    .logo {
      .svg-icon {
        width: 70px;
        height: 40px;
        margin: 5px 20px;
        color: $--color-primary;
      }
      &.isCollapse .svg-icon {
        width: 30px;
        height: 25px;
        margin: 10px 3px;
      }
    }
    //reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }
    .scrollbar-wrapper {
      height: calc(100% + 17px);
      .el-scrollbar__view {
        height: 100%;
      }
    }
    .is-horizontal {
      display: none;
    }
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
    .svg-icon {
      margin-right: 16px;
      width: 14px;
      height: 14px;
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
      background-color: $--menu-bg;
      .is-opened {
        position: relative;
        > .el-submenu__title {
          background-color: $--menu-hover !important;
        }
        &::after {
          content: '';
          width: 4px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background-color: $--color-primary;
        }
      }
      .router-link-active {
        .el-menu-item {
          color: $--menu-active-text;
        }
      }
      .el-menu-item {
        color: $--menu-text;
        &:hover {
          background-color: $--menu-hover !important;
        }
        &:focus {
          background-color: $--menu-sub-bg;
        }
        // &.is-active,
        // &.is-active:hover,
        // &.is-active:focus {
        //   color: $--menu-active-text;
        //   background-color: rgba(255, 130, 68, 0.1);
        // }
      }
    }
    .el-menu--inline {
      background-color: $--menu-sub-bg;
    }
    .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
      min-width: 180px !important;
      color: $--menu-text;
      &:hover {
        background-color: $--menu-hover !important;
      }
      &:focus {
        background-color: $--menu-sub-bg;
      }
    }
    .el-submenu > .el-submenu__title i {
      color: $--menu-text;
    }
    .el-menu--collapse .el-menu .el-submenu {
      min-width: 180px !important;
    }
  }
  // 顶部菜单
  .navbar {
    position: fixed;
    top: 0;
    left: 36px;
    right: 0;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    color: #37474f;
    background-color: #fff;
    z-index: 9;
    &.is-opened {
      left: 180px;
    }
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .brand-container {
      float: left;
      line-height: 50px;
      height: 50px;
      padding: 0 10px;
      font-weight: bold;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .msg {
        vertical-align: top;
        cursor: pointer;
      }
      .user {
        cursor: pointer;
        font-weight: bold;
      }
      .theme-switch {
        vertical-align: 15px;
      }
    }
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 999;
}
// 收起菜单
.hideSidebar {
  .sidebar-container {
    width: 36px !important;
  }
  .main-container {
    margin-left: 36px;
  }
  .submenu-title-noDropdown {
    padding-left: 10px !important;
    position: relative;
    .el-tooltip {
      padding: 0 10px !important;
    }
  }
  .el-submenu {
    overflow: hidden;
    & > .el-submenu__title {
      padding-left: 10px !important;
      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}
// 适配移动端
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: 180px !important;
  }
  &.hideSidebar {
    .sidebar-container {
      transition-duration: 0.3s;
      transform: translate3d(-180px, 0, 0);
    }
  }
  .navbar {
    left: 0;
    .right-menu {
      text-align: right;
      background-color: #ffffff;
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  text-align: center;
  color: #acabab;
  svg {
    font-size: 80px;
  }
  h5 {
    margin-bottom: 27px;
    margin-top: 13px;
    color: #737e84;
    font-size: 14px;
  }
  h4 {
    color: #37474f;
    font-size: 16px;
  }
  .btns {
    margin-top: 40px;
  }
  p {
    color: #737e84;
    font-size: 14px;
    margin-top: 16px;
  }
}
</style>
