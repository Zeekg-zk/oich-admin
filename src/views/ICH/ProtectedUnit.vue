<template>
  <div>
    <a-card title="操作" style="width: 100%">
      <template #extra>
        <div style="display: flex">
          <a-input-search
            v-model:value="searchValue"
            placeholder="输入你想要搜索的信息"
            enter-button
            @search="onSearch"
          />
          <a-button
            type="primary"
            @click="addProtectedUnit"
            style="margin: 0 3rem"
            >添加保护单位</a-button
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
        :data-source="protectedUnitList"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :bordered="true"
      >
        <template #action="{ record }">
          <span>
            <a-button type="link" @click="editProtectedUnit(record)"
              >编辑</a-button
            >
            <a-divider type="vertical" />
            <a-button type="link" danger @click="showDeleteConfirm(record.id)"
              >删除</a-button
            >
          </span>
        </template>
      </a-table>
    </a-card>

    <a-modal
      @cancel="modalCancel"
      v-model:visible="proUnitVisible"
      :title="isEdit ? '编辑保护单位信息' : '添加保护单位信息'"
      :footer="null"
    >
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
        <a-form-item label="保护单位" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">{{
            isEdit ? "保存" : "添加"
          }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref, toRaw } from "vue";
import { fetchProtectedUnit } from "../../api/ICH";
import { Modal, message } from "ant-design-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "15%",
  },
  {
    title: "保护单位",
    dataIndex: "name",
    align: "center",
    width: "15%",
  },
  {
    title: "描述",
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

const rules = {
  name: [
    {
      required: true,
      whitespace: true,
      trigger: ["change", "blur"],
    },
  ],
  description: [
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
      protectedUnitList: [],
      selectedRowKeys: [],
      proUnitVisible: false,
      isEdit: false,
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      fetchProtectedUnit().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.protectedUnitList.push(item);
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
        content: "确定删除此保护单位信息么?",
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
      description: undefined,
    });
    // 关闭 Modal 时
    const modalCancel = () => {
      formRef.value.resetFields();
    };
    // 显示编辑 Modal
    const editProtectedUnit = (record) => {
      formState.name = record.name;
      formState.description = record.description;
      state.isEdit = true;
      state.proUnitVisible = true;
    };
    // 显示添加 Modal
    const addProtectedUnit = () => {
      state.isEdit = false;
      state.proUnitVisible = true;
    };
    // 提交 (添加或者编辑)
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          if (state.isEdit) {
            message.success("保存成功 - test");
          } else {
            message.success("添加成功 - test");
          }
          console.log("values", formState, toRaw(formState));
          state.proUnitVisible = false;
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    return {
      formRef,
      modalCancel,
      ...toRefs(state),
      ...toRefs(cardState),
      formState,
      columns,
      hasSelected,
      onSelectChange,
      confirmDelete,
      onSearch,
      showDeleteConfirm,
      addProtectedUnit,
      rules,
      editProtectedUnit,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>