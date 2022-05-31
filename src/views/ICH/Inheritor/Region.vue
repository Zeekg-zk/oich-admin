<template>
  <div class="region-style">
    <a-card title="筛选条件" style="width: 100%">
      <a-input-search
        v-model:value="searchValue"
        placeholder="请输入你想要搜索的地区信息"
        enter-button="Search"
        size="large"
        @search="onSearch"
      />
    </a-card>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="showAddRegion" style="margin: 0 3rem"
        >添加地区信息</a-button
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
      :data-source="regionList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link"
            >修改信息</a-button
          >
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)"
            >删除</a-button
          >
        </span>
      </template>
    </a-table>

    <!-- 地区管理的操作 -->
    <a-modal
      v-model:visible="regionVisible"
      title="地区管理"
      cancelText="取消"
      okText="添加"
      :footer="null"
    >
      <!-- <a-form ref="ruleFormRef" :model="formState" :rules="rules">
        <a-form-item label="关键字" name="keyword">
          <a-input v-model:value="formState.keyword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">添加</a-button>
        </a-form-item>
      </a-form> -->
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { Modal, message } from "ant-design-vue";
import { fetchRegion } from "../../../api/ICH";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "15%",
  },
  {
    title: "省份",
    dataIndex: "province",
    align: "center",
    width: "12%",
  },
  {
    title: "市",
    dataIndex: "city",
    align: "center",
    width: "14%",
  },
  {
    title: "县乡镇",
    dataIndex: "county",
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
    onMounted(() => {
      fetchData();
      // test();
    });

    const state = reactive({
      regionList: [],
      selectedRowKeys: [],
      regionVisible: false,
      isEdit: false,
      regionInfo: {},
    });

    // 发送请求获取数据
    const fetchData = async () => {
      // { page: 1, limit: 20 }
      let res = await fetchRegion();
      res.data.list.forEach((item) => {
        item.key = item.id;
        state.regionList.push(item);
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
        content: "确定删除此地区信息么?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          message.success(`删除成功 - test ${id}`);
        },
      });
    };

    // 搜索信息
    const searchState = reactive({
      searchValue: "",
    });

    const onSearch = () => {
      if (searchState.searchValue.length !== 0) {
        message.success(`搜素 ${searchState.searchValue}`);
      }
    };

    // 显示添加或编辑 Modal
    const showAddRegion = () => {
      state.regionVisible = true;
      state.isEdit = false;
    };

    return {
      ...toRefs(state),
      ...toRefs(searchState),
      onSearch,
      hasSelected,
      onSelectChange,
      confirmDelete,
      showDeleteConfirm,
      columns,
      showAddRegion,
    };
  },
};
</script>

<style lang="scss" scoped>
.region-style {
  margin-top: 1rem;
}
</style>