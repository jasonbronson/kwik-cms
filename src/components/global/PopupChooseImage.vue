<template>
  <el-dialog
    class="folder-popup"
    title="Featured Image"
    :visible="visible"
    :fullscreen="true"
    width="95%"
    @close="$emit('no')"
    :modal="true"
  >
    <el-tabs v-model="currentTab">
      <el-tab-pane class="tab-panel" label="Upload Files" :name="tabs[0]">
        <el-upload
          action="#"
          ref="uploadRef"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :http-request="handleRequest"
          :on-success="handleSuccess"
          :auto-upload="false"
        >
          <i class="el-icon-plus"></i
        ></el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane class="tab-panel" label="Library Media" :name="tabs[1]">
        <el-container class="media-panel">
          <el-container>
            <el-header height="40px">
              <el-row type="flex" justify="end">
                <el-col :pull="1" :span="6">
                  <el-input
                    size="small"
                    v-model="filterInput.name"
                    @keyup.enter.native="changeQueryText"
                    placeholder="Search..."
                    prefix-icon="el-icon-search"
                    clearable
                  />
                </el-col>
              </el-row>
            </el-header>
            <el-main
              ref="scroll-container"
              infinite-scroll-disabled="isNotScrolling"
            >
              <div class="gallery-body">
                <div class="gallery-image">
                  <div
                    class="gallery-image-item"
                    v-for="(item, index) in this.listData"
                    :key="index"
                  >
                    <div class="thumbnail-wrap">
                      <div
                        class="thumbnail"
                        :class="{ check: selectedMedia.id === item.id }"
                      >
                        <i
                          class="el-icon-check"
                          v-if="selectedMedia.id === item.id"
                        ></i>
                        <div class="image-wrap">
                          <img
                            :src="item.url"
                            alt=""
                            @click="selectImage(item)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="gallery-loading">
                  <!-- <div class="dot-flashing" v-if="isLoading"></div> -->
                </div>
              </div>
            </el-main>
          </el-container>
          <el-aside width="25%">
            <div class="media-details">
              <h4>Media Details</h4>
              <div v-if="selectedMedia.url">
                <el-image :src="selectedMedia.url"></el-image>
                <el-divider content-position="left">{{
                  selectedMedia.id
                }}</el-divider>
              </div>
              <el-form
                :model="selectedMedia"
                :rules="rules"
                ref="mediaForm"
                label-width="100px"
                size="mini"
              >
                <el-form-item label="Name :">
                  {{ selectedMedia.name }}
                </el-form-item>
                <el-form-item label="URL :"
                  >{{ selectedMedia.url }}
                </el-form-item>
                <el-form-item label="Size: "
                  >{{ selectedMedia.size }}
                </el-form-item>
                <el-form-item label="Created : "
                  ><span v-if="selectedMedia.created_at"
                    ><i class="el-icon-time"></i>
                    {{ selectedMedia.created_at | datetime }}</span
                  ></el-form-item
                >
                <el-form-item label="Updated : "
                  ><span v-if="selectedMedia.created_at"
                    ><i class="el-icon-time"></i>
                    {{ selectedMedia.updated_at | datetime }}</span
                  >
                </el-form-item>
                <el-form-item label="Title : ">
                  <el-input v-model="selectedMedia.title"></el-input>
                </el-form-item>
                <el-form-item label="Excerpt : ">
                  <el-input v-model="selectedMedia.excerpt"></el-input>
                </el-form-item>
                <el-form-item label="Content : ">
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="selectedMedia.content"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col><el-button type="danger">Delete</el-button></el-col>
                    <el-col
                      ><el-button type="primary">Update</el-button></el-col
                    >
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
          </el-aside>
        </el-container>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer" v-if="currentTab === tabs[0]">
      <el-button type="primary" @click="upload">Upload files</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-if="currentTab === tabs[1]">
      <el-button @click="$emit('no')">Cancel</el-button>
      <el-button type="primary" @click="handleChooseImage"
        >Select Image</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { query } from "../../utils/query";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      currentTab: "listTab",
      tabs: ["uploadTab", "listTab"],
      dialogVisible: false,
      dialogImageUrl: "",
      selectedMedia: {},
      rules: {},
      filterInput: {
        title: "",
      },
      listData: [
        {
          id: 123573,
          name: "logo-removebg-preview.png",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/logoremovebgpreview.png",
          created_at: "2022-06-22T01:44:06.428Z",
          updated_at: "2022-06-22T01:44:06.428Z",
        },
        {
          id: 123572,
          name: "taylor-von-kriegenbergh",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/8d60eff9-taylor-von-kriegenbergh_wsop_antonioa_dsc00389.jpg",
          created_at: "2022-06-22T01:44:06.428Z",
          updated_at: "2022-06-22T01:44:06.428Z",
        },
        {
          id: 123729,
          name: "koray-aldemir-55",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/da961a56-koray-aldemir_wsop_antonioa_dsc00307.jpg",
          created_at: "2022-06-22T01:44:06.428Z",
          updated_at: "2022-06-22T01:44:06.428Z",
        },
        {
          id: 123726,
          name: "kyle-kitagawa",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/85dc071b-paris-event-center_wsop_enriquem__eim1959.jpg",
          created_at: "2022-06-22T01:44:06.428Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123724,
          name: "david-goodman-profile-picture-2",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/21cf0707-david-goodman-profile-picture.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123722,
          name: "bracelet-2",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/c5194102-bracelet_wsop_antonioa_l1090099.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123715,
          name: "main-stage-2",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/a096af0d-main-stage.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123705,
          name: "dan-smith-61",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/a71c3674-event-6-winner_dan-smith_wsop_antonioa_dsc00204.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123701,
          name: "chad-eveslage-25",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/8a422dfa-event-8-winner_chad-eveslage_wsop_antonioa_dsc01058.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123700,
          name: "chad-eveslage-24",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/90f59853-event-8-winner_chad-eveslage_wsop_antonioa_dsc01049.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123693,
          name: "wsp_app-final_3840x2160_2021-e8-copy-2",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/2a668b5f-wsp_app-final_3840x2160_2021-e8-copy.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123691,
          name: "wsp_app-final_3840x2160_2021-e8-copy",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/b9c89e66-wsp_app-final_3840x2160_2021-e8-copy.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123680,
          name: "taylor-von-kriegenbergh",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/8d60eff9-taylor-von-kriegenbergh_wsop_antonioa_dsc00389.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123679,
          name: "ognyan-dimov",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/ea5b071c-ognyan-dimov_wsop_antonioa_dsc00264.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123678,
          name: "reagan-silber",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/430589cc-reagan-silber_wsop_antonioa_dsc00359.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123677,
          name: "calvin-lee",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/27c64a89-calvin-lee_wsop_antonioa_dsc00552.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123676,
          name: "antonio-lievano",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/38905480-antonio-lievano_wsop_antonioa_dsc00449.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123662,
          name: "bracelet-photo",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/7df1485f-bracelet-photo.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123653,
          name: "dan-smith-60",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/79a23f2a-event-6-winner_dan-smith_wsop_antonioa_dsc00204.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123648,
          name: "dan-smith-59",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/9c0f64f3-event-6-winner_dan-smith_wsop_antonioa_dsc00204.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123647,
          name: "dan-smith-58",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/25144a86-event-6-winner_dan-smith_wsop_antonioa_dsc00170.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123644,
          name: "shaun-deeb-7",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/fdb31eff-shaun-deeb_wsop_enriquem__eim4855.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123637,
          name: "wsp_app-final-3840x2160_2021-e6-copy",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/eef9806b-wsp_app-final-3840x2160_2021-e6-copy.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123633,
          name: "shaun-deeb-huc",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/a8c8ee11-shaun-deeb-huc.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123630,
          name: "scott-seiver-21",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/d3ba33b7-scott-seiver-.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123627,
          name: "scott-seiver-and-sergio-aido",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/9f599893-scott-seiver-and-sergio-aido_wsop_antonioa_dsc09901.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123625,
          name: "scott-seiver-20",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/62d8ac4f-scott-seiver_wsop_antonioa_dsc00080.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123621,
          name: "scott-seiver-19",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/7cf6dae2-scott-seiver_wsop_antonioa_dsc00074.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123617,
          name: "wsp_app-final-3840x2160_2021-e3-copy",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/43d248f1-wsp_app-final-3840x2160_2021-e3-copy.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123613,
          name: "phil-ivey-huc",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/65ff7b33-phil-ivey-huc.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123612,
          name: "david-peters-headline",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/15efdaec-david-peters-headline-.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123604,
          name: "david-peters-winner-3",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/3955d9b4-david-peters-winner_wsop_enriquem__eim2169.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123603,
          name: "david-peters-winner-2",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/e5731b54-david-peters-winner_wsop_enriquem__eim2189.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123602,
          name: "david-peters-winner",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/6a4580c7-david-peters-winner_wsop_enriquem__eim2153.jpg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
        {
          id: 123596,
          name: "daniel-negreanu-wsop-22-week-1",
          size: 0,
          url: "https://dev-pgt-media.s3.us-east-2.amazonaws.com/2022/06/34eb5623-daniel-negreanu-wsop-22-week-1.jpeg",
          created_at: "2022-06-22T01:44:06.429Z",
          updated_at: "2022-06-22T01:44:06.429Z",
        },
      ],
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({
      fetchMedias: "media/fetchAllMedia",
      uploadMedia: "media/addMedia",
      fetchMediaById: "media/fetchMediaById",
    }),
    initDlg() {
      try {
        this.fetchMediaById({ id: this.mediaId });
      } catch (e) {
        this.selectedMedia = {};
      }

      // this.selectedMedia = { id: this.mediaId }
      this.$refs["scroll-container"].$el.scrollTop = 0;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChooseImage() {
      this.$emit("yes", this.selectedMedia);
    },
    getQuery() {
      let conditions = [];

      conditions = Object.keys(this.filterInput)
        .filter((filterKey) => this.filterInput[filterKey])
        .map((filterKey) =>
          query.caseInsensitiveSearch(filterKey, this.filterInput[filterKey])
        );

      return conditions && Array.isArray(conditions)
        ? conditions.join("&")
        : "";
    },
    selectImage(item) {
      this.selectedMedia = item;
    },
    handleRequest(option) {
      console.log("ok", option);
      return this.uploadMedia(option);
    },
    changeQueryText() {
      const payload = {
        pageOffset: 0,
        pageSize: 35,
        query: this.getQuery(),
        sort: "&sort[0]=created_at&sortby[0]=desc",
      };
      this.fetchMedias(payload);
      this.initDlg();
    },
    upload() {
      console.log("ok");
      this.$refs["uploadRef"].submit();
    },
    handleSuccess() {
      this.changeQueryText();
    },
  },
};
</script>
<style lang="scss" scoped>
.media-panel {
  height: calc(100vh - 224px - 1.15em);
}
.gallery-body {
  .gallery-image {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: stretch;
    .gallery-image-item {
      width: calc(100% / 2);
      position: relative;
      cursor: pointer;

      &:before {
        content: "";
        padding-top: 100%;
        display: block;
      }

      .thumbnail-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0.5rem 0.5rem 0 0;
        box-sizing: border-box;
        .thumbnail {
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          &.check {
            border: 2px solid #409eff;
            padding: 1px;
            box-sizing: border-box;
            i {
              color: #f2f6fc;
              background: #409eff;
              font-size: 1.25rem;
              position: absolute;
              top: -6px;
              right: -6px;
              border: 1px solid #f2f6fc;
              z-index: 101;
            }
          }

          .image-wrap {
            max-width: 384px;
            max-height: 216px;

            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-shadow: inset 0 0 15px rgb(0 0 0 / 10%),
              inset 0 0 0 1px rgb(0 0 0 / 5%);
            background: #eee;
            img {
              width: 100%;
              height: 100%;
              top: 50%;
              left: 50%;
              position: absolute;
              transform: translate(-50%, -50%);
              object-fit: contain;
              z-index: 100;
            }
          }
        }
      }
    }
    @media (min-width: 640px) {
      .gallery-image-item {
        width: calc(100% / 3);
      }
    }
    @media (min-width: 768px) {
      .gallery-image-item {
        width: calc(100% / 4);
      }
    }
    @media (min-width: 1024px) {
      .gallery-image-item {
        width: calc(100% / 5);
      }
    }
    @media (min-width: 1280px) {
      .gallery-image-item {
        width: calc(100% / 6);
      }
    }
    @media (min-width: 1536px) {
      .gallery-image-item {
        width: calc(100% / 7);
      }
    }
  }

  .gallery-loading {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }
}
.media-details {
  padding: 0 2rem;
  h4 {
    text-transform: uppercase;
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
