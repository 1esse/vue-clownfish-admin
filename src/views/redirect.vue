<script lang="ts">
export default defineComponent({
  setup() {
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = router.currentRoute.value

      router.replace({ path: '/' + (params.path || 'dashboard'), query })
    })
    return () => h('span')
  }
})
</script>
