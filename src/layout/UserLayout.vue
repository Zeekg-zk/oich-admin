<template>
  <div class="user-style">
    <div style="padding: 1rem 0"><h2>这是LOGO</h2></div>
    <router-view />
    <div class="other-style">
      <div>
        <span v-show="isLogin">其他登录方式（待）</span>
      </div>
      <a-button type="link" @click="onClick">
        {{ isLogin ? "注册账户" : "使用已有账户登录" }}
      </a-button>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      if (route.path === "/user/login") {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    });

    watch(
      () => route.path,
      (path) => {
        if (path === "/user/login") {
          state.isLogin = true;
        } else {
          state.isLogin = false;
        }
      }
    );

    const state = reactive({
      isLogin: true,
    });

    // 切换 登录 | 注册
    const onClick = () => {
      if (state.isLogin) {
        router.replace({ path: "/user/register" });
      } else {
        router.replace({ path: "/user/login" });
      }
    };

    return {
      ...toRefs(state),
      onClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.user-style {
  width: auto;
  height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.other-style {
  width: 45rem;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
}
</style>