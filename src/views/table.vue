<script lang="ts" setup>
import type { TablePaginationConfig } from 'ant-design-vue'
import { requestGet } from '@/composables/useRequest'
import getTableHeight from '@/composables/getTableHeight'
import { onBeforeMount, ref, shallowRef, reactive, watch } from 'vue'

// 页面加载集中放置处
const loading = reactive({
    table: false
})

// 表格数据
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
// 表格分页信息
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

const tableWrapperHeight = getTableHeight('.table')
onBeforeMount(() => {
    updateTable()
})

function updateTable() {
    loading.table = true
    // 获取表格数据
    const { data } = requestGet(`/table/list?page=${pagination.value.current}&perPage=${pagination.value.pageSize}`)
    // 只监听一次，在取到值之后移除监听器
    const stopWatch = watch(data, (val) => {
        dataSource.value = val.data
        pagination.value.total = val.total
        loading.table = false
        stopWatch()
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