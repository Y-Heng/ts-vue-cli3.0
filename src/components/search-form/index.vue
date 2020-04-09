<script lang="js">
export default {
  props: ['form'],
  methods: {
    getAttrs(item) {
      return item.other_info || {}
    }
  },
  data() {
    return {
      cc: [1]
    }
  },
  render(h) {
    const slef = this
    return h(
      'el-form',
      {
        props: {
          inline: !this.form.is_block,
          'label-width': this.form.label_width || '80px'
        }
      },
      this.form.items.map((item, index) => {
        return h(
          'el-form-item',
          {
            props: {
              label: item.label
            }
          },
          this.cc.map(() => {
            if (item.is_group) {
              if (item.type === 'check' || item.type === 'radio') {
                return h(
                  `el-${item.type}-group`,
                  {
                    attrs: this.getAttrs(item),
                    props: {
                      value: item.default
                    },
                    on: {
                      input(val) {
                        item.default = val
                      }
                    }
                  },
                  item.options.map((option) => {
                    return h(
                      `el-${item.type}`,
                      {
                        attrs: {
                          label: option.label
                        }
                      },
                      option.value
                    )
                  })
                )
              } else {
                return h(
                  `el-${item.type}`,
                  {
                    attrs: this.getAttrs(item),
                    props: {
                      value: item.default
                    },
                    on: {
                      input(event) {
                        item.default = event
                      }
                    }
                  },
                  item.options.map((option) => {
                    return h(`el-${item.type === 'select' ? 'option' : item.type}`, {
                      attrs: {
                        label: option.value,
                        value: option.label
                      }
                    })
                  })
                )
              }
            } else {
              return h(`el-${item.type}`, {
                attrs: this.getAttrs(item),
                props: {
                  value: item.default
                },
                on: {
                  input(event) {
                    item.default = event
                  }
                }
              })
            }
          })
        )
      })
    )
  }
}
</script>