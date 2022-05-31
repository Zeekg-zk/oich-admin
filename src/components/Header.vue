<template>
  <div class="Header-style">
    <div class="title">{{ title }}</div>
    <div style="margin: 0 2.5rem">
      <a-dropdown placement="bottomCenter">
        <a class="ant-dropdown-link" @click.prevent> 个人信息 </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <a @click="() => $router.push({ path: '/self/account' })">
                账号信息
              </a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="2">
              <a style="color: red" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { logined } from '../utils/auth'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      title: "title",
    });

    onMounted(() => {
      state.title = route.meta.title;
    });
    watch(
      () => route.meta.title,
      (value) => {
        state.title = value;
      }
    );

    const logout = () => {
      message.success("logout success");
      logined(false) // 改为未登录状态
      router.push({ path: "/user/login" });
    };

    return {
      logout,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.Header-style {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    padding: 1.5em;
  }
}
</style>