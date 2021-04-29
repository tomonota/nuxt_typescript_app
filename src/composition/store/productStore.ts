import { reactive, InjectionKey } from '@nuxtjs/composition-api'
import { httpClient } from '~/api/utils/client'
import { Product } from '~/types/Product'

type State = {
  products: Product[]
}

export const useProductStore = () => {
  const state = reactive<State>({
    products: []
  })

  return {
    get products() {
      return state.products
    },

    async fetchProducts() {
      const res = await httpClient.get<Product[]>('/products')
      state.products = res
    }
  }
}

export type ProductStore = ReturnType<typeof useProductStore>
export const ProductKey: InjectionKey<ProductStore> = Symbol('ProductStore')
