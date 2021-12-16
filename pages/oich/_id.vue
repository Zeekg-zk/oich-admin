<template>
  <div class="project">
    <h1 style="text-align: center;">
      苗族古歌
    </h1>
    <!-- 项目相关信息 -->
    <table class="project-info">
      <tbody>
        <tr>
          <td>公布时间：2006(第一批)</td>
          <td>类别：民间文学</td>
        </tr>
        <tr>
          <td>项目等级：省级</td>
          <td>保护单位：台江县非物质文化遗产保护中心</td>
        </tr>
        <tr>
          <td>传承人：田锦锋  张定强  刘永洪  王安江 </td>
        </tr>
      </tbody>
    </table>
    <!-- 项目视频（如果有的话） -->
    <div v-if="hasVideo" class="project-video">
      <h2>影音介绍</h2>
      <div class="video">
        <ProjectVideo :poster="posterUrl" :sources="sourcesOjb" />
      </div>
    </div>
    <!-- 项目详情 -->
    <div class="project-details">
      <h2>详细介绍</h2>
      <div class="article">
        <p>
          苗族分布在我国西南数省区。按方言划分，大致可分为湘西方言区、黔东方言区、川滇黔方言区。黔东南清水江流域一带是全国苗族最大的聚居区，大致包括凯里、剑河、黄平、台江、雷山、丹寨、施秉、黄平、镇远、三穗，以及广西三江和湖南靖县等地。在此广大苗族聚居区普遍流传着一种以创世为主体内容的诗体神话，俗称“古歌”或“古歌古词”。
        </p>
        <img class="img" src="https://img0.baidu.com/it/u=1814334693,2710732047&fm=26&fmt=auto" alt="1">
        <p>
          苗族古歌古词神话大多在鼓社祭、婚丧活动、亲友聚会和节日等场合演唱，演唱者多为中老年人、巫师、歌手等。酒席是演唱古歌的重要场合。苗族的古歌古词神话是一个民族的心灵记忆，是苗族古代社会的百科全书和“经典”，具有史学、民族学、哲学、人类学等多方面价值。今天，这些古歌古词神话还在民间流传唱诵。
        </p>
        <p>
          但由于受到现代文化和市场经济的冲击，苗族古歌已濒临失传。以台江为例，在全县13万苗族同胞中，能唱完整部古歌的已寥寥无几，目前只有二百余人能唱一些不完整的古歌，而且都是中老年人，传承古歌较多的老人年事已高。如不抓紧抢救保护，苗族古歌这一民族瑰宝将最终在世间消失。
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
