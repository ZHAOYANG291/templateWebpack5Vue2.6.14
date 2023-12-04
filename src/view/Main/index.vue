<template>
    <div class="main">
        <el-container class="thecontainer">
            <el-header>
                <CommonHeader></CommonHeader>
            </el-header>
            <el-container class="theContent">
                <el-aside width="200px">
                    <CommonAside></CommonAside>
                </el-aside>
                <el-main> <router-view></router-view> </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import CommonAside from "@/components/common/CommonAside.vue";
import CommonHeader from "@/components/common/CommonHeader.vue";
export default {
    data() {
        return {};
    },
    components: {
        CommonAside,
        CommonHeader
    },
};
</script>
  
<style lang="less" scoped>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.main {
    margin: 0 auto;
    background-color: rgba(144, 147, 153, 0.3);
    padding: 0;
    width: 100vw;
    height: 100vh;

    // overflow: hidden;
    // min-height: 700px;
    .thecontainer {
        width: 100%;
        height: 100%;

        .theContent {
            width: 100%;
            height: 100%;
        }
    }

}

// @media screen and (min-device-width: 1500px)  {
//  .main{
//   width: 100vw;
//   height: 100vh;
//   min-width: 1500px;
//   min-height: 700px;
//  }
// }</style>