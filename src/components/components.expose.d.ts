declare module ComponentsExpose {
  interface Scrollbar {
    scrollbar: Ref<OverlayScrollbars | undefined>
  }
  interface MenuPanel {
    setContext(ctx: unknown): void
    getContext(): any
    setPosition(x: number, y: number): void
    showPanel(): void
    hidePanel(): void
  }
}