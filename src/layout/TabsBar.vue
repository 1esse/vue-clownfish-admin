<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Layout } from 'typings/layout'
import { Modal } from 'ant-design-vue'
import { dashboardRoute } from '@/router'
import sidebar from '@/stores/sidebar'

const router = useRouter()
const route = useRoute()
const tabs = shallowReactive<RouteLocationNormalizedLoaded[]>([])
const scrollbarDom = shallowRef<InstanceType<typeof import('@/components/Scrollbar.vue')['default']> | null>(null)
const menuPanelDom = shallowRef<InstanceType<typeof import('@/components/MenuPanel.vue')['default']> | null>(null)
const tabDoms = shallowRef<HTMLElement[]>([])
const keepAlivePages = inject<Layout.keepAlivePages>('keepAlivePages')
let currentTabIndex: number = 0
const props = withDefaults(defineProps<{
  withIcons?: boolean,
  withDot?: boolean
}>(), {
  withIcons: false,
  withDot: true
})

onBeforeMount(() => { addTab() })

watch(() => route.path, addTab)

defineExpose({
  closeTab,
  getReadOnlyTabs,
  setCurrentTabName
})

function getReadOnlyTabs(): Readonly<RouteLocationNormalizedLoaded>[] {
  return readonly(tabs) as Readonly<RouteLocationNormalizedLoaded>[]
}

function addTab() {
  const tab: RouteLocationNormalizedLoaded = route
  if (tab.meta.hiddenTab) return
  if (tabs.every(item => item.path !== tab.path)) {
    /**
     * 参数传进来的meta是递归合并后的结果，此处需要找出属于该路由的meta
     * 详情见：https://router.vuejs.org/zh/guide/advanced/meta.html
     */
    tabs.push({ ...tab, meta: tab.matched.find(item => item.path === tab.path)?.meta || tab.meta })
  }
  nextTick(() => {
    scrollbarDom.value && tabDoms.value && moveToTab(tab)
  })
}

/**
 * 修改当前标签页的标题
 * @param tabName 修改后的标题
 */
function setCurrentTabName(tabName: string) {
  const currentTab = tabs[currentTabIndex]
  currentTab.meta.title = tabName
  route.meta.title = tabName
  const tab = { ...currentTab }
  tabs.splice(currentTabIndex, 1, tab)
  sidebar.refreshSidebar()
}

let lastTabIndex = 0 // 记录上一次标签索引，用于计算与新标签的位置信息
function moveToTab(tab: RouteLocationNormalizedLoaded) {
  const tabIndex = tabs.findIndex(item => item.path === tab.path)
  currentTabIndex = tabIndex
  if (tabIndex === lastTabIndex) return
  const tabDom = tabDoms.value?.[tabIndex]
  const { offsetWidth, offsetLeft } = tabDom
  const scrollbarState = scrollbarDom.value?.scrollbar?.getState()

  scrollbarDom.value?.scrollbar?.scroll({
    x: lastTabIndex < tabIndex ?
      (offsetLeft + offsetWidth) < (scrollbarState?.viewportSize.width || 0) ?
        undefined :
        offsetLeft :
      offsetLeft < (scrollbarState?.overflowAmount.x || 0) ?
        offsetLeft :
        undefined
  }, 150)
  lastTabIndex = tabIndex
}

function deleteKeepAlivePage(page: RouteLocationNormalizedLoaded) {
  if (keepAlivePages?.has(page.name as string)) {
    keepAlivePages.delete(page.name as string)
  }
}

function refreshPage(page: RouteLocationNormalizedLoaded) {
  if (page.path.startsWith('/redirect')) return
  deleteKeepAlivePage(page)
  router.replace(`/redirect${page.path}`)
}
/**
 * @param tab 关闭的路由
 * @param noRedirect 关闭结束后是否自动跳转去别的尚存的路由
 * @param forceClose 是否强制关闭，开启后将无视关闭确认弹框
 */
