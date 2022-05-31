<template>
  <a-input-search
    v-model:value="title"
    placeholder="请输入标题（至少5个字）"
    size="large"
    @search="onSend"
  >
    <template #enterButton>
      <a-button type="primary" style="marginRight: 2rem">发布</a-button>
    </template>
  </a-input-search>

  <div class="editor">
    <a-textarea
      class="textarea-style"
      v-model:value="content"
      placeholder="请输入内容"
    />
    <div class="content-style">
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import marked from "marked";
import { message } from 'ant-design-vue'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

export default {
  setup() {
    const state = reactive({
      title: '',
      content: "",
    });

    // 操作 Markdown
    const compiledMarkdown = computed(() => marked(state.content));

    // 发布按钮
    const onSend = () => {
      if(state.title.length < 5) {
        message.warning('标题太短了')
      }
    }

    return {
      ...toRefs(state),
      compiledMarkdown,
      onSend,
    };
  },
};
</script>
<style lang="scss" scoped>
.editor {
  display: flex;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;

  .textarea-style {
    padding: 1rem;
    width: 49%;
    height: calc(100vh - 4rem);
    background-color: #f6f6f6;
  }
  .content-style {
    margin-left: 1%;
    width: 50%;
    padding: 1rem;
    height: calc(100vh - 4rem);
    overflow-y: auto;
    :deep(code)  {
      color: #f66;
    }
  }
}
</style>