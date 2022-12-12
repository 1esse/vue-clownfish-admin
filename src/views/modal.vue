<script setup lang="ts">
const visibles = reactive({
  dialog1: false,
  dialog2: false,
  dialog3: false,
})
const loading = reactive({
  dialog1: false,
  dialog2: false,
  dialog3: false,
})
const loadingText = reactive({
  dialog1: '',
  dialog2: '',
  dialog3: '',
})

function showModal1() {
  visibles.dialog1 = true
}
function showModal2() {
  visibles.dialog2 = true
}
function showModal3() {
  loading.dialog3 = true
  loadingText.dialog3 = '加载中...'
  visibles.dialog3 = true
  setTimeout(() => {
    loading.dialog3 = false
  }, 2000)
}
</script>

<template>
  <ASpace>
    <AButton @click="showModal1">基本用法</AButton>
    <AButton @click="showModal2">自定义页头/页脚</AButton>
    <AButton @click="showModal3">固定宽高</AButton>

    <Dialog v-model:show="visibles.dialog1">
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur atque omnis fugiat. Alias delectus animi
          perferendis, eligendi velit assumenda. Voluptates fugiat a magni minus commodi sapiente harum fuga tempora
          voluptatum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptatem eveniet magni repudiandae natus
          quaerat
          ab enim odit. Qui velit dolore impedit adipisci saepe officiis tempore quo corporis minima iste.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
      </div>
    </Dialog>
    <Dialog v-model:show="visibles.dialog2">
      <template #dialogHeader>
        <div>
          <FireTwoTone style="margin-right: .5rem" />自定义页头
        </div>
      </template>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptatum quaerat labore deserunt
        cupiditate, aliquam, sequi illo, molestiae excepturi quidem commodi recusandae velit laboriosam id porro alias
        itaque. Minima, inventore.
        Minima earum sit obcaecati, blanditiis harum recusandae, molestiae sapiente quos officiis eum velit adipisci
        nisi beatae placeat amet dicta eos provident autem voluptate, inventore excepturi? Ipsa quibusdam vero
        distinctio tempore!
        Rerum tempore sapiente, provident dolore necessitatibus fugiat et distinctio accusantium sint. Doloribus,
        architecto necessitatibus, consectetur velit asperiores quam aliquid beatae ullam similique dicta expedita
        ducimus laboriosam vel omnis dolor optio?
        lorem*8
      </div>
      <template #dialogFooter>
        <div>
          <FireTwoTone style="margin-right: .5rem" />自定义页脚
        </div>
      </template>
    </Dialog>
    <Dialog v-model:show="visibles.dialog3" :loading="loading.dialog3" :loadingText="loadingText.dialog3" width="40rem"
      height="70vh" :destroy-on-close="true">
      <template #dialogHeader>
        <div>
          <FireTwoTone style="margin-right: .5rem" />固定宽高模态框
        </div>
      </template>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur atque omnis fugiat. Alias delectus animi
          perferendis, eligendi velit assumenda. Voluptates fugiat a magni minus commodi sapiente harum fuga tempora
          voluptatum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptatem eveniet magni repudiandae natus
          quaerat
          ab enim odit. Qui velit dolore impedit adipisci saepe officiis tempore quo corporis minima iste.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sed cum saepe accusamus quae porro
          voluptatibus, perferendis dolorum doloremque? Fugit corporis eos consequuntur sequi quae, quia officiis maxime
          inventore doloribus!
        </p>
      </div>
      <template #dialogFooter>
        <div>
          <FireTwoTone style="margin-right: .5rem" />自定义页脚
        </div>
      </template>
    </Dialog>
  </ASpace>
</template>