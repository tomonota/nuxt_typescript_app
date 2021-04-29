<template>
  <div id="footer">
    <div class="inner">
      <p>©︎</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="sass" scoped>
#footer
  width: 100%
  height: $footer-height
  background-color: $bg-color
  positon: fixed
  bottom: 0
  font-size: 0.75rem
  .inner
    display: flex
    align-items: center
    justify-content: center
    width: $layout-width
    height: 100%
    margin: 0 auto
</style>
