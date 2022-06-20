<script setup lang="ts">
import { Color } from 'csstype'

const props = withDefaults(defineProps<{
  color?: Color
}>(), {
  color: 'rgba(0, 0, 0, 0.65)'
})

const emit = defineEmits<{
  (e: 'shadowClick'): void
}>()
</script>
<template>
  <div class="shadow" @click.self="emit('shadowClick')">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.shadow {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: v-bind('props.color');
}
</style>