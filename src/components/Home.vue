<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Performers</h4>
      </li>
      <li v-for="performer in performers" v-bind:key="performer.id" class="collection-item avatar">
        <div>
          <!-- <div class="valign-wrapper"> -->
          <div class="row">
            <div class="col">
              <span class="chip">
                <img src="../assets/Placeholder_female_superhero_c.png" alt="Contact Person" />
                {{performer.performer_id}}: {{performer.name}}
              </span>
            </div>
            <div
              class="col hide-on-med-and-down"
              style="vertical-align: middle; display: inline-block;"
            >Add Persona by type:</div>
            <div class="col">
              <div class="col">
                <span class="fa-stack">
                  <router-link
                    :to="{ name: 'new-persona', params: { persona_type: 'FEM' }, query: { debug: true }}"
                    class="btn-floating pink"
                  >
                    <i class="fa fa-female fa-stack-2x"></i>
                    <i class="fa fa-plus fa-stack-1x headerIcon"></i>
                  </router-link>
                </span>
              </div>
              <div class="col">
                <span class="fa-stack">
                  <router-link
                    :to="{ name: 'new-persona', params: { persona_type: 'MAL' }, query: { debug: true }}"
                    class="btn-floating blue"
                  >
                    <i class="fa fa-male fa-stack-2x"></i>
                    <i
                      class="fa fa-plus fa-stack-1x"
                      style=" font-size: 11px; top:-7px; left:9px; color:white  "
                    ></i>
                  </router-link>
                </span>
              </div>
              <div class="col">
                <span class="fa-stack">
                  <router-link
                    :to="{ name: 'new-persona', params: { persona_type: null }, query: { debug: true }}"
                    class="btn-floating orange"
                  >
                    <i class="fa fa-genderless fa-stack-2x"></i>
                    <i
                      class="fa fa-plus fa-stack-1x"
                      style=" font-size: 11px; top:-7px; left:9px; color:white  "
                    ></i>
                  </router-link>
                </span>
              </div>
            </div>

            <div>
              <span class="secondary-content">
                <router-link
                  v-bind:to="{ name: 'view-performer', params: { performer_id: performer.performer_id }}"
                >
                  <i class="fa fa-eye performerEye"></i>
                </router-link>
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
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
      performers: [],
      loading: true
    };
  },
  created() {
    db.collection("performers")
      // .orderBy("dept")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            performer_id: doc.data().performer_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.performers.push(data);
        });
      });
  }
};
</script>

<style scoped>
.performerList {
  padding-top: 5px;
}
.headerIcon {
  font-size: 11px;
  top: -7px;
  left: 9px;
  color: white;
}
.performerImage {
  height: 32px;
  width: 32px;
}
.performerEye {
  font-size: 32px;
}
</style>