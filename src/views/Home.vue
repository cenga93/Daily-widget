<template>
  <div class="home">
    <v-card class="mx-auto slots pa-3">
      <!-- TOOLBAR [component] -->
      <ToolBar @showToolBar="$store.state.dialog = true" />

      <!-- LIST ITEMS [component] -->
      <ItemsList v-if="$store.state.daily.length" />

      <h1 v-else>Nema nista</h1>
    </v-card>

    <!-- DIALOG ADD DAILY [component] -->
    <AddDailyDialog v-if="$store.state.dialog" @close="$store.state.dialog = false" />
  </div>
</template>

<script>
import { ItemsList, AddDailyDialog, ToolBar } from '@/components';

export default {
  components: { ItemsList, AddDailyDialog, ToolBar },
};
</script>

<style lang="css" scoped>
.slots {
  min-height: 93vh;
}
</style>
