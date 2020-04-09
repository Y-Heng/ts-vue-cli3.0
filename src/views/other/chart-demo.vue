<template>
  <div>
    <el-button @click="changeChart()">改变图表</el-button>
    <g2-chart style="margin-top:20px;" :chart-options="chart_options" />
  </div>
</template>

<script lang="ts">
import G2Chart from '@/components/g2-chart/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { G2Chart }
})
export default class OtherDemo1 extends Vue {
  // chart配置
  chart_options: any = {
    width: 400,
    height: 300,
    options: {
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
      ],
      scales: {
        genre: { alias: '游戏种类' },
        sold: { alias: '销售量', nice: true }
      },
      geometries: [
        {
          type: 'interval',
          position: 'genre*sold',
          color: 'genre'
        }
      ],
      interactions: [{ type: 'active-region' }]
    }
  }
  changeChart() {
    this.chart_options = {
      geometries: [
        {
          type: 'line',
          position: 'genre*sold'
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
