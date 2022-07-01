import { onBeforeUnmount, onMounted, ref } from "vue"
import { debounce } from 'lodash'

export default function (target: string) {
  const tableHeight = ref<number>(500)
  onMounted(() => {
    // 等待动画过渡结束
    setTimeout(() => {
      calHeight()
    }, 350)
    window.addEventListener('resize', debounce(calHeight, 350))
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', calHeight)
  })
  function calHeight() {
    const _target = document.querySelector(target)
    const boundingRect = _target?.getBoundingClientRect()
    if (boundingRect && boundingRect.height) {
      tableHeight.value = boundingRect.height
    }
  }
  return tableHeight
}