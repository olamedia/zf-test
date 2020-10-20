import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from '@/store/types/RootState';
import state from '@/store/state';
import mutations from '@/store/mutations';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state,
  mutations,
});
