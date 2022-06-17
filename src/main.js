import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/index.css";
import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";

Vue.config.productionTip = false;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("en", en);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
