<template>
  <header class="header">
    <div class="left-side">FeedYou</div>
    <div class="right-side">
      <div @click="useOrder.addBot()">New Bot</div>
      <div @click="useOrder.minBot()">Fire Bot</div>
      <div @click="useOrder.addOrder('Normal')">New Normal Order</div>
      <div @click="useOrder.addOrder('Vip')">New VIP Order</div>
    </div>
  </header>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import { useOrderState } from '~/stores/useOrder/useOrderState';

export default defineComponent({
  setup() {
    const useOrder = useOrderState();

    return {
      useOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  display: flex;
  border-bottom: 2px solid rgb(196, 190, 190);
  justify-content: space-between;
  align-items: center;
  .left-side {
    font-size: 24px;
  }
  .right-side {
    display: flex;
    div {
      margin-right: 20px;
      cursor: pointer;
      border: 3px solid rgb(235, 218, 188);
      padding: 10px;
      border-radius: 8px;
      font-weight: bold;
    }
  }
}
</style>
