<template>
  <div class="login-page">
    <div class="content-box login-box">
      <div class="line-hr mb24">
        <hr />
        <span class="text">Login</span>
      </div>
      <form class="login-form mb48">
        <label class="input-text-with-icon mb24">
          <span class="material-icons icon">email</span>
          <input v-model="email" type="email" placeholder="メールアドレス" />
        </label>
        <label class="input-text-with-icon">
          <span class="material-icons icon">lock</span>
          <input v-model="password" type="password" placeholder="パスワード" />
        </label>
      </form>
      <button class="submit-btn" @click="login">ログイン</button>
      <p v-if="errorMessage" class="error-text mb24">{{ errorMessage }}</p>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  useRouter
} from '@nuxtjs/composition-api'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '~/plugins/firebase'
import Loading from '~/components/loading.vue'

type State = {
  email: string
  password: string
  errorMessage: string | null
  isLoading: boolean
}

export default defineComponent({
  components: { Loading },

  layout: 'login',

  setup() {
    const router = useRouter()

    const { email, password, errorMessage, isLoading } = toRefs(
      reactive<State>({
        email: '',
        password: '',
        errorMessage: null,
        isLoading: false
      })
    )

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          router.push('/')
        } else {
          isLoading.value = false
        }
      })
    })

    const login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          // Signed in
          router.push('/').catch()
        })
        .catch((error) => {
          errorMessage.value = error.message
        })
    }

    return {
      email,
      password,
      errorMessage,
      isLoading,
      login
    }
  }
})
</script>

<style lang="sass" scoped>
.login-page
  height: 100vh
  margin: 0 auto
  display: flex
  flex-direction: column
  justify-content: center

.login-box
  width: 450px
  margin: 0 auto
  margin-top: -64px
  padding: 64px
  display: flex
  flex-direction: column
  align-items: center

.login-form
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

.input-text-with-icon
  width: 100%

.submit-btn
  width: 100%

.line-hr
  width: 100%
  text-align: center
  hr
    border-top: 1px solid #ddd !important
  .text
    background-color: #fff
    position: relative
    top: -16px
    padding: 0 10px
    color: $light-text-color
    font-size: 0.9rem

.desc
  margin-bottom: 56px
  font-size: 0.8rem
  color: $light-text-color
</style>
