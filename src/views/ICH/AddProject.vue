<template>
  <a-card title="新建非遗项目">
    <a-form
      :model="formState"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
      :rules="rules"
    >
      <a-form-item label="项目名称" name="name">
        <a-input
          v-model:value="formState.name"
          placeholder="请输入项目的名称"
        />
      </a-form-item>
      <a-form-item label="项目类别" name="classification">
        <a-select
          v-model:value="formState.classification"
          placeholder="请选择项目的类别"
        >
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="项目传承人" name="inheritors">
        <a-input
          v-model:value="formState.inheritors"
          placeholder="请输入此项目的传承人（请用 、分隔）"
        />
      </a-form-item>
      <a-form-item label="项目级别" name="type">
        <a-input
          v-model:value="formState.type"
          placeholder="请输入项目的级别"
        />
      </a-form-item>
      <a-form-item label="项目公布时间" name="publishTime">
        <a-input
          v-model:value="formState.publishTime"
          placeholder="请输入项目的公布时间"
        />
      </a-form-item>
      <a-form-item label="项目保护单位" name="protectedUnit">
        <a-input
          v-model:value="formState.protectedUnit"
          placeholder="请输入项目保护单位"
        />
      </a-form-item>
      <a-form-item label="项目介绍信息" name="content">
        <a-input
          v-model:value="formState.content"
          placeholder="请输入项目介绍信息的 URL "
        />
      </a-form-item>
      <a-form-item label="项目图片" name="pictures">
        <a-input
          v-model:value="formState.pictures"
          placeholder="请输入项目图片的 URL"
        />
      </a-form-item>
      <a-form-item label="项目视频" name="videos">
        <a-input
          v-model:value="formState.videos"
          placeholder="请输入项目视频的 URL"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">创 建</a-button>
        <a-button style="margin-left: 20px" @click="onReset">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import { reactive, toRaw } from "vue";
import { Form, message } from "ant-design-vue";

export default {
  setup() {
    const rules = {
      name: [
        {
          required: true,
          whitespace: true,
          message: "请输入正确的项目名",
        },
      ],
      classification: [
        {
          required: true,
          message: "请选择项目类别",
        },
      ],
      inheritors: [
        {
          required: true,
          whitespace: true,
          message: "请输入项目传承人（用 、分隔）",
        },
      ],
      type: [
        {
          required: true,
          whitespace: true,
          message: "请输入项目的级别",
        },
      ],
      publishTime: [
        {
          required: true,
          whitespace: true,
          message: "请输入项目的公布时间",
        },
      ],
      protectedUnit: [
        {
          required: true,
          whitespace: true,
          message: "请输入项目的保护单位",
        },
      ],
      content: [
        {
          required: true,
          whitespace: true,
          message: "请输入项目介绍信息的 URL",
        },
      ],
    };
    // 提交表单
    const formState = reactive({
      name: "",
      classification: [],
      inheritors: "",
      type: "",
      publishTime: "",
      protectedUnit: "",
      content: "",
      pictures: "",
      videos: "",
    });

    const onSubmit = () => {
      const { validate } = Form.useForm(formState, rules);
      validate()
        .then(() => {
          console.log(toRaw(formState));
        })
        .catch((err) => {
          message.error("输入有误");
          console.log("error", err);
        });
    };

    const onReset = () => {
      formState.name = ""
      formState.classification = []
      formState.inheritors = ""
      formState.type = ""
      formState.publishTime = ""
      formState.protectedUnit = ""
      formState.content = ""
      formState.pictures = ""
      formState.videos = ""
    };

    return {
      formState,
      onSubmit,
      onReset,
      rules,
    };
  },
};
</script>