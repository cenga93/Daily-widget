<template>
  <v-card min-height="500">
    <!-- IMAGE CARD -->
    <v-img height="200px" src="bg-card.jpg">
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
        <v-subheader>
          <v-btn class="ma-2" outlined x-small fab dark color="indigo" @click="addTask(item)">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>
      <div v-if="item.tasks.length">
        <div v-for="(item, i) in item.tasks" :key="i">
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

    <!-- PLAN LIST -->
    <v-list dense class="px-2 mb-1">
      <div class="d-flex justify-space-between px-2">
        <v-subheader>PLAN</v-subheader>
        <v-subheader>
          <v-btn class="ma-2" outlined x-small fab dark color="indigo">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </div>
      <div>
        <v-list-item>
          <template>
            <v-list-item-action class="mr-1 my-2">
              <v-checkbox></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="indigo">
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
          ><v-btn class="ma-2" outlined x-small fab dark color="indigo">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn></v-subheader
        >
      </div>
      <div>
        <v-list-item>
          <template>
            <v-list-item-action class="mr-1 my-2">
              <v-checkbox></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="ma-0">
              <v-btn class="mx-2" fab text dark x-small color="indigo">
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
  props: ['item'],
  methods: {
    addTask(item) {
      this.$store.state.itemSelected = item;
      this.$store.state.dialogs.tasks = true;
    },
  },
};
</script>
