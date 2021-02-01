<template>
  <v-dialog :value="true" persistent max-width="500" max-height="100">
    <!-- EDIT -->
    <v-form ref="form" lazy-validation class="form" v-if="$store.state.work.isEdit">
      <div class="text--end pa-4 ">
        Edit your work
      </div>
      <v-divider></v-divider>

      <div class="pa-4 pt-2">
        <v-text-field
          v-model="payloadEdit.description"
          :value="payloadEdit.description"
          :rules="rules.description"
          label="Description"
          required
        ></v-text-field>

        <v-row>
          <v-col cols="12" sm="12" md="5">
            <v-select
              v-if="projects"
              :rules="rules.projects"
              label="Select project"
              :value="payloadEdit.selectedProject"
              :items="projects"
              :item-text="(item) => `${item.name} - ${item.shortCode}`"
              v-model="payloadEdit.selectedProject"
            >
            </v-select>
          </v-col>

          <v-col cols="12" sm="12" md="5">
            <v-select
              :items="tasks"
              :rules="rules.tasks"
              label="Task"
              :value="payloadEdit.selectedTask"
              v-model="payloadEdit.selectedTask"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="2">
            <v-text-field
              label="Hours"
              v-model="payloadEdit.selectedHours"
              :value="payloadEdit.selectedHours"
              :rules="rules.hours"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox v-model="payloadEdit.done" class="ma-0" label="Work done:" color="indigo"></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="indigo" class="mr-4 white--text" @click="updateWork">
              Update
            </v-btn>
            <v-btn color="secondary lighten-2" class="mr-4" @click="$store.state.dialogs.works = false">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>

    <!-- ADD -->
    <v-form ref="form" lazy-validation class="form" v-else>
      <div class="text--end pa-4 ">
        Describe your work
      </div>
      <v-divider></v-divider>

      <div class="pa-4 pt-2">
        <v-text-field v-model="payload.description" :rules="rules.description" label="Description" required></v-text-field>

        <v-row>
          <v-col cols="12" sm="12" md="5">
            <v-select
              v-if="projects"
              :rules="rules.projects"
              label="Select project"
              :items="projects"
              :item-text="(item) => `${item.name} - ${item.shortCode}`"
              v-model="payload.selectedProject"
            >
            </v-select>
          </v-col>

          <v-col cols="12" sm="12" md="5">
            <v-select :items="tasks" :rules="rules.tasks" label="Task" v-model="payload.selectedTask"></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="2">
            <v-text-field label="Hours" v-model="payload.selectedHours" :rules="rules.hours" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="indigo" class="mr-4 white--text" @click="addWork">
              Save
            </v-btn>
            <v-btn color="secondary lighten-2" class="mr-4" @click="$store.state.dialogs.works = false">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  data() {
    return {
      ex4: true,
      // ---------------------------------------------
      projects: [
        { shortCode: 'bsw', name: 'BigSandwich' },
        { shortCode: 'nbc', name: 'NBC' },
        { shortCode: 'sbl', name: 'SuperBall' },
        { shortCode: 'f1', name: 'F1' },
      ],
      tasks: ['Show modal dialog', 'Add item to card'],
      //----------------------------------------------
      payload: {
        workID: uuidv4(),
        selectedProject: '',
        selectedTask: '',
        selectedHours: '',
        description: '',
        details: null,
        done: false,
      },
      payloadEdit: this.$store.state.work.isEdit && {
        selectedProject: this.$store.state.work.data.selectedProject,
        selectedTask: this.$store.state.work.data.selectedTask,
        selectedHours: this.$store.state.work.data.selectedHours,
        description: this.$store.state.work.data.description,
        workID: this.$store.state.work.data.workID,
        done: this.$store.state.work.data.done,
      },
      rules: {
        hours: [
          (v) => !!v || 'hours is required',
          (v) => (v && v.length >= 1) || 'Min characters is 1',
          (v) => (v && v.length <= 2) || 'Max characters is 2',
        ],
        description: [
          (v) => !!v || 'description is required',
          (v) => (v && v.length >= 5) || 'Min characters is 5',
          (v) => (v && v.length <= 40) || 'Max characters is 40',
        ],
        projects: [(v) => !!v || 'project is required'],
        tasks: [(v) => !!v || 'task is required'],
      },
    };
  },

  methods: {
    addWork() {
      // VALIDATION
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addWork', this.payload);
        this.$emit('close');
      }
    },
    updateWork() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('updateWorkInfo', this.payloadEdit);
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
