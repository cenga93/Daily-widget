<template>
  <v-dialog :value="true" persistent max-width="300" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-text-field label="Add time" v-model="newTime"></v-text-field>

      <v-btn color="indigo" class="mr-4 white--text" @click="addTime">
        Save
      </v-btn>
      <v-btn color="secondary" class="mr-4" @click="$store.state.dialogs.add_time = false">
        Cancel
      </v-btn>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      newTime: '',
    };
  },
  methods: {
    addTime() {
      this.$store.dispatch('addTime', this.newTime);
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
