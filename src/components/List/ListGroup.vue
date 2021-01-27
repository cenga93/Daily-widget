<template>
  <div @click="selectItem(item)">
    <!-- :prepend-icon="dily.action" -->
    <v-list-group prepend-icon="mdi-calendar-check">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.date"></v-list-item-title>
        </v-list-item-content>
      </template>

      <!-- CARD CONTAINER [component] -->
      <CardContainer :item="item" />
      <!-- <CardContainer :/> -->
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
  methods: {
    selectItem(item) {
      // console.log(item);
      this.$store.commit('itemSelected', item);
    },
  },
};
</script>

<style></style>
