<template>
  <div class="container">
    <div class="image">
      <el-image
        style="height: 100%;border-radius: 15px;"
        src="http://www.ihchina.cn/Uploads/Picture/2020/01/06/s5e12f64034ce6_793_444_37_0.jpg"
        fit="cover"
        @click="onClickProject"
      />
    </div>
    <div class="info">
      <div class="info-item" style="font-weight: 750; font-size: 20px; cursor: pointer;" @click="onClickProject">
        苗族古歌
      </div>
      <div class="info-item">
        民间文学
      </div>
      <div>
        所属地区：贵州省
      </div>
      <div>
        公布时间：2006
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickProject () {
      this.$router.push('/oich/1')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border-radius: 15px;
  margin: 20px 0;
  padding: 0;
  display: flex;
  height: 36vh;
  width: 30%;
  background-color: lightblue;
  transition: box-shadow 500ms ease;
  &:hover {
    box-shadow: 0px 0px 20px brown;
  }
}
.image {
  width: 60%;
  height: 90%;
  margin: auto 10px;
  &:hover {
    cursor: pointer;
  }
}
.info {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
}
</style>
