<script lang="ts" setup>
import loadingGif from '@/assets/loading.gif'
</script>

<template>
  <div class="loading-wrapper">
    <img class="loading-gif" :src="loadingGif" alt="加载中...">
  </div>
</template>

<style scoped>
.loading-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.loading-gif {
  width: 15rem;
  height: auto;
  object-fit: contain;
}
</style>