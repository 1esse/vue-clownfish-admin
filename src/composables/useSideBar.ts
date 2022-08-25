import { dashboardRoute, routes } from "@/router"
import { ShallowRef, shallowRef } from "vue"
import { RouteRecordRaw } from "vue-router"

const sidebarList: ShallowRef<RouteRecordRaw[]> = shallowRef([])

// tsx只接受函数导出
export function getSidebarList() {
  return sidebarList
}

export function refreshSidebar() {
  sidebarList.value = [dashboardRoute, ...routes]
}
