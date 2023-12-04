export default {
    namespaced: true,
    state: {
        isCollapse: false,
 
    },
    mutations: {
        //定义菜单展开还是收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
    }
}