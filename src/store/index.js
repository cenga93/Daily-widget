import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navItems: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
    daily: [],
    // ------------------------------
    dialogs: {
      daily: false,
      // -------------------
      works: false,
      plan_blocker: false,
      add_workday: false,
      add_time: false,
    },
    workday: ['Radni dan', 'Vikend', 'Praznik', 'Bolovanje'],
    selPlanBlocker: null,
    planBlockData: {},
    // isEdit: {},
    // dailyID: '',
    itemSelected: {},
    drawer: null,

    snackbar: {
      show: false,
      text: '',
    },
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

      console.log('New daily is added');
    },

    addWork(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      // console.log('daily ID', daily.id);

      daily.works.push({
        id: daily.id,
        title: payload,
        done: false,
      });
    },

    itemSelected(state, payload) {
      state.itemSelected = payload;
    },

    addPlanBlocker(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];

      switch (state.selPlanBlocker) {
        case 'plan':
          daily.plans.push(payload);
          break;
        case 'blockers':
          daily.blockers.push(payload);
          break;
        default:
          return;
      }
      state.selPlanBlocker = null;
    },

    editPlanBlocker(state, { markdown, compiled, id }) {
      // filter select daily
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      let selectedPlanBlock;

      switch (state.selPlanBlocker) {
        // update plan
        case 'plan':
          selectedPlanBlock = daily.plans.filter((plan) => plan.id == id)[0];

          selectedPlanBlock.markdown = markdown;
          selectedPlanBlock.compiled = compiled;
          state.selPlanBlocker = null;
          break;
        // update blockers

        case 'blockers':
          selectedPlanBlock = daily.blockers.filter((plan) => plan.id == id)[0];

          selectedPlanBlock.markdown = markdown;
          selectedPlanBlock.compiled = compiled;
          state.selPlanBlocker = null;
          break;
        default:
          return;
      }
    },

    deletePlanBlocker(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];

      switch (state.selPlanBlocker) {
        case 'plan':
          daily.plans = daily.plans.filter((plan) => plan.id != payload);
          break;
        case 'blockers':
          daily.blockers = daily.blockers.filter((plan) => plan.id != payload);
          break;
        default:
          return;
      }
      state.selPlanBlocker = null;
    },

    addWorkday(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      daily.workday = payload;
      console.log('success added workday in selected daily');
    },

    addTime(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      daily.time = payload;

      console.log('success added time');
    },

    hideSnackBar(state) {
      state.snackbar.show = false;
    },

    hideDrawer(state) {
      state.drawer = !state.drawer;
    },

    showSnackBar(state, text) {
      console.log(text.text1);
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
    // provereno
    addDaily({ commit }, payload) {
      commit('addDaily', payload);
      commit('showSnackBar', 'Daily added success');
    },

    addWork({ commit }, payload) {
      commit('addWork', payload);
      commit('showSnackBar', `Succes added task`);
    },

    addPlanBlocker({ commit }, payload) {
      commit('addPlanBlocker', payload);
      commit('showSnackBar', 'Succes add plan/blockers', 'ASDASD');
    },

    editPlanBlocker({ commit }, payload) {
      commit('editPlanBlocker', payload);
      commit('showSnackBar', {
        text1: 'Success',
        text2: 'Test',
      });
    },

    deletePlanBlocker({ commit }, payload) {
      commit('deletePlanBlocker', payload);
    },

    addWorkday({ commit }, payload) {
      commit('addWorkday', payload);
    },

    addTime({ commit }, payload) {
      commit('addTime', payload);
    },
  },
  modules: {},
});
