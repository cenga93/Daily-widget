<template>
  <v-card>
    <v-img height="200px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">
      <v-app-bar flat color="rgba(0, 0, 0, 0)" class="d-flex justify-space-between">
        <v-list-item-content class="title white--text pl-0">
          <v-list-item-title class="headline">
            <v-icon color="white">
              mdi-calendar
            </v-icon>
            Vikend
          </v-list-item-title>
          <v-list-item-subtitle class="white--text mt-1">{{ item.date }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-app-bar>
    </v-img>

    <!-- DONE LIST -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>DONE</v-subheader>
        <v-subheader
          ><v-btn class="ma-2" small outlined color="indigo">
            Add Task
          </v-btn></v-subheader
        >
      </div>
      <div v-for="(item, i) in tasks" :key="i">
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="primary">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <!-- PLAN LIST -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>PLAN</v-subheader>
        <v-subheader
          ><v-btn class="ma-2" small outlined color="indigo">
            Add Plan
          </v-btn></v-subheader
        >
      </div>
      <div>
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="primary">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <!-- BLOCKER LIST -->
    <v-list dense class="px-2">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>BLOCKER</v-subheader>
        <v-subheader
          ><v-btn class="ma-2" small outlined color="indigo">
            Add Blocker
          </v-btn></v-subheader
        >
      </div>
      <div>
        <v-list-item>
          <template>
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="primary">
                <v-icon dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'messages'],
  data: () => ({
    selectedItem: 1,
    tasks: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ],
    plans: [{ text: 'Real-Time', icon: 'mdi-clock' }],
  }),
};
</script>
