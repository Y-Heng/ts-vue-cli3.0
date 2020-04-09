import Vue, { VNode } from 'vue'
import * as _lodash from 'lodash'
import _moment from 'moment'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  const lodash: typeof _lodash

  const moment: typeof _moment

  interface DiyForm {
    title?: string
    size?: size
    is_block?: boolean // 是否块状
    label_width?: string
    items: FormItem[]
  }

  interface FormItem {
    type: search_type // 表单类型
    label: string // 表单名称
    default: any // 默认值
    changeCallback?: any // 回调
    is_group?: boolean // 是否为为组
    text?: string // 文本
    other_info?: OtherInfo // 其他信息
    options?: Option[]
  }

  interface Option {
    label: any
    value: any
    other_info?: OtherInfo
  }
  interface OtherInfo {
    type?: string
    placeholder?: string
    [propName: string]: any
  }

  type search_type = 'radio' | 'checkbox' | 'input' | 'input-number' | 'select' | 'switch' | 'slider' | 'time-select' | 'date-picker' | 'rate'
  type size = 'medium' | 'small' | 'mini'
}
