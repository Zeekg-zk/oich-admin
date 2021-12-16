<template>
  <div class="map">
    <div class="mapFontStyle">
      湘西非物质文化遗产地图
    </div>
    <div class="mapDivStyle">
      <div id="myChart" />
      <div class="mapDataStyle">
        <span style="color: white">根据左边选择的地图，右边的数据变化</span>
      </div>
    </div>
  </div>
</template>
<script>
import XiangxiJson from '../../assets/xiangxi.json'

export default {
  data () {
    return {
      mychart: null
    }
  },
  mounted () {
    this.echartsInit()
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  methods: {
    echartsInit () {
      this.$echarts.registerMap('xiangxi', XiangxiJson)
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption({
        series: [{
          type: 'map',
          map: 'xiangxi',
          label: {
            show: true
          },
          itemStyle: {
            borderColor: '#4a86fd',
            areaColor: '#bfdfe0'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#4380fd',
              borderWidth: 0
            }
          },
          select: {
            itemStyle: {
              areaColor: '#eee'
            }
          }
        }]
      })
      this.myChart.on('click', function (params) {
        console.log(params)
      })
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: lightblue;
}
.mapFontStyle {
  font-size: 4vh;
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.mapDivStyle {
  display: flex;
  justify-content: space-around;
  position: relative;
  top: 12%;
  #myChart{
    width: 40vw;
    height: 90vh;
  }
  .mapDataStyle {
    margin-top: 10%;
    width: 25vw;
    height: 55vh;
    background-color: blue;
  }
}
</style>
