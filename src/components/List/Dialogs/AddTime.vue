<template>
  <v-dialog :value="true" persistent max-width="300" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-row>
        <v-col>
          <v-text-field label="Add time" :rules="rules" v-model="newTime"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-col>
          <v-btn color="indigo" class="mr-4 white--text" @click="addTime">
            Save
          </v-btn>
          <v-btn color="secondary" class="mr-4" @click="$store.state.dialogs.add_time = false">
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
      newTime: '',
      rules: [
        (v) => !!v || 'hours is required',
        (v) => (v && v.length >= 1) || 'Min characters is 1',
        (v) => (v && v.length <= 2) || 'Max characters is 2',
      ],
    };
  },
  methods: {
    addTime() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addTime', this.newTime);
        this.$emit('close');
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
