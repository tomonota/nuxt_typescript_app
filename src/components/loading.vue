<template>
  <div>
    <div class="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style lang="sass" scoped>
.loading
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: $bg-color
  z-index: 1000
</style>
