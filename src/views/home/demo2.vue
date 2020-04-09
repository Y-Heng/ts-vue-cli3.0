<template>
  <div>
    <div>懒加载</div>
    <img v-lazy="'https://reddemon.cn/static/img/block-bride.11152be0.png'" class="max-width" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HomeDemo2 extends Vue {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
