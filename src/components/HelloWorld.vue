<template>
  <div class="HelloWorld">
    <div class="box" :class="{redbg: isRed}">
      <el-row>
        <el-button type="primary" @click="changebgColor">改变背景颜色</el-button>
        <router-link to="/formlist"><el-button type="info" round>go to formlist</el-button></router-link>
        <router-link to="/TodoList"><el-button type="info" round>go to TodoList</el-button></router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      isRed: false
    }
  },
  methods:{
    changebgColor(){
      this.isRed = !this.isRed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .HelloWorld{
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 0;
  }
  .box{
    height: 100vh;
    border: 1px solid #000;
    background: #fff;
  }
  .redbg{
    background: red;
  }
</style>
