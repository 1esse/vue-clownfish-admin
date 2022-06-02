<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('普通页挂载!!!')
})

</script>

<template>
  <div>
    <div class="block shadow" style="width: 500px; height: 300px">普通页面不会被缓存，每次进来都会重新挂载</div>
  </div>
</template>
