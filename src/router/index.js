import firebase from "firebase";
import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import ViewPerformer from "@/components/ViewPerformer";
import NewPerformer from "@/components/NewPerformer";
import NewPersona from "@/components/NewPersona";
import EditPerformer from "@/components/EditPerformer";
import Login from "@/components/Login";
import Register from "@/components/Register";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "new-performer",
      component: NewPerformer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/newpersona/:persona_type",
      name: "new-persona",
      component: NewPersona,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:performer_id",
      name: "edit-performer",
      component: EditPerformer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:performer_id",
      name: "view-performer",
      component: ViewPerformer,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  var matchedTo = to.meta.requiresAuth;
  var matched = to.matched.some(record => record.meta.requiresAuth);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
