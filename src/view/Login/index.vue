<template>
    <div>
这是登录页面
<button @click="navigateTo">点击去到首页</button>
    </div>
  </template>
  
  <script>
  
  export default {

    components: {
    },
    methods:{
      navigateTo(){
        this.$router.push('main/home')
      }
    }
  }
  </script>
  
  <style lang="less">
  
  </style>
  