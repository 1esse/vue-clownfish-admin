<script setup lang="ts">

const props = withDefaults(defineProps<{
  color?: string
  contentCenter?: boolean
}>(), {
  color: 'rgba(0, 0, 0, 0.65)',
  contentCenter: false
})

const emit = defineEmits<{
  (e: 'shadowClick'): void
}>()
</script>
<template>
  <div class="shadow-wrapper">
    <div :class="['shadow-content-wrapper', contentCenter && 'flex-center']" @click.self="emit('shadowClick')">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.shadow-wrapper {
  width: 150vw;
  height: 150vh;
  position: fixed;
  top: -25vh;
  left: -25vw;
  z-index: 999;
  padding: 25vh 25vw;
  background-color: v-bind('props.color');
}

.shadow-content-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>