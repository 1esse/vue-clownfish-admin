<script lang="ts" setup>
const tableRef = ref()
const {
  dataSource, columns, originColumns, tableLoading, pagination, selectedRowKeys,
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

function onExportTable() {
  const columnData = originColumns.map(column => column.title)
  const sheetData = (dataSource.value as any[]).map(data => {
    return columns.map(columnConfig => {
      return columnConfig.customRender ?
        columnConfig.customRender({ text: data[columnConfig.key as string] } as any) :
        data[columnConfig.key as string]
    })
  })
  exportSheetFile([columnData as any[], ...(sheetData as any[][])], '表格数据')
}
</script>
<template>
  <main>
    <AButton style="margin-bottom: 1rem;" @click="onExportTable">导出表格</AButton>
    <ATable ref="tableRef" class="table" rowKey="key" :dataSource="dataSource" :columns="columns"
      :pagination="pagination" :loading="tableLoading" bordered @resizeColumn="tableResize"
      :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }"></ATable>
  </main>
</template>