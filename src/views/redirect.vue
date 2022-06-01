<script lang="ts">
import { defineComponent, h, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

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
