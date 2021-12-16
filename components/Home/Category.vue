<template>
  <div class="category">
    <div class="textStyle">
      湘西非物质文化遗产项目类别
    </div>
    <div class="DivStyle">
      <div v-for="(item, index) in categoryList" :key="index" class="block" :class="{blockActive: index === blockActiveIndex}" @mouseover="onMouseEnter(item.url, index)">
        <span style="cursor: pointer;color: white;">
          <nuxt-link to="/oich">{{ item.text }}</nuxt-link>
        </span>
      </div>
    </div>
    <div class="imageStyle">
      <el-image
        style="height: 100%;border-radius: 10px 0 0 10px;"
        :src="imageUrl"
        fit="fill"
      />
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      categoryList: [{
        url: 'https://img2.baidu.com/it/u=3925273451,1555245005&fm=26&fmt=auto',
        text: '传统舞蹈'
      }, {
        url: 'https://img1.baidu.com/it/u=1393829414,2865146137&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=551',
        text: '曲艺'
      }, {
        url: 'https://img0.baidu.com/it/u=1636655125,3561024750&fm=26&fmt=auto',
        text: '传统美术'
      }, {
        url: 'https://img0.baidu.com/it/u=2003451144,1405317557&fm=26&fmt=auto',
        text: '传统戏剧'
      }, {
        url: 'https://img1.baidu.com/it/u=1179863738,3358563273&fm=26&fmt=auto',
        text: '传统音乐'
      }],
      blockActiveIndex: 0,
      imageUrl: 'https://img2.baidu.com/it/u=3925273451,1555245005&fm=26&fmt=auto'
    }
  },
  methods: {
    onMouseEnter (imageUrl, index) {
      this.blockActiveIndex = index
      this.imageUrl = imageUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: pink;
  display: flex;
}
.textStyle {
  display: inline-block;
  position: absolute;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 10px;
  writing-mode: vertical-rl;
  white-space: nowrap;
  font-size: 4vh;
  cursor: default;
  top: 50%;
  left: 8%;
  transform: translate(-50%, -50%);
}
.DivStyle {
  z-index: 99;
  width: 45%;
  height: 80%;
  position: relative;
  left: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto 0;
  .block {
    cursor: default;
    text-align: center;
    border-radius: 30px;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    background-color: #693435;
    outline: thick double #693435;
    transition: all 700ms ease;
    a {
      color: white;
      text-decoration:none;
    }
  }
  .blockActive {
    transform: scale(1.08);
    &::before {
      content: "";
      border-width: 9px;
      border-style:solid;
      border-color: transparent #ff4d4d transparent transparent;
      position:absolute;
      top: 50%;
      transform: translate(calc(-100% - 10px), -50%);
    }
    &::after {
      content: "";
      border-width:9px;
      border-style:solid;
      border-color: transparent transparent transparent #ff4d4d;
      position:absolute;
      top: 50%;
      transform: translate(10px, -50%);
    }
  }
}
.imageStyle {
  position: absolute;
  right: 0;
  width: 40%;
  height: 100%;
  border-radius: 10px 0 0 10px;
}
</style>
