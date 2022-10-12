<script setup lang="ts">
import type { Layout } from 'types/layout'
import { userStore } from '../stores/user'
import BreadCrumb from './BreadCrumb.vue'

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const loading = inject<Layout.Loading>('loading')
const user = userStore()
const router = useRouter()
let timeout: NodeJS.Timeout

function logout() {
  if (loading) loading.logout = true
  user.logout().then(_ => {
    router.replace('/login')
  })
}

function toggleSidebar() {
  if (!sidebarRelated) return
  if (!sidebarRelated.collapsed) {
    sidebarRelated.collapsed = true
    nextTick(() => {
      sidebarRelated.shadowCollapsed = true
    })
  }
  else {
    timeout && clearTimeout(timeout)
    sidebarRelated.shadowCollapsed = false
    timeout = setTimeout(() => {
      sidebarRelated.collapsed = false
    }, 120)
  }
}
</script>

<template>
  <header>
    <section>
      <MenuFoldOutlined :class="['icon-sidebar-trigger', sidebarRelated?.collapsed && 'collapsed']"
        @click="toggleSidebar" />
      <BreadCrumb :withIcons="true"></BreadCrumb>
    </section>
    <section>
      <ADropdown :trigger="['click']">
        <div style="display: inline-flex; align-items: center; cursor:pointer;">
          <UserOutlined style="margin-right: .5rem;" />
          <span>{{ user.name }}</span>
          <DownOutlined style="margin-left: .5rem;" />
        </div>
        <template #overlay>
          <AMenu>
            <AMenuItem>
              <span @click="logout">
                <LogoutOutlined style="margin-right: .5rem;" />退出登录
              </span>
            </AMenuItem>
          </AMenu>
        </template>
      </ADropdown>
    </section>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  section {
    &:first-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      align-items: center;
      flex-shrink: 0;
      overflow: hidden;
      flex: 1
    }

    &:last-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      flex-shrink: 0;
      align-items: center;
    }
  }
}

.icon-sidebar-trigger {
  cursor: pointer;
  margin-right: 1.2rem;
  font-size: 1.2rem;

  &.collapsed {
    transform: rotate(180deg);
  }
}
</style>