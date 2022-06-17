<template>
  <div class="flex">
    <div class="w-1/2 pt-5 pb-16 pl-8 pr-32 flex flex-col gap-2">
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fas fa-user mr-2"></i>
          <span>Author</span>
        </div>
        <div>
          <select
            class="w-full border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
          >
            <option>User 1</option>
            <option>User 2</option>
            <option>User 3</option>
          </select>
        </div>
      </div>
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fas fa-calendar-alt mr-2"></i>
          <span> Publish Date <span class="text-blue-300">(UTC)</span> </span>
        </div>
        <div class="flex">
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
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fas fa-tags mr-2"></i>
          <span> Categories <span class="text-blue-300">(manage)</span> </span>
        </div>
        <div class="flex gap-7">
          <input
            placeholder="comma, seperated, categories"
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
          <select
            class="w-48 border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
          >
            <option>Recent</option>
            <option>Example Category</option>
          </select>
        </div>
      </div>
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fas fa-tags mr-2"></i>
          <span> Tags<span class="text-blue-300">(manage)</span> </span>
        </div>
        <div class="flex gap-7">
          <input
            placeholder="comma, seperated, tags"
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
          <select
            class="w-48 border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
          >
            <option>Recent</option>
            <option>Example Tags</option>
          </select>
        </div>
      </div>
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fal fa-list-ul mr-2"></i>
          <span>Summary</span>
        </div>
        <div class="flex gap-7">
          <textarea
            v-model="editData.summary"
            rows="4"
            class="flex-grow border-solid border-2 rounded p-3 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>
      </div>
    </div>
    <div class="w-1/2 pt-5 pb-16 pl-8 pr-32 flex flex-col gap-2">
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fal fa-image mr-2"></i>
          <span>Featured Image</span>
        </div>
        <div class="flex justify-center mt-2">
          <div class="w-full">
            <div class="flex items-center justify-center w-full">
              <label
                class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer"
              >
                <div class="flex flex-col items-center justify-center pt-7">
                  <i class="fa-solid fa-image text-4xl mb-2"></i>
                  <p class="pt-1 tracking-wider text-gray-400 text-xs">
                    <span class="text-primary-500">Choose a media</span> or Drag
                    and Drop file
                  </p>
                </div>
                <input type="file" class="opacity-0" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="text-primary-200 flex items-center h-10 text-sm font-semibold"
        >
          <i class="fas fa-tags mr-2"></i>
          <span> Featured Image Alt Text </span>
        </div>
        <div class="flex gap-7">
          <input
            placeholder="Featured Image Alt Text"
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
export default {
  name: "Metadata",
  components: {
    Datepicker,
  },
  data() {
    return { editData: { summary: "" } };
  },
  props: {
    post: {
      default: () => {},
    },
  },
  watch: {
    editData: {
      handler(value) {
        this.$emit("handleMetaDataChange", value);
      },
      deep: true,
    },
    post(value) {
      this.editData = { summary: value?.summary };
    },
  },
};
</script>

<style scoped></style>
