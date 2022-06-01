<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'Test1',
  mounted() {
    console.log('缓存页挂载!!!')
  },
  setup() {

  }
})
</script>

<template>
  <div>
    <div class="block shadow">test1</div>
  </div>
</template>
