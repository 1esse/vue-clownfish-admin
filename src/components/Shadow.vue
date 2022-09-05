<script setup lang="ts">

const props = withDefaults(defineProps<{
  color?: string
  contentCenter?: boolean
  gapTop?: string
  gapBottom?: string
}>(), {
  color: 'rgba(0, 0, 0, 0.45)',
  contentCenter: false,
  gapTop: '5rem',
  gapBottom: '5rem',
})

const emit = defineEmits<{
  (e: 'shadowClick'): void
}>()
</script>
<template>
  <div class="shadow-wrapper">
    <div :class="['shadow-content-wrapper', contentCenter && 'flex-center']" @click.self="emit('shadowClick')">
      <div class="blank-top" @click.self="emit('shadowClick')"></div>
      <slot></slot>
      <div class="blank-bottom" @click.self="emit('shadowClick')"></div>
    </div>
  </div>
</template>

<style scoped>
.shadow-wrapper {
  width: 150vw;
  height: 150vh;
  position: fixed;
  top: -25vh;
  left: -25vw;
  z-index: 999;
  padding: 25vh 25vw;
  background-color: v-bind('props.color');
  overflow: hidden;
}

.shadow-content-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  overflow: auto;
  flex-direction: column;
}

.blank-top {
  width: 100%;
  height: v-bind('props.gapTop');
  min-height: v-bind('props.gapTop');
  max-height: v-bind('props.gapTop');
}

.blank-bottom {
  width: 100%;
  height: v-bind('props.gapBottom');
  min-height: v-bind('props.gapBottom');
  max-height: v-bind('props.gapBottom');
}

::-webkit-scrollbar {
  display: none;
}
</style>