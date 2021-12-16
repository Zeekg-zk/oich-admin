<template>
  <div class="oich">
    <!-- 过滤条件 -->
    <div class="filter">
      <el-select v-model="filterOptions.level" placeholder="级别">
        <el-option
          v-for="item in levelList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="filterOptions.publishTime" placeholder="公布时间">
        <el-option
          v-for="item in publishTimeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="filterOptions.classification" placeholder="类别">
        <el-option
          v-for="item in classificationList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="filterOptions.searchKey" style="width: auto;" placeholder="项目名称" />
      <div class="btn" @click="onSearch">
        搜索
      </div>
    </div>

    <!-- 项目卡片 -->
    <div class="projectStyle">
      <ProjectDiv v-for="(item, index) in 20" :key="index" />
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'defaultLayout',
  data () {
    return {
      filterOptions: {
        level: '',
        publishTime: '',
        classification: '',
        searchKey: ''
      },
      // 级别列表
      levelList: [
        {
          value: '国家级',
          label: '国家级'
        }, {
          value: '省级',
          label: '省级'
        }, {
          value: '区级',
          label: '区级'
        }, {
          value: '龙须面',
          label: '龙须面'
        }, {
          value: '县级',
          label: '县级'
        }
      ],
      // 公布时间列表
      publishTimeList: [
        {
          value: '2006(第一批)',
          label: '2006(第一批)'
        }, {
          value: '2008(第二批)',
          label: '2008(第二批)'
        }, {
          value: '2011(第三批)',
          label: '2011(第三批)'
        }, {
          value: '2014(第四批)',
          label: '2014(第四批)'
        }, {
          value: '2021(第五批)',
          label: '2021(第五批)'
        }
      ],
      // 类别列表
      classificationList: [
        {
          value: '传统音乐',
          label: '传统音乐'
        }, {
          value: '传统舞蹈',
          label: '传统舞蹈'
        }, {
          value: '传统戏剧',
          label: '传统戏剧'
        }
      ]
    }
  },
  methods: {
    onSearch () {
      // console.log(this.filterOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
.oich {
  width: 100%;
  height: 100%;
}
.filter {
  width: 80%;
  margin: 0 auto;
  margin-top: calc(7vh + 30px);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  .btn {
    width: 10%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: lightblue;
  }
}
.projectStyle {
  width: 80%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.pagination {
  text-align: center;
  margin: 20px 0;
}
</style>
