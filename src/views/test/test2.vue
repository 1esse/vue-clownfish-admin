<script setup lang="ts">
import { userStore } from '@/stores/user'
import { inject } from 'vue'

const user = userStore()

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')

</script>

<template>
  <div>
    <div class="block shadow" style="width: 500px; height: 300px">{{ sidebarRelated?.collapsed ? '收起' : '展开'
    }}{{ user.name + user.age }}</div>
  </div>
</template>
