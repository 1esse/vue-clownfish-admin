<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue'
import isMobile from '@/composables/isMobile'
import { transitions } from '@/appConfig'
import { useSlots, watch } from 'vue'

const props = withDefaults(defineProps<{
  show: boolean
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  loading?: boolean
  preventShadowEvent?: boolean
  showClose?: boolean
  destroyOnClose?: boolean
  loadingText?: string
  transition?: transitions
  onClose?: Function
}>(), {
  width: '40rem',
  height: 'auto',
  maxWidth: '90vw',
  maxHeight: 'unset',
  loading: false,
  preventShadowEvent: true,
  showClose: true,
  destroyOnClose: false,
  loadingText: '',
  transition: transitions.slideDown
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const _isMobile = isMobile()

watch(() => props.show, (val) => {
  // 监听show=false
  if (!val) {
    props.onClose?.()
  }
})

function shadowClick() {
  // 如果显示关闭按钮（手机端会自动隐藏关闭按钮，关闭权流转到点击阴影）
  if (props.showClose) {
    // 且不是在手机端，则把关闭权交给关闭按钮
    if (!_isMobile.value && props.preventShadowEvent) return
  }
  closeDialog()
}

function closeDialog() {
  emit('update:show', false)
}
</script>
<template>
  <Teleport to="body">
    <Transition :name="props.transition" mode="out-in" appear>
      <template v-if="props.destroyOnClose">
        <Shadow v-if="props.show" @shadowClick="shadowClick">
          <div class="dialog-wrapper"
            :style="{ position: 'relative', maxHeight: _isMobile ? '80vh' : props.maxHeight }">
            <div class="block dialog"
              :style="{ padding: 0, width: props.loading ? '30rem' : props.width, height: props.loading ? '20rem' : props.height, maxWidth: props.maxWidth, maxHeight: _isMobile ? '80vh' : 'unset', overflow: _isMobile ? 'auto' : 'unset' }">
              <Loading v-if="props.loading" :text="props.loadingText"></Loading>
              <template v-else>
                <header v-if="!!useSlots().dialogHeader" class="dialog-header">
                  <slot name="dialogHeader"></slot>
                </header>
                <main class="dialog-main">
                  <slot></slot>
                </main>
                <footer v-if="!!useSlots().dialogFooter" class="dialog-footer">
                  <slot name="dialogFooter"></slot>
                </footer>
              </template>
            </div>
            <CloseOutlined v-if="!_isMobile && props.showClose" class="icon-close" @click="closeDialog" />
          </div>
        </Shadow>
      </template>
      <template v-else>
        <Shadow v-show="props.show" @shadowClick="shadowClick">
          <div class="dialog-wrapper"
            :style="{ position: 'relative', maxHeight: _isMobile ? '80vh' : props.maxHeight }">
            <div class="block dialog"
              :style="{ padding: 0, width: props.loading ? '30rem' : props.width, height: props.loading ? '20rem' : props.height, maxWidth: props.maxWidth, maxHeight: _isMobile ? '80vh' : 'unset', overflow: _isMobile ? 'auto' : 'unset' }">
              <Loading v-if="props.loading" :text="props.loadingText"></Loading>
              <template v-else>
                <header v-if="!!useSlots().dialogHeader" class="dialog-header">
                  <slot name="dialogHeader"></slot>
                </header>
                <main class="dialog-main">
                  <slot></slot>
                </main>
                <footer v-if="!!useSlots().dialogFooter" class="dialog-footer">
                  <slot name="dialogFooter"></slot>
                </footer>
              </template>
            </div>
            <CloseOutlined v-if="!_isMobile && props.showClose" class="icon-close" @click="closeDialog" />
          </div>
        </Shadow>
      </template>
    </Transition>
  </Teleport>
</template>
<style scoped>
.dialog-wrapper {
  margin: 0 auto;
}

.dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  transition: ease .2s;
  transition-property: width, height;
}

.dialog-header,
.dialog-footer {
  padding: 0 1rem;
  min-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header {
  font-size: 1rem;
  border-bottom: 5px solid var(--light-gray);
}

.dialog-footer {
  border-top: 5px solid var(--light-gray);
}

.dialog-main {
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  padding: 1rem;
}

.icon-close {
  position: absolute;
  top: .3rem;
  right: -2rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
}
</style>