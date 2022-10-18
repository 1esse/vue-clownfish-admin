<script lang="ts" setup>
const tableRef = ref()
const {
  dataSource, columns, tableLoading, pagination, selectedRowKeys,
  updateTable, onTableRowSelectChange, tableResize
} = useTable({
  table: tableRef,
  columns: [
    { title: 'id', dataIndex: 'key', key: 'key', width: 50 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 100 },
    { title: '地址', dataIndex: 'address', key: 'address', width: 400 },
  ],
  updateTableOptions: {
    fetchUrl: '/table/list'
  }
})

onBeforeMount(() => {
  updateTable()
})
</script>

<template>
  <main>
    <ATable ref="tableRef" class="table" rowKey="key" :dataSource="dataSource" :columns="columns"
      :pagination="pagination" :loading="tableLoading" bordered @resizeColumn="tableResize"
      :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }"></ATable>
  </main>
</template>