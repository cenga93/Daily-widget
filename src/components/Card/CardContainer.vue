<template>
  <v-list-item class="pa-0">
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <!-- <LeftCard /> -->
          <LeftCard :item="item" />
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <RightCard />
        </v-col>
      </v-row>
    </v-container>
  </v-list-item>
</template>

<script>
import LeftCard from '@/components/Card/LeftCard';
import RightCard from '@/components/Card/Rightcard';

export default {
  components: { LeftCard, RightCard },
  props: ['item'],
};
</script>

<style></style>
