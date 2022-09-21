<script lang="ts" setup>
import loadingGif from '@/assets/loading.gif'
const props = withDefaults(defineProps<{
  text?: string
  width?: string,
  background?: string
}>(), {
  text: '',
  width: '10rem',
  background: '#fff'
})
</script>
  
<template>
  <div class="loading-wrapper">
    <img class="loading-gif" :src="loadingGif" alt="加载中...">
    <span v-if="props.text">{{ props.text }}</span>
  </div>
</template>
  
<style scoped>
.loading-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: .9rem;
  color: #666;
  position: absolute;
  top: 0;
  left: 0;
  background: v-bind('props.background');
  z-index: 9999;
}

.loading-gif {
  width: v-bind('props.width');
  height: auto;
  object-fit: contain;
}
</style>