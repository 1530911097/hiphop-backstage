import store from '@/store/index'
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import Home from "@/views/Home/index.vue";
import Teacher from "@/views/Teacher/index.vue";
import User from "@/views/User/index.vue";
import Student from "@/views/Student/index.vue";
import Login from "@/views/Login/index.vue";
import Picture from '@/views/Config/Picture/index.vue';
import Shop from '@/views/Shop/index.vue';
import Video from '@/views/Examine/Video/index.vue';
import Evaluate from '@/views/Examine/Evaluate/index.vue'
import Setup from '@/views/Setup/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/hiphop/home",
  },
  // 登录页
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: '登录',
    },
  },
  //人员管理
  {
    path: "/hiphop",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/hiphop/home",
        name: "home",
        component: Home,
      },
      {
        path: "/hiphop/teacher",
        name: "eacher",
        component: Teacher,
      },
      {
        path: "/hiphop/user",
        name: "user",
        component: User,
      },
      {
        path: "/hiphop/student",
        name: "student",
        component: Student,
      },

      {
        path: "/config/picture",
        name: "picture",
        component: Picture,
      },
      {
        path: "/shop/index",
        name: "shop",
        component: Shop,
      },

      // 审核
      {
        path: "/evaluate/Video/index",
        name: "video",
        component: Video,
      },
      {
        path: "/evaluate/index",
        name: "evaluate",
        component: Evaluate,
      },
      {
        path: "/setup/index",
        name: "setup",
        component: Setup,
      }
    ],
  },

  //人员管理
  // {
  //   path: "/config",
  //   name: "Layout",
  //   component: Layout,
  //   children: [
  //     
  // },
];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


//是否登录,没登陆就跳登录页
router.beforeEach((to, form, next) => {
  if (store.state.token) {
    next();
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next("/login");
    }
  }
})


export default router;
