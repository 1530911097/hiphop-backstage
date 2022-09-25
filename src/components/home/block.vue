<template>
  <div class="chat-notification" :class="color">
    <!-- <div class="chat-notification-logo-wrapper">
      <el-icon :size="24"><User /></el-icon>
    </div> -->
    <div class="chat-notification-content">
      <p class="chat-notification-title mt-2 first-letter">{{ title }} (人)</p>
      <h4 class="chat-notification-message mt-1">{{ num1 }}</h4>
      <p class="chat-notification-title mt-2 first-letter">Mouth</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    num1: {
      type: Number||String,
    },

    color: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less">
.chat-notification {
  width: 100%;
  padding: 0.7rem 1.5rem 0.7rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.chat-notification-logo-wrapper {
  flex-shrink: 0;
}
.chat-notification-logo {
  height: 3rem;
  width: 3rem;
}
.chat-notification-content {
  margin-left: 0.5rem;
}
.chat-notification-title {
  color: #d4d8df;
  font-size: 0.8rem;
  line-height: 1.25;
}
.chat-notification-message {
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1.5;
}
.blue {
  background-color: #3f51b5;
}
.bblue {
  background-color: #2196f5;
}
.greend {
  background-color: #4baf4f;
}
.ggreend {
  background-color: #009788;
}
</style>
