import { User } from '@firebase/auth'
import { reactive, InjectionKey } from '@nuxtjs/composition-api'
import { AuthUser } from '~/types/AuthUser'

type State = {
  authUser: AuthUser | null
}

export const useAuthUserStore = () => {
  const state = reactive<State>({
    authUser: null
  })

  return {
    get authUser() {
      return state.authUser
    },

    setAuthUser(user: User | null) {
      state.authUser = user
        ? { userName: user.displayName!, email: user.email! }
        : null
    }
  }
}

export type AuthUserStore = ReturnType<typeof useAuthUserStore>
export const AuthUserKey: InjectionKey<AuthUserStore> = Symbol('AuthUserStore')
