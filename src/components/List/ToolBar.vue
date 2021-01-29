<template>
  <v-toolbar color="indigo" :rounded="true" class="addDailyBox">
    <v-tooltip top color="white">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small @click="$store.state.dialogs.daily = true" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span style="color:#000;">Add Daily</span>
    </v-tooltip>
  </v-toolbar>
</template>

<style>
.addDailyBox .v-toolbar__content {
  padding-left: 8px;
}
</style>
