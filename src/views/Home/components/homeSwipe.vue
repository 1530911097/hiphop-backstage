<template>
  <div class="home-swipe">

  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "homeSwipe-Item",
  setup() {
    let images = reactive([
      "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
      "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
    ]);
    return {
      images,
    };
  },
});
</script>

<style scoped lang="less">
.home-swipe {
  height: 500px;
  background-color: red;
}
</style>
