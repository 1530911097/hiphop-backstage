<template>
  <div class="chat-notification p-1 flex items-center">
    <div class="chat-notification-logo-wrapper">
      <el-icon :size="36"><User /></el-icon>
    </div>
    <div class="chat-notification-content ml-5">
      <p class="chat-notification-title mt-2 first-letter">{{title}}</p>
      <h4 class="chat-notification-message mt-1">{{num1}}</h4>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    num1: {
      type: Number||String,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less">
.chat-notification {
  background-size: 100% 100%;
  width: 100%;
  border-radius: 0.5rem;

}
.chat-notification-logo-wrapper {
  flex-shrink: 0;
}
.chat-notification-logo {
  height: 3rem;
  width: 3rem;
}

.chat-notification-title {
  color: #7a7e82;
  font-size: 0.8rem;
  line-height: 1.25;
}
.chat-notification-message {
  color: #0d0c0c;
  font-size: 1.3rem;
  line-height: 1.5;
}
</style>
