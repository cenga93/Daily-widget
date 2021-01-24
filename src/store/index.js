import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialog: false,
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
      // {
      //   id: 1,
      //   action: 'mdi-calendar',
      //   items: [{ title: 'List Item' }],
      //   title: 'prvo',
      // },
    ],
  },
  mutations: {
    addDaily(state, payload) {
      //  New daily object contructor
      class NewDaily {
        constructor(payload) {
          this.obj = payload;
        }
      }

      //create new daily
      const newDaily = new NewDaily(payload);

      // save new daily
      state.daily.push(newDaily.obj);
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

    showToolBar(state) {
      state.dialog = true;
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
