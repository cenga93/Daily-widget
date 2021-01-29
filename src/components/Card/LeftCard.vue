<template>
  <v-card>
    <!-- CARD TOP -- IMAGES -->
    <v-img height="160px" src="Background.png">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="title white--text d-flex date">
          <v-icon color="white" class="mr-1">
            mdi-calendar
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

    <!-- start::DONE LIST  ******************************************************** TREBA DA SE RESI -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between">
        <v-subheader>DONE</v-subheader>
        <v-subheader>
          <v-btn class="" outlined x-small fab dark color="indigo" @click="addWork()">
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
                <v-checkbox :input-value="item.done"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="my-1">
                <v-btn fab text dark x-small color="indigo">
                  <v-icon dark>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
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
    <v-list dense class="">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>PLAN</v-subheader>
        <v-subheader>
          <v-btn class="" outlined x-small fab dark color="indigo" @click="addUpdatePlanBlockers('plan')">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>

      <template v-if="item.plans.length">
        <div v-for="(item, i) in item.plans" :key="i" class="px-2">
          <v-list-item class="px-2">
            <div class="d-flex flex-grow-1 align-center box_content" v-html="item.compiled"></div>

            <v-list-item-action class="my-1">
              <v-btn class="" fab text dark x-small color="indigo" @click="addUpdatePlanBlockers('plan', item)">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

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
          <v-btn class="" outlined x-small fab dark color="indigo" @click="addUpdatePlanBlockers('blockers')">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>

      <template v-if="item.blockers.length">
        <div v-for="(item, i) in item.blockers" :key="i" class="px-2">
          <v-list-item class="px-0">
            <div class="flex-grow-1 d-flex align-center box_content" v-html="item.compiled"></div>

            <v-list-item-action class="my-1">
              <v-btn class="" fab text dark x-small color="indigo" @click="addUpdatePlanBlockers('blockers', item)">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
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
// import marked from 'marked';
export default {
  props: ['item'],
  data() {
    return {
      input: '',
      // selDailyID: this.item.id,
    };
  },

  // computed: {
  //   compiledMarkdown: function() {
  //     this.item.plans.map((el) => {
  //       console.log(el.markdown);
  //       // return marked(el.markdown, { sanitize: true });
  //     });
  //   },
  // },

  methods: {
    addWork(item) {
      this.$store.state.dialogs.works = true;
    },

    // ADD
    // addPlanBlocker(sel) {
    //   this.$store.state.planBlockData = {
    //     item: {},
    //     isEdit: false,
    //   };
    // },

    // UPDATE
    // updatePlanBlocker(sel, item) {
    //   this.$store.state.planBlockData = {
    //     item: item,
    //     isEdit: true,
    //   };
    // },

    addUpdatePlanBlockers(sel, item) {
      this.$store.state.selPlanBlocker = sel;
      this.$store.state.dialogs.plan_blocker = true;

      if (item) {
        // EDIT PLAN / BLOCKERS
        this.$store.state.planBlockData = { item, isEdit: true };
      } else {
        // ADD PLAN / BLOCKERS
        this.$store.state.planBlockData = { item: {}, isEdit: false };
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
