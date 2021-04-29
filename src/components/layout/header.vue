<template>
  <div id="header">
    <div class="header-inner">
      <router-link class="logo" to="/">Console</router-link>
      <div class="right">
        <router-link class="header-btn mr16" to="/userCreate">
          <span class="material-icons icon">person_add</span>
          ユーザー作成
        </router-link>
        <User />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import User from '~/components/user.vue'

export default defineComponent({
  components: { User }
})
</script>

<style lang="sass" scoped>
#header
  width: 100%
  height: $header-height
  background-color: $primary-color
  color: #fff

.header-inner
  display: flex
  align-items: center
  width: $layout-width
  height: 100%
  margin: 0 auto

.logo
  font-size: 1.1rem
  font-weight: bold
  color: #fff

.right
  display: flex
  align-items: center
  flex-grow: 1
  justify-content: flex-end

.header-btn
  .icon
    font-size: 1.15rem
    margin-right: 8px

.logout-btn
  @extend %btn
</style>
