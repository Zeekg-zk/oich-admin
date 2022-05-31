<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的新闻信息"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="addNews" style="margin: 0 3rem"
        >添加新闻内容</a-button
      >
      <a-popconfirm
        placement="top"
        ok-text="确定删除"
        cancel-text="取消"
        @confirm="confirmDelete"
        :disabled="!hasSelected"
      >
        <template #title>
          <p>确定删除你选中的信息么？</p>
        </template>
        <a-button type="primary" danger :disabled="!hasSelected"
          >批量删除</a-button
        >
      </a-popconfirm>
    </a-card>
    <a-table
      :columns="columns"
      :data-source="newsList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link">内容修改</a-button>
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)">删除</a-button>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { fetchNews } from "../../api/Consults";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "10%",
  },
  {
    title: "新闻标题",
    dataIndex: "title",
    align: "center",
    width: "12%",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
    width: "10%",
  },
  {
    title: "浏览次数",
    dataIndex: "count",
    align: "center",
    width: "9%",
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: "评论数量",
    dataIndex: "commentCount",
    align: "center",
    width: "9%",
  },
  {
    title: "访问链接",
    dataIndex: "link",
    align: "center",
    width: "20%",
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    slots: { customRender: "action" },
  },
];

export default {
  setup() {
    const router = useRouter();

    const state = reactive({
      newsList: [],
      selectedRowKeys: [],
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchNews().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.newsList.push(item);
        });
      });
    };

    // 选择或者多选
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const onSelectChange = (selectedRowKeys) => {
      state.selectedRowKeys = selectedRowKeys;
    };
    // 删除选中的信息
    const confirmDelete = () => {
      console.log(state.selectedRowKeys);
      message.success("删除成功 - test");
    };
    // 删除某个类别信息
    const showDeleteConfirm = (id) => {
      Modal.confirm({
        title: "警告",
        content: "确定删除此新闻么?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          message.success(`删除成功 - test ${id}`);
        },
      });
    };

    // 搜索
    const cardState = reactive({
      searchValue: "",
    });

    function onSearch(query) {
      cardState.searchValue = "";
      console.log(query);
    }

    // 添加新闻内容
    const addNews = () => {
      const { href } = router.resolve({
        path: "/operate/news",
      });
      window.open(href, '_blank')
    };

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      columns,
      hasSelected,
      onSelectChange,
      showDeleteConfirm,
      onSearch,
      confirmDelete,
      addNews,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
      .ant-modal-body {
        flex: 1;
      }
    }
  }
}
</style>