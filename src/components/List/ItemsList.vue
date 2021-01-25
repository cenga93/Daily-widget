<template>
  <v-list flat>
    <!-- LIST GROUP [component] -->
    <ListGroup v-for="item in $store.state.daily" :key="item.id" :item="item" />

    <!-- DIALOG ADD TASKS [component] -->
    <AddDailyTasks v-if="$store.state.dialogs.tasks" @close="$store.state.dialogs.tasks = false" />
  </v-list>
</template>

<script>
import CardContainer from '@/components/Card/CardContainer';
import ListGroup from '@/components/List/ListGroup';
import AddDailyTasks from '@/components/List/Dialogs/AddDailyTasks';

export default {
  components: { CardContainer, ListGroup, AddDailyTasks },
};
</script>
