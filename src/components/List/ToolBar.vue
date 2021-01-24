<template>
  <v-toolbar color="indigo">
    <v-tooltip right color="white">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab small @click="$emit('showToolBar')" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span style="color:#000;">Add Daily</span>
    </v-tooltip>
  </v-toolbar>
</template>
