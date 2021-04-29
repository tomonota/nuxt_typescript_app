<template>
  <div id="user">
    <button class="header-btn" @click="toggle">
      <span class="material-icons icon">arrow_drop_down</span>
      <span>{{ userName }}</span>
    </button>
    <div v-show="isOpen" class="user-info-box">
      <div class="email mb24">
        <label>メールアドレス</label>
        <p>{{ email }}</p>
      </div>
      <div class="btn-wrap">
        <button class="logout-btn" @click="logout">ログアウト</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  inject,
  useRouter
} from '@nuxtjs/composition-api'
import { auth } from '~/plugins/firebase'
import { AuthUserKey, AuthUserStore } from '~/composition/store/authUserStore'
import { TokenKey, TokenStore } from '~/composition/store/tokenStore'

type State = {
  isOpen: boolean
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const authUserStore = inject(AuthUserKey) as AuthUserStore
    const tokenStore = inject(TokenKey) as TokenStore

    const { isOpen } = toRefs(
      reactive<State>({
        isOpen: false
      })
    )

    onMounted(() => {
      window.addEventListener('click', outClick)
    })

    const authUser = computed(() => authUserStore.authUser)
    const userName = computed(() => authUser.value?.userName)
    const email = computed(() => authUser.value?.email)

    const outClick = (event: Event) => {
      const el = document.querySelector<HTMLElement>('#user')
      const target = event.target as HTMLElement
      if (isOpen.value && !el?.contains(target)) {
        isOpen.value = false
      }
    }

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const logout = () => {
      auth
        .signOut()
        .then(() => {
          authUserStore?.setAuthUser(null)
          tokenStore.setToken(null)
          router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return {
      isOpen,
      userName,
      email,
      outClick,
      toggle,
      logout
    }
  }
})
</script>

<style lang="sass" scoped>
#user
  position: relative

.header-btn
  .icon
    font-size: 1.5rem
    margin-left: -8px
    margin-right: 4px

.user-info-box
  position: absolute
  top: 38px
  right: 0
  width: 248px
  padding: 16px
  background-color: #fff
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, .2)
  font-size: 0.9rem
  color: $text-color

.email
  > label
    font-size: 0.8rem
    font-weight: bold
  > p
    word-break: break-word

.btn-wrap
  display: flex
  justify-content: flex-end

.logout-btn
  @extend %no-border-btn
  color: $primary-color
  font-weight: bold
  padding: 0
  &:hover
    background-color: rgba(85,85,85,0.1)
</style>
