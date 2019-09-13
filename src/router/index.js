import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import NewEmployee from "@/components/NewEmployee";
import EditEmployee from "@/components/EditEmployee";
import ViewEmployee from "@/components/ViewEmployee";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Dashbaord",
      component: Dashboard
    },
    {
      path: "/new",
      name: "new-employee",
      component: NewEmployee
    },
    {
      path: "/edit/:employee_id",
      name: "edit-employee",
      component: EditEmployee
    },
    {
      path: "/:employee_id",
      name: "view-employee",
      component: ViewEmployee
    }
  ]
});
