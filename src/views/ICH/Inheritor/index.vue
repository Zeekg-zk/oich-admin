<template>
  <div>
    <a-tabs
      v-model:activeKey="activeKey"
      @change="tabChange"
      size="large"
      class="tabs-style"
    >
      <a-tab-pane
        v-for="item in inheritors"
        :key="item.path"
        :tab="item.name"
        style="background-color: #f5f5f5"
      >
        <router-view />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const inheritors = [
  {
    name: "列表信息",
    path: "/ICH/inheritor/list",
  },
  {
    name: "地区管理",
    path: "/ICH/inheritor/region",
  },
];

export default {
  setup() {
    const route = useRoute()
    const router = useRouter();

    onMounted(() => {
       if(route.path.includes('list')) {
         activeKey.value = '/ICH/inheritor/list'
       } else {
         activeKey.value = '/ICH/inheritor/region'
       }
    })

    const activeKey = ref("/ICH/inheritor/list")

    const tabChange = (key) => {
      router.push({ path: key });
    };

    return {
      activeKey,
      inheritors,
      tabChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs-style {
  background-color: #fff;
}
</style>