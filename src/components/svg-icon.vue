<template>
  <svg :class="svg_class" aria-hidden="true">
    <use :xlink:href="icon_name"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SvgIcon extends Vue {
  @Prop({ type: String, required: true }) IconClass: any
  @Prop(String) ClassName?: string

  get icon_name(): string {
    return `#icon-${this.IconClass}`
  }
  get svg_class(): string {
    if (this.ClassName) {
      return 'svg-icon ' + this.ClassName
    } else {
      return 'svg-icon'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
