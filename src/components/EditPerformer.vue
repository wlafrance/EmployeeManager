<template>
  <div id="new-performer">
    <h3>Edit Performer</h3>
    <div class="row">
      <form @submit.prevent="updatePerformer" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="performer_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
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
  name: "edit-performer",
  data() {
    return {
      performer_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("performers")
      .where("performer_id", "==", to.params.performer_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.performer_id = doc.data().performer_id;
            vm.name = doc.data().name;
            vm.dept = doc.data().dept;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("performers")
        .where("performer_id", "==", this.$route.params.performer_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.performer_id = doc.data().performer_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updatePerformer() {
      db.collection("performers")
        .where("performer_id", "==", this.$route.params.performer_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                performer_id: this.performer_id,
                name: this.name,
                dept: this.dept,
                position: this.position
              })
              .then(() => {
                this.$router.push({
                  name: "view-performer",
                  params: { performer_id: this.performer_id }
                });
              });
          });
        });
    }
  }
};
</script>