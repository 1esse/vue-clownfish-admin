<script lang="ts" setup>
import type { TablePaginationConfig } from 'ant-design-vue'
import { requestGet } from '@/composables/useRequest'
import { onBeforeMount, ref, shallowRef, reactive, watch } from 'vue'

// 页面加载集中放置处
const loading = reactive({
    table: false
})

const dataSource = shallowRef<any[] | undefined>()

// 初始化表格属性
const columns = ref([
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
    },
])
const pagination = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    pageSizeOptions: ['20', '50', '100', '200'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `当前显示第${range[0]}-${range[1]}条，共${total}条`,
    onChange(page, pageSize) {
        this.current = page
        this.pageSize = pageSize
        updateTable()
    }
})

onBeforeMount(() => {
    updateTable()
})

function updateTable() {
    loading.table = true
    // 获取表格数据
    dataSource.value = []
    const { data } = requestGet(`/table/list?page=${pagination.value.current}&perPage=${pagination.value.pageSize}`)
    const stopWatch = watch(data, (val) => {
        dataSource.value = val.data
        pagination.value.total = val.total
        loading.table = false
        stopWatch()
    })
}
</script>
<template>
    <ATable :dataSource="dataSource" :columns="columns" :pagination="pagination" :loading="loading.table"
        :scroll="{}" />
</template>