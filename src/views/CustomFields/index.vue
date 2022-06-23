<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 px-32">
    <are-you-sure
      v-if="deleteDynamicConfirm"
      @yes="deleteFieldGroup"
      @no="deleteDynamicConfirm = false"
      text="Do you want to delete this this Dynamic?"
    ></are-you-sure>
    <div class="flex justify-between py-8 items-center">
      <div class="flex items-center">
        <div class="text-primary-400 mr-4">Dynamic Groups</div>
        <div class="border rounded overflow-hidden flex">
          <input type="text" class="px-4 py-2" placeholder="Search..." />
          <button
            class="flex items-center justify-center px-4 border-l bg-primary-400"
          >
            <svg
              class="h-4 w-4 text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
              />
            </svg>
          </button>
        </div>
      </div>
      <router-link to="/custom-fields/new">
        <button
          class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
        >
          Add New
        </button>
      </router-link>
    </div>
    <div class="mt-5 bg-white shadow rounded p-5">
      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th class="w-10"></th>
            <th class="w-72">Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr
            v-for="item in listDataDynamicGroup"
            :key="item.id"
            class="table-row hover:bg-primary-300 cursor-pointer text-primary-500"
          >
            <td>
              <div class="flex items-center h-10">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div class="font-bold">{{ item.title }}</div>
              <div class="hidden text-xs mt-1 group-actions gap-2 flex">
                <span
                  class="hover:text-primary-200"
                  @click="handleRedirect(item)"
                >
                  Edit
                </span>
                <hr class="m-0 h-3 uk-divider-vertical" />
                <span class="hover:text-primary-200"> Duplicate </span>
                <hr class="m-0 h-3 uk-divider-vertical" />
                <span
                  class="text-red-500 hover:text-red-300"
                  @click="isShowPopup(item.id)"
                  >Trash</span
                >
              </div>
            </td>
            <td>{{ item.description ? item.description : "" }}</td>
            <td>{{ item.location ? item.location : "" }}</td>
            <td>{{ item.Fields ? item.Fields.length : "" }}</td>
            <!-- <td>5</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AreYouSure from "../../components/global/AreYouSure.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "index",
  data() {
    return {
      deleteDynamicConfirm: false,
      selectedDynamic: "",
    };
  },
  components: {
    AreYouSure,
  },
  computed: {
    ...mapState({
      listDataDynamicGroup: (state) => state.customFields.customFields,
    }),
  },
  async mounted() {
    await this.fetchDynamicGroups();
  },

  methods: {
    ...mapActions({
      fetchDynamicGroups: "customFields/fetchAllFields",
    }),
    isShowPopup(payload) {
      this.deleteDynamicConfirm = true;
      this.selectedDynamic = payload;
    },
    async deleteFieldGroup() {
      let payload = this.selectedDynamic;
      this.deleteDynamicConfirm = false;
      try {
        this.loading = true;
        await this.$store.dispatch("customFields/deleteCustomFields", payload);
        await this.fetchDynamicGroups();
      } catch (error) {
        console.log(error);
      }
    },
    handleRedirect(item) {
      this.$router.push(`/custom-fields/edit/${item.id}`);
    },
  },
};
</script>

<style scoped>
.table-row:hover .group-actions {
  display: flex;
}
a {
  text-decoration: none;
}
</style>
