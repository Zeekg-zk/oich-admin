<template>
  <div class="account-style">
    <a-tabs v-model:activeKey="activeKey" tab-position="left">
      <a-tab-pane key="1" tab="个人资料">
        <Profile />
      </a-tab-pane>
      <a-tab-pane key="2" tab="账号信息">
        <Account />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import Profile from '../../components/Self/Profile.vue'
import Account from '../../components/Self/Account.vue'

export default {
  setup() {
    const activeKey = ref('1');
    return {
      activeKey,
    };
  },
  components: {
    Profile,
    Account,
  }
};
</script>

<style scoped>
.account-style {
  padding: 2rem 0;
  margin-bottom: 2.4rem;
  width: 100%;
  background-color: #fff;
}
</style>