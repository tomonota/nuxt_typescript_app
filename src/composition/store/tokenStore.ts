import { reactive, InjectionKey } from '@nuxtjs/composition-api'

type State = {
  token: string | null
}

export const useTokenStore = () => {
  const state = reactive<State>({
    token: null
  })

  return {
    get token() {
      return state.token
    },

    setToken(token: string | null) {
      state.token = token
    }
  }
}

export type TokenStore = ReturnType<typeof useTokenStore>
export const TokenKey: InjectionKey<TokenStore> = Symbol('TokenStore')
