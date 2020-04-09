<template>
  <div class="home">
    <div class="login">
      <el-input v-model="name" placeholder=“请输入姓名” style="width:300px" />
      <br>
      <br>
      <el-select v-model="jurisdiction" placeholder="请选择权限" style="width:300px">
        <el-option label="管理员" :value="888"> </el-option>
        <el-option label="平民" :value="111"> </el-option>
      </el-select>
      <br>
      <br>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Login extends Vue {
  jurisdiction: number = 888
  name: string = 'kurumi'
  login() {
    if (!this.name) {
      this.$message.error('请输入姓名')
      return
    }
    const obj: any = {
      name: this.name,
      roles: this.jurisdiction
    }
    this.$store.dispatch('Login', obj).then((r: any) => {
      const redirect = this.$route.query.redirect
      this.$router.push({ path: decodeURIComponent(redirect ? redirect.toString() : '/dashboard') })
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url('../assets/kurumi/block-bride.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    background: rgba(255, 192, 203, 0.5);
    border-radius: 10px;
    padding: 30px;
  }
}
</style>
