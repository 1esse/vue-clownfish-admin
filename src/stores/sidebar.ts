import { dashboardRoute, routes } from "@/router"
import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"

export const sidebarStore = defineStore('sidebar', {
  state: (): {
    sidebarList: RouteRecordRaw[]
  } => {
    return {
      sidebarList: []
    }
  },
  actions: {
    refreshSidebar() {
      this.sidebarList = [dashboardRoute, ...routes]
    }
  },
  getters: {
    getSidebarList: (state) => state.sidebarList
  }
})