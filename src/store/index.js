import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
    navItems: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
    snackbar: {
      show: false,
      text: '',
    },
    daily: [
      {
        id: 1,
        action: 'mdi-ticket',
        items: [{ title: 'List Item' }],
        title: 'prvo',
      },
      {
        id: 2,
        action: 'mdi-ticket',
        items: [{ title: 'List Item' }],
        title: 'drugo',
      },
      {
        id: 3,
        action: 'mdi-ticket',
        items: [{ title: 'List Item' }],
        title: 'trece',
      },
    ],
  },
  mutations: {
    addDaily(state, payload) {
      let newDaily = {
        id: Date.now(),
        tasks: payload.tasks,
        date: payload.date,
        hours: 8,
        blocker: payload.blocker,
        plan: payload.plan,
      };
      state.daily.push(newDaily);
    },

    hideSnackBar(state) {
      state.snackbar.show = false;
    },

    hideDrawer(state) {
      state.drawer = !state.drawer;
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
