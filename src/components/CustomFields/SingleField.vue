<template>
  <div
    class="border-gray-300 border-b-2"
    :class="{
      'pb-7': !hidden,
    }"
  >
    <div
      class="flex items-center py-2 px-5 cursor-pointer text-white rounded"
      :class="[
        {
          'bg-primary-200': !hidden,
        },
        {
          'bg-primary-500': hidden,
        },
      ]"
      @click="toggleHidden"
    >
      <div class="flex w-1/4">
        <div
          class="flex rounded-full border-gray-500 border-2 w-10 h-10 items-center justify-center"
        >
          <span>{{ index }}</span>
        </div>
      </div>
      <div class="w-1/4">{{ editData.label || "(No data)" }}</div>
      <div class="w-1/4">{{ editData.name || "(No data)" }}</div>
      <div class="w-1/4 flex justify-between items-center">
        <span> {{ editData.type || "(No data)" }}</span>
        <span class="text-2xl">
          <i class="far fa-angle-up" v-if="!hidden" />
          <i class="far fa-angle-down" v-else />
        </span>
      </div>
    </div>
    <div
      class="flex flex-row-reverse mt-5 px-5"
      :class="{
        hidden: hidden,
      }"
    >
      <div class="m-5 text-xl">
        <i
          @click="handleRemoveField"
          class="fa-solid fa-trash hover:text-red-400 cursor-pointer"
        ></i>
      </div>
      <div class="flex flex-col gap-5 flex-grow">
        <div class="flex gap-5">
          <div class="w-60">
            <span>Field Label</span>
            <span class="text-gray-400 text-sm inline-block italic">
              This is the name which will appear on the EDIT page
            </span>
          </div>
          <input
            v-model="editData.label"
            @blur="fillFieldName"
            placeholder="Field Label"
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>

        <div class="flex gap-5">
          <div class="w-60">
            <span>Field Name</span>
            <span class="text-gray-400 text-sm inline-block italic">
              Single word, no spaces. Underscores and dashes allowed
            </span>
          </div>
          <input
            v-model="editData.name"
            placeholder="Field Label"
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>

        <div class="flex gap-5">
          <div class="w-60">
            <span>Field Type</span>
          </div>
          <select
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
            v-model="editData.type"
          >
            <option>text</option>
            <option>textarea</option>
            <option>number</option>
            <option>media picker</option>
            <option>tinymce editor</option>
          </select>
        </div>

        <div class="flex gap-5 items-start">
          <div class="w-60">
            <span>Instructions</span>
            <span class="text-gray-400 text-sm inline-block italic">
              Instructions for authors. Shown when submitting data
            </span>
          </div>
          <textarea
            v-model="editData.instructions"
            placeholder="Instructions"
            rows="4"
            class="flex-grow border-solid border-2 rounded p-3 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleField",
  data() {
    return {
      editData: {
        label: "",
        name: "",
        type: "",
        instructions: "",
      },
      hidden: false,
    };
  },
  props: {
    index: {
      require: true,
    },
    field: {
      default: () => {},
    },
  },
  methods: {
    fillFieldName() {
      this.editData.name = this.editData.label
        .split(" ")
        .join("_")
        .toLowerCase();
    },
    handleRemoveField() {
      this.$emit("removeField", this.index);
    },
    toggleHidden() {
      this.hidden = !this.hidden;
    },
  },
  watch: {
    editData: {
      handler(value) {
        this.$emit("setFieldValues", this.index, value);
      },
      deep: true,
    },
  },
  mounted() {
    this.editData = this.field;
  },
};
</script>

<style scoped></style>
