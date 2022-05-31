<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的公告信息"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="addNotice" style="margin: 0 3rem"
        >发布公告</a-button
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
      :data-source="noticeList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #enable="{ record }">
        <a-switch
          checked-children="启用"
          un-checked-children="关闭"
          v-model:checked="record.enable"
          @change="enableChange(record.id, record.enable)"
        />
      </template>
      <template #action="{ record }">
        <span>
          <a>查看详情</a>
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)">删除</a-button>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { useRouter } from 'vue-router'
import { fetchNoticeList } from "../../api/Consults";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "15%",
  },
  {
    title: "公告名",
    dataIndex: "name",
    align: "center",
    width: "15%",
  },
  {
    title: "是否启用",
    dataIndex: "enable",
    align: "center",
    width: "20%",
    slots: { customRender: "enable" },
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
    const router= useRouter();

    const state = reactive({
      noticeList: [],
      selectedRowKeys: [],
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchNoticeList().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.noticeList.push(item);
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
        content: "确定删除此公告信息么?",
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

    // 是否启用此公告
    const enableChange = (id, enable) => {
      message.success(`${id}的状态${enable}`);
    };

    // 分布公告
    const addNotice = () => {
      // state.noticeVisible = true;
      const { href } = router.resolve({
        path: '/operate/notice'
      })
      window.open(href, '_blank')
    };

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      columns,
      hasSelected,
      onSelectChange,
      showDeleteConfirm,
      confirmDelete,
      onSearch,
      enableChange,
      addNotice,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}
</style>