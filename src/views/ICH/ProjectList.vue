<template>
  <div>
    <div class="card-style">
      <a-card title="筛选条件" style="width: 100%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请输入你想要搜索的非遗名称"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </a-card>
    </div>

    <a-card title="操作" style="width: 100%">
      <div>
        <a-button type="primary" @click="addProject" style="margin: 0 3rem"
          >新建非遗项目</a-button
        >
      </div>

      <div style="margin: 2rem 0 0">
        <a-row :gutter="16">
          <a-col
            :xs="10"
            :sm="6"
            :md="8"
            :lg="8"
            v-for="item in projectList"
            :key="item.id"
            style="margin: 1rem 0"
          >
            <a-card :title="item.name">
              <template #extra>
                <a-dropdown>
                  <a @click.prevent>
                    more
                    <DownOutlined />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a href="javascript:;">查看详情</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a
                          style="color: red"
                          @click="showDeleteConfirm(item.id)"
                          >删除</a
                        >
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown></template
              >
              <div class="project-style">
                <a-image width="48%" :src="item.img"> </a-image>
                <div class="project-info-style">
                  <p>类别：{{ item.category }}</p>
                  <p>级别：{{ item.level }}</p>
                  <p>保护单位：{{ item.protectedUnitName }}</p>
                  <p>公布日期：{{ item.publishTime }}</p>
                  <!-- <p>继承人：{{item.inheritors}}</p> -->
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { projectList } from "../../api/ICH";
import { Modal, message } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    width: "10%",
  },
  {
    title: "项目级别",
    dataIndex: "level",
    align: "center",
    width: "8%",
  },
  {
    title: "项目名",
    dataIndex: "name",
    align: "center",
    width: "12%",
  },
  {
    title: "项目类别",
    dataIndex: "category",
    align: "center",
    width: "10%",
  },
  {
    title: "保护单位",
    dataIndex: "protectedUnitName",
    align: "center",
    width: "12%",
  },
  {
    title: "公布日期",
    dataIndex: "publishTime",
    align: "center",
    width: "15%",
  },
  {
    title: "继承人",
    dataIndex: "inheritors",
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
    const router = useRouter();

    const state = reactive({
      projectList: [],
      selectedRowKeys: [],
    });
    onMounted(() => {
      fetchData();
    });

    // 发送请求获取数据
    const fetchData = () => {
      // { page: 1, limit: 20 }
      projectList().then((res) => {
        res.data.list.forEach((item) => {
          item.key = item.id;
          state.projectList.push(item);
        });
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

    // 跳转添加项目页面
    const addProject = () => {
      router.push({
        path: "/ICH/addProject",
      });
    };

    // 删除某个项目
    const showDeleteConfirm = (id) => {
      Modal.confirm({
        title: "确定删除此项目么?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          message.success(`删除成功 - test ${id}`)
        }
      });
    };

    return {
      ...toRefs(state),
      ...toRefs(cardState),
      columns,
      onSearch,
      addProject,
      showDeleteConfirm,
    };
  },
  components: {
    DownOutlined,
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  margin-bottom: 24px;
}

.project-style {
  display: flex;
  align-items: center;
  .project-info-style {
    widows: 50%;
    padding: 0 1.2rem;
  }
}
</style>