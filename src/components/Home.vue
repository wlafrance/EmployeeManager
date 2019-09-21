<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.employee_id}}: {{employee.name}}
        <router-link
          class="secondary-content"
          v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <!-- <div class="fixed-action-btn" style="padding-right:150px">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>-->
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li>
          <span class="fa-stack">
            <!-- <router-link
              :to="{ name: 'new-persona', params: { personatype: fem }}"
            >Navigate to Page2</router-link>-->

            <router-link
              :to="{ name: 'new-persona', params: { persona_type: 'fem' }, query: { debug: true }}"
              class="btn-floating pink"
            >
              <i class="fa fa-female fa-stack-2x"></i>
              <i
                class="fa fa-plus fa-stack-1x"
                style=" font-size: 11px; top:-7px; left:9px; color:white  "
              ></i>
            </router-link>
          </span>
        </li>
        <li>
          <span class="fa-stack">
            <a class="btn-floating blue">
              <i class="fa fa-male fa-stack-2x"></i>
              <i
                class="fa fa-plus fa-stack-1x"
                style=" font-size: 11px; top:-7px; left:9px; color:white  "
              ></i>
            </a>
          </span>
        </li>
        <li>
          <span class="fa-stack">
            <a class="btn-floating orange">
              <i class="fa fa-genderless fa-stack-2x"></i>
              <i
                class="fa fa-plus fa-stack-1x"
                style=" font-size: 11px; top:-7px; left:9px; color:white  "
              ></i>
            </a>
          </span>
        </li>
        <li>
          <span class="fa-stack">
            <router-link to="/new" class="btn-floating btn red">
              <i class="fa fa-plus"></i>
            </router-link>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "home",
  data() {
    return {
      employees: [],
      loading: true
    };
  },
  created() {
    db.collection("employees")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
        });
      });
  }
};
</script>