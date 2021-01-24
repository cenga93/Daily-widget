<template>
  <v-dialog :value="true" persistent max-width="600" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-text-field v-model="tasks" label="Enter new Daily" required @keyup.enter="addDaily"></v-text-field>

      <v-dialog ref="dialog" v-model="dataModal" :return-value.sync="date" persistent width="320">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
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
    dataModal: false,
    menu1: false,
    tasks: '',
    date: new Date().toISOString().substr(0, 10),
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
          date: this.date,
        };
        this.$store.dispatch('addDaily', payload);
        this.$emit('close');
        console.log(this.date);
      }
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
