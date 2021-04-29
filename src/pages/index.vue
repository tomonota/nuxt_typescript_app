<template>
  <div>
    <h1 class="mb24">タイトル</h1>
    <div class="content-box-full">
      <label>ユーザー名</label>
      <span>{{ userName }}</span>
      <div class="mb24">
        <label class="selectbox">
          <select name="item">
            <option selected disabled>選択してください</option>
            <option value="項目1">項目1</option>
            <option value="項目2">項目2</option>
            <option value="項目3">項目3</option>
          </select>
        </label>
      </div>
      <div>
        <div class="checkbox">
          <input id="input-1" type="checkbox" />
          <label class="checked-label" for="input-1">Checked</label>
        </div>
      </div>
      <div class="container">
        <div class="radio">
          <input id="radio-1" name="radio" type="radio" checked />
          <label for="radio-1" class="radio-label">Checked</label>
        </div>
        <div class="radio">
          <input id="radio-2" name="radio" type="radio" />
          <label for="radio-2" class="radio-label">Unchecked</label>
        </div>
        <div class="radio">
          <input id="radio-3" name="radio" type="radio" disabled />
          <label for="radio-3" class="radio-label">Disabled</label>
        </div>
      </div>
      <label class="input-text mb40">
        <input type="text" placeholder="テキスト" />
      </label>
      <button @click="getProducts()">プロダクト取得</button>
      <p class="products">{{ product }}</p>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  onMounted
} from '@nuxtjs/composition-api'
import {
  injectProductStore,
  injectAuthUserStore
} from '~/composition/store/injector'
import Loading from '~/components/loading.vue'

type State = {
  isLoading: boolean
}

export default defineComponent({
  components: { Loading },

  setup() {
    const productStore = injectProductStore()
    const authUserStore = injectAuthUserStore()

    const { isLoading } = toRefs(
      reactive<State>({
        isLoading: true
      })
    )

    const products = computed(() => productStore.products)
    const authUser = computed(() => authUserStore.authUser)
    const userName = computed(() => authUser.value?.userName)
    const product = computed(() => products.value[0]?.productId)

    onMounted(() => {
      isLoading.value = false
    })

    const getProducts = () => productStore.fetchProducts()

    return {
      isLoading,
      authUser,
      userName,
      product,
      getProducts
    }
  }
})
</script>

<style lang="sass" scoped></style>
