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
  <div style="padding: 1rem;">
    <ARow :gutter="16">
      <ACol :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <ACard title="身高计算器" :bordered="false">
          <ACardMeta description="AI通过一系列复杂公式，智能、准确地推算出您的身高" />
          <AButton style="margin-top: 1rem" @click="state.height = ''; visibles.dialog1 = true" type="primary">开始计算
          </AButton>
        </ACard>
      </ACol>
      <ACol :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <ACard title="设备诊断器" :bordered="false">
          <ACardMeta description="此程序可以诊断您的设备是否可以正常开机" />
          <AButton style="margin-top: 1rem" @click="deviceTest" type="primary">开始诊断</AButton>
        </ACard>
      </ACol>
    </ARow>
    <Dialog v-model:show="visibles.dialog1" :loading="loading.dialog1" :loadingText="loadingText.dialog1" width="20rem"
      height="12rem">
      <template #dialogHeader>请输入您的身高</template>
      <AInput v-model:value="state.height">
        <template #suffix>
          cm
        </template>
      </AInput>
      <template #dialogFooter>
        <span></span>
        <AButton type="primary" @click="calcHeight">确定</AButton>
      </template>
    </Dialog>
  </div>
</template>

<style>

</style>