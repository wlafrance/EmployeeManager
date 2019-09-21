<template>
  <div id="new-performer">
    <h3>New Performer</h3>
    <div class="row">
      <form @submit.prevent="savePerformer" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="performer_id" required />
            <label>Performer ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-performer",
  data() {
    return {
      performer_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  methods: {
    savePerformer() {
      db.collection("performers")
        .add({
          performer_id: this.performer_id,
          name: this.name,
          dept: this.dept,
          position: this.position
        })
        .then(docRef => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error adding performer: ", error);
        });
    }
  }
};
</script>