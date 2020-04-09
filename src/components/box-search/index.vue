<template>
  <div class="box-search">
    <div class="box-label" :style="{width: labelWidth}">{{label}}</div>
    <div class="box-content" :style="{paddingLeft: labelWidth}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class BoxSearch extends Vue {
  @Prop() readonly label!: string // 标题
  @Prop({ default: '80px' }) readonly labelWidth!: string // 标题宽度
  @Prop({ default: 'small' }) readonly size!: string // 框子大小 与element一致 medium / small / mini
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import '@/styles/variables.scss';
.box-search {
  $border--color: #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
  border: 1px solid $border--color;
  position: relative;
  .box-label {
    top: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: #ddd;
    border-right: 1px solid $border--color;
  }
  .box-content {
  }
}
</style>