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
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-tag
            :key="tag"
            v-for="tag in scope.row.rolers">
            {{tag}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="权限" width="180">
        <template slot-scope="scope">
          <el-tag
            :key="tag"
            v-for="tag in scope.row.access">
            {{tag}}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleRolers(scope.$index, scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog :title="type=='edit'?'编辑用户信息':'修改用户权限'" :visible.sync="dialogVisible" width="60%">
      <el-form :model="currentUserList" status-icon :rules="editRules" label-width="100px" class="demo-ruleForm" ref="form">
        <el-form-item v-if="type == 'edit'" label="姓名" prop="username">
          <el-input type="text" v-model="currentUserList.username"></el-input>
        </el-form-item>

        <el-form-item v-if="type == 'edit'" label="头像">
          <el-upload class="avatar-uploader" action="123" :show-file-list="false">
            <img v-if="currentUserList.avatar" :src="currentUserList.avatar" class="avatar" style="width:50px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item v-if="type == 'edit'" label="手机号" prop="phone">
          <el-input v-model="currentUserList.phone"></el-input>
        </el-form-item>

        <el-form-item v-if="type == 'edit'" label="email" prop="email">
          <el-input v-model="currentUserList.email"></el-input>
        </el-form-item>

        <el-form-item v-if="type == 'roler'" label="我的角色">
          <el-tag
            :key="tag"
            closable
            @close="handleColse(tag)"
            v-for="tag in myRolers">
            {{tag}}
          </el-tag>
        </el-form-item>

        <el-form-item v-if="type == 'roler'" label="全部角色">
          <el-tag
            :key="tag"
            v-for="tag in rolers">
            <span @click="addRolers(tag)">{{tag}}</span>
          </el-tag>
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
    // 手机号校验
    const phonePass = (rule, value, callback) => {
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
        callback(new Error("请再次正确的手机号"));
      } else {
        callback();
      }
    };
    // 邮箱校验
    const emailPass = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        callback(new Error("请再次正确的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      //弹框类型,edit表示修改信息，roler表示修改角色
      type:'',
      rolers:['boss','developer','producter','operater','designer'],
      myRolers:[],
      //初始页码
      current: 1,
      dialogVisible: false,
      //初始用户列表
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
      // 获取用户列表
      getUserList: "list/getUserlist",
      // 修改用户信息
      updateList: "list/updateList",
      // 删除用户
      deleteUser:'list/deleteUser',
      // 分配用户权限
      modifyRolers:'list/modifyRolers'
    }),
    // 点击页码进行切换
    changeCurrent(page) {
      let token = "1969-12-31T23:59:59.000Z";
      console.log(page, "page");
      // 因为api里面的getUser.js里面的是get获取，参数是通过对象进行拼接，所以需要{page}一下
      this.current = page;
      this.getUserList({ page });
    },
    // 点击编辑
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.currentUserList = {...row};
      this.type = 'edit'
    },
    // 点击遮罩层的确定
    submit() {
      if (this.type == 'edit') {
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
      } else if (this.type == 'roler') {
        let {id} = this.currentUserList;
        let rolersId = this.myRolers.map(item=>{
          return this.rolers.findIndex(val=>val==item)+1
        })
        this.modifyRolers({uid:id, rolersId}).then(res=>{
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
      
    },
    // 修改权限
    handleRolers(index, row){
      console.log(row)
      this.dialogVisible = true;
      this.currentUserList = {...row};
      this.type = 'roler'
      this.myRolers = [...row.rolers]
    },
    // 点击X号删除权限(修改权限)
    handleColse(rolers){
      console.log(rolers)
      let index = this.myRolers.findIndex(item=>item==rolers)
      this.myRolers.splice(index, 1)
    },
    // 添加权限
    addRolers(rolers){
      this.myRolers.push(rolers)
      this.myRolers = [...new Set(this.myRolers)]
    },

    // 删除用户
    handleDelete(index, row) {
      // console.log(index, row);
      let {id} = row
      this.deleteUser({uid:id}).then(res=>{
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
    },
    
  }
};
</script>
