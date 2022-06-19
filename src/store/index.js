import Vue from 'vue'
import VueX from 'vuex'
import state from './states'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import mutations_type from './mutations-type'

Vue.use(VueX)

const store=new VueX.Store({
  state,
  getters,
  actions,
  mutations,
  mutations_type
  });

export  default  store
