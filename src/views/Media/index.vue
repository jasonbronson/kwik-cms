<template>
  <div class="bg-primary-600 px-8 wrapper">
    <div class="inner">
      <div class="title flex justify-between py-8">
        <span class="text-xl text-primary-200">Media Library</span>
        <button
          @click="handleShowPopup"
          class="button button-upload p-2 rounded-md bg-green-200 text-white"
        >
          <i class="fa-solid fa-file-arrow-up mr-2"></i>Upload Media
        </button>
      </div>
      <el-container class="media-panel">
        <el-container class="media-panel-inner">
          <div class="flex justify-start my-1">
            <div class="border rounded overflow-hidden flex mr-4">
              <input type="text" class="p-2" placeholder="Search..." />
              <button
                class="flex items-center p-2 justify-center border-l bg-primary-100 hover:bg-primary-200"
              >
                <i class="fas fa-search text-primary-400"></i>
              </button>
            </div>
            <div
              class="border rounded overflow-hidden flex mr-4 text-primary-400"
            >
              <select name="sort" id="sort" class="bg-white p-2">
                <option v-for="(year, idx) in years" :key="idx" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>

          <el-main
            ref="scroll-container"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isNotScrolling"
            style="border: 1px solid #eee"
          >
            <div class="gallery-body">
              <div class="gallery-image">
                <div
                  v-for="media of listData"
                  :key="media.id"
                  class="gallery-image-item"
                >
                  <div class="thumbnail">
                    <a class="image-wrap" :href="media.url" target="_new">
                      <img :src="media.url" />
                    </a>
                    <div class="photo-name-wrap">
                      <span class="photo-name">{{ media.name }}</span>
                      <!-- <a href="#" @click="downloadImage(media)">
                        <i class="el-icon-download"></i>
                      </a> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="gallery-loading">
                <div class="dot-flashing" v-if="isLoading"></div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
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

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
// import MediaCard from "../../components/Media/MediaCard.vue";
// import BackgroundTab from "../../components/BackgroundTab.vue";
import PopupChooseImage from "../../components/global/PopupChooseImage.vue";
export default Vue.extend({
  components: {
    // MediaCard,
    // BackgroundTab,
    PopupChooseImage,
  },
  data() {
    return {
      years: [],
      showChooseImage: false,
    };
  },
  computed: {
    ...mapState({
      listData: (state) => state.media.media,
      loading: (state) => state.media.loading,
      isFull: (state) => state.media.isFull,
    }),
    listTotal() {
      return Array.isArray(this.listData) ? this.listData.length : 0;
    },
    isNotScrolling() {
      return this.loading || this.isFull;
    },
    isLoading() {
      return this.loading && !this.isFull;
    },
  },
  async mounted() {
    var currentYear = new Date().getFullYear();
    this.years = new Array(5).fill(0).map((val, index) => currentYear - index);

    await Promise.all([this.fetchMedia()]);
  },
  methods: {
    ...mapActions({
      fetchMedia: "media/fetchAllMedia",
      uploadMedia: "media/uploadMedia",
    }),
    loadMore() {
      const payload = {
        pageOffset: this.listTotal,
        pageSize: 25,
        query: this.getQuery(),
        sort: "&sort[0]=created_at&sortby[0]=desc",
      };
      this.fetchMedias(payload);
    },
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
    handleShowPopup() {
      this.showChooseImage = true;
    },
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 50px);
}
.inner {
  padding: 0 3rem;
  max-width: none;
  height: calc(100vh - 90px);
}
.header-panel {
  height: 90px;
}
.media-panel {
  height: calc(100% - 104px);
  .media-panel-inner {
    display: flex;
    flex-direction: column;
  }
}
.folder-list {
  /* width: 300px; */
}
.gallery-header {
  /* height: 40px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-body {
  height: 100%;
  .gallery-image {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: stretch;
    .gallery-image-item {
      width: calc(100% / 1);
      .thumbnail {
        box-sizing: border-box;
        padding: 0.5rem;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 0.5rem;

        .image-wrap {
          flex-grow: 1;
          display: flex;
          box-shadow: inset 0 0 15px rgb(0 0 0 / 10%),
            inset 0 0 0 1px rgb(0 0 0 / 5%);
          background: #eee;
          position: relative;
          &::before {
            content: "";
            width: 100%;
            padding-top: 100%;
            display: block;
          }
          img {
            max-width: 384px;
            max-height: 216px;

            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            object-fit: contain;
          }
        }
        .photo-name-wrap {
          display: flex;
          .photo-name {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #678098;
          }
        }

        a:hover .photo-name {
          color: #01baef;
        }
      }
    }
    @media (min-width: 640px) {
      .gallery-image-item {
        width: calc(100% / 2);
      }
    }
    @media (min-width: 768px) {
      .gallery-image-item {
        width: calc(100% / 3);
      }
    }
    @media (min-width: 1024px) {
      .gallery-image-item {
        width: calc(100% / 4);
      }
    }
    @media (min-width: 1280px) {
      .gallery-image-item {
        width: calc(100% / 5);
      }
    }
    @media (min-width: 1536px) {
      .gallery-image-item {
        width: calc(100% / 6);
      }
    }
  }

  .gallery-loading {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }
}
.dot-flashing,
.dot-flashing::before,
.dot-flashing::after {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #333;
  color: #333;
  animation: dotFlashing 1s infinite linear alternate;
}
.dot-flashing {
  position: relative;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: #333;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}
</style>
