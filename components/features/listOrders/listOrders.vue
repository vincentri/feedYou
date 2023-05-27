<template>
  <div>
    <div>
      <b>{{ title }}</b>
    </div>
    <CommonCard v-for="(order, key) in orders" :key="key">
      <template #title> <b>Order ID:</b> {{ order.number }} </template>
      <template #body>
        <div><b>Type:</b> {{ order.type }}</div>
        <div><b>Status:</b> {{ order.status }}</div>
        <div v-if="order.status != 'Complete'">
          <b>Finish in </b> {{ order.processDuration }} second
        </div>
        <div v-if="order.status == 'Complete'">
          <b>Completed at </b> {{ order.completedAt.toLocaleString() }}
        </div>
      </template>
    </CommonCard>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: ['title', 'orders'],
});
</script>
