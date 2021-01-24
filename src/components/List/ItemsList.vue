<template>
  <v-list>
    <v-list-group v-for="item in $store.state.daily" :key="item.id" :prepend-icon="item.action" no-action :item="item">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>
      <Item :item="item" />
    </v-list-group>
  </v-list>
</template>

<script>
import { Item } from '@/components';

export default {
  components: { Item },
};
</script>
