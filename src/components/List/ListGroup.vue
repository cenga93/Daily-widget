<template>
  <div>
    <!-- :prepend-icon="dily.action" -->
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.date"></v-list-item-title>
          <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
        </v-list-item-content>
      </template>

      <!-- CARD CONTAINER [component] -->
      <CardContainer :item="item" />
    </v-list-group>
  </div>
</template>

<script>
import CardContainer from '@/components/Card/CardContainer';

export default {
  props: ['item'],
  components: {
    CardContainer,
  },
};
</script>

<style></style>
