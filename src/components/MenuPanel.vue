<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

const show = ref(false)
const position = reactive({ x: 0, y: 0 })
const context = ref<unknown>(null)

watch(() => show.value, (val) => {
  if (val) {
    document.addEventListener('click', hidePanel)
  } else {
    document.removeEventListener('click', hidePanel)
  }
})

defineExpose<ComponentsExpose.MenuPanel>({
  setPosition,
  showPanel,
  hidePanel,
  setContext,
  getContext
})

function getContext(): any {
  return context.value
}

function setContext(ctx: unknown) {
  context.value = ctx
}

function setPosition(x: number, y: number) {
  position.x = x
  position.y = y
}

function showPanel() {
  show.value = true
}

function hidePanel() {
  show.value = false
}
</script>

<template>
  <Teleport to="body">
    <nav v-if="show" class="block shadow-sm border menu-panel"
      :style="{ left: position.x + 'px', top: position.y + 'px' }">
      <slot />
    </nav>
  </Teleport>
</template>

<style scoped lang="postcss">
.menu-panel {
  min-width: 8rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 0.3rem;
  padding: .7rem;
}

:global(.menu-panel>*) {
  width: 100%;
  height: 2rem;
  font-size: .8rem;
  padding: 0;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
}
</style>