<template>
  <div class="app-wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import ResizeHandlerMixin from '../mixin/resize-handler'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  mixins: [ResizeHandlerMixin]
})
export default class LayoutEmpty extends Vue {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  background: #f1f4f8;
  clear: both;
  min-height: 100%;
  width: 100%;
  padding: 10px;
}
</style>
