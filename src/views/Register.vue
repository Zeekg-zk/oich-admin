<template>
  <div class="register-style">
    <h2 style="textalign: center">注册</h2>
    <a-form
      ref="formRef"
      :rules="rules"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item name="email">
        <a-input
          size="large"
          v-model:value="formState.email"
          placeholder="邮箱"
        >
          <template #prefix
            ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input
          size="large"
          v-model:value="formState.password"
          type="password"
          placeholder="密码 (最少6位)"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item name="number">
        <a-input
          size="large"
          v-model:value="formState.number"
          placeholder="手机号码"
        >
          <template #prefix
            ><PhoneOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item name="code">
        <a-input-search
          v-model:value="formState.code"
          placeholder="请输入验证码"
          size="large"
          @search="sendCode"
        >
          <template #enterButton>
            <a-button>获取验证码</a-button>
          </template>
        </a-input-search>
      </a-form-item>
      <a-form-item>
        <a-button block size="large" type="primary" @click="onRegister">
          注 册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons-vue";
import { ref, reactive, toRaw } from "vue";
import { message } from "ant-design-vue";

const rules = {
  email: [
    {
      required: true,
      message: "请填写电子邮件",
      trigger: "blur",
    },
    {
      required: true,
      message: "电子邮件格式不正确",
      pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请填写密码",
      trigger: "blur",
    },
    {
      required: true,
      len: 6,
      message: "密码太短",
      trigger: "blur",
    },
  ],
  number: [
    {
      required: true,
      message: "请填写手机号",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
  ],
};

export default {
  setup() {
    const formRef = ref();
    const formState = reactive({
      email: "",
      password: "",
      number: "",
      code: "",
    });

    const handleFinish = (values) => {
      console.log(values, formState);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    // 发送验证码
    const sendCode = () => {
      message.success("发送成功 - test");
    };

    // 点击注册
    const onRegister = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState, toRaw(formState));
        })
        .catch((error) => {
          console.log("error", error);
        });
      message.success("注册成功 - test");
    };

    return {
      formRef,
      formState,
      handleFinish,
      handleFinishFailed,
      rules,
      sendCode,
      onRegister,
    };
  },

  components: {
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
  },
};
</script>

<style lang="scss" scoped>
.register-style {
  width: 45rem;
}
</style>