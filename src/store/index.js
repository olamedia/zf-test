import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const MUTATIONS = {
  SET_USERS_PAGE: 'SET_USERS_PAGE',
};

export default new Vuex.Store({
  state: {
    users: {},
  },
  mutations: {
    [MUTATIONS.SET_USERS_PAGE](state, { page, users }) {
      users.forEach((user) => {
        // state.users[user.id] = { ...user, page };
        state.users[user.id] = { id: user.id, page };
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
