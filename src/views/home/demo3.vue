<template>
  <div>
    <el-button type="primary" @click="getFaceInter()">调用接口</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HomeDemo3 extends Vue {
  getFaceInter() {
    this.$api.Demo1.LoginAPi.login_by_ac()
  }
  private created() {
    this.getFaceInter()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
