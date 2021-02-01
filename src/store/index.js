import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navItems: [{ title: 'Home', icon: 'mdi-home', to: '/' }],
    daily: [],

    dialogs: {
      daily: false,
      works: false,
      plan_blocker: false,
      add_workday: false,
      add_time: false,
      update_work: false,
      details: false,
    },
    workday: ['Radni dan', 'Vikend', 'Praznik', 'Bolovanje'],
    selPlanBlocker: null,
    planBlockData: {},
    selWork: {
      id: null,
      isEdit: false,
      data: null,
    },
    work: {
      isEdit: false,
      data: null,
    },
    itemSelected: {},
    drawer: null,

    snackbar: {
      show: false,
      data: {},
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
    },

    deleteDaily(state, payload) {
      state.daily = state.daily.filter((daily) => daily.id != payload);
    },

    addWork(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      daily.works.push(payload);
    },

    updateWorkInfo(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      let work = daily.works.filter((work) => work.workID == payload.workID)[0];

      work.selectedProject = payload.selectedProject;
      work.selectedTask = payload.selectedTask;
      work.selectedHours = payload.selectedHours;
      work.description = payload.description;
      work.done = payload.done;
    },

    deleteWork(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      daily.works = daily.works.filter((work) => work.workID != payload);
    },

    updateWork(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];

      let work = daily.works.filter((work) => work.workID == payload.id)[0];

      work.details = payload.payload;
    },

    updateWorkDetais(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      let work = daily.works.filter((work) => work.workID == payload.id)[0];

      work.details = payload.payload.data;
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
    },

    addTime(state, payload) {
      let daily = state.daily.filter((daily) => daily.id == state.itemSelected.id)[0];
      daily.time = payload;
    },

    hideSnackBar(state) {
      state.snackbar.show = false;
    },

    hideDrawer(state) {
      state.drawer = !state.drawer;
    },

    showSnackBar(state, data) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 200;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.data = data;
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
      commit('showSnackBar', {
        text: 'Success added new Daily',
        color: 'success',
      });
    },

    addWork({ commit }, payload) {
      commit('addWork', payload);
      commit('showSnackBar', {
        text: 'Success added work',
        color: 'success',
      });
    },

    addPlanBlocker({ commit }, payload) {
      commit('addPlanBlocker', payload);
      commit('showSnackBar', {
        text: 'Success add plan/blockers',
        color: 'success',
      });
    },

    editPlanBlocker({ commit }, payload) {
      commit('editPlanBlocker', payload);
      commit('showSnackBar', {
        text: 'Success edit plan/blockers',
        color: 'success',
      });
    },

    deletePlanBlocker({ commit }, payload) {
      commit('deletePlanBlocker', payload);
      commit('showSnackBar', {
        text: 'Success deleted plan/blockers',
        color: 'red',
      });
    },

    addWorkday({ commit }, payload) {
      commit('addWorkday', payload);
      commit('showSnackBar', {
        text: 'Success add workday',
        color: 'success',
      });
    },

    addTime({ commit }, payload) {
      commit('addTime', payload);
      commit('showSnackBar', {
        text: 'Success add time',
        color: 'success',
      });
    },

    updateWork({ commit }, payload) {
      commit('updateWork', payload);
      commit('showSnackBar', {
        text: 'Success update work',
        color: 'success',
      });
    },

    updateWorkDetais({ commit }, payload) {
      commit('updateWorkDetais', payload);
      commit('showSnackBar', {
        text: 'Success update work details',
        color: 'success',
      });
    },

    deleteDaily({ commit }, payload) {
      commit('deleteDaily', payload);
      commit('showSnackBar', {
        text: 'Success delete daily',
        color: 'red',
      });
    },

    deleteWork({ commit }, payload) {
      commit('deleteWork', payload);
      commit('showSnackBar', {
        text: 'Success delete work',
        color: 'red',
      });
    },

    updateWorkInfo({ commit }, payload) {
      commit('updateWorkInfo', payload);
      commit('showSnackBar', {
        text: 'Success update work info',
        color: 'success',
      });
    },
  },
  modules: {},
});
