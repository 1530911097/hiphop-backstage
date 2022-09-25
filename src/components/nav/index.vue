<template>
  <div>
    <van-search
      shape="round"
      class="rounded-3xl py-2"
      v-model="Seactvalue"
      placeholder="请输入搜索关键词"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Common-Item",
  emits: ["valueItem"],
  setup(props, ctx) {
    const Seactvalue = ref("");
    ctx.emit("valueItem", Seactvalue.value);
    return {
      Seactvalue,
    };
  },
});
</script>

<style scoped lang="less"></style>
