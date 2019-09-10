<template>
  <div class="login-container">
    <div class="curLogin">
      <span class="title">欢迎登录物联网中台系统</span>
      <img src="@/assets/image/login.png" style="width:800px">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <el-form-item>
          <div style="text-align: center;font-size: 19px;font-weight: 800;margin-right: 27px;">登 录</div>
        </el-form-item>
        <el-form-item prop="userName">
          <span class="svg-container" style="margin-right: 10px;">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="userName" style="width:200px" v-model="loginForm.userName" placeholder="请输入用户名" name="userName" type="text" tabindex="1" auto-complete="on" clearable />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container" style="margin-right: 10px;">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" style="width:200px" ref="password" clearable v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd" style="margin-left: 5px;">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:200px;margin-left: 28px" @click="handleLogin('loginForm')">登录</el-button>
      </el-form>
    </div>

  </div>
</template>

<script>
import { resetRouter, asyncRoutes } from '@/router';
import { setToken } from '@/utils/auth'; // get token from cookie
import { login } from '@/request/api';
export default {
  name: 'Login',

  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        type: 'account',
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
    // console.log(banner01);
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.loginForm).then(res => {
            // console.log(res.data.data);
            var token = res.data.data.token;
            setToken(token); //登录成功保存token
            localStorage.setItem('userName', this.loginForm.userName);
            this.$router.push({ path: this.redirect || '/' });
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-form-item__error {
  left: 35px !important;
}
</style>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  position: relative;
  background-image: url('../../assets/image/background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .curLogin {
    width: 800px;
    height: 500px;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    .title {
      position: absolute;
      left: 140px;
      top: 30px;
      color: #34a1fe;
      font-size: 25px;
    }
    .login-form {
      position: absolute;
      bottom: 180px;
      right: 50px;
      width: 260px;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>
