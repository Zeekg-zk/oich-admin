<template>
  <div class="nav-style">
    <div class="nav-mod">
      <ul class="nav-mod-ul">
        <li :class="{active: activeIndex === 1}" @click="changeClass(1)">
          <nuxt-link to="/">
            首页
          </nuxt-link>
        </li>
        <li :class="{active: activeIndex === 2}" @click="changeClass(2)">
          <nuxt-link to="/info">
            资讯
          </nuxt-link>
        </li>
        <li :class="{active: activeIndex === 3}" @click="changeClass(3)">
          <nuxt-link to="/oich">
            项目
          </nuxt-link>
        </li>
      </ul>
      <div class="login">
        <NavSearch />
        <el-button type="text" class="login-btn" @click="dialogVisible = true">
          登录
        </el-button>
      </div>
    </div>

    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>登录信息</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1,
      dialogVisible: false
    }
  },
  mounted () {
    const path = this.$route.path
    if (path === '/') {
      this.changeClass(1)
    } else if (path === '/info') {
      this.changeClass(2)
    } else if (path === '/oich') {
      this.changeClass(3)
    }
  },
  methods: {
    changeClass (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-style {
  position: absolute;
  top: 0;
  left: 0;
  height: 7vh;
  width: 100%;
  z-index: 9999;
  background-color: rgba(0,0,0,0.6);
  color: white;
}
.nav-mod {
  height: 100%;
  display: flex;
  .nav-mod-ul {
    height: 100%;
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }
  .nav-mod-ul li {
    height: 100%;
    margin: 0 30px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    a {
      text-decoration:none;
      color:white;
    }
    &:hover::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 4px solid brown;
    }
  }
  .active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 4px solid brown;
  }
  .login {
    position: absolute;
    right: 0;
    line-height: 7vh;
    font-size: 20px;
    .el-icon-search {
      cursor: pointer;
    }
    .login-btn {
      font-size: 20px;
      margin: 0 30px;
      color: white;
    }
  }
}
</style>
