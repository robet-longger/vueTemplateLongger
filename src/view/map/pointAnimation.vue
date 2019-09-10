<template>
  <div>
    <div id="map"></div>
    <el-button type="primary" @click="openAnimation">开启动画</el-button>
    <el-button type="primary" @click="closeAnimation">关闭动画</el-button>

    <!-- 添加气泡 -->
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import mapconfig from '@/config/mapconfig';
import { log } from 'util';
export default {
  name: 'pointAnimation',
  data() {
    return {
      map: null
    };
  },
  mounted() {
    console.log('点位动画重新渲染了');
    this.initNewMap();
    this.addMarker();
  },
  methods: {
    openAnimation() {
      this.map.tools.openAnimation([114.064839, 22.548857]);
    },
    closeAnimation() {
      this.map.tools.openAnimation('postcompose');
    },
    // 添加单个点位
    addMarker() {
      var option = {
        coordinate: [114.064839, 22.548857],
        markerIcon: require('@/assets/image/ico_local_broadcast.png'),
        scale: 0.8,
        anchor: [0.5, 1],
        id: 1
      };
      this.map.tools.addMarker(option);
    },
    // 添加多个点位
    addMarkers() {
      var options = [
        {
          coordinate: [114.064839, 22.548857],
          markerIcon: require('@/assets/image/ico_local_broadcast.png'),
          scale: 0.8,
          anchor: [0.5, 1],
          id: 1
        },
        {
          coordinate: [114.094839, 22.578857],
          markerIcon: require('@/assets/image/ico_local_broadcast.png'),
          scale: 0.8,
          anchor: [0.5, 1],
          id: 2
        },
        {
          coordinate: [114.124839, 22.578857],
          markerIcon: require('@/assets/image/ico_local_broadcast.png'),
          scale: 0.8,
          anchor: [0.5, 1],
          id: 3
        }
      ];
      this.map.tools.addMarkers(options);
    },

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
    }
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 600px;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: '✖';
}
</style>


