
<script setup lang="ts">
import Keyboard from './components/Keyboard.vue'
</script>
  
<template>
  <main class="main">
    <Keyboard style="width: 100%; height: 100%;" />
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