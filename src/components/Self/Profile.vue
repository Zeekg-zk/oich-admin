<template>
  <div class="profile-style">
    <a-descriptions
      class="descriptions"
      title="基本信息"
      :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 2, xs: 1 }"
    >
      <a-descriptions-item label="UID">123123123</a-descriptions-item>
      <a-descriptions-item label="昵称">窝嫩叠</a-descriptions-item>
      <a-descriptions-item label="角色权限">超级管理员</a-descriptions-item>
    </a-descriptions>

    <a-avatar
      @click="updateAvatar"
      class="avatar"
      :size="{ xs: 200, sm: 200, md: 200, lg: 200, xl: 200, xxl: 200 }"
    >
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
  </div>
  <a-button type="primary" @click="editClick">编辑</a-button>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
import { message } from 'ant-design-vue'

export default {
  setup() {
    // 更改头像
    const updateAvatar = () => {
      message.success('更改头像')
    }

    // 编辑个人信息
    const editClick = () => {
      message.success('编辑个人信息')
    }

    return {
      updateAvatar,
      editClick,
    }
  },
  components: {
    UserOutlined,
  },
};
</script>

<style lang="scss" scoped>
.profile-style {
  display: flex;
  .descriptions {
    width: 70%;
  }
  .avatar {
    cursor: pointer;
  }
}
</style>