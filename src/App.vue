<template>
  <v-app id="inspire">
    <!-- start::NAV DRAVER -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Daily Work Widget
          </v-list-item-title>
          <v-list-item-subtitle>
            v1.0.0.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- end::NAV DRAVER -->

    <v-app-bar app color="#fcb69f" dark src="bg-nav.jpg">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.2), rgba(128,208,199,.3)"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- start::MAIN -->
    <v-main>
      <router-view></router-view>
      <!-- SNACKBAR [component] -->
      <SnackBar />
    </v-main>
    <!-- end::MAIN -->
  </v-app>
</template>

<script>
import SnackBar from './components/Shared/SnackBar';
export default {
  components: { SnackBar },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
  }),
};
</script>
