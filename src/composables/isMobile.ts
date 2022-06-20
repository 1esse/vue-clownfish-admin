import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue"

export default function () {
  const WIDTH = 992
  const isMobile = ref(false)
  onBeforeMount(() => {
    window.addEventListener('resize', checkIsMobile)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
  onMounted(() => {
    checkIsMobile()
  })
  function checkIsMobile() {
    const rect = document.body.getBoundingClientRect()
    isMobile.value = rect.width < WIDTH
  }
  return isMobile
}