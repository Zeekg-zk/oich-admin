<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="邮箱密码登录">
        <LoginEmail />
      </a-tab-pane>

      <a-tab-pane key="2" tab="手机号登录" force-render>
        <LoginNumber />
      </a-tab-pane>
      <template #renderTabBar="{ DefaultTabBar, ...props }">
        <component
          :is="DefaultTabBar"
          v-bind="props"
          :style="{ zIndex: 1, background: '#fff', textAlign: 'center' }"
        />
      </template>
    </a-tabs>
  </div>
</template>
<script>
import { ref } from "vue";
import LoginEmail from "../components/Login/Email.vue";
import LoginNumber from "../components/Login/Number.vue";

export default {
  setup() {
    return {
      activeKey: ref("1"),
    };
  },
  components: {
    LoginEmail,
    LoginNumber,
  },
};
</script>
<style lang="scss" scoped>
</style>