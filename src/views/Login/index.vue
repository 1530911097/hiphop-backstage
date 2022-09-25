<template>
  <div class="login flex justify-center items-center h-full">
    <div
      element-loading-background="rgba(11 9 9 / 20%)"
      class="text-center rounded-xl shadow-xl login_item py-8 px-14"
    >
      <div class="text-white font-bold">Hiphop后台管理系统</div>
      <div
        class="mt-6 w-72"
        element-loading-background="rgba(11, 9, 9, 0.3)"
        element-loading-text="网络连接中..."
        v-loading="loading"
      >
        <el-form :model="form" ref="ruleFormRef" :rules="rules">
          <el-form-item prop="user_name">
            <el-input
              box-shadow
              maxlength="18"
              minlength="6"
              v-model="form.user_name"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              box-shadow
              type="password"
              show-password
              maxlength="18"
              minlength="6"
              v-model="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="flex justify-between">
          <div class="text-left ml-2 cursor-pointer text-white">
            <span>忘记密码</span>
          </div>
          <div class="text-right cursor-pointer text-white" @click="handelbtn">
            <div>{{ islogin ? "登录" : "注册" }}</div>
          </div>
        </div>
        <div class="w-full mt-3">
          <el-button
            class="w-full rounded-md text-white"
            v-if="islogin"
            @click="handelRegister(ruleFormRef)"
            >注册</el-button
          >
          <el-button
            @keyup="handelLogin"
            class="w-full rounded-md text-white"
            v-else
            @click.prevent="handelLogin()"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const ruleFormRef = ref<FormInstance>();
import { defineComponent, reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { Postlogin, Postregister } from "@/api/user/user";
import { useLoginsuccess } from "@/views/Login/composables/useLoginsuccess";
import { useRouter } from "vue-router";
import store from "@/store";

export default defineComponent({
  name: "login-block",
  setup() {
    const islogin = ref(false);
    const loading = ref(false);
    const router = useRouter();
    //验证登录
    const rules = reactive<FormRules>({
      user_name: [
        {
          required: true,
          message: "请输入账号",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "change",
        },
        { min: 6, max: 18, message: "最少6位最多18位", trigger: "blur" },
      ],
    });

    //输入
    const form = reactive({
      user_name: "",
      password: "",
    });

    //切换登录|账号|重置
    const handelbtn = async () => {
      loading.value = true;
      islogin.value = !islogin.value;
      setTimeout(() => (loading.value = false), 1000);
      form.user_name = "";
      form.password = "";
    };

    //注册账号
    const handelRegister = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          try {
            const res = await Postregister(form);
            ElMessage.success(res.message);
            handelbtn()
          } catch (e) {
            console.log('请求失败')
          }
        } else {
          ElMessage.error("注册失败")
        }
      });
    };

    //登录
    const handelLogin = async () => {
      try {
        loading.value = true;
        const res = await Postlogin(form);
        store.commit("getInfo", res.data.token);
        router.push("/hiphop/home");
        useLoginsuccess(res.data.token);
        ElMessage.success(res.message);
      } catch (e: any) {
        ElMessage.error(e.response.data.message);
      } finally {
        loading.value = false;
      }
    };
    return {
      handelRegister,
      handelLogin,
      handelbtn,
      ruleFormRef,
      islogin,
      router,
      loading,
      rules,
      form,
    };
  },
});
</script>

<style scoped lang="less">
.login {
  background-image: url("@/assets/login/login.jpg");
  background-size: 100% 100%;
}
.login_item {
  background-color: rgb(11 9 9 / 30%);
}
</style>
