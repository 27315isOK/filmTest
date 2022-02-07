import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: {
      cityId: 210200,
      isHot: 0,
      name: "大连",
      pinyin: "dalian"
    }
  },
  mutations: {
    setCity(state, city) {
      state.city = city
    }
  },
  actions: {
  },
  modules: {
  }
})
