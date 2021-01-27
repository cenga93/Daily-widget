<template>
  <v-card>
    <!-- CARD TOP -- IMAGES -->
    <v-img height="180px" src="bg-card.jpg">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="title white--text pl-0 d-flex">
          <v-icon color="white " class="mr-2">
            mdi-calendar
          </v-icon>
          {{ item.date }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="title white--text mr-3 d-flex align-center">
          <div class="mr-3" v-if="item.workday">
            {{ item.workday }}
          </div>
          <div v-else>
            <small>
              Add workday
            </small>
          </div>
          <v-btn text icon x-small color="white" class="pa-2" @click="$store.state.dialogs.add_workday = true">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar-title>
      </v-app-bar>

      <v-card-title class="white--text mt-8">
        Hours:
        <span class="ml-3" v-if="!item.time">--</span>
        <span class="ml-2" v-else>{{ item.time }}</span>

        <v-spacer></v-spacer>

        <div class="d-flex mr-2">
          <v-btn class="mx-2" color="white" fab text dark x-small @click="$store.state.dialogs.add_time = true">
            <v-icon dark>
              mdi-clock-time-eight-outline
            </v-icon>
          </v-btn>
        </div>
      </v-card-title>
    </v-img>

    <!-- start::DONE LIST  ********************************************************* TREBA DA SE RESI -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>DONE</v-subheader>
        <v-subheader>
          <v-btn class="ma-2" outlined x-small fab dark color="indigo" @click="addWork()">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>
      <div v-if="item.works.length">
        <div v-for="(item, i) in item.works" :key="i">
          <v-list-item>
            <template>
              <v-list-item-action class="mr-1 my-2">
                <v-checkbox :input-value="item.done"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="ma-0">
                <v-btn class="mx-2" fab text dark x-small color="indigo">
                  <v-icon dark>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </div>
      <div v-else>
        <v-list-item>
          <template>
            <v-list-item-content>
              <v-list-item-title>Not found tasks...</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </div>
    </v-list>
    <!-- end::DONE LIST -->

    <!-- start::PLAN LIST -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>PLAN</v-subheader>
        <v-subheader>
          <v-btn class="ma-2" outlined x-small fab dark color="indigo" @click="addUpdatePlanBlockers('plan')">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>

      <template v-if="item.plans.length">
        <div v-for="(item, i) in item.plans" :key="i">
          <v-list-item>
            <div class="flex-grow-1 d-flex align-center box_content" v-html="item.compiled"></div>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="indigo" @click="addUpdatePlanBlockers('plan', item)">
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
          <v-list-item-title>Not found plans...</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- end::PLAN LIST -->

    <!-- start::BLOCKER LIST -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>BLOCKER</v-subheader>
        <v-subheader>
          <v-btn class="ma-2" outlined x-small fab dark color="indigo" @click="addUpdatePlanBlockers('blockers')">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn></v-subheader
        >
      </div>

      <template v-if="item.blockers.length">
        <div v-for="(item, i) in item.blockers" :key="i">
          <v-list-item>
            <div class="flex-grow-1 d-flex align-center box_content" v-html="item.compiled"></div>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="indigo" @click="addUpdatePlanBlockers('blockers', item)">
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
          <v-list-item-title>Not found blockers...</v-list-item-title>
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

<style lang="css">
.box_content * {
  margin: 0 !important;
  /* padding: 0; */
}
</style>
