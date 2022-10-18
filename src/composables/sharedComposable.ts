import { EffectScope } from "vue"

// 使组合式函数可用于多个Vue实例
export function createSharedComposable(composable: Function) {
  let subscribers = 0
  let state: any, scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1
    if (scope && subscribers <= 0) {
      scope.stop()
      state = undefined
      scope = undefined
    }
  }
  return (...args: any[]) => {
    subscribers += 1
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    if (getCurrentScope()) {
      onScopeDispose(dispose)
    }
    return state
  }
}