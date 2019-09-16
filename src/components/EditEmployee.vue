<template>
  <div id="new-employee">
    <h3>Edit employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div type="text" class="input-field col s12">
          <input id="employee_id" type="text" v-model="employee_id" disabled />
          <label for="employee_id" class="active">Empoyee Id #</label>
        </div>
        <div type="text" class="input-field col s12">
          <input type="text" v-model="name" required />
          <label>Name</label>
        </div>
        <div type="text" class="input-field col s12">
          <input type="text" v-model="dept" required />
          <label class="active">Department</label>
        </div>
        <div type="text" class="input-field col s12">
          <input type="text" v-model="position" required />
          <label class="active">Position</label>
        </div>
        <button type="submit" class="btn">Update</button>
        <router-link class="btn grey" to="/">Cancel</router-link>
      </form>
    </div>
  </div>
</template>


<script>
import db from "./firebaseInit";

export default {
  name: "edit-employe",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },

  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id;
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
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updateEmployee() {
      var employeeId = this.$route.params.employee_id;
      db.collection("employees")
        .where("employee_id", "==", employeeId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                employee_id: employeeId,
                name: this.name,
                dept: this.dept,
                position: this.position
              })
              .then(() => {
                this.$router.push({
                  name: "view-employee",
                  params: { employee_id: employeeId }
                });
              });
          });
        });
    }
  }
};
</script>