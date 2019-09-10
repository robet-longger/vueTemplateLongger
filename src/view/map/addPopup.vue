<template>
  <div>
    <div id="map"></div>

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
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initNewMap();
    this.addMarkers();
    this.map.on('click', evt => {
      var res = this.map.getPixelFromCoordinate(evt.coordinate);
      console.log(res, 'res');

      // var pixel = this.map.getEventPixel(evt.originalEvent);
      var feature = this.map.forEachFeatureAtPixel(evt.pixel, feature => {
        return feature;
      });
      if (feature) {
        var coodinate = evt.coordinate;
        this.map.tools.openPopup(coodinate);
      } else {
        this.map.tools.colsePopup();
      }
    });
  },
  methods: {
    // 添加多个点位
    addMarkers() {
      var options = [
        {
          coordinate: [114.064839, 22.548857],
          markerIcon: require('../assets/image/ico_local_broadcast.png'),
          scale: 0.8,
          anchor: [0.5, 1],
          id: 1
        },
        {
          coordinate: [114.094839, 22.578857],
          markerIcon: require('../assets/image/ico_local_broadcast.png'),
          scale: 0.8,
          anchor: [0.5, 1],
          id: 2
        },
        {
          coordinate: [114.124839, 22.578857],
          markerIcon: require('../assets/image/ico_local_broadcast.png'),
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


