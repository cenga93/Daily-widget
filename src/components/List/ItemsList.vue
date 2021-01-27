<template>
  <v-list flat>
    <!-- LIST GROUP [component] -->
    <ListGroup v-for="item in $store.state.daily" :key="item.id" :item="item" />
  </v-list>
</template>

<script>
import CardContainer from '@/components/Card/CardContainer';
import ListGroup from '@/components/List/ListGroup';

export default {
  components: { CardContainer, ListGroup },
};
</script>
