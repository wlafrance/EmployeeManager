<template>
  <div id="new-persona">
    <h3>New Persona: {{persona_type}}</h3>
  </div>
</template>

<script>
export default {
  name: "new-persona",
  data() {
    return {
      persona_id: null,
      persona_type: null,
      name: null
    };
  },
  created() {
    this.persona_type =
      this.$route.params.persona_type.toUpperCase() == "FEM"
        ? "FEMALE"
        : "MALE";
  }
};
</script>

<style scoped>
</style>