<template>
  <div class="date-speed">
    <box-search label="时间类型">
      <el-radio-group v-model="show_time_type" class="stretch-group—radio">
        <el-radio-button :label="1">小时</el-radio-button>
        <el-radio-button :label="0">日均</el-radio-button>
      </el-radio-group>
    </box-search>
    <div class="date-range">
      <div v-for="(item,index) in render_day" :key="index" class="range-day pointer" @click="selDay(item)">
        <div class="day" :class="{'text-color-red':item.is_weekend}">{{item.week}}</div>
        <div class="week" :class="{'text-color-success': isCurrDay(item.date)}">{{item.day}}</div>
      </div>
    </div>
    <el-slider v-if="show_time_type === 1" v-model="curr_slider" :max="23" :marks="marks" :show-tooltip="false" class="no-slider" @change="changeSlider" />
    <div class="control">
      <el-radio-group v-model="speed">
        <el-radio-button v-for="item in speedSetings" :key="item.label" :label="item.label">{{item.name}}</el-radio-button>
      </el-radio-group>
      <div class="control-right">
        <el-button :disabled="!extremum.retreat" type="primary" icon="el-icon-back" circle @click="reduceTime()"></el-button>
        <el-button :disabled="!extremum.advance" type="primary" :icon="is_run?'el-icon-video-pause':'el-icon-video-play'" circle @click="play()"></el-button>
        <el-button :disabled="!extremum.advance" type="primary" icon="el-icon-right" circle @click="addTime(true)"></el-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import BoxSearch from '@/components/box-search/index.vue'
import { handTimeType } from '@/utils/enum'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: { BoxSearch }
})
export default class DateSpeed extends Vue {
  @Prop() readonly value!: Date | string // 当前时间
  @Prop() readonly startDate!: Date | string // 开始时间
  @Prop() readonly endDate!: Date | string // 结束时间
  @Prop({ default: handTimeType.hour }) readonly showTimeType!: handTimeType // 时间类型
  @Prop({
    default: () => {
      return [
        { name: '快', label: 500 },
        { name: '中', label: 1000 },
        { name: '慢', label: 1500 }
      ]
    }
  })
  readonly speedSetings!: any[] // 速率配置选项

  // 判读两端极值 实现播放按钮是否能用
  get extremum() {
    const flags = {
      advance: true, // 前进
      retreat: true // 后退
    }
    const key = handTimeType[this.show_time_type] // 日期key
    if (key === 'day' || key === 'hour' || key === 'minute') {
      if (moment(this.curr_time).isSame(this.endDate, key) || moment(this.endDate).isBefore(this.curr_time, key)) {
        flags.advance = false
      }
      if (moment(this.curr_time).isSame(this.startDate, key) || moment(this.curr_time).isBefore(this.startDate, key)) {
        flags.retreat = false
      }
    }
    return flags
  }

  speed: number = 1000 // 速率
  curr_slider: number = 0 // 当前进度条位置
  curr_time: Date | string = new Date() // 当前显示时间
  marks: any = {} // 进度条标记
  render_day: any[] = [] // 渲染日期
  is_run: boolean = false // 是否运作中
  time_interval: any = null // 记时器
  show_time_type: handTimeType = handTimeType.day // 时间类型

  // 增加时间
  addTime(stop: boolean) {
    let change_time: Date | string = ''

    const key = handTimeType[this.show_time_type] // 日期key
    if (key === 'day' || key === 'hour' || key === 'minute') {
      change_time = this.fmCurrTime(moment(this.curr_time).add(1, key))
    }
    if (moment(change_time).isBefore(this.endDate) || moment(change_time).isSame(this.endDate)) {
      if (stop) {
        this.is_run = false
      }
      this.curr_time = change_time
    } else {
      this.is_run = false
    }
  }
  // 减少时间
  reduceTime() {
    let change_time: Date | string = ''
    const key = handTimeType[this.show_time_type] // 日期key
    if (key === 'day' || key === 'hour' || key === 'minute') {
      change_time = this.fmCurrTime(moment(this.curr_time).subtract(1, key))
    }
    if (!moment(change_time).isBefore(this.startDate)) {
      this.curr_time = change_time
    }
    this.is_run = false
  }
  // 播放控制
  play() {
    this.is_run = !this.is_run
  }
  // 选中某天
  selDay(item: any) {
    this.curr_time = moment(item.date).format('YYYY-MM-DD 00:00:00')
    this.is_run = false
  }
  // 拖动进度条
  changeSlider(val: number) {
    this.is_run = false
    const hour = val < 10 ? '0' + val.toString() : val.toString()
    this.curr_time = moment(this.curr_time).format('YYYY-MM-DD ' + hour + ':00:00')
  }
  // 判断是否为当前时间
  isCurrDay(day: any) {
    return moment(this.curr_time).isSame(moment(day), 'day')
  }
  // 获取进度条标记
  getMaks() {
    const show_num = [0, 6, 18, 23]
    for (let i = 0; i < 24; i++) {
      this.marks[i] = '｜'
      if (show_num.indexOf(i) > -1) {
        this.marks[i] = i.toString()
      } else {
        this.marks[i] = {
          style: {
            height: '5px',
            background: '#909399',
            width: '1px'
          }
        }
      }
    }
  }
  // 获取开始结束日期
  setIntiDate() {
    this.render_day = []
    const diff = Math.abs(moment(this.startDate).diff(moment(this.endDate), 'day')) + 1
    const weeks = ['一', '二', '三', '四', '五', '六', '日']
    for (let i = 0; i < diff; i++) {
      const date = moment(this.startDate).add(i, 'days')
      const week = Number(moment(date).format('e'))
      this.render_day.push({
        date,
        day: moment(date).format('DD'),
        is_weekend: week === 5 || week === 6,
        week: weeks[week]
      })
    }
    this.curr_time = this.fmCurrTime(this.value)
  }
  // 格式化成规矩时间
  fmCurrTime(time: any) {
    let curr_time = ''
    switch (handTimeType[this.show_time_type]) {
      case 'day':
        curr_time = moment(time).format('YYYY-MM-DD 00:00:00')
        break
      case 'hour':
        curr_time = moment(time).format('YYYY-MM-DD HH:00:00')
        break
      case 'minute':
        curr_time = moment(time).format('YYYY-MM-DD HH:mm:00')
        break
    }
    return curr_time
  }

  @Watch('is_run', { immediate: true })
  changeIsRun(val: any) {
    if (val) {
      this.time_interval = window.setInterval(() => {
        this.addTime(false)
      }, this.speed)
      this.$emit('run')
    } else {
      this.$emit('stop')
      window.clearInterval(this.time_interval)
    }
  }
  @Watch('curr_time', { immediate: true })
  changeCurrTime(val: any) {
    if (val) {
      this.curr_slider = Number(moment(val).format('HH'))
      this.$emit('input', val)
    }
  }

  private created() {
    this.setIntiDate()
    this.getMaks()
    this.show_time_type = this.showTimeType || handTimeType.day
  }

  private destroyed() {
    window.clearInterval(this.time_interval)
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
@import '@/styles/variables.scss';
.date-speed {
  width: 300px;
  $--border-text: #ddd;
  .date-range {
    display: flex;
    border: 1px solid $--border-text;
    border-right: none;
    .range-day {
      flex: 1;
      text-align: center;
      border-right: 1px solid $--border-text;
      .week {
        border-top: 1px solid $--border-text;
      }
    }
  }
  .no-slider /deep/ {
    .el-slider__stop {
      display: none;
    }
  }
  .control {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
    .control-right {
      padding-right: 5px;
      font-size: 23px;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>