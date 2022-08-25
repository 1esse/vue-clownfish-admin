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
  speed?: number
  minHeight?: string | number
}>(), {
  width: '100%',
  height: '100%',
  tag: 'div',
  direction: 'vertical',
  initOptions: undefined,
  speed: 1,
  minHeight: 'unset'
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

defineExpose({
  scrollbar: scrollbar
})

function listenWheel() {
  scrollbarDom.value.addEventListener('wheel', (e) => onWheel(e as WheelEvent))
}

function onWheel(e: WheelEvent): void {
  const viewport = scrollbar.value?.getElements().viewport
  const states = scrollbar.value?.getState()

  if (
    (states?.hasOverflow.x && props.direction === 'horizontal') ||
    (states?.hasOverflow.y && props.direction === 'vertical')
  ) {
    // 阻止浏览器默认滚动行为
    e.preventDefault()
  }

  const scrollOffset = (viewport && (
    props.direction === 'horizontal' ? viewport.scrollLeft : viewport.scrollTop) || 0) + ((e.deltaY || 0) / 4 * props.speed)
  scrollbar.value?.scroll({
    x: props.direction === 'horizontal' ? scrollOffset : 0,
    y: props.direction === 'vertical' ? scrollOffset : 0
  }, 30)
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
    :style="{ width: props.width, height: props.height, minHeight: props.minHeight }">
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