async function closeTab(tab: RouteLocationNormalizedLoaded, noRedirect?: boolean, forceClose?: boolean) {
  if (tab.meta.askBeforeClose && !forceClose) {
    const confirm = await checkCloseTab(tab)
    if (!confirm) return
  }
  const closePath = tab.path
  const closeIndex = tabs.findIndex(item => item.path === closePath)
  tabs.splice(closeIndex, 1)
  deleteKeepAlivePage(tab)
  if (noRedirect) return
  if (tabs.length > 0) {
    if (closePath === route.path) {
      const nextTab = tabs[tabs.length - 1]
      const { path, query } = nextTab
      router.replace({ path, query })
    }
  } else {
    router.replace('/redirect' + dashboardRoute.path)
  }
}

async function checkCloseTab(tab: RouteLocationNormalizedLoaded) {
  return new Promise((resolve) => {
    Modal.confirm({
      title: '关闭提示',
      icon: h(useIcon('QuestionOutlined')),
      content: `确定关闭页面「${tab.meta.title || '无标题'}」吗?`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      }
    })
  })
}

function closeRightSideTabs(target: RouteLocationNormalizedLoaded) {
  if (target.path !== route.path) {
    router.replace('/redirect' + target.path)
  }
  const index = tabs.findIndex(item => item.path === target.path)
  for (let i = index + 1; i < tabs.length; i++) {
    const tab = tabs[i]
    nextTick(() => {
      closeTab(tab, true)
    })
  }
}

function closeAllTabs() {
  if (dashboardRoute.path !== route.path) {
    router.replace('/redirect' + dashboardRoute.path)
  }
  for (const tab of tabs) {
    if (tab.path === dashboardRoute.path) continue
    nextTick(() => {
      closeTab(tab, true)
    })
  }
}

function closeOtherTabs(saveTab: RouteLocationNormalizedLoaded) {
  if (saveTab.path !== route.path) {
    router.replace('/redirect' + saveTab.path)
  }
  for (let i = tabs.length - 1; i >= 0; i--) {
    const tab = tabs[i]
    if (tab.path === saveTab.path) continue
    nextTick(() => {
      closeTab(tab, true)
    })
  }
}

function showTabMenu(e: MouseEvent, tab: RouteLocationNormalizedLoaded) {
  // 获取位置信息
  const { clientX, clientY } = e
  if (!menuPanelDom.value) return
  menuPanelDom.value.hidePanel()
  menuPanelDom.value.setContext(tab)
  menuPanelDom.value.setPosition(clientX, clientY)
  menuPanelDom.value.showPanel()
}

const dragIndex = ref()
const dropIndex = ref()
function handleDragStart(e: DragEvent) {
  dragIndex.value = (e.target as HTMLElement).dataset.index
  tabs[dragIndex.value].path !== route.path && router.push(tabs[dragIndex.value].path)
}

