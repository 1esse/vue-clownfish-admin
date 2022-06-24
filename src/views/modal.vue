<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import { reactive } from 'vue'
const dialogs = reactive({
  dialog1: {
    show: false,
    loading: false,
    timeout: <NodeJS.Timeout | null>null,
    transition: <transitionType>'slide-down'
  }
})

function showDialog(transition: transitionType) {
  dialogs.dialog1.timeout && clearTimeout(dialogs.dialog1.timeout)
  dialogs.dialog1.loading = true
  dialogs.dialog1.transition = transition
  dialogs.dialog1.show = true
  dialogs.dialog1.timeout = setTimeout(() => {
    dialogs.dialog1.loading = false
  }, 2000)
}
</script>

<template>
  <div>
    <Dialog v-model:show="dialogs.dialog1.show" :loading="dialogs.dialog1.loading"
      :transition="dialogs.dialog1.transition">
      <template #modalHeader>
        <div style="height: 3rem; background-color: aquamarine;">模态框头部</div>
      </template>
      <div style="width: 100%; height: 50rem;  background-color: lightblue;">
        模态框内容
      </div>
      <template #modalFooter>
        <div style="height: 3rem; background-color: bisque;">模态框底部</div>
      </template>
    </Dialog>
    <AButton @click="showDialog('fade')">fade模态框</AButton>
    <AButton @click="showDialog('fade-scale')">fade-scale模态框</AButton>
    <AButton @click="showDialog('slide-up')">slide-up模态框</AButton>
    <AButton @click="showDialog('slide-down')">slide-down模态框</AButton>
    <AButton @click="showDialog('slide-left')">slide-left模态框</AButton>
    <AButton @click="showDialog('slide-right')">slide-right模态框</AButton>
  </div>
</template>

<style>
</style>