<template>
  <v-dialog :value="true" persistent max-width="500" max-height="100">
    <!-- EDIT -->
    <v-form ref="form" lazy-validation class="form" v-if="$store.state.selWork.isEdit">
      <div class="text--end pa-4 ">
        OVO JE EDIT
      </div>
      <v-divider></v-divider>

      <div class="pa-4 pt-2">
        <!-- <v-text-field label="Description" required></v-text-field> -->

        <template v-if="$store.state.selWork.data != null">
          <v-row>
            <v-col cols="12">
              <v-textarea
                filled
                auto-grow
                label="Add a more description details"
                rows="2"
                required
                v-model="editData.data.desc_long"
                :value="editData.data.desc_long"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-textarea
                filled
                auto-grow
                label="Hours description"
                v-model="editData.data.desc_hours"
                :value="editData.data.desc_hours"
                rows="2"
                required
              >
              </v-textarea>
            </v-col>

            <v-col cols="12">
              <v-textarea
                filled
                auto-grow
                label="Description for task"
                v-model="editData.data.desc_task"
                :value="editData.data.desc_task"
                rows="2"
                required
              >
              </v-textarea>
            </v-col>

            <v-col cols="12">
              <v-textarea
                filled
                auto-grow
                label="Describe your project"
                v-model="editData.data.desc_project"
                :value="editData.data.desc_project"
                rows="2"
                required
              >
              </v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn color="indigo" class="mr-4 white--text" @click="updateWorkDetais">
                Save
              </v-btn>
              <v-btn color="secondary lighten-2" class="mr-4" @click="$store.state.dialogs.update_work = false">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row>
            <v-col>
              <h2>You must first add details</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="secondary lighten-2" class="mr-4" @click="$store.state.dialogs.update_work = false">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </div>
    </v-form>

    <!-- ADD -->
    <v-form ref="form" lazy-validation class="form" v-else>
      <div class="text--end pa-4 ">
        AOVO JE ADD
      </div>
      <v-divider></v-divider>

      <div class="pa-4 pt-2">
        <!-- <v-text-field label="Description" required></v-text-field> -->

        <v-row>
          <v-col cols="12">
            <v-textarea
              filled
              auto-grow
              label="Add a more description details"
              rows="2"
              required
              v-model="payload.desc_long"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-textarea filled auto-grow label="Hours description" v-model="payload.desc_hours" rows="2" required> </v-textarea>
          </v-col>

          <v-col cols="12">
            <v-textarea filled auto-grow label="Description for task" v-model="payload.desc_task" rows="2" required> </v-textarea>
          </v-col>

          <v-col cols="12">
            <v-textarea filled auto-grow label="Describe your project" v-model="payload.desc_project" rows="2" required>
            </v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn color="indigo" class="mr-4 white--text" @click="updateWork">
              Save
            </v-btn>
            <v-btn color="secondary lighten-2" class="mr-4" @click="$store.state.dialogs.update_work = false">
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
      editData: this.$store.state.selWork.isEdit && this.$store.state.selWork,
      payload: {
        desc_long: '',
        desc_hours: '',
        desc_task: '',
        desc_project: '',
      },
    };
  },

  methods: {
    updateWork() {
      let data = { payload: this.payload, id: this.$store.state.selWork.id };
      this.$store.dispatch('updateWork', data);
      this.$emit('close');
    },
    updateWorkDetais() {
      let data = { payload: this.editData, id: this.$store.state.selWork.id };
      this.$store.dispatch('updateWorkDetais', data);
      this.$emit('close');
    },
  },
};
</script>

<style>
.form {
  background: #fff;
}
</style>
