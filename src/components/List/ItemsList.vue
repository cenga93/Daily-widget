<template>
  <v-list>
    <v-list-group v-for="item in $store.state.daily" :key="item.id" :prepend-icon="item.action" no-action :item="item">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.date"></v-list-item-title>
          <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
        </v-list-item-content>
      </template>

      <!-- CARD CONTAINER [component] -->
      <CardContainer :item="item" />
    </v-list-group>
  </v-list>
</template>

<script>
import CardContainer from '../../components/Card/CardContainer';

export default {
  components: { CardContainer },
};
</script>
