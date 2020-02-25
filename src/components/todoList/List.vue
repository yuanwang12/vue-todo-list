<template>
  <div class="List">
    <div class="ListHeader">
      <div class="title">任务列表</div>
      <div>
        <button type="button" class="btn btn-default" @click="show('un', $event)" :class="{selected: unBtnFlag}">未完成</button>
        <button type="button" class="btn btn-default" @click="show('fin', $event)" :class="{selected: btnFlag}">已完成</button>
        <button type="button" class="btn btn-default" @click="show('all', $event)" :class="{selected: allBtnFlag}">全部</button>
      </div>
    </div>
      <div class="content" :key="list.id" v-for="list in dataSource">
        <input type="checkbox" v-model="list.isChecked" @click="toggleSelect(list.id)">
        <span>{{list.text}}</span>
        <div>
          <button type="button" class="btn btn-success" v-if="list.isFinished" @click="changeState(list.id)">标记已完成</button>
          <button type="button" class="btn btn-warning" v-else @click="changeState(list.id)">标记未完成</button>
          <button type="button" class="btn btn-danger" @click="del($event)"><input type="hidden" v-model="list.id">删除</button>
        </div>
      </div>
   <div class="ListFooter">
     <input type="checkbox" v-model="isSelectAll" @click="ckeckAll">
     <button type="button" class="btn btn-danger" @click="delSelected">删除所选</button>
   </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return{
      idList: [],
      btnFlag: false,
      dataSource: [], // 列表数据源
      thisFlag: 'all', // 默认全部 控制显示全部 完成 未完成
      unBtnFlag: false,
      allBtnFlag: true,
      isSelectAll: false, // 是否全选状态控制
    }
  },
  props:{
    lists:{
      type: Array,
      required: true,
      default: ()=>[{text: '暂无数据'}]
    }
  },
  mounted(){
    this.dataSource = [...this.lists]
    for(let i=0; i<this.lists.length; i++){
      if(this.lists[i].isChecked === true){
        this.idList.push(this.lists[i].id);
      }
    }
    if(this.idList.length === this.lists.length){ // 初始化的时候 如果全部单选都被勾选 全选状态为true
      this.isSelectAll = true;
    }
  },
  methods:{
    /**
     * 删除当前行
     * @ param {String} 删除行的id
     * @ param {Array} 选中行的id集合
     */
    del(e){
      let id = e.target.children[0].value;
      if(this.idList.includes(id)){
        let index = this.idList.indexOf(id);
        this.idList.splice(index, 1);
      }
      this.$emit("onDel", id, this.idList)
    },

    /**
     * 全选
     */
    ckeckAll(){
      if(!this.isSelectAll){
        for(let i=0; i<this.lists.length; i++){
          if(!this.idList.includes(this.lists[i].id)){
            this.idList.push(this.lists[i].id);
          }
        }
      }else{
        this.idList = [];
      }
      this.$emit("onCheckAll", this.isSelectAll, this.idList)
    },

    /**
     * 删除所选
     */
    delSelected(){
      this.idList = []; // 把当前idList置空
      this.$emit("onDelSelected");
    },

    /**
     * 展示列表 || 所有 || 未完成 || 已完成
     * @ param {String} 选择类型标志
     */
    show(flag, e){
      let btnName = e.target.innerText;
      this.unBtnFlag = false;
      this.btnFlag = false;
      this.allBtnFlag = false;
      if(btnName === '未完成'){
        this.unBtnFlag = true;
      }
      if(btnName === '已完成'){
        this.btnFlag = true;
      }
      if(btnName === '全部'){
        this.allBtnFlag = true;
      }
      this.thisFlag = flag; // 改变当前
      this.filterDataSource();
    },

    /**
     * 过滤数据源
     */
    filterDataSource(){
      if(this.thisFlag === 'all'){ // 全部
        this.dataSource = [...this.lists];
      }else if(this.thisFlag === 'un'){ // 未完成
        this.dataSource = [...this.lists].filter(item=> item.isFinished === false)
      }else{ // 已完成
         this.dataSource = [...this.lists].filter(item=> item.isFinished === true)
      }
    },

     /**
     * 改变是否完成状态
     */
    changeState(id){
      this.$emit('onChangeState', id)
    },

     /**
     * 单选事件 决定全选是否为true
     * @ prams {String} 当前行id
     */
    toggleSelect(id){
      if(!this.idList.includes(id)){
        this.idList.push(id);
      }else{
        let index = this.idList.indexOf(id);
        this.idList.splice(index, 1);
      }
      this.changeSelectAllStatus(); // 更改全选状态
      this.$emit('onSelect', this.idList)
    },

    /** 
     * 更改全选状态
    */
    changeSelectAllStatus(){
       if(this.idList.length === this.lists.length){ // 单选全部为true时 全选状态为true
        this.isSelectAll = true;
      }else{
        this.isSelectAll = false;
      }
    },
  },
  watch: {
    'lists':{
      handler(){
        this.filterDataSource(); // 过滤展示
        this.changeSelectAllStatus(); // 更改全选状态
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .List{
    padding: 20px;
    border: 1px solid #ececec;
  }
  .title{
    float: left;
  }
  .ListHeader,
  .ListFooter{
    height: 40px;
    border: 1px solid #ececec;
    line-height: 40px;
    background: #ececec;
  }
  .ListFooter,
  .ListHeader{
    display: flex;
    justify-content: space-between;
  }
 .content{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
    text-decoration: none;
    list-style: none;
  }
  input[type=checkbox]{
    margin-top: 12px;
  }
  .selected{
    color: #fff;
    background-color: #1890ff!important;
  }
  
</style>
