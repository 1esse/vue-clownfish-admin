
<script setup lang="ts">
import Earth from './components/Earth.vue'
</script>
      
<template>
  <main class="main">
    <Earth style="width: 100%; height: 100%;" />
  </main>
</template>
    
<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>