import { defineStore } from 'pinia';
import { OrderTypeEnum } from './enum/orderType.enum';
import { OrderStatusEnum } from './enum/orderStatus.enum';
import { BotStatusEnum } from './enum/botStatus';

export interface ListOrders {
  number: number;
  type: OrderTypeEnum;
  status: OrderStatusEnum;
  processDuration: number;
  botNumber?: number;
  completedAt?: Date;
}

export interface Bots {
  id: number;
  orderNumber?: number;
  status: BotStatusEnum;
}

export const useOrderState = defineStore('useOrder', {
  state: () =>
    ({
      cookingDuration: 10,
      orderNumberCounter: 0,
      botNumberCounter: 0,
      listOrders: [],
      bots: [],
      cookingInterval: [],
    } as {
      cookingDuration: number;
      orderNumberCounter: number;
      botNumberCounter: number;
      listOrders: ListOrders[];
      bots: Bots[];
      cookingInterval: NodeJS.Timer[];
    }),
  getters: {
    getPriorityOrdersByStatus: (state) => {
      return (status: string) => {
        const filterData = [
          ...state.listOrders.filter((v) => v.type == OrderTypeEnum.Vip),
          ...state.listOrders.filter((v) => v.type == OrderTypeEnum.Normal),
        ].filter((order: ListOrders) => order.status == status);
        if (status == OrderStatusEnum.Complete) {
          filterData.sort(
            (a: ListOrders, b: ListOrders) =>
              (b.completedAt as any) - (a.completedAt as any)
          );
        }
        return filterData;
      };
    },
    totalBots: (state) => {
      return state.bots.length;
    },
    findIdleBot: (state) => {
      return state.bots.find((bot) => bot.status == BotStatusEnum.Idle);
    },
    findBotByOrderNumber: (state) => {
      return (orderNumber: number) =>
        state.bots.findIndex((bot) => bot.orderNumber == orderNumber);
    },
  },
  actions: {
    increaseOrderNumber() {
      this.orderNumberCounter++;
    },
    increaseBotNumber() {
      this.botNumberCounter++;
    },
    addOrder(type: OrderTypeEnum) {
      this.increaseOrderNumber();
      this.listOrders.push({
        number: this.orderNumberCounter,
        type: type,
        status: OrderStatusEnum.Pending,
        processDuration: this.cookingDuration,
      });
      this.processingOrder();
    },
    addBot() {
      this.increaseBotNumber();
      this.bots.push({
        id: this.botNumberCounter,
        status: BotStatusEnum.Idle,
      });
      this.processingOrder();
    },
    minBot() {
      const latestBots = this.bots[this.totalBots - 1];
      if (!latestBots) return;
      if (latestBots.orderNumber)
        this.releaseOrderFromBot(latestBots, OrderStatusEnum.Pending);
      this.bots.pop();
    },
    processingOrder() {
      const orderPriority = this.getPriorityOrdersByStatus('Pending');
      if (orderPriority.length <= 0) return;

      const order = orderPriority[0];
      const bot = this.findIdleBot;
      if (!bot) return;
      this.assignBot(bot, order);
      this.updateOrderStatus(order, OrderStatusEnum.Processing);
      this.startCounting(bot, order);
    },
    startCounting(bot: Bots, order: ListOrders) {
      order.processDuration = 10;
      const cookingCount = setInterval(() => {
        order.processDuration--;
        if (order.processDuration <= 0) {
          this.releaseOrderFromBot(bot, OrderStatusEnum.Complete);
          this.updateBotStatus(bot, BotStatusEnum.Idle);
          this.processingOrder();
        }
      }, 1000);

      this.cookingInterval[bot.id] = cookingCount;
    },
    assignBot(bot: Bots, order: ListOrders) {
      bot.status = BotStatusEnum.Work;
      bot.orderNumber = order.number;
    },
    updateOrderStatus(order: ListOrders, status: OrderStatusEnum) {
      order.status = status;
      if (status == OrderStatusEnum.Complete) {
        order.completedAt = new Date();
      }
    },
    releaseOrderFromBot(bot: Bots, status: OrderStatusEnum) {
      const order = this.listOrders.find(
        (order) => order.number == bot.orderNumber
      );
      if (!order) return;
      this.updateOrderStatus(order, status);
      bot.orderNumber = 0;
      if (this.cookingInterval[bot.id]) {
        clearInterval(this.cookingInterval[bot.id]);
        delete this.cookingInterval[bot.id];
      }
    },
    updateBotStatus(bot: Bots, status: BotStatusEnum) {
      bot.status = status;
    },
  },
});
