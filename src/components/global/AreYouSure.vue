<template>
  <div class="dialog">
    <div class="content">
      <div class="title">
        <p>{{ text }}</p>
      </div>
      <div class="group-btn">
        <button class="button" @click="$emit('yes')">Yes</button>
        <button class="button" @click="$emit('no')">No</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AreYouSure',
  props: {
    text: {
      type: String,
      required: false,
      default: undefined,
    },
  },
})
</script>
<style lang="scss">
.title {
  text-align: center;
  word-break: break-word;
  margin-bottom: 20px;
}
.dialog {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  background-color: white;
  padding: 50px;
}
.group-btn {
  display: flex;
  justify-content: center;
  .button {
    padding: 5px 10px;
    border-radius: 4px !important;
    box-shadow: 0 2px 4px 0 rgb(98 97 175 / 29%);
    background: #ffffff;
    color: black;
    border: 1px solid black;
    margin-left: 10px;
  }
}
</style>
