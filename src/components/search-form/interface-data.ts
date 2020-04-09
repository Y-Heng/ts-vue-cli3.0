export interface DiyForm {
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
  other_info?: any // 其他信息
  options?: Option[]
}

interface Option {
  label: any
  value: any
  other_info?: any
}

interface OtherInfo {
  type?: any
  placeholder: string
}

type search_type = 'radio' | 'checkbox' | 'input' | 'input-number' | 'select' | 'switch' | 'slider' | 'time-select' | 'date-picker' | 'rate'
type size = 'medium' | 'small' | 'mini'
