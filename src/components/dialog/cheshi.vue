<template>
  <el-dialog
    width="400px"
    v-bind="$attrs"
    custom-class="dialogBox"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    title="模板一"
  >
    <el-form :model="from" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="测试2" label-width="50px">
            <el-input v-model="from.num2" placeholder="请输入测试2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <div class="w-full flex px-6 mt-2 text-center">
            <el-button class="w-1/2" @click="handelCancel"> 取消 </el-button>
            <el-button class="w-1/2" @click="handelok"> 确认 </el-button>
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    titles: {
      type: String,
    },
    from: {
      type: Object,
    },
    submit: {
      type: Function,
    },
  },
  setup(props, { emit }) {
    const handelok = () => {
      console.log(props.titles);
      console.log("确认");
    };
    const handelCancel = () => {
      console.log("取消");
    };
    return {
      handelok,
      handelCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  padding: 20px;
  padding-bottom: 10px;
}
//头部按钮位置
:deep(.el-dialog__headerbtn) {
  top: 20px;
  right: 20px;
}
//调节标题文字大小
:deep(.el-dialog__title) {
  line-height: 24px;
  font-size: 18px;
  color: #333333;
}
//内容修改
:deep(.dialogBox .el-dialog__body) {
  padding: 10px 20px 10px 20px;
}
:deep(.el-dialog) {
  border-radius: 7px;
}
</style>
