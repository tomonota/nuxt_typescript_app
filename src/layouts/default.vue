<template>
  <div>
    <Header />
    <Main>
      <Nuxt />
    </Main>
    <Footer />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  provide,
  useRouter
} from '@nuxtjs/composition-api'
import { auth } from '~/plugins/firebase'
import { useProductStore, ProductKey } from '~/composition/store/productStore'
import {
  useAuthUserStore,
  AuthUserKey
} from '~/composition/store/authUserStore'
import { useTokenStore, TokenKey } from '~/composition/store/tokenStore'
import { httpClient } from '~/api/utils/client'
import Header from '~/components/layout/header.vue'
import Main from '~/components/layout/main.vue'
import Footer from '~/components/layout/footer.vue'

export default defineComponent({
  components: {
    Header,
    Main,
    Footer
  },

  setup() {
    const authUserStore = useAuthUserStore()
    const tokenStore = useTokenStore()

    provide(ProductKey, useProductStore())
    provide(AuthUserKey, authUserStore)
    provide(TokenKey, tokenStore)

    const router = useRouter()

    const authInit = () => {
      return new Promise((resolve, reject) => {
        try {
          auth.onAuthStateChanged((user) => {
            if (user) {
              authUserStore.setAuthUser(user)
              user.getIdToken(true).then((result) => {
                tokenStore.setToken(result)
                httpClient.setToken(result)
              })
            } else {
              router.push('login')
            }
            resolve(user)
          })
        } catch (e) {
          reject(e)
        }
      })
    }

    onBeforeMount(async () => {
      await authInit()
    })

    return {}
  }
})
</script>
