<template>
  <v-card>
    <!-- CARD TOP -- IMAGES -->
    <v-img height="150px" src="header_Card.jpg">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="title white--text d-flex date">
          <v-icon color="white" class="mr-1">
            mdi-calendar-check
          </v-icon>
          <span>
            {{ item.date }}
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="title white--text  d-flex align-center workday">
          <div v-if="item.workday">
            {{ item.workday }}
          </div>
          <template v-else>
            <span>
              Add workday
            </span>
          </template>
          <v-btn text icon x-small color="white" class="ml-1" @click="$store.state.dialogs.add_workday = true">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar-title>
      </v-app-bar>

      <v-card-title class="white--text mt-8">
        Hours:
        <span class="ml-3" v-if="!item.time">--</span>
        <span class="ml-2" v-else>{{ item.time }}</span>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <v-btn color="white" fab text dark x-small @click="$store.state.dialogs.add_time = true">
            <v-icon dark>
              mdi-clock-time-eight-outline
            </v-icon>
          </v-btn>
        </div>
      </v-card-title>
    </v-img>

    <!-- start::DONE LIST  -->
    <v-list dense class="mt-4 px-2 mb-1">
      <div class="justify-end d-flex px-2 mb-4">
        <SettingsMenu :id="item.id" />
      </div>
      <div class="d-flex justify-space-between">
        <v-subheader>DONE</v-subheader>
        <v-subheader>
          <v-btn class="" x-small fab dark color="indigo" @click="addWork">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>

      <template v-if="item.works.length">
        <div v-for="(item, i) in item.works" :key="i">
          <v-list-item class="px-2">
            <template>
              <v-list-item-action class="my-1">
                <v-checkbox :input-value="item.done" disabled></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.description }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="my-1">
                <WorkMenu :workItem="item" />
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </template>

      <template v-else>
        <v-list-item class="px-2">
          <v-list-item-content>
            <v-list-item-title>Not found tasks...</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <!-- end::DONE LIST -->

    <!-- start::PLAN LIST -->
    <v-list dense class="px-2">
      <div class="d-flex justify-space-between">
        <v-subheader>PLAN</v-subheader>
        <v-subheader>
          <v-btn class="" x-small fab dark color="indigo" @click="addUpdatePlanBlockers('plan')">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>

      <template v-if="item.plans.length">
        <div v-for="(item, i) in item.plans" :key="i">
          <div class="d-flex justify-space-between align-center">
            <div class="box_content px-2" v-html="item.compiled"></div>
            <v-subheader>
              <v-btn class="" outlined x-small fab dark color="indigo" @click="addUpdatePlanBlockers('plan', item)">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-subheader>
          </div>
          <v-divider></v-divider>
        </div>
      </template>

      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title class="indigo--text">(set your plan for tomorrow)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- end::PLAN LIST -->

    <!-- start::BLOCKER LIST -->
    <v-list dense class="px-2">
      <div class="d-flex justify-space-between">
        <v-subheader>BLOCKER</v-subheader>
        <v-subheader>
          <v-btn x-small fab dark color="indigo" @click="addUpdatePlanBlockers('blockers')">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>
      <template v-if="item.blockers.length">
        <div v-for="(item, i) in item.blockers" :key="i">
          <div class="d-flex justify-space-between align-center">
            <div class="px-2 box_content" v-html="item.compiled"></div>
            <v-subheader>
              <v-btn  outlined x-small fab dark color="indigo" @click="addUpdatePlanBlockers('blockers', item)">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-subheader>
          </div>
          <v-divider></v-divider>
        </div>
      </template>
      <v-list-item v-else class="px-2">
        <v-list-item-content>
          <v-list-item-title class="indigo--text">(add your blocker description if exists)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- end::BLOCKER LIST -->
  </v-card>
</template>

<script>
import WorkMenu from '@/components/List/Menu/WorkMenu';
import SettingsMenu from '@/components/List/Menu/SettingsMenu';

export default {
  components: { WorkMenu, SettingsMenu },
  props: ['item'],
  data() {
    return {
      input: '',
    };
  },

  methods: {
    addWork(item) {
      this.$store.state.dialogs.works = true;
      this.$store.state.work.isEdit = false;
    },

    addUpdatePlanBlockers(sel, item) {
      this.$store.state.selPlanBlocker = sel;
      this.$store.state.dialogs.plan_blocker = true;

      if (item) {
        // EDIT PLAN / BLOCKERS
        this.$store.state.planBlockData = { item, isEdit: true };
      } else {
        // ADD PLAN / BLOCKERS
        this.$store.state.planBlockData = {
          item: {},
          isEdit: false,
        };
      }
    },
  },
};
</script>

<style>
.v-picker__body {
  width: 100% !important;
}
.box_content * {
  margin: 0 !important;
} 

@media only screen and (max-width: 375px) {
  .date span,
  .workday span {
    font-size: 13px !important;
  }
}
</style>
