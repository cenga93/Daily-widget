<template>
  <div class="dailyBox">
    <v-list-group prepend-icon="mdi-calendar-check" @click="selectItem(item)">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.date"></v-list-item-title>
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
  components: { CardContainer },
  methods: {
    selectItem(item) {
      this.$store.commit('itemSelected', item); 
    },
  },
};
</script>
<style>
.dailyBox {
  box-shadow: 0px 0px 3px 1px #00000017;
}
</style>
