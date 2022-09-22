<script setup lang="ts">
import { message, Modal } from 'ant-design-vue'
import { h, reactive } from 'vue'

const visibles = reactive({
  dialog1: false,
  dialog2: false
})
const loading = reactive({
  dialog1: false
})
const loadingText = reactive({
  dialog1: ''
})
const state = reactive({
  height: '',
  plus1: 0,
  plus2: 0,
  minus1: 0,
  minus2: 0,
  accMul1: 0,
  accMul2: 0,
  accDiv1: 0,
  accDiv2: 1
})

function calcHeight() {
  if (!state.height) return message.warn('请输入您的身高')
  loading.dialog1 = true
  loadingText.dialog1 = '正在努力计算中，请稍等...'
  setTimeout(() => {
    loading.dialog1 = false
    visibles.dialog1 = false
    message.success(`经过大量复杂的计算，已确定您的身高是${state.height}cm!`, 5)
  }, 2000)
}

function deviceTest() {
  Modal.success({
    title: '诊断结果',
    content: h('div', {}, [
      h('p', '经诊断，您的设备可正常开机！'),
    ]),
  })
}
</script>

<template>
  <div
    style="width: 100%; height: 100%; padding: 1rem; display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <p style="font-size: 1.2rem; color: #333">首页打算摆烂，其他有功能性的bug欢迎提issue</p>
    <p style="font-size: 1.5rem; color: #999">祝你，生活愉快 :)</p>
  </div>
</template>

<style>

</style>