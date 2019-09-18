import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import ViewEmployee from '@/components/ViewEmployee';
import NewEmployee from '@/components/NewEmployee';
import EditEmployee from '@/components/EditEmployee';
import Login from '@/components/Login';
import Register from '@/components/Register';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'NewEployee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'EditEmployee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'ViewEmployee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  debugger;
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
        path: '/login',
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
        path: '/',
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
