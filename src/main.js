import Vue from "vue";
import App from "@/App.vue";
import router from "@/libs/route";
import store from "@/store";
import { title } from "@/configs"

document.title = title;
Vue.config.productionTip = false;
import iView from "iview";
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
