import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialogs: {
      daily: false,
      tasks: false,
    },
    itemSelected: null,
    drawer: null,
    navItems: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
    snackbar: {
      show: false,
      text: '',
    },
    daily: [],
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
      console.log('New daily', newDaily.obj);

      // save new daily
      state.daily.push(newDaily.obj);
    },

    addTask(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      console.log('daily ID', daily.id);

      daily.tasks.push({
        id: daily.id,
        title: payload,
        done: false,
      });
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
      state.dialogs.daily = true;
    },

    showAddTaskDialog(state) {
      state.dialogs.tasks = true;
    },
  },
  actions: {
    addDaily({ commit }, payload) {
      commit('addDaily', payload);
      commit('showSnackBar', 'Daily added success');
    },

    addTask({ commit }, payload) {
      commit('addTask', payload);
      commit('showSnackBar', `Succes added task`);
    },
  },
  modules: {},
});
