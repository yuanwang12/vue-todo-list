<template>
  <div class="TodoList">
    <div class="Header">
      <div>
        <input type="text" class="todoInput" v-model="content" @keyup.13="add" @keyup="valid">
        <span style="color: red" :class="{hidden: isError}">请输入内容</span>
      </div>
      <button type="button" class="btn selected" @click="add">添加</button>
   </div>
    <list 
     :lists="dataSource"
     @onDel="handleDel"
     @onCheckAll="handleCheckAll"
     @onDelSelected="handleDelSelected"
     @onChangeState="handleChangeState"
     @onSelect="handleSelect"
      />
    <span>共{{total}}项任务</span><span>已完成{{finished}}项</span><span>未完成{{unfinish}}项</span>
  </div>
</template>

<script>
import list from '@/components/todoList/List'
export default {
  name: 'TodoList',
  data(){
    return{
      content:'测试',
      isError: true,
      idList: [], // 暂存的id数组
      dataSource: [
        {id: '1', text: '任务一', isChecked: true, isFinished: true},
        {id: '2', text: '任务二', isChecked: false, isFinished: false},
        {id: '3', text: '任务三', isChecked: false, isFinished: false},
      ],
    }
  },
  components: {
    list,
  },
  methods:{
    /**
     * 校验
     */
    valid(){
      if(!this.content){
        this.isError=false;
      }else{
        this.isError=true;
      }    
    },
    /**
     * 新增
     */
    add(){
      if(!this.content){
        this.isError = false;
      }else{
        this.isError = true;
      }
      let id = JSON.stringify(Math.random()*10);
      this.dataSource.push({id: id, text: this.content, isChecked: false, isFinished: false});
    },

    /**
     * 删除
     * @ param {String} 当前行id
     */
    handleDel(id, idList){
      this.idList = [...idList]; // 更新idList
      this.dataSource = this.dataSource.filter(item=>{
        return item.id !== id;
      })
    },

    /**
     * 全选
     */
    handleCheckAll(isSelected, idList){
      this.idList = [...idList]; // 更新idList
      this.dataSource.map(item=>{
        item.isChecked = !isSelected;
      })
    },

    /**
     * 删除所选
     */
    handleDelSelected(){
      this.dataSource = this.dataSource.filter(item=>{
        if(!this.idList.includes(item.id)){
          return item;
        }
      })
      // this.dataSource = [];
    },

    /**
     * 全选事件
     */
    handleChangeState(id){
      this.dataSource.map(item=>{
        if(item.id === id){
          item.isFinished = !item.isFinished;
          return item;
        }
      })
    },

    /**
     * 单选事件
     * @ prams {String} 选中项的id
     */
    handleSelect(idList){
      this.idList = [...idList];
    }
  },
  computed:{
    total: function(){
      return this.dataSource.length;
    },
    finished: function(){
      let finishedArr = this.dataSource.filter(item=>{
        return item.isFinished === true
      })
      return finishedArr.length;
    },
    unfinish: function(){
       let unfinishedArr = this.dataSource.filter(item=>{
        return item.isFinished === false
      })
      return unfinishedArr.length;
    },
  },
  mounted(){
    // console.log('getCityFn',this.$store.getters.getCityFn);
    // this.$store.dispatch('setCityName','上海市');
    // console.log('getCityFn',this.$store.getters.getCityFn);
    // this.$store.commit('setCity', '合肥市');
    // console.log('getCityFn',this.$store.getters.getCityFn);
     for(let i=0; i<this.dataSource.length; i++){ // 初始化默认idList数组
       if(this.dataSource[i].isChecked === true){
         this.idList.push(this.dataSource[i].id);
       }
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .TodoList{
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
  }
  .Header{
    display: flex;
    padding: 20px;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .btn-add{
    padding: 0px 14px;
    height: 32px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  .todoInput{
    width: 70%;
    height: 32px;
    border: 1px solid #1890ff;
  }
  .selected{
    color: #fff;
    background-color: #1890ff!important;
  }
</style>
