<template>
  <div class="project">
    <h1 style="text-align: center;">
      Miao ancient songs
    </h1>
    <!-- 项目相关信息 -->
    <table class="project-info">
      <tbody>
        <tr>
          <td>公布时间：2006(第一批)</td>
          <td>Class：民间文学</td>
        </tr>
        <tr>
          <td>Project level：省级</td>
          <td>Protection unit</td>
        </tr>
        <tr>
          <td>Persons</td>
        </tr>
      </tbody>
    </table>
    <!-- 项目视频（如果有的话） -->
    <div v-if="hasVideo" class="project-video">
      <h2>video Introduce</h2>
      <div class="video">
        <ProjectVideo :poster="posterUrl" :sources="sourcesOjb" />
      </div>
    </div>
    <!-- 项目详情 -->
    <div class="project-details">
      <h2>详细介绍</h2>
      <div class="article">
        <p>
          React can change how you think about the designs you look at and the apps you build. Where once you might have seen a forest, after working with React, you will appreciate the individual trees. React makes it easier to think in design systems and UI states. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React.
        </p>
        <img class="img" src="https://img0.baidu.com/it/u=1814334693,2710732047&fm=26&fmt=auto" alt="1">
        <p>
          React can change how you think about the designs you look at and the apps you build. Where once you might have seen a forest, after working with React, you will appreciate the individual trees. React makes it easier to think in design systems and UI states. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React.
        </p>
        <p>
          React can change how you think about the designs you look at and the apps you build. Where once you might have seen a forest, after working with React, you will appreciate the individual trees. React makes it easier to think in design systems and UI states. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'defaultLayout',
  // eslint-disable-next-line require-await
  async asyncData ({ params }) {
    // console.log(params)
  },
  data () {
    return {
      hasVideo: true,
      posterUrl: 'https://img2.baidu.com/it/u=3097773156,3852649567&fm=26&fmt=auto',
      sourcesOjb: { type: 'video/mp4', src: 'http://oss-xzb.oss-cn-beijing.aliyuncs.com/Files/61749a95c3c1b700b4842d8585ff0812.mp4' }
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  height: 100%;
  width: 70%;
  margin: 0 auto;
  background-color: lightpink;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.project-info {
  font-size: 20px;
  margin: 20px 0;
  & td {
    width: 50%;
    padding: 15px;
  }
}
.project-video {
  margin: 20px 0;
  background-color: lightblue;
  .video {
    margin: 10px auto;
    width: 70%;
    height: 100%;
  }
}
.project-details {
  margin: 20px 0;
  .article {
    text-indent: 36px;
    font-size: 18px;
    & .img {
      margin-left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
