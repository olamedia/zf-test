import Vue from 'vue';
import './plugins/axios';

import { RootState } from '@/store/types/RootState';
import { Store } from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store: store as Store<RootState>,
  render: (h) => h(App),
}).$mount('#app');
