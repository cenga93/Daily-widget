<template>
  <v-dialog :value="true" persistent max-width="600" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-text-field v-model="tasks" label="Enter new Daily" required @keyup.enter="addDaily"></v-text-field>

      <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->

      <!-- <v-select v-model="select" :items="items" :rules="[(v) => !!v || 'Item is required']" label="Item" required></v-select> -->

      <!-- <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox> -->

      <v-btn :disabled="!tasks" color="primary" class="mr-4" @click="addDaily">
        Save
      </v-btn>
      <v-btn color="secondary" class="mr-4" @click="$emit('close')">
        Cancel
      </v-btn>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddDailyDialog',
  data: () => ({
    tasks: '',
  }),
  computed: {
    taskValidation() {
      return !this.tasks;
    },
  },
  methods: {
    addDaily() {
      if (!this.taskValidation) {
        let payload = {
          tasks: [
            {
              name: this.tasks,
              done: false,
            },
          ],
          plan: [
            {
              id: Date.now(),
              name: 'prvi plan',
            },
          ],
          blocker: [
            {
              id: Date.now(),
              name: 'prvi block',
            },
          ],
          hours: 6,
        };
        this.$store.dispatch('addDaily', payload);
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
