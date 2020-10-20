import { RootState } from '@/store/types/RootState';
import MutationTypes from '@/store/mutation-types';
import { MutationTree } from 'vuex';
import User from '@/models/User';

type Mutations<S = RootState> = {
  [MutationTypes.SET_USERS_PAGE](state: S, payload: { page: number; users: User[]}): void;
}

const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.SET_USERS_PAGE](state, { page, users }) {
    users.forEach((user) => {
      state.users[user.id] = { id: user.id, page };
    });
  },
};
export default mutations;
