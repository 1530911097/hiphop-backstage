<template>
  <div>
    <div class="title">后台管理系统</div>
    <div class="UserInfo border py-6" @click="handleToup">
      <div class="headPortrait">
        <img :src="form.headlogo" mode="scaleToFill" />
      </div>
      <div class="text-sm py-1">{{ form.name }}</div>
      <div class="text-sm">{{ form.emit }}</div>

      <div></div>
    </div>
    <el-menu
      :collapse-transition = "false"
      active-text-color="#f26e9a"
      background-color="#ffffff"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#000"
    >
      <el-menu-item index="/" @click="handleTo">
        <el-icon><Basketball /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>用户管理
        </template>
        <el-menu-item index="/hiphop/user" @click="handleTo">
          <el-icon><Flag /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/hiphop/student" @click="handleTo">
          <el-icon><UserFilled /></el-icon>
          <span>学员管理</span>
        </el-menu-item>
        <el-menu-item index="/hiphop/teacher" @click="handleTo">
          <el-icon><Avatar /></el-icon>
          <span>教师管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Monitor /></el-icon>配置管理
        </template>
        <el-menu-item index="/config/picture" @click="handleTo">
          <el-icon><Picture /></el-icon>
          <span>App轮播图</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><ShoppingBag /></el-icon>商品管理
        </template>
        <el-menu-item index="/shop/index" @click="handleTo">
          <el-icon><Wallet /></el-icon>
          <span>App商品管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><User /></el-icon>审核中心
        </template>
        <el-menu-item index="/evaluate/Video/index" @click="handleTo">
          <el-icon><VideoPlay /></el-icon>
          <span>视频审核</span>
        </el-menu-item>
        <el-menu-item index="/evaluate/index" @click="handleTo">
          <el-icon><Headset /></el-icon>
          <span>评价审核</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon><Setting /></el-icon>设置
        </template>
        <el-menu-item index="/setup/index" @click="handleTo">
          <el-icon><Edit /></el-icon>
          <span>修改信息</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import {
  Basketball,
  Bicycle,
  Setting,
  Burger,
  User,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "Layout-asideMenu",
  props: {
    form: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const handleTo = (menuItem: { index: string }) => {
      router.push(menuItem.index);
    };
    const handleToup = () => {
      router.push({ name: "setup" });
    };
    return {
      Basketball,
      Bicycle,
      Setting,
      Burger,
      User,
      handleToup,
      handleTo,
    };
  },
});
</script>

<style lang="less" scoped>
:deep.el-aside {
  // background: $primary-color;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}

:deep(.is-active) {
  background-color: #e6e2e2;
}

:deep(.el-menu-item) .is-active {
  border-left: 5px solid #f26e9a;
}

:deep(.el-menu-item) {
  height: 47px;
  line-height: 47px;
}
.title {
  box-shadow: 0px 2px 0px rgb(0 0 0 / 8%);
  // border-bottom: 3px solid #f7f7f7;
  font-size: 15px;
  // border-radius: 10px;
  padding: 16px 0px 16px 10px;
  text-align: left;
  // color: #ffffff;
}
.UserInfo {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  .headPortrait {
    cursor:pointer;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }
}
</style>
