<template>
  <v-snackbar v-model="$store.state.snackbar.show" bottom :color="$store.state.snackbar.data.color" outlined shaped right>
    {{ $store.state.snackbar.data.text }}
    <template v-slot:action="{ attrs }">
      <v-btn @click="$store.commit('hideSnackBar')" text v-bind="attrs">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="css">
@media only screen and (max-width: 320px) {
  .v-snack__wrapper {
    min-width: 304px !important;
  }
}
</style>
