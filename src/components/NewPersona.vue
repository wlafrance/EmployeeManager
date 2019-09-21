<template>
  <div id="new-persona">New Persona: {{persona_type}}</div>
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
    debugger;
    this.persona_type = this.$route.params.persona_type;
  }
};
</script>

<style scoped>
</style>