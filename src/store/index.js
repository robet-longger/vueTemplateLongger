import vuex from 'vuex'
import Vue from 'vue'

Vue.use(vuex);
var store = new vuex.Store({//store对象
  state: {
    keepAlive: []
  },
  mutations: {
    SET_KEEP_ALIVE: (state, keepAlive) => {
      state.keepAlive = keepAlive
    }
  },
  getters: {
    keepAlive: state => state.keepAlive
  }
})

export default store