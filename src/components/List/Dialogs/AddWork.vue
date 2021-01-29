<template>
  <v-dialog :value="true" persistent max-width="500" max-height="100">
    <v-form ref="form" lazy-validation class="form">
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
              :items="projects"
              :item-text="'name'"
              :item-value="'name'"
              v-model="payload.selectedProject"
              label="Select projects"
              :rules="rules.projects"
            >
            </v-select>

            <!-- <v-select :items="projects" item-te v-model="projects" name="project" item-text="name" label="Select a category" /> -->
            <!-- <v-select :items="projects.name" v-model="project" label="Project"></v-select> -->
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
      },
      mojaF() {
        return;
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
          (v) => (v && v.length <= 50) || 'Max characters is 20',
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
  },
};
</script>

<style scoped>
.form {
  background: #fff;
}
</style>
