<template>
  <v-dialog :value="true" persistent max-width="500" max-height="100">
    <v-form ref="form" lazy-validation class="form">
      <div class="text--end pa-4 ">
        Describe your work
      </div>
      <v-divider></v-divider>
      <div class="pa-4 pt-2">
        <v-text-field v-model="newWork" label="Description" required></v-text-field>

        <v-row>
          <v-col cols="12" sm="12" md="5">
            <v-select :items="$store.state.workday" label="Project"></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="5">
            <v-select :items="$store.state.workday" label="Task"></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="2">
            <v-text-field label="Hours" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="indigo" class="mr-4" :disabled="!newWork" @click="addWork">
              Save
            </v-btn>
            <v-btn color="secondary" class="mr-4" @click="$store.state.dialogs.works = false">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      newWork: '',
    };
  },

  methods: {
    addWork() {
      this.$store.dispatch('addWork', this.newWork);
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
</style>
