<template>
  <v-app id="inspire">
    <!-- NAV DRAWER [component] -->
    <NavDrawer />

    <!-- NAV APP [component] -->
    <NavApp />

    <v-main>
      <router-view></router-view>
      <!-- SNACKBAR [component] -->
      <SnackBar />
    </v-main>
  </v-app>
</template>

<script>
import { SnackBar, NavDrawer, NavApp } from '@/components';

export default {
  components: { SnackBar, NavDrawer, NavApp },
};
</script>
