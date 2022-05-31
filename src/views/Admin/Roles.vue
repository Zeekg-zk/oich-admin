<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的角色名称"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <a-button type="primary" @click="addRole" style="margin: 0 3rem"
        >添加角色</a-button
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
      :data-source="rolesList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link">更改权限</a-button>
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)"
            >删除</a-button
          >
        </span>
      </template>
    </a-table>

    <!-- 添加角色 Modal -->
    <a-modal v-model:visible="roleVisible" title="添加角色信息" :footer="null">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{
          style: {
            width: '100px',
          },
        }"
      >
        <a-form-item label="角色名" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="角色描述" name="desc">
          <a-input v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onAddRoleSubmit">添加</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref, toRaw } from "vue";
import { fetchRoles } from "../../api/Admin";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "12%",
  },
  {
    title: "角色名",
    dataIndex: "name",
    align: "center",
    width: "10%",
  },
  {
    title: "角色描述",
    dataIndex: "desc",
    align: "center",
    width: "36%",
  },
  {
    title: "管理员数",
    dataIndex: "count",
    align: "center",
    width: "10%",
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    slots: { customRender: "action" },
  },
];

const rules = {
  name: [
    {
      required: true,
      whitespace: true,
      trigger: ["change", "blur"],
    },
  ],
  desc: [
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
      rolesList: [],
      selectedRowKeys: [],
      roleVisible: false,
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchRoles().then((res) => {
        res.data.records.forEach((item) => {
          item.key = item.id;
          state.rolesList.push(item);
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
        content: "确定删除此角色信息么?",
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

    // 操作（添加、修改）
    const formRef = ref();
    const formState = reactive({
      name: undefined,
      desc: undefined,
      authority: undefined,
    });
    const addRole = () => {
      state.roleVisible = true;
    };
    // 点击 添加角色信息中的 添加按钮
    const onAddRoleSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          message.success("添加成功 - test");
          console.log("values", formState, toRaw(formState));
          state.roleVisible = false;
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      formRef,
      formState,
      columns,
      hasSelected,
      onSelectChange,
      confirmDelete,
      onSearch,
      showDeleteConfirm,
      onAddRoleSubmit,
      addRole,
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