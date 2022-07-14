<template>
  <div class="dialog" @click.self="$emit('no')">
    <div class="content">
      <div class="title">
        <p class="text-left">Publish at a specific date and time</p>
        <div class="flex mt-2">
          <div
            class="w-12 h-10 bg-primary-500 rounded-l flex items-center justify-center text-white"
          >
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div class="flex-grow">
            <Datepicker
              placeholder="Publish date"
              input-class="focus:outline-none px-4 w-full flex-grow border-solid border-2 h-10 flex align-center"
              wrapper-class=""
              :disabled-dates="dateDisable"
              v-model="publishDate"
            />
          </div>
          <div
            class="w-20 h-10 bg-primary-500 rounded-r flex items-center justify-center text-white"
          >
            <i class="fas fa-globe-americas text-sm"></i>
            <span class="text-sm ml-2">UTC</span>
          </div>
        </div>
      </div>
      <div class="group-btn text-right">
        <button class="button" @click.prevent="$emit('setSchedule', publishDate)">Schedule</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Datepicker from "vuejs-datepicker";

export default Vue.extend({
  name: "PopupSchedule",
  components: {
    Datepicker,
  },
  data() {
    return {
      dateDisable: {
        to: new Date(),
      },
      publishDate: null
    }
  },
  props: {
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    info: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  computed: {
    customDate() {
      let date = new Date(this.info);
      return date.toLocaleDateString();
    },
  },
});
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
  top: 0;
  left: 0;
  position: fixed;
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
  justify-content: right;
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
