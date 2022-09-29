export namespace Layout {
  interface SidebarRelated {
    collapsed: boolean,
    width: string,
    collapsedWidth: string,
    collapsedText: string
  }
  interface Loading {
    logout: boolean
  }
  type keepAlivePages = Set<string>
}