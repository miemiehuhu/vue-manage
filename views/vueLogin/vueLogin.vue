<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item
      label-width="80px"
      label="用户名"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        palceholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item
      label-width="80px"
      label="密码"
      prop="password"
      class="password"
    >
      <el-input
        show-password
        type="password"
        v-model="form.password"
        autocomplete="off"
        palceholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
/* import Mock from "mockjs";
import Cookie from "js-cookie"; */
import { getMenu } from "../../api";
import { Message } from "element-ui";

export default {
  name: "vueLogin",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于三3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      // 校验表单
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            // console.log(data);
            if (data.code === 20000) {
              this.$store.commit("clearMenu");
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("setToken", data.data.token);
              this.$router.push({ name: "vueHome" });
              Message.success(data.data.message);
            } else {
              Message.error(data.data.message);
            }
          });
        }
      });
      /*  // token信息
      const token = Mock.random.guid();  // 随机数模拟token信息
      // 将token信息存入cookie，用于不同页面间的通信
      Cookie.set('token',token); */
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  background-clip: padding-box;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  margin: 10px auto 0px auto;
}
</style>