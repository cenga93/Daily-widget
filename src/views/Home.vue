<template>
  <div class="home">
    <v-card class="mx-auto slots pa-3">
      <!-- TOOLBAR / ADD DAILY [component] -->
      <ToolBar @showToolBar="$store.state.dialogs.daily = true" />

      <!-- LIST ITEMS [component] -->
      <ItemsList v-if="$store.state.daily.length" />

      <h1 v-else>not found daily...</h1>
    </v-card>

    <!-- DIALOG ADD DAILY [component] -->
    <AddDailyDialog v-if="$store.state.dialogs.daily" @close="$store.state.dialogs.daily = false" />
  </div>
</template>

<script>
import ItemsList from '@/components/List/ItemsList';
import AddDailyDialog from '@/components/List/Dialogs/AddDailyDialog';
import ToolBar from '@/components/List/ToolBar';

export default {
  components: { ItemsList, AddDailyDialog, ToolBar },
};
</script>

<style lang="css" scoped>
.slots {
  min-height: 93vh;
}
</style>
