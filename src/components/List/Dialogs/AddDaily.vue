<template>
  <v-dialog :value="true" persistent max-width="400" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-dialog ref="dialog" v-model="dataModal" :return-value.sync="date" persistent width="320">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            @keyup.enter="addDaily"
            v-model="date"
            label="Enter daily date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="indigo" @click="$refs.dialog.save(date)">
            OK
          </v-btn>
          <v-btn text color="secondary" @click="dataModal = false">
            Cancel
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-btn color="indigo white--text" class="mr-4" @click="addDaily">
        Save
      </v-btn>
      <v-btn color="secondary" class="mr-4" @click="$emit('close')">
        Cancel
      </v-btn>
    </v-form>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  data: () => ({
    dataModal: false,
    date: new Date().toISOString().substr(0, 10),
  }),
  computed: {
    validation() {
      return this.date;
    },
  },
  methods: {
    addDaily() {
      if (this.validation) {
        let newDaily = {
          id: uuidv4(),
          date: this.date,
          works: [],
          plans: [],
          blockers: [],
          workday: '',
          time: '',
        };
        this.$store.dispatch('addDaily', newDaily);
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

.v-menu__content {
  top: 50%;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
</style>
