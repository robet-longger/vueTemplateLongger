// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './router/promission'//这里进行路由后台获取的模拟
import axios from 'axios'; // 引入axios
import '@/icons' // icon

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
import $ from 'jquery'
import './assets/css/common.css'
Vue.use(ElementUI);

// Vue.prototype.$http = axios;

//由于vue keep-alive 不能动态删除组件缓存，所以暴力操控该对象中的cache列表：
// Vue.mixin({
//   beforeRouteLeave: function(to, from, next) {
//     if (from && from.meta.rank && to.meta.rank && from.meta.rank > to.meta.rank) {//如果返回上一层，则摧毁本层缓存。
//       if (this.$vnode && this.$vnode.data.keepAlive) {
//         if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
//           if (this.$vnode.componentOptions) {
//             var key = this.$vnode.key == null
//               ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
//               : this.$vnode.key;
//             var cache = this.$vnode.parent.componentInstance.cache;
//             var keys = this.$vnode.parent.componentInstance.keys;
//             if (cache[key]) {
//               if (keys.length) {
//                 var index = keys.indexOf(key);
//                 if (index > -1) {
//                   keys.splice(index, 1);
//                 }
//               }
//               delete cache[key];
//             }
//           }
//         }
//       }
//       this.$destroy();
//     }
//     next();
//   },
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
