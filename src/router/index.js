import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Callback from "../views/auth/Callback.vue";
import Password from "../views/me/Password.vue";
import Calendar from "../views/events/Calendar.vue";
import AuthRequests from "../views/auth/AuthRequests.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/requests",
    name: "AuthRequests",
    component: AuthRequests,
  },

  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/me/password",
    name: "Security",
    component: Password,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   console.log("from: ", from.query);
//   next(); // make sure to always call next()!
// });
export default router;
