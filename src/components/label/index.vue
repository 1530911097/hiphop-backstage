<template>
  <div class="flex">
    <div class="w-1 my-1 bg-teal-300"></div>
    <span class="ml-2 text-sky-500 font-bold">{{ lable }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  props: {
    lable: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>
