<template>
  <div class="home">
    <v-card class="mx-auto slots pa-3">
      <!-- TOOLBAR / ADD DAILY [component] -->
      <ToolBar />

      <!-- LIST ITEMS [component] -->
      <ItemsList v-if="$store.state.daily.length" />

      <!-- NOT FOUND DAILY [component] -->
      <NotFoundDaily v-else />
    </v-card>

    <!-- dialog ADD DAILY [component] -->
    <AddDaily v-if="$store.state.dialogs.daily" @close="$store.state.dialogs.daily = false" />

    <!-- dialog ADD PLAN / BLOCKERS [component] -->
    <AddPlanBlocker v-if="$store.state.dialogs.plan_blocker" />

    <!-- dialog ADD WORKDAY [component] -->
    <AddWorkday v-if="$store.state.dialogs.add_workday" />

    <!-- DIALOG ADD TASKS [component] -->
    <AddWork v-if="$store.state.dialogs.works" @close="$store.state.dialogs.works = false" />

    <!-- dialog ADD TIME [component] -->
    <AddTime v-if="$store.state.dialogs.add_time" @close="$store.state.dialogs.add_time = false" />
  </div>
</template>

<script>
import ItemsList from '@/components/List/ItemsList';
import AddDaily from '@/components/List/Dialogs/AddDaily';
import AddPlanBlocker from '@/components/List/Dialogs/AddPlan-Blocker';
import ToolBar from '@/components/List/ToolBar';
import NotFoundDaily from '@/components/List/NotFoundDaily';
import AddWorkday from '../components/List/Dialogs/AddWorkday';
import AddTime from '../components/List/Dialogs/AddTime';
import AddWork from '../components/List/Dialogs/AddWork';

export default {
  components: { ItemsList, AddDaily, ToolBar, NotFoundDaily, AddPlanBlocker, AddWorkday, AddTime, AddWork },
};
</script>

<style lang="css" scoped>
.slots {
  min-height: 93vh;
}
</style>
