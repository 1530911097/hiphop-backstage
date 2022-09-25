<template>
  <div>
    <div class="title">
      <Label :lable="title"></Label>
    </div>
    <div class="mt-6 flex w-full">
      <el-row class="w-full" :gutter="28">
        <el-col :span="6">
          <Block
            :title="totalpeople"
            :color="'blue'"
            :num1="homelist.userNum"
          ></Block>
        </el-col>
        <el-col :span="6">
          <Block
            :title="teacherpeople"
            :color="'bblue'"
            :num1="homelist.teacherNum"
          ></Block>
        </el-col>
        <el-col :span="6">
          <Block
            :title="studentpeople"
            :color="'greend'"
            :num1="homelist.studentNum"
          ></Block>
        </el-col>
        <el-col :span="6">
          <Block
            :title="outsidepeople"
            :color="'ggreend'"
            :num1="homelist.UserinfoNum"
          ></Block>
        </el-col>
      </el-row>
    </div>
    <Mouth></Mouth>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import Label from "@/components/label/index.vue";
import Block from "@/components/home/block.vue";
import Mouth from "@/views/Home/components/mouth.vue";
import { GetHomeList } from "@/api/home/home";
interface FormRules {
  userNum: Number;
  teacherNum: Number;
  studentNum: Number;
  UserinfoNum: Number;
}
export default defineComponent({
  components: {
    Label,
    Block,
    Mouth,
  },
  setup() {
    const title = ref("累计指数");
    const totalpeople = ref("用户总人数");
    const teacherpeople = ref("教师总人数");
    const studentpeople = ref("学员总人数");
    const outsidepeople = ref("管理总人数");
    const homelist = ref<FormRules>({
      userNum: 0,
      teacherNum: 0,
      studentNum: 0,
      UserinfoNum: 0,
    });
    //获取列表
    const getlist = async () => {
      try {
        const res = await GetHomeList();
        homelist.value = res.data
      } catch (e) {
        console.log(e);
      } finally {
  
      }
    };
    onMounted(() => {
      getlist();
    });
    return {
      title,
      homelist,
      totalpeople,
      teacherpeople,
      studentpeople,
      outsidepeople,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.fromBorder) {
  border: 1px soild #2349a3 !important;
}
</style>
