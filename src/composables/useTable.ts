import { TableColumnsType, TablePaginationConfig } from "ant-design-vue"
import { cloneDeep } from "lodash"
import { ComponentPublicInstance, Ref } from "vue"

function tableColumns(columns: TableColumnsType) {
  for (const column of columns) {
    if (column.resizable === undefined && column.width && !isNaN(column.width as number)) {
      column.resizable = true
    }
  }
  const originColumns = cloneDeep(columns)
  const _columns = reactive(columns)
  return [_columns, originColumns]
}

function tablePagination(pagination?: TablePaginationConfig, changeCb?: Function) {
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


export default function ({ table, columns, pagination, updateTableOptions }:
  {
    table: Ref<ComponentPublicInstance<any>>, columns: TableColumnsType, pagination?: TablePaginationConfig,
    updateTableOptions: { fetchUrl: string }
  }) {
  const tableLoading = ref(false)
  const _dataSource = shallowRef<any[]>([])
  const [_columns, _originColumns] = tableColumns(columns)
  const _pagination = tablePagination(pagination, updateTable)
  /** 表格选中项 */
  const selectedRowKeys = ref<any[]>([])

  return {
    selectedRowKeys,
    tableLoading,
    dataSource: _dataSource,
    columns: _columns,
    originColumns: _originColumns,
    pagination: _pagination,
    updateTable,
    onTableRowSelectChange,
    toggleAll,
    tableResize
  }

  function updateTable({ fetchUrl }: { fetchUrl?: string } = {}) {
    if (!fetchUrl) fetchUrl = updateTableOptions.fetchUrl
    if (!fetchUrl) return console.warn('表格更新失败，请检查参数{fetchUrl}')
    selectedRowKeys.value = []
    tableLoading.value = true
    request.get(fetchUrl, {
      params: {
        page: _pagination.current,
        perPage: _pagination.pageSize
      }
    }).then(res => {
      _dataSource.value = res.data?.data
      _pagination.total = res.data?.total
    }).finally(() => {
      tableLoading.value = false
    })
  }

  function onTableRowSelectChange(keys: any[]) {
    selectedRowKeys.value = keys
  }

  function toggleAll(flag: boolean | null = null) {
    if (!_dataSource.value) return
    if ((flag !== null && flag) || (flag === null && selectedRowKeys.value.length < _dataSource.value.length)) {
      selectedRowKeys.value = _dataSource.value.map(row => row.id)
    } else {
      selectedRowKeys.value = []
    }
  }

  function tableResize(w: number, col: { width: number }) {
    col.width = w
  }
}