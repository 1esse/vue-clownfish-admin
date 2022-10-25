
export default function (iconName: IconName | IconName[]): { [key in IconName]?: any } & object {
  if (!Array.isArray(iconName)) {
    const iconPath = () => import('@ant-design/icons-vue').then(res => res[iconName])
    const icon = defineAsyncComponent(iconPath)
    return markRaw(icon)
  }

  const icons: { [key in IconName]?: any } = {}
  for (const name of iconName) {
    const iconPath = () => import('@ant-design/icons-vue').then(res => res[name])
    const icon = defineAsyncComponent(iconPath)
    icons[name] = markRaw(icon)
  }
  return icons
}

export type IconName = keyof typeof import('@ant-design/icons-vue')