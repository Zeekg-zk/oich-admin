<template>
  <div>
    <div class="logo"><span @click="toHomePage">这是LOGO🤺🤺🤺</span></div>
    <a-menu
      mode="inline"
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="openChange"
    >
      <a-sub-menu v-for="item in routeList" :key="item.path">
        <template #title>{{ item.meta.title }}</template>
        <a-menu-item
          v-for="subItem in item.children"
          :key="subItem.meta.symbol"
          @click="() => $router.push({ path: subItem.path })"
        >
          {{ subItem.meta.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { checkAuth } from "../utils/auth";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      state.selectedKeys = [route.meta.symbol];
      if (sessionStorage.getItem("openMenu")) {
        state.openKeys = sessionStorage.getItem("openMenu").split(",");
      }

      getMenuDate(router.getRoutes());
    });

    // menu 的相关选线
    const state = reactive({
      openKeys: [],
      selectedKeys: [],
    });
    watch(
      () => route.meta.symbol,
      (val) => {
        state.selectedKeys[0] = val;
      }
    );

    const openChange = (openMenu) => {
      state.openKeys = openMenu;
      sessionStorage.setItem("openMenu", openMenu);
    };

    // 动态渲染menu
    const menuItemState = reactive({
      routeList: [],
    });

    /**
     * 过滤菜单
     * 存在level:1为一级菜单
     * 存在level:2为二级菜单
     */
    function getMenuDate(routes) {
      // 先过滤没有 level为 1 的菜单
      let routeList = routes.filter((item) => {
        return item.meta && item.meta.level === 1 && checkAuth(item.meta.auth);
      });
      // 过滤没有 level 为 2 的菜单
      routeList = routeList.map((item) => {
        item.children = item.children.filter((c) => {
          return c.meta.level === 2;
        });
        return item;
      });
      menuItemState.routeList = routeList;
    }

    // 跳转首页
    const toHomePage = () => {
      router.push({path: '/home'})
    }

    return {
      ...toRefs(state),
      ...toRefs(menuItemState),
      openChange,
      toHomePage,
    };
  },

  components: {},
};
</script>
<style lang="scss" scoped>
.logo {
  color: black;
  background: rgb(255, 123, 0);
  width: 100%;
  height: 64px;
}
</style>