// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/main.scss'],
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/feedYou/',
  },
});
