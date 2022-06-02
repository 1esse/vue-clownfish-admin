<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'Test1',
  mounted() {
    console.log('缓存页挂载!!!')
  }
})
</script>

<template>
  <div>
    <div class="block shadow">缓存页会被缓存，只挂载一次。但标签页右键菜单里的刷新能对页面进行强制刷新</div>
  </div>
</template>
