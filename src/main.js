import Vue from 'vue'



import store from './store'
import router from './router/index.js'
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css';  //引入elementui的样式
import '@/css/common.css'
import App from './App.vue'
import axios from 'axios'  //导入axios
// import 'default-passive-events'
// import "./css/common.css"
// import "./api/mock"
Vue.config.productionTip = false
// axios.defaults.baseURL="http://47.115.223.73:4561"  这是我的服务器地址
// axios.defaults.baseURL="http://127.0.0.1:4561"
Vue.prototype.$axios=axios   //在vue的原型上挂载axios，那么vue实例自然就可以通过this.$http 来获取到axios了
Vue.use(ElementUI)
Vue.config.silent = true;  //关闭Vue的警告
window.Vue=Vue


let vm=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.vue=vm