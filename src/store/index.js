import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './modules/mocule1.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPath:{path:"#/home"}, //当前路由
    theme:"",  //主题
    ifLogin:false, //是否已经登录
  },
  getters: {
    getCurrentPath(state){
    return state.currentPath
    },
    getTheme(state){
      return state.theme
    },
    getIfLogin(state){
      return state.ifLogin
    }
  },
  mutations: { //定义的同步方法(函数)(通过$store.commit("mutation函数名")来修改store.state的值)
    setCurrentPath(state,value){
      state.currentPath=value
     },
     setTheme(state,value){
       state.theme=value
     },
     setIfLogin(state,value){
       state.ifLogin=value
     }
  },
  actions: { //定义的可以是异步方法(通过$store.dispatch("action函数名")，用于异步触发mutation，然后mutation再去改变store.state的值)
    updateCurrentPath(state,value){
      setTimeout(()=>{state.currentPath=value},100)
      
     }
  },
  modules: { //模块，在使用的时候,我们可以 $store.commit("module1/collapseMenu")
    module1
  }
})
