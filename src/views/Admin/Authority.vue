<template>
  <div>
    <!-- <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的角色名称"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div> -->

    <a-card title="操作" style="width: 100%">
      <template #extra>
        <div style="display: flex">
          <a-input-search
            v-model:value="searchValue"
            placeholder="想要搜索的权限名"
            enter-button="Search"
            @search="onSearch"
          />
          <a-button type="primary" @click="addRole" style="margin: 0 3rem"
            >添加权限</a-button
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
        </div>
      </template>

      <a-table
        :columns="columns"
        :data-source="authList"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <template #action="{ record }">
          <span>
            <a-button type="link">编辑权限</a-button>
            <a-divider type="vertical" />
            <a-button type="link" danger @click="showDeleteConfirm(record.id)"
              >删除</a-button
            >
          </span>
        </template>
      </a-table>
    </a-card>

    <!-- 添加角色 Modal -->
    <a-modal v-model:visible="authVisible" title="添加权限信息" :footer="null">
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
        <a-form-item label="权限名" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="权限描述" name="desc">
          <a-input v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onAddAuthSubmit">添加</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref, toRaw } from "vue";
import { fetchAuthority } from "../../api/Admin";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "18%",
  },
  {
    title: "PID",
    dataIndex: "pid",
    align: "center",
    width: "10%",
  },
  {
    title: "权限名",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "种类",
    dataIndex: "type",
    align: "center",
  },
  {
    title: "许可",
    dataIndex: "permissionValue",
    align: "center",
  },
  {
    title: "path",
    dataIndex: "path",
    align: "center",
  },
  {
    title: "component",
    dataIndex: "component",
    align: "center",
  },
  {
    title: "icon",
    dataIndex: "icon",
    align: "center",
  },
  {
    title: "status",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "level",
    dataIndex: "level",
    align: "center",
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
      authList: [],
      selectedRowKeys: [],
      authVisible: false,
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchAuthority().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.authList.push(item);
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
        content: "确定删除此权限信息么?",
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
      state.authVisible = true;
    };
    // 添加权限信息
    const onAddAuthSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          message.success("添加成功 - test");
          console.log("values", formState, toRaw(formState));
          state.authVisible = false;
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
      addRole,
      onAddAuthSubmit,
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