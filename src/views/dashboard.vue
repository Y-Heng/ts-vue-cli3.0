<template>
  <div v-minHeight="-80" class="home">
    <div>全局过滤器使用{{ time | fmDate('YYYY-MM-DD HH:mm:ss') }}</div>
    <br>
    <date-speed v-model="range_time" start-date="2020-04-05 00:00:00" end-date="2020-04-14 23:00:00" ref="date-speed" @run="run" @stop="stop" />

    <search-form style="margin-top:20px;" :form="form" />
  </div>
</template>

<script lang="ts">
import SearchForm from '@/components/search-form/index.vue'
import { DiyForm } from '@/components/search-form/interface-data'
import { handTimeType } from '@/utils/enum'
import DateSpeed from '@/components/date-speed/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { DateSpeed, SearchForm }
})
export default class DashBoard extends Vue {
  // 时间范围中的当前时间
  range_time: Date | string = new Date()
  time: Date = new Date()
  time_out: any = ''
  time_type: handTimeType = handTimeType.hour

  form: DiyForm = {
    title: 'xx',
    is_block: true, // 是否块状
    items: [
      {
        type: 'input', // 表单类型
        label: '输入框',
        default: '达阿达达',
        other_info: {
          // placeholder: '哈哈',
          // type: 'textarea',
          'max-length': 10,
          'show-word-limit': true
        }
      },
      {
        type: 'radio',
        label: '单选框',
        default: '',
        is_group: true,
        options: [
          {
            label: 1,
            value: '鱼'
          },
          {
            label: 2,
            value: '鲨鱼'
          }
        ]
      },
      {
        type: 'select',
        label: '下拉',
        default: '',
        is_group: true,
        options: [
          {
            label: 1,
            value: '鱼'
          },
          {
            label: 2,
            value: '鲨鱼'
          }
        ]
      },
      {
        type: 'time-select',
        label: '日期',
        default: '',
        other_info: {
          // placeholder: '哈哈哈',
          'picker-options': {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        }
      }
    ]
  }

  run() {
    console.log('我在运行')
  }
  stop() {
    console.log('我停止啦')
  }
  private created() {
    this.time_out = window.setInterval(() => {
      this.time = new Date()
    }, 1000)
  }
  private destroyed() {
    window.clearInterval(this.time_out)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url('../assets/kurumi/block-bride.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
