import { onBeforeUnmount, onMounted, reactive, ref, shallowRef } from "vue"
import { debounce } from 'lodash'
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

export function tableHeight(target: string) {
  const height = ref<number>(500)
  onMounted(() => {
    // 等待动画过渡结束
    setTimeout(() => {
      calHeight()
    }, 350)
    window.addEventListener('resize', debounce(calHeight, 350))
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', calHeight)
  })
  function calHeight() {
    const _target = document.querySelector(target)
    const boundingRect = _target?.getBoundingClientRect()
    if (boundingRect && boundingRect.height) {
      height.value = boundingRect.height
    }
  }
  return height
}