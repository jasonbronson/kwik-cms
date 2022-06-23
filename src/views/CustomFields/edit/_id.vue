<template>
  <CustomFieldEdit @publish="updateField" :field="currentField" />
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
    async updateField(payload) {
      await this.$store.dispatch("customFields/updateCustomFields", payload);
      await this.$router.push("/custom-fields");
    },
  },
};
</script>

<style scoped></style>
