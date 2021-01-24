<template>
  <v-app-bar app color="#fcb69f" dark src="bg-nav.jpg">
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.2), rgba(128,208,199,.3)"></v-img>
    </template>

    <v-app-bar-nav-icon @click="$store.commit('hideDrawer')"></v-app-bar-nav-icon>
  </v-app-bar>
</template>
