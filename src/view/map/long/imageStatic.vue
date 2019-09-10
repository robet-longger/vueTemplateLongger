<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View } from 'ol';
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer.js';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { XYZ, Vector as VectorSource } from 'ol/source.js';
import { Style, Icon, Circle, Stroke, Fill } from 'ol/style.js';
import { Select, Translate } from 'ol/interaction.js';
import Collection from 'ol/Collection';
import Overlay from 'ol/Overlay';
import ImageLayer from 'ol/layer/Image.js';
import ImageStatic from 'ol/source/ImageStatic.js';

// import '../assets/ol/ol.css';
import 'ol/ol.css';
import { transform } from 'ol/proj.js';
// import mapconfig from '@/config/mapconfig';
export default {
  name: 'imageStatic',

  data() {
    return {
      map: null
    };
  },
  mounted() {
    // this.initNewMap();
    // console.log(map, 'map');
    //地图设置中心，设置到深圳，在本地离线地图offlineMapTiles刚好有一张zoom为4的成都瓦片
    var center = new transform(
      [113.623583, 23.301617],
      'EPSG:4326',
      'EPSG:3857'
    );
    console.log(center);

    //计算恒大山水城地图映射到地图上的范围，图片像素为1920*1080，保持比例的情况下，把分辨率放大一些
    var extent = [
      center[0] - (1920 * 1000) / 2,
      center[1] - (1080 * 1000) / 2,
      center[0] + (1920 * 1000) / 2,
      center[1] + (1080 * 1000) / 2
    ];
    //创建地图
    var map = new Map({
      target: 'map',
      view: new View({
        center: center,
        zoom: 7
      })
    });
    //加载熊猫基地静态图层
    map.addLayer(
      new ImageLayer({
        source: new ImageStatic({
          url: require('@/assets/image/u768.jpg'), // 熊猫基地地图
          imageExtent: extent //映射到地图的范围
        })
      })
    );
    //创建一个用于放置活动图标的layer
    var activityLayer = new VectorLayer({
      source: new VectorSource()
    });
    //创建一个活动图标需要的Feature，并设置位置
    var activity = new Feature({
      geometry: new Point([
        center[0] - (1920 * 1000) / 2 + 690 * 1000,
        center[1] - (1080 * 1000) / 2 + (1080 - 445) * 1000
      ])
    });
    //设置Feature的样式，使用小旗帜图标
    activity.setStyle(
      new Style({
        image: new Icon({
          src: require('@/assets/image/ico_local_broadcast.png'),
          anchor: [0, 1],
          scale: 1
        })
      })
    );
    //添加活动Feature到layer上，并把layer添加到地图中
    activityLayer.getSource().addFeature(activity);
    map.addLayer(activityLayer);
    map.on('click', evt => {
      // 转经纬度
      var curCenter = new transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(curCenter, 'curCenter');

      console.log(evt.pixel, 'evt.pixel');

      // var pixel = this.map.getEventPixel(evt.originalEvent);
      // var feature = this.map.forEachFeatureAtPixel(evt.pixel, feature => {
      //   return feature;
      // });
      // console.log(feature);
      // if (feature) {
      //   this.map.tools.editMarker(feature);
      // }
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 800px;
}
</style>


