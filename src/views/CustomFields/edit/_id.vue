<template>
  <CustomFieldEdit @publishCustomField="updateField" :field="currentField" />
</template>

<script>
import { mapState } from "vuex";
import CustomFieldEdit from "@/components/CustomFields/CustomFieldEdit";
export default {
  name: "_id",
  components: { CustomFieldEdit },
  async mounted() {
    await this.$store.dispatch("customFields/fetchFieldsById", {
      id: this.$route.params.id,
    });
  },
  computed: {
    ...mapState({
      currentField: (state) => state.customFields.currentField,
    }),
  },
  methods: {
    async updateField(post) {
      await this.$store.dispatch("customFields/updateCustomFields", { post });
      await this.$router.push("/custom-fields");
    },
  },
};
</script>

<style scoped></style>
