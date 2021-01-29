<template>
  <v-dialog :value="true" persistent max-width="300" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-row>
        <v-col>
          <v-select :items="$store.state.workday" :rules="rules" v-model="newWorkday" label="Select Workday"></v-select>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col>
          <v-btn color="indigo" class="mr-4 white--text" @click="addWorkday">
            Save
          </v-btn>
          <v-btn color="secondary" class="mr-4" @click="$store.state.dialogs.add_workday = false">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      newWorkday: '',
      rules: [(v) => !!v || 'workday is required'],
    };
  },
  methods: {
    addWorkday() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addWorkday', this.newWorkday);
        this.$store.state.dialogs.add_workday = false;
      }
    },
  },
};
</script>

<style scoped>
.form {
  background: #fff;
}
</style>
