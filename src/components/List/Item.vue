<template>
  <!-- start::ITEM -->
  <div>
    <!-- @click="$store.commit('doneTask', task.id)" -->
    <!-- :class="{ 'blue ': task.done }" -->
    <v-list-item>
      <template v-slot:default>
        <v-list-item-action>
          <!-- :input-value="task.done" -->
          <v-checkbox></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <!-- :class="{ 'text-decoration-line-through white--text': task.done }" -->
          <v-list-item-title>
            {{ dailyItem }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-item>

    <!-- divider -->
    <v-divider></v-divider>
  </div>
  <!-- end::ITEM -->
</template>

<script>
export default {
  props: ['dailyItem'],
};
</script>

<style></style>
