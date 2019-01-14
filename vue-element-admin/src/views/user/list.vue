<template>
  <div>
     <el-table
      :data="tableData"
      style="width: 100%">
      
      <el-table-column
        label="ID"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="avatar"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width:100px">
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        width="180">
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

      <el-table-column
        label="phone"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      @current-change="changeCurrent"
    >
    </el-pagination>
  </div>
 

</template>

<script>
  import {mapState, mapActions} from 'vuex';
  export default {
    data() {
      return {
        // tableData: []
        current:1,
      }
    },
    computed: {
      ...mapState({
        tableData:state => state.list.list
      })
    },
    created(){
      //调用这个请求数据的actions方法
      this.getUserList()
    },
    methods: {
      ...mapActions({
        getUserList:'list/getUserlist'
      }),
      // 点击页码进行切换
      changeCurrent(page){
        console.log(page, 'page')
        // 因为api里面的getUser.js里面的是get获取，参数是通过对象进行拼接，所以需要{page}一下
        this.getUserList({page})
      },
      handleEdit(index, row) {
        // console.log(index, row,'index1');
      },
      handleDelete(index, row) {
        // console.log(index, row);
      }
    }
  }
</script>
