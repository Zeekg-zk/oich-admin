<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的类别信息"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="addCategory" style="margin: 0 3rem"
        >添加类别</a-button
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
      :data-source="categoryList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="editCategory(record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)"
            >删除</a-button
          >
        </span>
      </template>
    </a-table>

    <AddCategoryModal
      v-if="addCategoryVisible"
      @changeVisible="
        (data) => {
          addCategoryVisible = data;
        }
      "
      :isVisible="addCategoryVisible"
      :isEdit="isEdit"
      :value="addValue"
    />
  </div>
</template>

<script>
import { createVNode, onMounted, reactive, toRefs, computed } from "vue";
import { fetchCategoryList } from "../../api/ICH";
import { Modal, message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import AddCategoryModal from "../../components/CategoryModal";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "15%",
  },
  {
    title: "类别名称",
    dataIndex: "name",
    align: "center",
    width: "12%",
  },
  {
    title: "类别描述",
    dataIndex: "description",
    align: "center",
    width: "40%",
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    slots: { customRender: "action" },
  },
];

export default {
  components: {
    AddCategoryModal,
  },
  setup() {
    const state = reactive({
      categoryList: [],
      selectedRowKeys: [],
      addCategoryVisible: false,
      isEdit: false, // 默认是添加（判断是否添加还是编辑）
      addValue: {},
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchCategoryList().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.categoryList.push(item);
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
        content: "确定删除此类别信息么?",
        icon: createVNode(ExclamationCircleOutlined),
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

    // 添加类别
    const addCategory = () => {
      state.isEdit = false;
      state.addValue = {};
      state.addCategoryVisible = true;
    };
    // 编辑类别
    const editCategory = (val) => {
      state.isEdit = true;
      state.addValue = val;
      state.addCategoryVisible = true;
    };

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      columns,
      hasSelected,
      onSelectChange,
      confirmDelete,
      onSearch,
      addCategory,
      editCategory,
      showDeleteConfirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}
</style>