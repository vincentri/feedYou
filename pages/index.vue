<template>
  <div class="wrapper">
    <div class="container">
      <features-list-bots :bots="bots" :total-bots="totalBots" />
    </div>
    <div class="container" v-for="s in status" :key="s">
      <features-list-orders :title="s" :orders="getPriorityOrdersByStatus(s)" />
    </div>
  </div>
</template>

<script>
import { useOrderState } from '~/stores/useOrder/useOrderState';
import { defineComponent } from '@vue/composition-api';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const useOrder = useOrderState();
    const { orderNumberCounter, getPriorityOrdersByStatus, totalBots, bots } =
      storeToRefs(useOrder);
    const status = ['Pending', 'Processing', 'Complete'];
    return {
      bots,
      totalBots,
      orderNumberCounter,
      useOrder,
      getPriorityOrdersByStatus,
      status,
    };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  .container {
    margin: 2px;
    padding: 10px;
    border: 1px solid pink;
  }
}
</style>
