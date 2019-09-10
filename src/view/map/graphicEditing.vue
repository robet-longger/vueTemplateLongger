<template>
  <div>
    <div id="map" class="map"></div>
    <form class="form-inline">
      <label>几何类型 &nbsp;</label>
      <select id="type">
        <option value="Point">点</option>
        <option value="LineString">线</option>
        <option value="Polygon">多边形</option>
        <option value="Circle">圆</option>
      </select>
    </form>
  </div>
</template>

<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { XYZ, OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
export default {
  data() {
    return {};
  },
  mounted() {
    var raster = new TileLayer({
      source: new OSM()
      // 加载瓦片地图
      // source: new XYZ({
      //   // 高德地图
      //   url:
      //     'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
      // })
    });

    var source = new VectorSource();
    var vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'red',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: 'blue'
          })
        })
      })
    });

    var map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        projection: 'EPSG:4326', //使用这个坐标系(WGS84经纬度球面坐标系，GPS坐标就是这种)--'EPSG:3857':WGS84的墨卡托投影坐标系。
        center: [114.064839, 22.548857], //深圳
        zoom: 11
      })
    });

    var modify = new Modify({ source: source });
    map.addInteraction(modify);

    var draw, snap; // global so we can remove them later
    var typeSelect = document.getElementById('type');

    function addInteractions() {
      draw = new Draw({
        source: source,
        type: typeSelect.value
      });
      map.addInteraction(draw);
      snap = new Snap({ source: source });
      map.addInteraction(snap);
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function() {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      addInteractions();
    };

    addInteractions();
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>


