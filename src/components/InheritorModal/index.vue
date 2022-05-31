<template>
  <a-modal
    :visible="isVisible"
    :title="isEdit ? '编辑传承人信息' : '添加传承人信息'"
    @ok="inheritorHandleFinish"
    @cancel="handleCancel"
    cancelText="取消"
    :okText="isEdit ? '保存' : '添加'"
  >
    <a-form
      ref="inheritorform"
      :model="inheritorState"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-item has-feedback label="姓名" name="name">
        <a-input v-model:value="inheritorState.name" />
      </a-form-item>
      <a-form-item has-feedback label="所属名族" name="family">
        <a-input v-model:value="inheritorState.family" />
      </a-form-item>
      <a-form-item has-feedback label="申报地区或单位" name="location">
        <a-input v-model:value="inheritorState.location" />
      </a-form-item>
      <!-- <a-form-item has-feedback label="相关项目" name="connectionProject">
        <a-input v-model:value="inheritorState.connectionProject" />
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<script>
import { onMounted, reactive, ref, toRaw } from "vue";
import { message } from "ant-design-vue";

// 自定义布局
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
// 自定义规则
const rules = {
  name: [{ required: true }],
  family: [{ required: true }],
  location: [{ required: true }],
  connectionProject: [{ required: true }],
};

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    isEdit: {
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
        inheritorState.name = props.value.name;
        inheritorState.family = props.value.family;
        inheritorState.location = props.value.location;
        inheritorState.connectionProject = props.value.connectionProject;
      }
    });
    // ### 表单相关事件
    const inheritorform = ref();
    const inheritorState = reactive({
      name: undefined,
      family: undefined,
      location: undefined,
      connectionProject: undefined,
    });
    const inheritorHandleFinish = () => {
      inheritorform.value
        .validate()
        .then(() => {
          console.log("values", toRaw(inheritorState));
          message.success("添加成功 - test");
          inheritorform.value.resetFields();
          ctx.emit("changeVisible", false);
        })
        .catch(() => {
          message.error("请填写正确的相关信息");
        });
    };

    // 对话框的关闭
    const handleCancel = () => {
      inheritorform.value.resetFields();
      ctx.emit("changeVisible", false);
    };

    return {
      inheritorform,
      inheritorState,
      inheritorHandleFinish,
      layout,
      rules,
      handleCancel,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>