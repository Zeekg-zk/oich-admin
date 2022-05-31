<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的关键字"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="addRule" style="margin: 0 3rem"
        >添加审核规则</a-button
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
      :data-source="ruleList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #enable="{ record }">
        <a-switch
          checked-children="开"
          un-checked-children="关"
          v-model:checked="record.enable"
          @change="enableChange(record.id, record.enable)"
        />
      </template>
      <template #action="{ record }">
        <span>
          <a @click="() => (checkedVisible = true)">应用于</a>
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)">删除</a-button>
        </span>
      </template>
    </a-table>

    <!-- 应用于 -->
    <a-modal
      v-model:visible="checkedVisible"
      title="应用于"
      @ok="enableHandleOk"
      cancelText="取消"
      okText="保存"
    >
      <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
    </a-modal>

    <!-- 审核规则的添加 -->
    <a-modal
      v-model:visible="ruleVisible"
      title="添加审核规则"
      cancelText="取消"
      okText="添加"
      :footer="null"
    >
      <a-form :model="formState" :rules="rules">
        <a-form-item label="关键字" name="keyword">
          <a-input v-model:value="formState.keyword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">添加</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref, toRaw } from "vue";
import { fetchRules } from "../../api/ICH";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "10%",
  },
  {
    title: "关键字",
    dataIndex: "keyword",
    align: "center",
    width: "15%",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
    width: "12%",
  },
  {
    title: "是否启用",
    dataIndex: "enable",
    align: "center",
    width: "16%",
    slots: { customRender: "enable" },
  },
  {
    title: "过滤数量",
    dataIndex: "count",
    align: "center",
    width: "14%",
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    slots: { customRender: "action" },
  },
];

const plainOptions = ["项目介绍", "用户评论"];

const rules = {
  keyword: [
    {
      required: true,
      whitespace: true,
      trigger: ["change", "blur"],
    },
  ],
};

export default {
  setup() {
    const state = reactive({
      ruleList: [],
      selectedRowKeys: [],
      checkedVisible: false, // 是否显示 “应用于” 对话框
      checkedList: [], // 选中了那些
      ruleVisible: false, // 添加规则的显示框
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchRules().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.ruleList.push(item);
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
        content: "确定删除此信息么?",
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
      message.success(`搜索 ${query}`);
    }

    // 是否启动这个规则
    const enableChange = (id, enable) => {
      message.success(`${id}的状态为${enable}`);
    };

    // 保存应用于
    const enableHandleOk = () => {
      state.checkedVisible = false;
      message.success("保存成功 - test");
    };

    // 添加审核规则
    const addRule = () => {
      state.ruleVisible = true;
    };

    // 表单事件
    const ruleFormRef = ref();
    const formState = reactive({
      keyword: undefined,
    });
    const onSubmit = () => {
      ruleFormRef.value
        .validate()
        .then(() => {
          console.log("values", toRaw(formState));
          message.success('添加成功 - test')
          state.ruleVisible = false;
        })
        .catch(() => {
          message.error("请填写正确的关键字");
        });
    };

    return {
      ruleFormRef,
      ...toRefs(state),
      ...toRefs(cardState),
      columns,
      hasSelected,
      onSelectChange,
      onSearch,
      showDeleteConfirm,
      confirmDelete,
      enableChange,
      plainOptions,
      enableHandleOk,
      addRule,
      formState,
      onSubmit,
      rules,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}
</style>