import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    model:'testWife/kesshouban_v1.2.model.json',
    navShrink:false
  },
  getters:{
  },
  mutations: {
    modelChange(state, payload){
      state.model = payload
    },
    navChange(state){
      state.navShrink = !state.navShrink
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
