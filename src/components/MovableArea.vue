<script lang="ts" setup>
import { onMounted, ref } from 'vue'

export type DragDoneType = { dragIndex: number | null, dropIndex: number | null }

const emit = defineEmits<{
  (e: 'dragDone', value: DragDoneType): void
}>()

const areaDom = ref<HTMLElement | null>(null)
let dragIndex: number | null = null
let dropIndex: number | null = null

onMounted(() => {
  if (areaDom.value === null) return
  const collection = areaDom.value.children
  for (const [key, item] of Object.entries(collection)) {
    item.setAttribute('draggable', 'true')
    item.setAttribute('moveidx', key)
    item.addEventListener('dragstart', (e) => onDragStart(e as DragEvent))
    item.addEventListener('dragover', (e) => onDragOver(e as DragEvent))
    item.addEventListener('drop', (e) => onDrop(e as DragEvent))
    item.addEventListener('dragend', (e) => onDragEnd(e as DragEvent))
  }
})

function onDragStart(e: DragEvent) {
  const moveidx = (e.target as Element).getAttribute('moveidx')
  if (!moveidx) return
  dragIndex = parseInt(moveidx)
}
function onDragOver(e: DragEvent) {
  e.preventDefault()
}
function onDrop(e: DragEvent) {
  const target = getDropTarget(e.target as Element)
  const moveidx = target?.getAttribute('moveidx')
  if (!moveidx) return
  dropIndex = parseInt(moveidx)
  emit('dragDone', { dragIndex, dropIndex })
}
function onDragEnd(e: DragEvent) {
  dragIndex = null
  dropIndex = null
}
function getDropTarget(target: Element | null): Element | null {
  if (!target) return null
  if (target.getAttribute('moveidx') === null && target.parentElement) {
    return getDropTarget(target.parentElement)
  }
  return target
}
</script>
<template>
  <div ref="areaDom" class="movable-area">
    <slot></slot>
  </div>
</template>
<style scoped>
</style>