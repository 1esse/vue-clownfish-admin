export default function (cb?: Function) {
  const WIDTH = 992
  const isMobile = ref(false)
  onBeforeMount(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
  onScopeDispose(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
  function checkIsMobile() {
    const rect = document.body.getBoundingClientRect()
    isMobile.value = rect.width < WIDTH
    if (isMobile.value) {
      cb && cb()
    }
  }
  return isMobile
}