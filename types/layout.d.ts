export namespace Layout {
  interface SidebarRelated {
    collapsed: boolean,
    width: string,
    collapsedWidth: string
  }
  interface Loading {
    logout: boolean
  }
  type keepAlivePages = Set<string>
}