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
import SnackBar from '@/components/Shared/SnackBar';
import NavDrawer from '@/components/Nav/NavDrawer';
import NavApp from '@/components/Nav/NavApp';

export default {
  components: { SnackBar, NavDrawer, NavApp },
};
</script>
