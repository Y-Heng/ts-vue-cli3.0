<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppMain extends Vue {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  padding: 15px 15px;
}
@media screen and (max-width: 768px) {
  .app-main {
    padding: 5px 10px;
  }
}
</style>
