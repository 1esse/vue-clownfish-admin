<script lang="ts">
import Icon from "@ant-design/icons-vue"

export default defineComponent({
  props: {
    iconName: { type: String, default: '' },
    className: { type: String, default: '' },
    width: { type: String, default: '1em' },
    height: { type: String, default: '1em' },
    fill: { type: String, default: 'currentColor' },
  },
  render() {
    // 这里不能用jsx，Icon接收的component不会被再编译
    const svg = () => h('svg', {
      class: this.className,
      width: this.width,
      height: this.height,
      fill: this.fill,
    }, {
      default: () => [
        h('use', { 'xlink:href': `#svg-${this.iconName}` })
      ]
    })
    return h(Icon, { component: svg })
  }
})
</script>