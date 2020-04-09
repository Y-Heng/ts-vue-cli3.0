<template>
  <div class="bg">
    <svg-icons class="no-margin" />
  </div>
</template>

<script lang="ts">
import SvgIcons from '@/views/demo/svg-icon.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { SvgIcons }
})
export default class HomeDemo1 extends Vue {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.bg {
  background-color: $--color-primary;
}
</style>
