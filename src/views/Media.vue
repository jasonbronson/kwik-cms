<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 p-5">
    <div class="wrapper ">
      <div class="title">
        <span>Media Library</span>
        <button class="button button-upload"><i class="fa-solid fa-file-arrow-up mr-2"></i>Upload Media</button>
      </div>
      <media-card
        v-for="(item, idx) in listMedia"
        :key="idx"
        :url="item.url"
        :name="item.name"
        :createdAt="item.created_at"
      ></media-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaCard from "../components/Media/MediaCard.vue"
export default {
  name: "Media",
  components: {
    MediaCard
  },
  computed: {
  ...mapState({
    listMedia: (state) => state.media.media,
  }),
  },
  async mounted() {
    await this.$store.dispatch("media/fetchAllMedia")
  },
};
</script>

<style scoped lang="scss">
.wrapper{
  padding: 10px;
  border: 1px solid gray;
}
.title {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  span {
    font-size: 16px;
    font-weight: 700;
    color: #44456f;
  }
}
.button {
  padding: 5px 10px;
  border-radius: 4px !important;
  box-shadow: 0 2px 4px 0 rgb(98 97 175 / 29%);
}
.button-upload {
  background: #309c42;
  color: #ffffff;
}
</style>