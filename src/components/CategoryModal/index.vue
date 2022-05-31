<template>
  <a-modal
    :visible="isVisible"
    :title="isEdit ? '编辑类别信息' : '添加类别信息'"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form
      name="类别"
      ref="formRef"
      :model="formState"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item has-feedback label="类别名称" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入类别名" />
      </a-form-item>
      <a-form-item has-feedback label="类别描述" name="description">
        <a-textarea
          v-model:value="formState.description"
          placeholder="请输入类别的描述"
          :rows="4"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">{{
          isEdit ? "保存" : "添加"
        }}</a-button>
        <a-button style="margin-left: 2rem" @click="resetForm">重置</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
// import { message } from "ant-design-vue";

// 自定义校验规则
const rules = {
  name: [
    {
      required: true,
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      min: 5,
      trigger: "blur",
    },
  ],
};
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
    },
  },
  setup(props, ctx) {
    onMounted(() => {
      if (props.isEdit) {
        formState.name = props.value.name;
        formState.description = props.value.description;
      }
    });

    const formRef = ref();
    const formState = reactive({
      name: "",
      description: "",
    });

    const handleFinish = (values) => {
      console.log(values, formState);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    // 对话框的相关事件
    const handleCancel = () => {
      formRef.value.resetFields();
      ctx.emit("changeVisible", false);
    };

    return {
      formState,
      formRef,
      rules,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleCancel,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>