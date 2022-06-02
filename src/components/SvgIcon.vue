<script lang="tsx">
import Icon from "@ant-design/icons-vue"
import { defineComponent, h } from "vue"

export default defineComponent({
  props: {
    iconName: { type: String, default: '' },
    className: { type: String, default: '' },
    width: { type: String, default: '1em' },
    height: { type: String, default: '1em' },
    fill: { type: String, default: 'currentColor' },
  },
  setup(props) {
    // 这里不能用jsx，Icon接收的component不会被再编译
    const svg = () => h('svg', {
      ...props,
      'class': props.className,
    }, [
      h('use', { 'xlink:href': `#svg-${props.iconName}` })
    ])
    return () => <Icon component={svg} />
  }
})
</script>