function handleDragEnter(e: DragEvent) {
  e.preventDefault()
  if (!e.relatedTarget) return
  dropIndex.value = (e.relatedTarget as HTMLElement).dataset.index
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleDragEnd(e: DragEvent) {
  dragIndex.value = undefined
  dropIndex.value = undefined
}

function handleDrop(e: DragEvent) {
  if (dragIndex.value === undefined || dropIndex.value === undefined || dragIndex.value === dropIndex.value) return
  const options: RouteLocationNormalizedLoaded[] = []
  for (const [index, tab] of Object.entries(tabs)) {
    if (index == dragIndex.value) continue
    else if (index == dropIndex.value) {
      if (+dragIndex.value > +dropIndex.value) {
        options.push(tabs[dragIndex.value], tab)
      } else {
        options.push(tab, tabs[dragIndex.value])
      }
    } else {
      options.push(tab)
    }
  }
  // 刷新tabDoms
  tabs.length = 0
  nextTick(() => {
    tabs.push(...options)
  })
}
</script>

<template>
  <div class="tabs-bar">
    <ASpace class="functional-btns">
      <ATooltip>
        <template #title>刷新当前页</template>
        <AButton class="btn-item" shape="circle" @click="refreshPage(route)">
          <template #icon>
            <ReloadOutlined />
          </template>
        </AButton>
      </ATooltip>
      <ATooltip>
        <template #title>关闭其他</template>
        <AButton class="btn-item" shape="circle" @click="closeOtherTabs(route)">
          <template #icon>
            <ColumnWidthOutlined />
          </template>
        </AButton>
      </ATooltip>
      <ATooltip>
        <template #title>关闭右侧</template>
        <AButton class="btn-item" shape="circle" @click="closeRightSideTabs(route)">
          <template #icon>
            <VerticalRightOutlined />
          </template>
        </AButton>
      </ATooltip>
      <ADivider type="vertical" style="background-color: #e1e1e1; height: 1rem; margin: 0"></ADivider>
    </ASpace>
    <Scrollbar ref="scrollbarDom" height="2rem" direction="horizontal" :speed="5" style="width: 100px; flex: 1;">
      <div class="tabs">
        <div ref="tabDoms" v-for="(tab, index) in tabs" :key="tab.path" class="tab"
          :class="{ active: tab.path === route.path, 'drop-target': dropIndex == index }" draggable="true"
          :data-index="index" @dragstart="handleDragStart" @dragenter="handleDragEnter" @dragover="handleDragOver"
          @drop="handleDrop" @dragend="handleDragEnd" @click="router.push(tab.path)"
          @click.right.prevent="showTabMenu($event, tab)">
          <div v-if="tab.meta.keepAlive && props.withDot"
            :style="{ width: '0.5rem', height: '0.5rem', marginRight: '0.25rem', borderRadius: '50%', backgroundColor: tab.path === route.path ? '#85e1a1' : '#e1e1e1' }">
          </div>
          <template v-if="props.withIcons && tab.meta.icon">
            <SvgIcon v-if="typeof tab.meta.icon === 'string'" :icon-name="(tab.meta.icon as string)"></SvgIcon>
            <component v-else :is="tab.meta.icon"></component>
          </template>
          <span style="margin: 0 5px">{{ tab.meta.title || '无标题' }}</span>
          <CloseOutlined class="icon-tab-close" @click.stop.prevent="closeTab(tab)" />
        </div>
      </div>
    </Scrollbar>
  </div>
  <MenuPanel ref="menuPanelDom">
    <AButton type="text" @click="refreshPage(menuPanelDom?.getContext())">
      <template #icon>
        <ReloadOutlined />
      </template> 刷新
    </AButton>
    <AButton type="text" @click="closeTab(menuPanelDom?.getContext())">
      <template #icon>
        <CloseOutlined />
      </template> 关闭
    </AButton>
    <AButton type="text" @click="closeOtherTabs(menuPanelDom?.getContext())">
      <template #icon>
        <ColumnWidthOutlined />
      </template> 关闭其他
    </AButton>
    <AButton type="text" @click="closeRightSideTabs(menuPanelDom?.getContext())">
      <template #icon>
        <VerticalRightOutlined />
      </template> 关闭右侧
    </AButton>
    <AButton type="text" @click="closeAllTabs()">
      <template #icon>
        <StopOutlined />
      </template> 关闭所有
    </AButton>
  </MenuPanel>
</template>

<style scoped lang="scss">
.tabs-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  .tabs {
    width: 100%;
    position: relative;
    height: 100%;
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    font-size: 0.7rem;
    padding: 0 0.5rem 0 0;

    .tab {
      height: 1.8rem;
      padding: 0 0.2rem 0 0.8rem;
      margin-right: 0.1rem;
      white-space: nowrap;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;
      background-color: var(--white);
      border: 1px solid var(--white);
      color: var(--sidebar-font-color);
      font-size: .75rem;
      box-sizing: border-box;
      transition: all ease 0.2s;
      cursor: pointer;
      user-select: none;

      &.active {
        padding: 0 0.5rem;
        background-color: var(--background-color);
        color: var(--blue);
        border: 1px solid var(--background-color);

        .icon-tab-close {
          visibility: visible;
        }
      }

      &.drop-target {
        background-color: var(--light-blue);
        border: 1px dashed var(--blue);
      }

      &:hover:not(&.active) {
        color: var(--blue);

        .icon-tab-close {
          visibility: visible;
        }
      }

      .icon-tab-close {
        visibility: hidden;

        &:hover {
          background-color: #666;
          color: #fff;
          border-radius: 50%;
        }
      }
    }
  }

  .functional-btns {
    white-space: nowrap;
    padding-right: .5rem;

    .btn-item {
      border-color: transparent;
      width: 1.8rem;
      height: 1.8rem;
      min-width: 1.8rem;
    }
  }
}
</style>