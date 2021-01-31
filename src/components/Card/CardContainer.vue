<template>
  <v-list-item class="pa-0">
    <v-container class="">
      <v-row justify="center">
        <v-col cols="12">
          <!-- <LeftCard /> -->
          <Card :item="item" />
        </v-col>
      </v-row>
    </v-container>
  </v-list-item>
</template>

<script>
import Card from '@/components/Card/Card';
import RightCard from '@/components/Card/Rightcard';

export default {
  components: { Card, RightCard },
  props: ['item'],
};
</script>

<style></style>
