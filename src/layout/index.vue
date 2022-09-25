<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <div>
        <AsideMenu :form="form"></AsideMenu>
      </div>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="mr-3">
          <el-icon><Bell /></el-icon>
        </div>
        <div class="mr-3">
          <el-icon><Service /></el-icon>
        </div>
        <div class="flex bg-white">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ form.name }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item  command="signOut">退出登录</el-dropdown-item>
                <el-dropdown-item  command="signUp">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <template>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }"
              >homepage</el-breadcrumb-item
            >
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { Bell, Service } from "@element-plus/icons-vue";
import AsideMenu from "./compoenets/AsideMenu.vue";
import { Getinfo } from "@/api/user/user";
export default defineComponent({
  name: "Layout-name",
  components: {
    AsideMenu,
  },
  setup() {
    const router =  useRouter()
    let form = ref({
      name: "",
      sex: "",
      address: "",
      birth: "",
      emit: "",
      plone: "",
      wallet: "",
      vip: "",
      password: "",
      headlogo: "",
    });

    const img = reactive({
      image: "",
    });

    /* 获取数据 */
    const getlist = async () => {
      try {
        const res = await Getinfo();
        form.value = res.data;
        img.image = res.data.headlogo;
      } catch (e) {
      } finally {
      }
    };
    // 操作区
    const handleCommand = (command: string | number | object) => {
      if(command==='signOut'){
       localStorage.removeItem('token')
          router.push({
          name:'login'
        })
      }else{
        router.push({
          name:'setup'
        })
      }
      
    };
    onMounted(() => {
      getlist();
    });
    return {
      handleCommand,
      getlist,
      form,
      Bell,
      Service,
      ArrowRight,
    };
  },
});
</script>

<style scoped lang="less">
.header {
  box-shadow: 0px 2px 0px rgb(0 0 0 / 20%);
  justify-content: flex-end;
  --el-header-height: 54px;
  align-items: center;
  padding-bottom: 2px;
  font-size: 16px;
  color: #ffff;
  display: flex;
  width: 100%;
}
.el-dropdown-link {
  font-weight: 500;
  cursor: pointer;
  color: #000;
}
.el-aside {
  box-shadow: 1px 2px 3px #ececec !important;
}

.el-icon-arrow-down {
  font-size: 12px;
}
.mr-3 {
  text-align: center;
  display: flex;
  margin-right: 1.2rem;
}
</style>
