<template>
  <div class="home">
    <v-btn color="primary" class="ma-2" @click="dialog = true">Add Daily</v-btn>
    <ListItem v-if="$store.state.daily.length" />

    <!-- DIALOG ADD DAILY [cmoponent] -->
    <AddDailyDialog v-if="dialog" @close="dialog = false" />
  </div>
</template>

<script>
import ListItem from '@/components/List/ListItems';
import AddDailyDialog from '../components/List/Dialogs/AddDailyDialog';

export default {
  name: 'Home',
  data() {
    return {
      dialog: false,
    };
  },
  components: { ListItem, AddDailyDialog },
};
</script>
