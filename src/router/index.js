import Vue from "vue"
import VueRouter from "vue-router"
// import store from "@/store"
Vue.use(VueRouter)


//导入组件
import  Main  from "../view/Main"
import Home from "../view/Home"
import Login from "../view/Login"

//创建路由
const routes = [
    {
        path: "/",
        // component:Login,
        redirect:"/login"
    },
    {
        path:"/login",
        component:Login,
        meta:["登录"]
    },
    {
        path:"/home",
        redirect:"/main/home",
    },
    {
        path:"/main",
        component:Main,
        redirect:"/main/home",

        children:[
            {
                path:"/main/home",
                component:Home,
                name:"",
                // meta:["主页"],
            },
            {
                path:"/main/user",
                component:()=>import("../view/User"),
                meat:[]
            }
        

        ]
    },

]




//创建VueRouter的实例对象，并且导出
const router= new VueRouter({
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {

    // 如果目标地址与当前地址相同，则不需要跳转。（但好像没啥用，报错先于这个路由守卫执行）
    if(from.path===to.path){
        next(false)  //拦截，不予通行
        return
    }
   next() //通行
// const currentPath = to.path
//     //如果不是去登录页面的话，那就需要看看是否有登录状态了
//     if(to.path!="/login"){

//    if(sessionStorage.getItem("loginState") && localStorage.getItem("username") ){
    
//     next()
//    }else{
//    console.log(sessionStorage.getItem("loginState") ,localStorage.getItem("username"))
//     next("/login")
//    }

//     }
//     // next(false)
//     // 更新面包屑的值
//     // 例如，可以使用 Vuex 存储面包屑的值
//     // 并在这里调用 Vuex 的 action 修改面包屑的值
//     store.dispatch('updateCurrentPath', currentPath)
//     next()
  })

  //导航守卫
//   router.beforeResolve((to, from, next) => {
//     // 在异步操作完成后进行路由的实际切换
//     // 这里可以执行一些异步逻辑，例如加载组件
//     // 最后调用 next() 完成导航

//     next();
//   });

  export default router
