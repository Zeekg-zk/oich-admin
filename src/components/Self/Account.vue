<template>
  <h2>账号信息</h2>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.desc">
          <template #title>
            <a @click="onClick(item.key)">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>

</template>
<script>
import { onMounted, reactive, toRefs } from "vue";

const rules = {
  oldPassword: [
    {
      required: true,
      trigger: "blur",
    },
  ],
};

export default {
  setup() {
    onMounted(() => {
      // 模拟获取个人信息
      state.data[1].desc = handleInfo("number", "18711672225");
      state.data[2].desc = handleInfo("email", "3193373997@qq.com");
    });

    const state = reactive({
      visible: false,
      data: [
        {
          title: "修改密码",
          desc: "在此修改你的密码",
          key: "password",
        },
        {
          title: "密保手机",
          desc: "你还没有密保手机",
          key: "number",
        },
        {
          title: "电子邮箱",
          desc: "你还没有绑定邮箱",
          key: "email",
        },
      ],
    });

    const handleInfo = (key, value) => {
      switch (key) {
        case "number":
          return value.substring(0, 3) + "****" + value.substring(7);
        case "email":
          return `****${value.slice(4)}`;
      }
    };

    // 点击进行操作
    const onClick = (key) => {
      if (key !== "password") return
        state.visible = true;
    };

    return {
      ...toRefs(state),
      onClick,
      rules,
    };
  },
};
</script>