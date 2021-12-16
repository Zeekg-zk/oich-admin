<template>
  <div class="swiper">
    <!-- 首页导航 -->
    <Nav />

    <el-carousel :height="carouselHeight + 'px'">
      <el-carousel-item v-for="(item, index) in 4" :key="index">
        <img src="http://www.ihchina.cn/Uploads/Picture/2021/06/12/s60c46afd9fc59.jpg" alt="1" class="imgStyle">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Nav from '../Nav.vue'

export default {
  components: {
    Nav
  },
  data () {
    return {
      carouselHeight: undefined,
      handleWindonSize: undefined
    }
  },
  mounted () {
    this.carouselHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const that = this
    this.handleWindonSize = function () {
      that.carouselHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    window.addEventListener('resize', this.handleWindonSize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindonSize)
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.imgStyle {
  width: 100%;
  height: inherit;
}
</style>
