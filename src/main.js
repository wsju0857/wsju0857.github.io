import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import vuetify from './plugins/vuetify'
import {store} from './store';
import axios from 'axios';
import VueCookies from 'vue-cookies'

Vue.prototype.$axios = axios;
Vue.use(VueCookies);

VueCookies.config('1d')

import LayoutDefault from "./layouts/LayoutDefault";
import LayoutLogin from "./layouts/LayoutLogin";
import LayoutAdmin from "./layouts/LayoutAdmin";

Vue.component('layout-default', LayoutDefault);
Vue.component('layout-login', LayoutLogin);
Vue.component('layout-admin', LayoutAdmin);

Vue.config.productionTip = false;
export const bus = new Vue();

new Vue({
  vuetify,
  router,
  render: h => h(App),
  store
}).$mount('#app')
