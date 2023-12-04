<template>
  <div>
    <div class="test">
      这是主页
      <i class="el-icon-edit"></i>
      <p class="pp">你好</p>
      <p class="p2">...</p>
    </div>
    <router-view></router-view>
  </div>
</template>
  
<script>

export default {

  components: {
  }
}
</script>
  
<style lang="less">
.test {
  height: 200px;
  // overflow: hidden;
}

.pp {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
  