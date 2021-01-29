<template>
  <v-dialog :value="true" persistent max-width="400" max-height="100">
    <v-form ref="form" lazy-validation class="pa-5 form">
      <v-row>
        <v-col>
          <v-dialog ref="dialog" v-model="dataModal" :return-value.sync="date" persistent width="320">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-text-field 
                :value="computedDateFormattedMomentjs"
                clearable
                label="Formatted with Moment.js"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker> -->
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="Add new Daily"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="date = null"
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
        </v-col>
      </v-row>

      <v-row class="my-0">
        <v-col>
          <v-btn color="indigo white--text" class="mr-4" @click="addDaily">
            Save
          </v-btn>
          <v-btn color="secondary" class="mr-4" @click="$emit('close')">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <!-- <v-row>
          <v-col>
            <p class="ma-0">Output:</p>
            <div class="test" v-html="compiledMarkdown"></div>
          </v-col>
        </v-row> -->
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { format, parseISO } from 'date-fns';
export default {
  data: () => ({
    dataModal: false,
    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
  }),
  computed: {
    validation() {
      return this.date;
    },
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('D/M dddd') : '';
    },
  },
  methods: {
    addDaily() {
      if (this.validation) {
        let newDaily = {
          id: uuidv4(),
          date: this.computedDateFormattedMomentjs,
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
