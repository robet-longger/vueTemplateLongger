<template>
  <div>
    <div id="map"></div>
    <el-button type="primary" @click="panto">平移到武汉</el-button>
    <el-button type="primary" @click="reduceMap">缩小地图</el-button>
    <el-button type="primary" @click="enlargeMap">放大地图</el-button>
    <el-button type="primary" @click="setRotation">旋转角度</el-button>
    <el-button type="primary" @click="onInit">复原</el-button>
  </div>
</template>

<script>
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
import mapconfig from '@/config/mapconfig';
export default {
  name: 'initMap',
  data() {
    return {
      map: null
    };
  },
  mounted() {
    console.log(map, '重新mapinit');

    this.initNewMap();
  },
  methods: {
    initNewMap() {
      this.map = mapconfig.initMap({
        domId: 'map',
        mapUrl:
          'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        center: [114.064839, 22.548857], //深圳
        zoom: 12,
        minZoom: 11,
        maxZoom: 15
      });
    },
    // 平移到武汉
    panto() {
      var view = this.map.getView();
      // var wh = fromLonLat([114.31667, 30.51667]);
      console.log([114.31667, 30.51667]);
      view.setCenter([114.31667, 30.51667]);
    },
    reduceMap() {
      var view = this.map.getView();
      var zoom = view.getZoom();
      view.setZoom(zoom - 1);
    },
    enlargeMap() {
      var view = this.map.getView();
      var zoom = view.getZoom();
      view.setZoom(zoom + 1);
    },
    setRotation() {
      var view = this.map.getView();
      view.setRotation(Math.PI / 6);
    },
    onInit() {
      var view = this.map.getView();
      view.setRotation(0);
      view.setZoom(12);
      view.setCenter([114.064839, 22.548857]);
    }
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>


