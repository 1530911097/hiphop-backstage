<template>
  <div class="mouth mt-6">
    <div class="title">
      <Label :lable="title"></Label>
    </div>
    <div class="mt-4">
      <el-card>
        <el-row class="w-full" >
          <el-col :span="6">
            <Block :title="extension" :num1="num1"></Block>
          </el-col>
          <el-col :span="6">
            <Block :title="match" :num1="num2"></Block>
          </el-col>
          <el-col :span="6">
            <Block :title="deal" :num1="num3"></Block>
          </el-col>
          <el-col :span="6">
            <Block :title="transaction" :num1="num4"></Block>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Label from "@/components/label/index.vue";
import Block from "@/components/home/mouthBlock.vue";
export default defineComponent({
  components: {
    Label,
    Block,
  },

  setup() {
    const title = ref("本月指标");
    const extension = ref("推广费用");
    const match = ref("比赛总数");
    const deal = ref("成交量");
    const transaction = ref("交易金额");

    const num1 = ref(100);
    const num2 = ref(150);
    const num3 = ref(200);
    const num4 = ref(18000);
    return {
      title,
      extension,
      match,
      deal,
      transaction,
      num1,
      num2,
      num3,
      num4,
    };
  },
});
</script>
<style scoped lang="less">
.el-card {
  padding: 5px 0px;
  border-radius: 12px;
  
}
.el-card.is-always-shadow {
      box-shadow:var(64,158,255);
}
</style>
