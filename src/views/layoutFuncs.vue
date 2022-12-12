<script setup lang="ts">
import { CloseTabInject, GetTabsInject, RefreshBreadCrumbInject, SetCurrentTabNameInject } from '@/layout/index.vue'
import { message } from 'ant-design-vue'

const route = useRoute()
const visibles = reactive({
    renameTab: false
})
const closeTab = inject<CloseTabInject>('closeTab')
const setCurrentTabName = inject<SetCurrentTabNameInject>('setCurrentTabName')
const allTabs = inject<GetTabsInject>('getTabs')
const refreshBreadCrumb = inject<RefreshBreadCrumbInject>('refreshBreadCrumb')
const newTabName = ref('')

function renameTab() {
    if (!newTabName.value) return message.warn('请输入标签新名称')
    if (newTabName.value.length > 10) return message.warn('名称过长')
    setCurrentTabName?.(newTabName.value)
    visibles.renameTab = false
}
</script>
<template>
    <main>
        <ASpace>
            <AButton @click="closeTab?.(route)">关闭当前标签页</AButton>
            <AButton @click="visibles.renameTab = true">重命名当前标签页</AButton>
            <AButton @click="refreshBreadCrumb?.()">刷新当前面包屑</AButton>
        </ASpace>
        <div style="margin-top: 1rem;">
            <h3>当前打开的标签页：</h3>
            <ul style="margin-left: 1rem;">
                <li v-for="tab in allTabs?.()">{{ tab.meta.title }}</li>
            </ul>
        </div>
        <Dialog v-model:show="visibles.renameTab" width="30rem" @show="newTabName = route.meta.title || ''">
            <template #dialogHeader>标签重命名</template>
            <AInput v-model:value="newTabName" placeholder="请输入标签新名称"></AInput>
            <template #dialogFooter>
                <span></span>
                <ASpace>
                    <AButton @click="visibles.renameTab = false">取消</AButton>
                    <AButton type="primary" @click="renameTab">确定</AButton>
                </ASpace>
            </template>
        </Dialog>
    </main>
</template>