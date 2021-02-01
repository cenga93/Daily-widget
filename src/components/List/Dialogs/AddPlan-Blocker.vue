<template>
  <v-dialog :value="true" persistent max-width="600" max-height="100">
    <v-form ref="form" lazy-validation class="form">
      <div class="text--end pa-4 ">
        Describe your plan for tomorrow / blocker
      </div>
      <v-divider></v-divider> 

      <!-- EDITOR [component] -->
      <Editor />
    </v-form>
  </v-dialog>
</template>

<script>
import Editor from '../../Editor/Editor';

export default {
  components: { Editor },
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
