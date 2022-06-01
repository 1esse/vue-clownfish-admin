<template>
  <div class="nested">
    <div style="width: 5rem; height: 5rem">
      <RouterView></RouterView>
    </div>
    这里是嵌套页子容器1的内容
  </div>
</template>

<style lang="postcss" scoped>
.nested {
  background-color: burlywood;
  width: 100%;
  height: 100%;
}
</style>
