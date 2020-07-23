import { iUser } from "../../interfaces/user";

export default {
  state: {
    user: {}
  },
  getters: {
    value: user => {
      return user.value;
    }
  },
  mutations: {
    updateUser(state, payload: iUser) {
      state.user = payload;
    }
  },
  actions: {
    updateUser({ commit }, payload: iUser) {
      commit("updateUser", payload);
    }
  }
};
