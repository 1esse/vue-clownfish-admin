import { ComponentPublicInstance, onBeforeUnmount, onMounted, reactive, Ref, ref, shallowRef } from "vue"
import { TableColumnsType, TablePaginationConfig } from "ant-design-vue"

export function tableDataSource(dataSource?: any[]) {
  const _dataSource = shallowRef(dataSource)
  return _dataSource
}

export function tableColumns(columns: TableColumnsType) {
  const _columns = reactive(columns)
  return _columns
}

export function tablePagination(pagination: TablePaginationConfig, changeCb?: Function) {
  const orz: TablePaginationConfig = {
    current: 1,
    pageSize: 20,
    pageSizeOptions: ['20', '50', '100', '200'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `当前显示第${range[0]}-${range[1]}条，共${total}条`,
    onChange(page, pageSize) {
      this.current = page
      this.pageSize = pageSize
      changeCb && changeCb()
    }
  }
  const _pagination = reactive(Object.assign(orz, pagination))
  return _pagination
}

export function tableHeight(target?: Ref<ComponentPublicInstance<any>>) {
  const height = ref<number>(350)
  onMounted(() => {
    // 等待动画过渡结束
    setTimeout(() => {
      calHeight()
    }, 350)
    window.addEventListener('resize', calHeight)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', calHeight)
  })
  function calHeight() {
    if (!target || !target.value) return
    const table = target?.value.$el as HTMLElement
    if (!table) return
    height.value = table.clientHeight
  }
  return height
}