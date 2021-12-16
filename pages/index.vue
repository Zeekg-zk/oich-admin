<template>
  <div style="width: 100%;height:100%;overflow: hidden;">
    <div id="fullpage">
      <div class="page">
        <HomeSwiper />
      </div>
      <div class="page">
        <HomeCategory />
      </div>
      <div class="page">
        <HomeMap />
      </div>
      <div class="page">
        <HomeOther />
      </div>
    </div>
  </div>
</template>

<script>
import FullPage from '../utils/FullPage'

export default {
  data () {
    return {
      FullPage: null
    }
  },
  mounted () {
    this.FullPage = new FullPage()
  },
  beforeDestroy () {
    this.FullPage.destroy()
  }
}
</script>

<style lang="scss" scoped>
#fullpage {
  position: relative;
  top: 0;
  transition: all 700ms ease;
}
.page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
