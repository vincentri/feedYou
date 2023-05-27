<template>
  <div>
    <div>
      <b>Total Bot: {{ totalBots }}</b>
    </div>
    <CommonCard v-for="(bot, key) in bots" :key="key">
      <template #title> <b>Bot ID:</b> {{ bot.id }} </template>
      <template #body> <b>Bot Status:</b> {{ bot.status }} </template>
    </CommonCard>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: ['bots', 'totalBots'],
});
</script>
