<template>
  <v-list flat>
    <!-- ITEM [component] -->
    <Item v-for="dailyItem in $store.state.daily" :key="dailyItem.id" :dailyItem="dailyItem" />
  </v-list>
</template>

<script>
import Item from './Item';

export default {
  components: { Item },
};
</script>

<style></style>
