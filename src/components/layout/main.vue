<template>
  <div id="main">
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="sass" scoped>
#main
  min-height: calc(100vh - #{$header-height + $footer-height})
  background-color: #eef2f7
  .inner
    width: $layout-width
    margin: 0 auto
    padding: 48px 0
</style>
