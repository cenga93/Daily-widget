<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small fab dark color="primary lighten-2" v-bind="attrs" v-on="on">
        <v-icon dark>
          mdi-cog-outline
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
  props: ['id'],
  data: () => ({
    items: [
      {
        title: 'Preview daily', 
        icon: 'mdi-clipboard-check-multiple-outline',
        click() {
          this.$store.state.dialogs.details = true;
        },
      },
      {
        title: 'Delete Daily',
        icon: 'mdi-delete',
        click() {
          if (confirm('Do you want to delete curent daily?')) {
            this.$store.dispatch('deleteDaily', this.id);
          }
        },
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
