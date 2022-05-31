<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的管理员信息"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
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
      :data-source="adminList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="showEditModal(record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="link" danger @click="showDeleteConfirm(record.id)"
            >删除</a-button
          >
          <a-divider type="vertical" />
          <a-button type="link" style="color: purple">加入黑名单</a-button>
        </span>
      </template>
    </a-table>

    <!-- 添加新闻内容 -->
    <a-modal
      v-model:visible="adminVisible"
      title="编辑管理员信息"
      @ok="adminHandleOk"
      cancelText="取消"
      okText="保存"
    >
      <a-form
        :model="formState"
        :rules="formRules"
        :label-col="{
          style: {
            width: '135px',
          },
        }"
      >
        <a-form-item label="管理员名称" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="采用的角色" name="role">
          <a-select
            v-model:value="formState.role"
            placeholder="请选择此管理员的角色"
          >
            <a-select-option v-for="item in roles" :key="item" :value="item">{{
              item
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, toRaw } from "vue";
import { fetchAdminList, fetchRoles } from "../../api/Admin";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "12%",
  },
  {
    title: "管理员名称",
    dataIndex: "username",
    align: "center",
    width: "10%",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
    width: "16%",
  },
  {
    title: "最后登录时间",
    dataIndex: "lastLoginTime",
    align: "center",
    width: "18%",
  },
  {
    title: "角色",
    dataIndex: "role",
    align: "center",
    width: "10%",
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    slots: { customRender: "action" },
  },
];
const formRules = {
  username: [{ required: true, trigger: "blur" }],
  email: [
    {
      required: true,
      trigger: "blur",
      pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      message: "请填写正确的邮箱"
    },
  ],
  role: [{ required: true, trigger: "blur" }],
};
export default {
  setup() {
    const state = reactive({
      adminList: [],
      selectedRowKeys: [],
      adminVisible: false,
      roles: [],
    });
    onMounted(() => {
      fetchData();
      fetchRoles().then((res) => {
        res.data.records.forEach((item) => {
          state.roles.push(item.name);
        });
      });
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchAdminList().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.adminList.push(item);
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
        content: "确定删除此管理员信息么?",
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

    // ### 表单相关事件
    const formState = reactive({
      username: undefined,
      email: undefined,
      role: undefined,
    });
    // 显示编辑管理员信息的对话框
    const showEditModal = (record) => {
      formState.username = record.username;
      formState.email = record.email;
      formState.role = record.role;
      state.adminVisible = true;
    };
    // 保存修改
    const adminHandleOk = () => {
      state.adminVisible = false;
      console.log(toRaw(formState));
      message.success(`保存成功 - test`);
    };

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      formState,
      columns,
      hasSelected,
      onSelectChange,
      onSearch,
      confirmDelete,
      showDeleteConfirm,
      showEditModal,
      adminHandleOk,
      formRules,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}
</style>