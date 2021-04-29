<template>
  <div>
    <h1 class="mb24">ユーザー作成</h1>
    <p class="desc mb24">
      新規ユーザーの作成後、認証情報を対象のユーザーにお知らせください。<br />
      なお、ユーザー作成後は現在のログインが解除され、ログイン画面に遷移します。
    </p>
    <div class="content-box create-box">
      <label class="input-text-with-icon mb24">
        <span class="material-icons icon">person</span>
        <input v-model="userName" type="text" placeholder="ユーザー名" />
      </label>
      <label class="input-text-with-icon mb24">
        <span class="material-icons icon">email</span>
        <input v-model="email" type="text" placeholder="メールアドレス" />
      </label>
      <label class="input-text-with-icon mb40">
        <span class="material-icons icon">lock</span>
        <input v-model="password" type="text" placeholder="パスワード" />
      </label>
      <button class="submit-btn" @click="createUser">ユーザー作成</button>
      <p v-if="errorMessage" class="error-text mt16">{{ errorMessage }}</p>
    </div>
    <Loading v-if="isLoading" />
    <div v-if="isSuccess" class="overlay">
      <div class="content-box modal">
        <p class="label mb8">ユーザーの作成が完了しました</p>
        <p class="text mb32">現在のログイン状態は解除されます。</p>
        <a class="logout-btn" href="/login">ログイン画面へ</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs
} from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential
} from 'firebase/auth'
import { auth } from '~/plugins/firebase'
import {
  injectAuthUserStore,
  injectTokenStore
} from '~/composition/store/injector'

type State = {
  email: string
  password: string
  userName: string
  errorMessage: string | null
  isLoading: boolean
  isSuccess: boolean
}

export default defineComponent({
  setup() {
    const authUserStore = injectAuthUserStore()
    const tokenStore = injectTokenStore()

    const { email, password, userName, errorMessage, isLoading, isSuccess } =
      toRefs(
        reactive<State>({
          email: '',
          password: '',
          userName: '',
          errorMessage: null,
          isLoading: true,
          isSuccess: false
        })
      )

    onMounted(() => {
      isLoading.value = false
    })

    const createUser = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential: UserCredential) => {
          updateProfile(userCredential.user, { displayName: userName.value })
          success()
        })
        .catch((error) => {
          errorMessage.value = error.message
        })
    }

    const success = () => {
      isSuccess.value = true
      auth
        .signOut()
        .then(() => {
          authUserStore.setAuthUser(null)
          tokenStore.setToken(null)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return {
      email,
      password,
      userName,
      errorMessage,
      isLoading,
      isSuccess,
      createUser
    }
  }
})
</script>

<style lang="sass" scoped>
h1
  text-align: center

.desc
  text-align: center
  font-size: 0.9rem

.create-box
  display: flex
  flex-direction: column
  width: 480px
  margin: 0 auto
  padding: 48px

.error-text
  text-align: center

.overlay
  display: flex
  justify-content: center
  align-items: center
  position: fixed
  z-index: 1000
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.7)

.modal
  box-shadow: none
  margin-top: -64px
  border-top: 4px solid $primary-color
  width: 450px
  display: flex
  flex-direction: column
  align-items: center
  .label
    font-weight: bold
    font-size: 1.3rem
  .text
    font-size: 0.85rem

.logout-btn
  @extend %btn
  background-color: $primary-color
  color: #fff
  border-radius: 20px
</style>
