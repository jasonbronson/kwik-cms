<template>
  <div>
    <div class="font-sans text-black min-h-screen bg-primary-600 py-10 px-32">
      <div class="flex items-center justify-between gap-3">
        <router-link to="/custom-fields">
          <i class="fas fa-angle-left cursor-pointer"></i>
        </router-link>
        <div>
          <button
            class="shadow rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 hover:text-action-500 font-bold duration-300 text-sm"
            @click="publishCustomField"
          >
            Publish
          </button>
        </div>
      </div>
      <div class="mt-10 py-8 px-10 flex flex-col gap-2 bg-white rounded shadow">
        <div>
          <input
            v-model="title"
            placeholder="Add Title"
            class="w-full flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>
        <div class="w-full flex font-bold px-5 mt-10">
          <span class="w-1/4">Order</span>
          <span class="w-1/4">Label</span>
          <span class="w-1/4">Name</span>
          <span class="w-1/4">Type</span>
        </div>
        <!--        <div class="flex flex-col uk-sortable">
          <SingleField
            @removeField="removeField"
            @setFieldValues="setFieldValues"
            v-for="(field, index) in fields"
            :field="field"
            :key="index"
            :index="index"
          />
        </div>-->
        <div>
          <div class="uk-grid-small" uk-sortable="handle: .uk-card">
            <div v-for="(field, index) in fields" :key="index">
              <div class="uk-card uk-card-default w-full">
                <div>
                  <SingleField
                    @removeField="removeField"
                    @setFieldValues="setFieldValues"
                    :field="field"
                    :key="index"
                    :index="index"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-10">
          <button
            class="shadow rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 hover:text-action-500 font-bold duration-300 text-sm"
            @click="handleAddNewField"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleField from "@/components/CustomFields/SingleField";
import { mapState } from "vuex";
export default {
  name: "CustomFieldEdit",
  components: { SingleField },
  data() {
    return {
      title: "",
      fields: [],
      editData: {
        label: "",
        fieldName: "",
        fieldType: "",
        instructions: "",
      },
    };
  },
  props: {
    field: {
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      currentField: (state) => state.customFields.currentField,
    }),
  },
  methods: {
    handleAddNewField() {
      this.fields.push({});
    },
    removeField(index) {
      console.log(index);
      if (index > -1) {
        this.fields.splice(index, 1);
      }
    },
    setFieldValues(index, values) {
      this.fields[index] = values;
    },
    async publishCustomField() {
      await this.$emit("publish", { fields: this.fields, title: this.title });
    },
  },
};
</script>

<style scoped></style>
