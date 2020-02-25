<template>
  <div class="formList">
    <h1>这是form表单</h1>
    <el-row :style="{textAlign: 'left'}">
      <router-link to="/"><el-button>返回</el-button></router-link>
    </el-row>
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline" :rules="rules" ref="ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="empNumber">
        <el-input v-model="ruleForm.empNumber" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="ruleForm.gender" placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <br/>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="empNumber"
        label="工号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'FormList',
  data(){
    return{
      ruleForm: {
          name: '汪渊',
          empNumber: '25801',
          gender: '男',
          phone: '15755329580',
          address: '上海市青浦区汇联路33号'
        },
        tableData: [],
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          empNumber: [
            { required: true, message: '请输入工号', trigger: 'change' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'change' },
            { max: 11, message: '不能超过 11 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'change' }
          ]
        }
    }
  },
  methods:{
    /**
     * 提交
     */
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '提示',
              message: '提交成功',
              type: 'success'
            });
            this.tableData.push(this.ruleForm);
          } else {
            return false;
          }
        });
    },
    /**
     * 编辑
     */
    handleEdit(){
      this.tableData = [...this.tableData ]
    },
    /**
     * 删除
     */
    handleDelete(index){
      if(index !== ''){
        this.tableData = this.tableData.filter((item, i)=>{
          return i !== index;
        })
        this.$notify({
          title: '提示',
          message: '删除成功',
          type: 'success'
        });
      }
    }
  }
}
</script>
<style scoped>
  h1{
    text-align: center;
  }
  .formList{
    padding: 20px;
    margin: 0 auto;
    height: 100vh;
    max-width: 1200px;
    background-color: #fff;
  }
</style>


