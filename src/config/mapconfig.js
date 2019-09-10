// import '../assets/ol/ol.js'
import { Map, View } from "ol";
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer.js';
import OSM from "ol/source/OSM";
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { XYZ, Vector as VectorSource } from 'ol/source.js';
import { Style, Icon, Circle, Stroke, Fill } from 'ol/style.js';
import { Select, Translate } from 'ol/interaction.js';
import Collection from 'ol/Collection';
import Overlay from 'ol/Overlay';



// let maptype = 2  //0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务
// var getMaplayer = function(maptype) {
//     var maplayer = null;
//     switch (maptype) {
//         case 0:
//             maplayer = new ol.layer.Tile({
//                 source: new ol.source.XYZ({
//                     url: 'http://127.0.0.1:7080/streetmap/shenzhen/{z}/{x}/{y}.jpg'
//                 })
//             })
//             break;
//         case 1:
//             maplayer = new ol.layer.Tile({
//                 source: new ol.source.XYZ({
//                     // 高德地图
//                     url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
//                 })
//             })
//             break;
//         case 2:
//             maplayer = new ol.layer.Tile({
//                 source: new ol.source.TileArcGISRest({
//                     url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
//                 })
//             })
//             break;
//     }
//     return [maplayer];
// }
/**
     * @description 初始化地图
     * @param {Object} option 地图参数
     * domId:容器ID
     * mapUrl:瓦片地图网址
     * center:地图中心
     * zoom:缩放等级
     * minZoom:地图最小缩放等级
     * maxZoom:地图最大缩放等级
     */
var initMap = function(option) {

    var container = document.getElementById("popup");
    var content = document.getElementById("popup-content");
    var popupCloser = document.getElementById("popup-closer");
    var overlay = new Overlay({
        //设置弹出框的容器
        element: container,
        //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    if (popupCloser) {
        popupCloser.onclick = function() {
            overlay.setPosition(undefined);
            popupCloser.blur();
            return false;
        };
    }


    var layer = new VectorLayer({
        source: new VectorSource()
    })
    var select = new Select();
    var map = new Map({
        target: option.domId,
        layers: [
            new TileLayer({
                // 加载瓦片地图
                source: new XYZ({
                    // 高德地图
                    url: option.mapUrl
                    // url: require('../assets/image/u768.jpg')
                })
                // source: new ol.source.OSM()
            }),
            layer,
        ],
        overlays: [overlay],
        // layers: getMaplayer(option.maptype || 1),
        view: new View({
            projection: 'EPSG:4326', //使用这个坐标系(WGS84经纬度球面坐标系，GPS坐标就是这种)--'EPSG:3857':WGS84的墨卡托投影坐标系。
            center: option.center, //深圳
            zoom: option.zoom || 12,
            minZoom: option.minZoom || 0,
            maxZoom: option.maxZoom || 25,
        })
    });
    // 自定义方法
    map.tools = {
        // 添加单个点位
        /**
         * @description 初始化地图
         * @param {Object} markerOption 地图参数
         * id {String} :点位唯一id
         * coordinate {Arrry}:点位坐标--[114.064839, 22.548857] 必填
         * markerIcon  {String}:图标网址 选填
         * scale {Number} : 缩放 选填
         * anchor {Arrry} : 设置图标位置 [0.5, 1] 选填
         */
        addMarker: function(markerOption) {
            if (!markerOption.id) {
                console.warn('请赋予图标id')
                return false
            }
            if (!markerOption.coordinate) {
                console.warn('请填写图标经纬度')
                return false
            }
            // 创建一个Feature，并设置好在地图上的位置
            var anchor = new Feature({
                geometry: new Point(markerOption.coordinate),
            });
            // 设置样式，在样式中就可以设置图标
            anchor.setStyle(new Style({
                image: new Icon({
                    src: markerOption.markerIcon || require('../assets/image/ico_local_broadcast.png'),
                    scale: markerOption.scale || 0.8,
                    anchor: markerOption.anchor || [0.5, 1]   // 设置图标位置
                })
            }));
            // 给每个marker 绑定唯一id
            anchor.setId(markerOption.id)
            // 添加到之前的创建的layer中去
            layer.getSource().addFeature(anchor);
            // 根据层级放大缩小图标
            map.getView().on('change:resolution', function() {
                var style = anchor.getStyle();
                // 重新设置图标的缩放率，基于层级10来做缩放
                style.getImage().setScale(this.getZoom() / 20);
                anchor.setStyle(style);
            })

        },
        // 添加多个点位
        addMarkers: function(markersOption) {
            markersOption.map(item => {
                this.addMarker(item)
            })
        },
        // 移除单个点位
        removeMarker: function(id) {
            var feature = layer.getSource().getFeatureById(id);
            layer.getSource().removeFeature(feature)
        },
        // 编辑点位
        editMarker: function(featureMarker) {
            var translate = new Translate({
                features: new Collection([featureMarker])
            });
            map.addInteraction(translate);
        },
        closeEditMarker: function() {
            map.removeInteraction(select);
        },
        // 打开popup
        openPopup: function(coordinate) {
            content.innerHTML = "<p>你点击的坐标为：" + coordinate + "</p>";
            //设置overlay的显示位置
            overlay.setPosition(coordinate);
        },
        // 关闭popup
        colsePopup: function() {
            overlay.setPosition(undefined);
            return false
        },
        /**
         * @description:添加动画
         * @param {Array} coordinate:坐标[114.064839, 22.548857]
         *
         * @return:
         */
        openAnimation: function(coordinate) {
            // 创建一个Feature，并设置好在地图上的位置
            var circle = new Feature({
                geometry: new Point(coordinate),
            });
            // 设置样式，在样式中就可以设置图标
            circle.setStyle(new Style({
                image: new Circle({
                    radius: 0,
                    stroke: new Stroke({
                        color: 'red',
                        size: 1
                    })
                })
            }));
            layer.getSource().addFeature(circle);
            // 关键的地方在此：监听postcompose事件，在里面重新设置circle的样式
            var radius = 0;
            map.on('postcompose', function() {
                // 增大半径，最大20
                radius++;
                radius = radius % 20;
                // 设置样式
                circle.setStyle(new Style({
                    image: new Circle({
                        radius: radius,
                        stroke: new Stroke({
                            color: 'red',
                            size: 1
                        })
                    })
                }));
            })
        },
        closeAnimation: function(type) {
            map.un(type);
        },

    }
    return map
}

var mapconfig = {
    initMap: initMap
};

export default mapconfig