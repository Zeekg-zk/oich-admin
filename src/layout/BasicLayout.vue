<template>
  <a-layout>
    <a-layout-sider
      width="220px"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <SiderMenu />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '220px' }">
      <a-layout-header
        :style="{
          background: '#fff',
          padding: 0,
        }"
      >
        <Header />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px 0px 16px',
          overflow: 'initial',
          height: '100%',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SiderMenu from "./SiderMenu.vue";
import Header from "../components/Header.vue";

export default {
  components: {
    SiderMenu,
    Header,
  },
};
</script>

<style lang="scss" scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>