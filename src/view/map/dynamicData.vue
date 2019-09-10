<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { MultiPoint, Point } from 'ol/geom.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
export default {
  data() {
    return {};
  },
  mounted() {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    var imageStyle = new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: 'yellow' }),
        stroke: new Stroke({ color: 'red', width: 1 })
      })
    });

    var headInnerImageStyle = new Style({
      image: new CircleStyle({
        radius: 2,
        fill: new Fill({ color: 'blue' })
      })
    });

    var headOuterImageStyle = new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: 'black' })
      })
    });

    var n = 200;
    var omegaTheta = 30000; // Rotation period in ms
    var R = 7e6;
    var r = 2e6;
    var p = 2e6;
    map.on('postcompose', function(event) {
      var vectorContext = event.vectorContext;
      var frameState = event.frameState;
      var theta = (2 * Math.PI * frameState.time) / omegaTheta;
      var coordinates = [];
      var i;
      for (i = 0; i < n; ++i) {
        var t = theta + (2 * Math.PI * i) / n;
        var x = (R + r) * Math.cos(t) + p * Math.cos(((R + r) * t) / r);
        var y = (R + r) * Math.sin(t) + p * Math.sin(((R + r) * t) / r);
        coordinates.push([x, y]);
      }
      vectorContext.setStyle(imageStyle);
      vectorContext.drawGeometry(new MultiPoint(coordinates));

      var headPoint = new Point(coordinates[coordinates.length - 1]);

      vectorContext.setStyle(headOuterImageStyle);
      vectorContext.drawGeometry(headPoint);

      vectorContext.setStyle(headInnerImageStyle);
      vectorContext.drawGeometry(headPoint);

      map.render();
    });
    map.render();
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>


