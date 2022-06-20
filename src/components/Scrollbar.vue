<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import OverlayScrollbars from 'overlayscrollbars'
import type { Options } from 'overlayscrollbars'

const props = withDefaults(defineProps<{
  width?: string | number
  height?: string | number
  tag?: string
  direction?: 'horizontal' | 'vertical'
  initOptions?: Options,
  flex?: number
}>(), {
  width: '100%',
  height: '100%',
  tag: 'div',
  direction: 'vertical',
  initOptions: undefined,
  flex: 1
})

const scrollbar = ref<OverlayScrollbars>()
const scrollbarDom = ref<Element>(document.createElement(props.tag))

onMounted(() => {
  scrollbar.value = OverlayScrollbars(scrollbarDom.value, Object.assign(getDirectionOptions(), props.initOptions || {}))
  listenWheel()
})

onBeforeUnmount(() => {
  scrollbar.value?.destroy()
})

defineExpose<ComponentsExpose.Scrollbar>({
  scrollbar: scrollbar
})

function listenWheel() {
  scrollbarDom.value.addEventListener('wheel', (e: WheelEventInit): void => {
    const viewport = scrollbar.value?.getElements().viewport
    const scrollOffset = (viewport && (
      props.direction === 'horizontal' ? viewport.scrollLeft : viewport.scrollTop) || 0) + ((e.deltaY || 0) / 4)
    scrollbar.value?.scroll({
      x: props.direction === 'horizontal' ? scrollOffset : 0,
      y: props.direction === 'vertical' ? scrollOffset : 0
    }, 30)
  })
}

function getDirectionOptions(): Options {
  let options: Options = {}
  switch (props.direction) {
    case 'vertical':
      options = {
        scrollbars: { autoHide: 'leave', autoHideDelay: 500 },
        overflowBehavior: { x: 'hidden', y: 'scroll' }
      }
      break
    case 'horizontal':
      options = {
        scrollbars: { autoHide: 'leave', autoHideDelay: 500 },
        overflowBehavior: { x: 'scroll', y: 'hidden' }
      }
      break
  }
  return options
}
</script>

<template>
  <component ref="scrollbarDom" :is="props.tag" :class="['scrollbar', `scrollbar-${props.direction}`]"
    :style="{ width: props.width, height: props.height }">
    <slot />
  </component>
</template>

<style lang="postcss">
.scrollbar {
  & .os-scrollbar-handle {
    background: rgba(0, 0, 0, 0.15) !important;

    &:hover,
    &:active {
      background: rgba(0, 0, 0, 0.3) !important;
    }
  }
}
</style>