<template>
  <v-navigation-drawer v-model="$store.state.drawer" app>
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
      <v-list-item v-for="item in $store.state.navItems" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
