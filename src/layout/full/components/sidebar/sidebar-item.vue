<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden && item.children">
        <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow" :key="item.children[0].name" :to="item.path + '/' + item.children[0].path">
          <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }" @click="close">
            <svg-icon v-if="item.children[0].meta && item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
            <span v-if="item.children[0].meta && item.children[0].meta.title" slot="title">{{ generateTitle(item.children[0].meta.title) }}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta && item.meta.title" slot="title">{{ generateTitle(item.meta.title) }}</span>
          </template>

          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.path"></sidebar-item>

              <router-link v-else :key="child.name" :to="item.path + '/' + child.path">
                <el-menu-item :index="item.path + '/' + child.path">
                  <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.meta && child.meta.title" slot="title">{{ generateTitle(child.meta.title) }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class SidebarItem extends Vue {
  // 路由
  @Prop() readonly routes!: []
  // 哈哈
  @Prop({ default: false }) readonly isNest!: boolean

  refresh(path: string) {
    this.$router.replace({ path: '/reload', query: { to: path } })
  }
  close() {
    this.$emit('closeAll')
  }
  hasOneShowingChildren(children: any) {
    const showingChildren = children.filter((item: any) => {
      return !item.hidden
    })
    if (showingChildren.length === 1) {
      return true
    }
    return false
  }
  generateTitle(title: string) {
    const hasKey = this.$te('route.' + title)
    const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
    if (hasKey) {
      return translatedTitle
    }
    return title
  }
}
</script>
