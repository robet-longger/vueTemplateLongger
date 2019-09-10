<template>
  <div>
    <div id="map"></div>
    <el-button type="primary" @click="addMarker">添加单个点位</el-button>
    <el-button type="primary" @click="addMarkers">添加多个点位</el-button>
    <el-button type="primary" @click="delMarkers">删除点位</el-button>
    <el-button type="primary" @click="editMarker">编辑点位</el-button>
    <el-button type="primary" @click="closeEditMarker">关闭编辑点位</el-button>

  </div>
</template>

<script>
import 'ol/ol.css';
import mapconfig from '@/config/mapconfig';
export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initNewMap();
  },
  methods: {
    // 添加单个点位
    addMarker() {
      var option = {
        coordinate: [114.064839, 22.548857],
        markerIcon: require('../assets/image/ico_local_broadcast.png'),
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
    delMarkers() {
      [1, 2, 3].forEach(item => {
        this.map.tools.removeMarker(item);
      });
    },
    editMarker() {
      this.map.on('click', evt => {
        // var pixel = this.map.getEventPixel(evt.originalEvent);
        var feature = this.map.forEachFeatureAtPixel(evt.pixel, feature => {
          return feature;
        });
        console.log(feature);
        if (feature) {
          this.map.tools.editMarker(feature);
          // var coordinates = feature.getGeometry().getCoordinates();
          // let iconName = feature.get('name');
          // router.push({
          //   name: 'onlineDrawing',
          //   params: {
          //     type: iconName
          //   }
          // });
        }
      });
    },
    closeEditMarker() {
      // this.map.removeInteraction(select);
      // this.map.tools.removeInteraction();
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
</style>


