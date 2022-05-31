<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的传承人姓名"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="addInheritor" style="margin: 0 3rem"
        >添加传承人</a-button
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
      :data-source="inheritorList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="editInheritor(record)"
            >修改信息</a-button
          >
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)">删除</a-button>
        </span>
      </template>
    </a-table>

    <InheritorModal
      v-if="inheritorVisible"
      @changeVisible="(e) => (inheritorVisible = e)"
      :isVisible="inheritorVisible"
      :isEdit="isEdit"
      :value="inheritorInfo"
    />
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { fetchInheritorList } from "../../../api/ICH";
import { Modal, message } from "ant-design-vue";
import InheritorModal from "../../../components/InheritorModal";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "12%",
  },
  {
    title: "姓名",
    dataIndex: "name",
    align: "center",
    width: "8%",
  },
  {
    title: "所属民族",
    dataIndex: "family",
    align: "center",
    width: "10%",
  },
  {
    title: "申报地区或单位",
    dataIndex: "location",
    align: "center",
    width: "16%",
  },
  {
    title: "申报日期",
    dataIndex: "createTime",
    align: "center",
    width: "14%",
    sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
  },
  {
    title: "相关项目",
    dataIndex: "connectionProject",
    align: "center",
    width: "12%",
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
    const state = reactive({
      inheritorList: [],
      selectedRowKeys: [],
      inheritorVisible: false,
      isEdit: false,
      inheritorInfo: {},
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchInheritorList().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.inheritorList.push(item);
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
        content: "确定删除此传承人信息么?",
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

    // 添加传承人
    const addInheritor = () => {
      state.inheritorInfo = {};
      state.inheritorVisible = true;
      state.isEdit = false;
    };
    // 编辑传承人
    const editInheritor = (recode) => {
      state.inheritorInfo = recode;
      state.inheritorVisible = true;
      state.isEdit = true;
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
      addInheritor,
      editInheritor,
    };
  },
  components: {
    InheritorModal,
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-top: 1rem;
  margin-bottom: 24px;
}
</style>