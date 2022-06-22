<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 p-5">
    <div class="wrapper border border-primary-100 bg-white">
      <div class="title flex justify-between py-8 m-4">
        <span class="text-xl text-primary-200">Media Library</span>
        <button
          class="button button-upload py-2 px-4 rounded-md bg-green-200 text-white"
        >
          <i class="fa-solid fa-file-arrow-up mr-2"></i>Upload Media
        </button>
      </div>
      <div
        class="border border-l-0 border-r-0 border-primary-100 px-4 flex justify-between"
      >
        <div class="">
          <BackgroundTab :data="allTypes" v-model="currentType"></BackgroundTab>
        </div>
        <div class="flex justify-between my-1">
          <div
            class="border rounded overflow-hidden flex mr-4 text-primary-400"
          >
            <select name="sort" id="sort" class="bg-white">
              <option
                v-for="(item, idx) in sortTypes"
                :key="idx"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </select>
            <button
              class="flex items-center justify-center px-4 border-l bg-primary-100 hover:bg-primary-200"
            >
              <i class="fas fa-sort-alt text-primary-400"></i>
            </button>
          </div>
          <div class="border rounded overflow-hidden flex">
            <input type="text" class="px-4 py-1" placeholder="Search..." />
            <button
              class="flex items-center justify-center px-4 border-l bg-primary-100 hover:bg-primary-200"
            >
              <i class="fas fa-search text-primary-400"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="m-4">
        <media-card
          v-for="(item, idx) in listMedia"
          :key="idx"
          :url="item.url"
          :name="item.name"
          :createdAt="item.created_at"
          class="border border-b-0 last:border-b border-primary-100"
        ></media-card>
      </div>
    </div>
    <!-- popup -->
    <popup-choose-image
      :visible="showChooseImage"
      @no="closeChooseImage"
      @yes="setImage"
    ></popup-choose-image>
    <!-- popup -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import MediaCard from "../components/Media/MediaCard.vue";
import BackgroundTab from "../components/BackgroundTab.vue";
import PopupChooseImage from "../components/global/PopupChooseImage.vue";
export default {
  name: "Media",
  data() {
    return {
      currentType: {},
      allTypes: [
        {
          title: "All",
          id: "all",
        },
        {
          title: "Image",
          id: "image",
        },
      ],
      sortTypes: [
        {
          title: "Sort By Date Created",
          id: "date",
        },
        {
          title: "Sort By Editor",
          id: "editor",
        },
        {
          title: "Sort By Name",
          id: "name",
        },
      ],
      showChooseImage: true,
    };
  },
  components: {
    MediaCard,
    BackgroundTab,
    PopupChooseImage,
  },
  computed: {
    ...mapState({
      listMedia: (state) => state.media.media,
    }),
  },
  methods: {
    closeChooseImage() {
      this.showChooseImage = false;
      // this.$store.dispatch('media/addFolder', {
      //   filename: fileName,
      // })
    },
    setImage(value) {
      this.showChooseImage = false;
      console.log("value---------", value);
    },
  },
  async mounted() {
    await this.$store.dispatch("media/fetchAllMedia");
  },
};
</script>

<style scoped lang="scss"></style>
