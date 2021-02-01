<template>
  <div class="box pa-4">
    <div id="editor">
      <v-row>
        <v-col class="d-flex justify-space-between mb-3">
          <small class="font-weight-light indigo--text">
            You can use markdown to write
          </small>
          <v-btn
            href="https://guides.github.com/features/mastering-markdown/"
            target="_blank"
            width="25"
            height="25"
            color="dark"
            fab
            x-small
            dark
          >
            <v-icon>mdi-help</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- EDIT PLAN/BLOCKERS -->
      <v-form ref="form" lazy-validation class="form" v-if="$store.state.planBlockData.isEdit">
        <v-textarea v-model="editInput" filled auto-grow label="Description" :rules="rules" rows="3" shaped>
          <template v-slot:label @input="update" :value="editInput">
            <div>Description</div>
          </template>
        </v-textarea>

        <p>Output:</p>
        <v-row>
          <v-col>
            <div class="content" v-html="compiledMarkdownEdit"></div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12  d-flex btn_box">
            <div class="mb-2 d-flex flex-grow-1">
              <v-btn color="indigo" class="mr-4 white--text" :disabled="!editInput" @click="editPlanBlocker">
                <v-icon>mdi-check</v-icon> Update
              </v-btn>

              <v-btn color="secondary lighten-2" class="mr-4" @click="hideModal">
                Cancel
              </v-btn>
            </div>

            <v-btn color="red lighten-1 white--text" co class="mr-4" @click="deletePlanBlocker">
              <v-icon>mdi-delete</v-icon> delete
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- ADD PLAN/BLOCKERS -->
      <v-form ref="form" lazy-validation class="form" v-else>
        <v-row>
          <v-col>
            <v-textarea v-model="input" filled auto-grow label="Description" rows="3" :rules="rules" shaped>
              <template v-slot:label @input="update" :value="input">
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p class="ma-0">Output:</p>
            <div class="content" v-html="compiledMarkdown"></div>
          </v-col>
        </v-row>

        <v-row class="my-0">
          <v-col cols="12">
            <v-btn color="indigo" class="mr-4 white--text" :disabled="!input" @click="addPlanBlocker">
              Save
            </v-btn>
            <v-btn color="secondary lighten-2" class="mr-4" @click="hideModal">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import marked from 'marked';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      input: '',
      editInput: this.$store.state.planBlockData.isEdit && this.$store.state.planBlockData.item.markdown,
      rules: [
        (v) => !!v || 'Description is required',
        (v) => (v && v.length > 1) || 'Min characters is 2',
        (v) => (v && v.length <= 200) || 'Max characters is 200',
      ],
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    },
    compiledMarkdownEdit: function() {
      return marked(this.editInput, { sanitize: true });
    },
  },

  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),

    hideModal() {
      this.$store.state.dialogs.plan_blocker = false;
    },

    addPlanBlocker() {
      if (this.$refs.form.validate()) {
        let payload = {
          markdown: this.input,
          compiled: this.compiledMarkdown,
          id: uuidv4(),
        };
        this.$store.dispatch('addPlanBlocker', payload);
        this.hideModal();
      }
    },

    editPlanBlocker() {
      if (this.$refs.form.validate()) {
        let payload = {
          markdown: this.editInput,
          compiled: this.compiledMarkdownEdit,
          id: this.$store.state.planBlockData.item && this.$store.state.planBlockData.item.id,
        };

        if (confirm('are you sure you want to update this record?')) {
          this.$store.dispatch('editPlanBlocker', payload);
        } else {
          return false;
        }
        this.hideModal();
      }
    },

    deletePlanBlocker() {
      let id = this.$store.state.planBlockData.item && this.$store.state.planBlockData.item.id;

      if (confirm('do you want to delete?')) {
        this.$store.dispatch('deletePlanBlocker', id);
      } else {
        return false;
      }
      this.hideModal();
    },
  },
};
</script>

<style lang="scss" scoped>
#editor {
  textarea {
    width: 100%;
  }
}
.content {
  padding: 0.7rem;
  overflow-wrap: break-word;
}
.btn_box {
  @media only screen and (max-width: 425px) {
    display: block !important;
  }
  button {
    @media only screen and (max-width: 425px) {
      height: 30px !important;
      font-size: 12px !important;
    }
  }
}
</style>

<style scoped></style>
