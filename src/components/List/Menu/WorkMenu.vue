<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab text dark x-small color="indigo" v-bind="attrs" v-on="on">
        <v-icon dark>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" @click="handleClick(i)">
        <v-list-item-icon class="mr-2">
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: ['workItem'],
  data: () => ({
    items: [
      {
        title: 'Add work details',
        icon: 'mdi-pencil',
        click() {
          this.$store.state.dialogs.update_work = true;
          this.$store.state.selWork = { id: this.workItem.workID, isEdit: false, data: null };
        },
      },
      {
        title: 'Edit work info',
        icon: 'mdi-page-next-outline',
        click() {
          this.$store.state.dialogs.update_work = true;
          this.$store.state.selWork = { id: this.workItem.workID, isEdit: true, data: this.workItem.details };
        },
      },
      {
        title: 'Delete work details',
        icon: 'mdi-delete',
        click() {},
      },
    ],
  }),
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    },
  },
};
</script>

<style></style>
