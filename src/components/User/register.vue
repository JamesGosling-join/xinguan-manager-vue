<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">Register Form</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-form-item prop="phoneNumber">
        <span class="svg-container">
          <i class="el-icon-phone"></i>
        </span>
        <el-input
          ref="phoneNumber"
          v-model="registerForm.phoneNumber"
          placeholder="PhoneNumber"
          name="phoneNumber"
          type="text"
          tabindex="3"
        />
      </el-form-item>

      <el-form-item prop="code" style="display: inline-block;width: 70%;margin-right: 5%">
        <span class="svg-container">
          <i class="el-icon-star-on"></i>
        </span>
        <el-input
          ref="code"
          v-model="registerForm.code"
          placeholder="Code"
          name="code"
          type="text"
          tabindex="4"
          auto-complete="on"
        />

      </el-form-item>
      <el-button style="width:25%;margin-bottom:30px;"
                 @click.native.prevent="sendSMS">{{msg}}
      </el-button>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleRegister">注册
      </el-button>
      <a href="javascript:void(0)" @click="show">登录页面</a>
    </el-form>

  </div>
</template>

<script>
  import {register} from "@/api/login";

  export default {
    name: "Register",
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!value) {
          return callback(new Error('请输入手机号'))
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入手机号'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入手机号'))
            }
          }
        }, 100)
      };
      return {
        registerForm: {
          code: '',
          username: '',
          password: '',
          phoneNumber: ''
        },
        registerRules: {
          code: [{required: true, trigger: 'blur', message: '请输入验证码'}],
          username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
          password: [{required: true, trigger: 'blur', message: '请输入密码'}],
          phoneNumber: [{required: true, trigger: 'blur', validator: checkPhone}],
        },
        loading: false,
        passwordType: 'password',

        redirect: undefined,
        current: 1,
        size: 5,
        msg: '获取验证码'
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      sendSMS() {
        this.$refs.registerForm.validateField('phoneNumber', phoneError => { //验证手机号码是否正确
          if (!phoneError) {
            if(this.msg==='获取验证码') {
              this.$store.dispatch('user/sendSMS', this.registerForm.phoneNumber).then(() => {
                this.msg = 300
                this.timer = setInterval(() => {
                  this.msg--
                  if (this.msg === 0) {
                    this.msg = '获取验证码'
                    clearInterval(this.timer)
                  }
                }, 1000)
              })
            }
          } else {
            return false;
          }
        });
      },
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/register', this.registerForm).then(() => {
              this.$router.push({path: this.redirect || '/'})
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      show() {
        this.$parent.show = true
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
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
          box-shadow: 0 0 0px 1000px $bg inset !important;
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

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

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
  }
</style>
