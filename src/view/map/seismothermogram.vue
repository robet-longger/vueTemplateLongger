<template>
  <div>
    <div id="map" class="map"></div>

  </div>
</template>
<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import KML from 'ol/format/KML.js';
import { Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import { XYZ } from 'ol/source.js';
import { transform } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';

export default {
  data() {
    return {
      map: null,
      center: [121.05212688446045, 30.600614547729492],
      // 热力图假数据
      heatData: {
        type: 'FeatureCollection',
        features: [
          { type: 'Point', coordinates: [104.4, 31.19], count: 100 },
          { type: 'Point', coordinates: [113.3, 30.6], count: 19 },
          { type: 'Point', coordinates: [123.3, 30.6], count: 419 },
          { type: 'Point', coordinates: [105.3, 30.6], count: 319 },
          { type: 'Point', coordinates: [106.3, 30.6], count: 719 },
          { type: 'Point', coordinates: [109.3, 31.6], count: 519 },
          { type: 'Point', coordinates: [109.3, 30.6], count: 319 },
          { type: 'Point', coordinates: [108.3, 32.6], count: 139 },
          { type: 'Point', coordinates: [118.3, 31.6], count: 129 },
          { type: 'Point', coordinates: [108.3, 33.6], count: 190 },
          { type: 'Point', coordinates: [108.3, 32.6], count: 189 },
          { type: 'Point', coordinates: [100.3, 30.6], count: 1 },
          { type: 'Point', coordinates: [109.3, 30.6], count: 119 },
          { type: 'Point', coordinates: [108.3, 31.6], count: 200 },
          { type: 'Point', coordinates: [118.3, 30.6], count: 300 }
        ]
      }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 创建一个热力图层
      let vector = new HeatmapLayer({
        // 矢量数据源
        source: new VectorSource({
          features: new GeoJSON().readFeatures(this.heatData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          })
        }),
        blur: 20, // 模糊尺寸
        radius: 20 // 热点半径
      });
      var raster = new TileLayer({
        // 加载瓦片地图
        source: new XYZ({
          // 高德地图
          url:
            'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        })
      });
      this.map = new Map({
        target: 'map',
        // 在layers中添加自己所需要的图层，添加瓦片地图和热力图层
        layers: [raster, vector],
        view: new View({
          // 地图初始中心位置
          center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
          zoom: 5
        })
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>

