<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的用户信息"
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
      :data-source="userList"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :bordered="true"
    >
      <template #action="{ record }">
        <span>
          <a-button type="link" style="color: purple" @click="addBlackList(record.id)">加入黑名单</a-button>
        </span>
      </template>
    </a-table>

  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { fetchUsers } from "../../api/User";
import { message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "15%",
  },
  {
    title: "用户昵称",
    dataIndex: "name",
    align: "center",
    width: "12%",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
    width: "20%",
  },
  {
    title: "手机号",
    dataIndex: "phone",
    align: "center",
    width: "15%",
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
      userList: [],
      selectedRowKeys: [],
      userVisible: false,
      roles: [],
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = async () => {
      // { page: 1, limit: 20 }
      let res = await fetchUsers();
      res.data.list.forEach((item) => {
        item.key = item.id;
        state.userList.push(item);
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
    // 搜索
    const cardState = reactive({
      searchValue: "",
    });
    function onSearch(query) {
      cardState.searchValue = "";
      console.log(query);
    }

    // 添加黑名单
    const addBlackList = (id) => {
      message.success(`添加黑名单成功 - test - ${id}`)
    }

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      columns,
      hasSelected,
      onSelectChange,
      onSearch,
      confirmDelete,
      addBlackList,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}
</style>