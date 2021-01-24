<template>
  <v-list-item class="pa-0">
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <LeftCard :item="item" :messages="messages" />
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <RightCard :item="item" :messages="messages" />
        </v-col>
      </v-row>
    </v-container>
  </v-list-item>
</template>

<script>
import LeftCard from '../../components/Card/LeftCard';
import RightCard from '../../components/Card/Rightcard';
export default {
  components: {
    LeftCard,
    RightCard,
  },
  props: ['item'],
  name: 'CardContainer',
  data() {
    return {
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
    };
  },
};
</script>

<style></style>
