<template>
    <div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2" @click="navigateTo('/main/home')">
        <i class="el-icon-menu"></i>
        <span slot="title" >首页</span>
      </el-menu-item>
      <el-menu-item index="3" @click="navigateTo('/main/user')">
        <i class="el-icon-document"></i>
        <span slot="title" >用户信息</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

<!-- 
        <ul>
            <li v-for="(item) in items" :key="item.index" @click="navigateTo(item)">{{ item.title }}</li>
        </ul> -->
    </div>
</template>

<script>

export default {
    data() {
        return {
            items: []
        }
    },
    methods: {
        navigateTo(path) { //路由跳转
            if (this.$route.path != path) {
                this.$router.push(path)
            }
        }
    }
}

</script>

<style lang="less" scoped>
// ul,
// li {
//     list-style: none;
//     padding: 0;
//     margin: 0;
// }

li {
    // height: 50px;
    // line-height: 50px;
    // background-color: rgb(236, 223, 205);
    // text-align: center;
    // border-top: 1px solid rgb(159, 149, 136);
    cursor: pointer;
    /*火狐*/
    -moz-user-select: none;
    /*webkit浏览器*/
    -webkit-user-select: none;
    /*IE10*/
    -ms-user-select: none;
    /*早期浏览器*/
    -khtml-user-select: none;
    /*通用 */
    user-select: none;
    /* user-select: auto //默认值*/

}
</style>