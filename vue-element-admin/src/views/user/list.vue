<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width:100px">
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-form :model="currentUserList" status-icon :rules="editRules" label-width="100px" class="demo-ruleForm" ref="form">
        <el-form-item label="姓名" prop="username">
          <el-input type="text" v-model="currentUserList.username"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <el-upload class="avatar-uploader" action="123" :show-file-list="false">
            <img v-if="currentUserList.avatar" :src="currentUserList.avatar" class="avatar" style="width:50px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="currentUserList.phone"></el-input>
        </el-form-item>

        <el-form-item label="email" prop="email">
          <el-input v-model="currentUserList.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页器 -->
    <el-pagination background="" layout="prev, pager, next" :total="100" @current-change="changeCurrent"></el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import update from "@/api/update.js";

export default {
  data() {
    const phonePass = (rule, value, callback) => {
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
        callback(new Error("请再次正确的手机号"));
      } else {
        callback();
      }
    };
    const emailPass = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        callback(new Error("请再次正确的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      // tableData: []
      current: 1,
      dialogVisible: false,
      currentUserList: {},
      // 输入框校验
      editRules: {
          username: [{trigger:'blur', required: true, message: '用户名必填'}],
          phone: [{trigger:'blur', required: true,  validator: phonePass}],
          email: [{trigger:'blur', required: true,  validator: emailPass}],
        }
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.list.list
    })
  },
  created() {
    //调用这个请求数据的actions方法
    this.getUserList();
  },
  methods: {
    ...mapActions({
      getUserList: "list/getUserlist",
      updateList: "list/updateList"
    }),
    // 点击页码进行切换
    changeCurrent(page) {
      let token = "1969-12-31T23:59:59.000Z";
      console.log(page, "page");
      // 因为api里面的getUser.js里面的是get获取，参数是通过对象进行拼接，所以需要{page}一下
      this.current = page;
      this.getUserList({ page });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.currentUserList = {...row};
    },
    submit() {
      this.$refs.form.validate(valid=>{
        if (valid){
          console.log('currentUser...', this.currentUserList);
          let {id,username,email,phone} = this.currentUserList;
          this.updateList({id, username, email, phone}).then(res=>{
            this.$message({
              message: res,
              center: true,
              type: 'success'
            });
            this.getUserList({page: this.current});
          }).catch(err=>{
            this.$message({
              message: err,
              center: true,
              type: 'error'
            });
          })
          this.dialogVisible = false;
        }
      })
    },
    handleDelete(index, row) {
      // console.log(index, row);
    }
  }
};
</script>
