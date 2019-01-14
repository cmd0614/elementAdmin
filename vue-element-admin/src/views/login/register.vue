<template>
  <div class="login-container">

    <el-form ref="registerForm" class="login-form" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ $t('login.register') }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          :placeholder="$t('login.username')"
          v-model="registerForm.username"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          type="password"
          v-model="registerForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on" />
        <span class="show-pwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="register">
        <span class="svg-container">
          <i class="el-icon-mobile-phone"></i>
        </span>
        <el-input
          placeholder="手机号"
          name="password"
          v-model="registerForm.phone"
          auto-complete="on" />
        <span class="show-pwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
    </el-form>

  </div>
</template>

<script>
export default {
  data () {
    
    return {
      registerForm: {
        username: '',
        password: '',
        phone:''
      },
      registerRules:{
        username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', message:'请填写密码' }],
        phone:[{required:true, message:'请填写手机号'}]
      }
    }
  },
  methods: {
    handleRegister(){
      // 回去元素，进行校验
      this.$refs.registerForm.validate(valid=>{
        if(valid) {
          // 如果成功，引用store里面的user.js的action
          this.$store.dispatch('registerGetUserName',this.registerForm).then(res=>{
            console.log(res,'res---register')
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          }).catch(err=>{
            this.$message({
              message: err,
              type: 'warning'
            })
          })
        } else {

        }
      })
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
