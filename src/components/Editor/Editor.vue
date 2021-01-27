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
      <div v-if="$store.state.planBlockData.isEdit">
        <v-textarea v-model="editInput" filled auto-grow label="Description" rows="3" shaped>
          <template v-slot:label @input="update" :value="editInput">
            <div>Description</div>
          </template>
        </v-textarea>

        <p>Output:</p>
        <v-row>
          <v-col>
            <div class="test" v-html="compiledMarkdownEdit"></div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn color="indigo" class="mr-4 white--text" :disabled="!editInput" @click="editPlanBlocker">
              <v-icon>mdi-check</v-icon> Save
            </v-btn>
            <v-btn color="secondary lighten-2" class="mr-4" @click="hideModal">
              Cancel
            </v-btn>
          </v-col>
          <v-col class="justify-end d-flex">
            <v-btn color="red lighten-1 white--text" co class="mr-4" @click="deletePlanBlocker">
              <v-icon>mdi-delete</v-icon> delete
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- ADD PLAN/BLOCKERS -->
      <v-form ref="form" lazy-validation class="form" v-else>
        <v-textarea v-model="input" filled auto-grow label="Description" rows="3" shaped>
          <template v-slot:label @input="update" :value="input">
            <div>Description</div>
          </template>
        </v-textarea>

        <p>Output:</p>
        <v-row>
          <v-col>
            <div class="test" v-html="compiledMarkdown"></div>
          </v-col>
        </v-row>

        <v-btn color="indigo" class="mr-4 white--text" :disabled="!input" @click="addPlanBlocker">
          Save
        </v-btn>
        <v-btn color="secondary lighten-2" class="mr-4" @click="hideModal">
          Cancel
        </v-btn>
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
      let payload = {
        markdown: this.input,
        compiled: this.compiledMarkdown,
        id: uuidv4(),
      };

      this.$store.dispatch('addPlanBlocker', payload);
      this.hideModal();
    },

    editPlanBlocker() {
      let payload = {
        markdown: this.editInput,
        compiled: this.compiledMarkdownEdit,
        id: this.$store.state.planBlockData.item && this.$store.state.planBlockData.item.id,
      };

      this.$store.dispatch('editPlanBlocker', payload);
      this.hideModal();
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
.test {
  padding: 0.7rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  // hyphens: auto;
}
</style>

<style scoped></style>
