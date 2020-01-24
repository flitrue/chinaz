import Vue from "vue";
import Router from "vue-router";
import routes from "@/configs/routes";

Vue.use(Router);

const route = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default route;
