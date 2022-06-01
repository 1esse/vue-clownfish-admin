<script setup lang="ts">
import { userStore } from '@/stores/user'
import { onMounted } from 'vue'

const user = userStore()
onMounted(() => {
  console.log('普通页挂载!!!')
})

</script>

<template>
  <div>
    <div class="block shadow" style="width: 500px; height: 300px">{{ user.name + user.age + '岁' }}</div>
  </div>
</template>
