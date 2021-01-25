<template>
  <v-dialog :value="true" persistent max-width="600" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-text-field v-model="newTask" label="Enter new Task" required></v-text-field>

      <v-btn color="primary" class="mr-4" :disabled="!newTask" @click="addTask">
        Save
      </v-btn>
      <v-btn color="secondary" class="mr-4" @click="$store.state.dialogs.tasks = false">
        Cancel
      </v-btn>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
    };
  },

  methods: {
    addTask() {
      this.$store.dispatch('addTask', this.newTask);
      console.log('itemSelected / GLOBAR STATE: ', this.$store.state.itemSelected.id);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.form {
  background: #fff;
}

.v-menu__content {
  top: 50%;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
