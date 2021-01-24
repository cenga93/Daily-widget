<template>
  <v-card min-height="500">
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">
        Today
      </div>

      <v-timeline align-top dense>
        <v-timeline-item v-for="message in messages" :key="message.time" :color="message.color" small>
          <div>
            <div class="font-weight-normal"><strong>tesd</strong> @sdfsd</div>
            <div>sdfsdf</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'messages'],
};
</script>

<style></style>
