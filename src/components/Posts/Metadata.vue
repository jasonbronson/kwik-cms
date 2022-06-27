<template>
  <div>
    <div class="flex gap-10">
      <div class="w-2/3 py-8 px-10 flex flex-col gap-2 bg-white rounded shadow">
        <div>
          <div class="text-primary-200 mb-2">
            <div
              class="text-primary-200 flex items-center h-10 text-sm font-semibold"
            >
              <i class="fab fa-searchengin mr-2"></i>
              <span> SEO Title </span>
            </div>
            <div class="text-xs">
              We suggest a
              <span class="text-blue-300">max of 55 chars</span>
            </div>
          </div>
          <div class="flex gap-7">
            <input
              placeholder="Title that will appear in search engines"
              class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
              v-model="editData.title"
            />
          </div>
        </div>
        <div>
          <div
            class="text-primary-200 flex items-center h-10 text-sm font-semibold"
          >
            <i class="fab fa-searchengin mr-2"></i>
            <span> Slug </span>
          </div>
          <div class="flex gap-7">
            <input
              v-model="editData.slug"
              placeholder="Slug"
              class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
            />
          </div>
        </div>
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
              v-model="selectedUser"
            >
              <option v-for="(user, i) in listUsers" :key="i" :value="user.id">
                {{ user.first_name + user.last_name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <div
            class="text-primary-200 flex items-center h-10 text-sm font-semibold"
          >
            <i class="fas fa-text mr-2"></i>
            <span>Content</span>
          </div>
          <editor
            ref="tm"
            v-model="editData.content"
            :api-key="$editorApiKey"
            :init="$editorSettings"
          />
        </div>
        <div>
          <div class="text-primary-200 mb-2 mt-3">
            <div
              class="text-primary-200 flex items-center h-10 text-sm font-semibold"
            >
              <i class="fas fa-audio-description mr-2"></i>
              <span>Meta Description</span>
            </div>
            <div class="text-xs">
              We suggest a
              <span class="text-blue-300">max of 140 chars</span>
            </div>
          </div>
          <div class="flex gap-7">
            <textarea
              placeholder="Meta Description that will appear in search engines"
              rows="4"
              class="flex-grow border-solid border-2 rounded p-3 focus:outline-none focus:border-primary-100 focus:shadow"
              v-model="editData.description"
            />
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="py-8 px-10 flex flex-col gap-2 bg-white rounded shadow">
          <div>
            <div
              class="text-primary-200 flex items-center h-10 text-sm font-semibold"
            >
              <i class="fas fa-calendar-alt mr-2"></i>
              <span>
                Publish Date <span class="text-blue-300">(UTC)</span>
              </span>
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
                  v-model="editData.publish_date"
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
              <span>
                Categories <span class="text-blue-300">(manage)</span>
              </span>
            </div>
            <div class="flex gap-7">
              <input
                placeholder="comma, seperated, categories"
                class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
                v-model="listCateString"
              />
              <select
                class="w-40 border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
                v-model="selectedCate"
              >
                <option
                  v-for="(cate, i) in listCategories"
                  :key="i"
                  :value="cate.name"
                >
                  {{ cate.name }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <div
              class="text-primary-200 flex items-center h-10 text-sm font-semibold"
            >
              <i class="fas fa-tags mr-2"></i>
              <span>Tags <span class="text-blue-300">(manage)</span> </span>
            </div>
            <div class="flex gap-7">
              <input
                placeholder="comma, seperated, tags"
                class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
                v-model="listTagString"
              />
              <select
                class="w-40 border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
                v-model="selectedTag"
              >
                <option v-for="(tag, i) in listTags" :key="i" :value="tag.name">
                  {{ tag.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="py-8 px-10 flex flex-col gap-2 bg-white rounded shadow mt-10"
        >
          <div>
            <div
              class="text-primary-200 flex items-center h-10 text-sm font-semibold"
            >
              <i class="fal fa-image mr-2"></i>
              <span>Featured Image</span>
            </div>
            <el-button
              class="btn-image"
              type="primary"
              @click="handleShowPopup"
            >
              Choose Image
            </el-button>
          </div>
          <div>
            <div v-if="this.imageSelected">
              <img :src="this.imageSelected" alt="" />
            </div>
            <div
              v-if="!this.imageSelected"
              class="text-sm text-primary-200"
            ></div>
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
    </div>
    <popup-choose-image
      :visible="showChooseImage"
      @no="closeChooseImage"
      @yes="setImage"
    ></popup-choose-image>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState } from "vuex";
import Editor from "@tinymce/tinymce-vue";
import PopupChooseImage from "../../components/global/PopupChooseImage.vue";
export default {
  name: "Metadata",
  components: {
    Datepicker,
    Editor,
    PopupChooseImage,
  },
  computed: {
    ...mapState({
      listUsers: (state) => state.users.usersList,
      listCategories: (state) => state.categories.categoriesList,
      listTags: (state) => state.tags.tagsList,
      // listCateString() {
      //   return this.listCateArray.join(",");
      // },
      // listTagString() {
      //   return this.listTagArray.join(",");
      // },
    }),
  },
  data() {
    return {
      editData: {},
      selectedUser: "",
      selectedCate: "",
      selectedTag: "",
      listCateArray: [],
      listTagArray: [],
      listCateString: "",
      listTagString: "",
      showChooseImage: false,
      imageSelected: "",
    };
  },
  props: {
    post: {
      default: () => {},
    },
  },
  async mounted() {
    await this.$store.dispatch("users/fetchAndSetUsers");
    await this.$store.dispatch("tags/fetchAndSetTags");
    await this.$store.dispatch("categories/fetchAndSetCategories");
    if (this.editData && this.editData.user_id) {
      this.selectedUser = this.editData.user_id
    }
    if (this.editData) {
      this.listCateArray = this.editData.Categories.map(i => i.name)
      this.listCateString = this.listCateArray.join(",")
    }
    if (this.editData) {
      this.listTagArray = this.editData.Tags.map(i => i.name)
      this.listTagString = this.listTagArray.join(",")
    }
  },
  watch: {
    editData: {
      handler(value) {
        this.$emit("handleMetaDataChange", value);
      },
      deep: true,
    },
    post(value) {
      this.editData = value;
    },
    listCateString(value) {
      this.listCateArray = value.split(",")
      this.callEmit("cate")
    },
    listTagString(value) {
      this.listTagArray = value.split(",")
      this.callEmit("tag")
    },
    selectedCate(value) {
      if (!this.listCateArray.includes(value)) {
        this.listCateArray.push(value);
      }
      this.listCateString = this.listCateArray.join(",")
      this.callEmit("cate")
    },
    selectedTag(value) {
      if (!this.listCateArray.includes(value)) {
        this.listTagArray.push(value);
      }
      this.listTagString = this.listTagArray.join(",")
      this.callEmit("tag")
    },
    selectedUser(value) {
      this.editData.user_id = value;
      this.$emit("handleMetaDataChange", this.editData);
    },
  },
  methods: {
    handleShowPopup() {
      this.showChooseImage = true;
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
      this.imageSelected = value.url;
    },
    callEmit(type) {
      if (type === "cate") {
        this.editData.Categories = this.listCategories
          .filter((i) => this.listCateArray.includes(i.name))
          .map((j) => ({ id: j.id }));
        this.$emit("handleMetaDataChange", this.editData);
      }
      if (type === "tag") {
        this.editData.Tags = this.listTags
          .filter((i) => this.listTagArray.includes(i.name))
          .map((j) => ({ id: j.id }));
        this.$emit("handleMetaDataChange", this.editData);
      }
    },
  },
};
</script>

<style scoped></style>
