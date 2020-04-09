<template>
  <div id="mountNode"></div>
</template>

<script lang="ts">
import { Chart } from '@antv/g2'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class G2Chart extends Vue {
  @Prop() ChartOptions!: any

  // chart实列
  chart: any

  @Watch('ChartOptions', { deep: true })
  optionsChange(val: any) {
    console.log('变了')
    this.chart.updateOptions(val)
    this.chart.render()
  }

  private mounted() {
    const default_options = { container: 'mountNode' }
    this.chart = new Chart(Object.assign(default_options, this.ChartOptions))
    this.chart.render()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
