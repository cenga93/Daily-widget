import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    daily: [],
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    addDaily(state, payload) {
      let newDaily = {
        id: Date.now(),
        tasks: payload.tasks,
        hours: 8,
        blocker: payload.blocker,
        plan: payload.plan,
      };
      state.daily.push(newDaily);
    },

    hideSnackBar(state) {
      state.snackbar.show = false;
    },

    showSnackBar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
  },
  actions: {
    addDaily({ commit }, payload) {
      commit('addDaily', payload);
      commit('showSnackBar', 'Daily added success');
    },
  },
  modules: {},
});
