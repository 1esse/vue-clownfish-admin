<script lang="ts" setup>
import { requestGet } from '@/composables/useRequest'
import { tableHeight, tableDataSource, tableColumns, tablePagination } from '@/composables/getTable'
import { onBeforeMount, reactive, watch } from 'vue'

// 页面加载集中放置处
const loading = reactive({
  table: false
})
// 表格数据
const dataSource = tableDataSource()
// 初始化表格属性
const columns = tableColumns([
  { title: 'id', dataIndex: 'key', key: 'key' },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }
])
// 表格分页信息
const pagination = tablePagination({}, updateTable)

// 表格容器高度
const tableWrapperHeight = tableHeight('.table')

onBeforeMount(() => {
  updateTable()
})

function updateTable() {
  loading.table = true
  // 获取表格数据
  const data = requestGet<{ data: any[], total: number }>(`/table/list?page=${pagination.current}&perPage=${pagination.pageSize}`)
  // 只监听一次，在取到值之后移除监听器
  const stopWatch = watch(data, (val) => {
    stopWatch()
    loading.table = false
    if (val === 'fail') return
    dataSource.value = val?.data
    pagination.total = val?.total
  })
}
</script>
<template>
  <main>
    <header class="block shadow">头部</header>
    <ATable class="table shadow" :dataSource="dataSource" :columns="columns" :pagination="pagination"
      :loading="loading.table" bordered :scroll="{ scrollToFirstRowOnChange: true, y: tableWrapperHeight - 88 }"
      size="small" />
    <footer class="block shadow">脚部</footer>
  </main>
</template>
<style lang="postcss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 1rem;
}

footer {
  margin-top: 1rem;
}

.table {
  width: 100%;
  height: 100px;
  flex: 1;
}
</style>