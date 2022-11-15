export default function (cb?: Function) {
  const WIDTH = 992
  const isMobile = ref(false)
  let isChanged = false
  onBeforeMount(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  })
  onScopeDispose(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
  function checkIsMobile() {
    const rect = document.body.getBoundingClientRect()
    isMobile.value = rect.width < WIDTH
    if (isChanged !== isMobile.value) {
      cb && cb()
      isChanged = isMobile.value
    }
  }
  return isMobile
}