<template>
  <a-form
    ref="formRef"
    :rules="rules"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item name="number">
      <a-input
        v-model:value="formState.number"
        placeholder="Number"
        size="large"
      >
        <template #prefix>
          <PhoneOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="numberPassword">
      <a-input
        size="large"
        v-model:value="formState.numberPassword"
        type="password"
        placeholder="Password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        block
        size="large"
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.numberPassword === ''"
        @click="loginClick"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { ref, reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import { PhoneOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { logined } from '../../utils/auth'

const rules = {
  number: [
    {
      required: true,
      message: "请填写手机号码",
      trigger: "blur",
    },
  ],
  numberPassword: [
    {
      required: true,
      message: "请填写密码",
      trigger: "blur",
    },
  ],
};

export default {
  setup() {
    const router = useRouter();

    const formRef = ref();
    const formState = reactive({
      number: "",
      numberPassword: "",
    });

    const handleFinish = (values) => {
      console.log(values, formState);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    // 登录操作
    const loginClick = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", formState, toRaw(formState));
          logined(true) // 改成登录状态
          router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("error", error);
        });
      message.success("登录成功 - test");
    };

    return {
      formRef,
      formState,
      handleFinish,
      handleFinishFailed,
      rules,
      loginClick,
    };
  },
  components: {
    PhoneOutlined,
    LockOutlined,
  },
};
</script>
<style lang="scss" scoped>
</style>