<script lang="ts">
import { userStore } from '@/stores/user'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Test3',
  setup() {
    const user = userStore()
    return {
      user
    }
  }
})
</script>

<template>
  <div style="width: 20rem; height: 20rem; background-color: #77c9ad; display: flex; flex-wrap: wrap;">
    <div style="width: 10rem; height: 10rem">
      <RouterView></RouterView>
    </div>
    <div style="width: 10rem; height: 10rem"></div>
    <div style="width: 10rem; height: 10rem"></div>
    <div style="width: 10rem; height: 10rem">
      这里是嵌套页父级容器内容
    </div>
  </div>
</template>

