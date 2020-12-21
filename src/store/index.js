import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    decimal:'',
    percentage:false,
    thousands:false,
    prefix:'',
    postfix:'',
    read:false,
    inputData:''
  },
  mutations: {
    editDecimal(state,dec){
      state.decimal=dec;
    },
    editPercentage(state,percentage){
      state.percentage=percentage;
    },
    editThousands(state,thousands){
      state.thousands=thousands;
    },
    editPrefix(state,prefix){
      state.prefix=prefix;
      
    },
    editPostfix(state,postfix){
     state.postfix=postfix;
    },
    editRead(state,read){
      state.read=read;
    },
    editInput(state,inputData){
      state.inputData=inputData;
    }
  },
  actions: {
  },
  modules: {
  }
})
