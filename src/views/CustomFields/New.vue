<template>
  <CustomFieldEdit @publish="addCustomField" />
</template>

<script>
import CustomFieldEdit from "@/components/CustomFields/CustomFieldEdit";
export default {
  name: "New",
  components: { CustomFieldEdit },
  methods: {
    async addCustomField(payload) {
      try {
        await this.$store.dispatch("customFields/addCustomFields", payload);
        await this.$router.push("/custom-fields");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
