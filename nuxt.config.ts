import { defineNuxtConfig } from 'nuxt'
// import yandexMetrikaScript from './helpers/yandexMetrikaScript.js'
// https://v3.nuxtjs.org/api/configuration/nuxt.conasdasasddasfig
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  // Will use this module for a while
  buildModules: ['@intlify/nuxt3'],
  app: {
    head: {
      title: 'Learning platform',
      script: [
        // yandexMetrikaScript,
      ],
    },
  },
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
    },
  },
  css: [
    'assets/scss/reset.scss',
    'assets/scss/ui.scss',
  ],
  runtimeConfig: {
  
    public: {
      SSO_URL: 'https://...',
      PLATFORM_API: 'https://...',
      PLATFORM_API_V2: 'https://...',
      LEGACY_PLATFORM_FRONT: 'https://...',
      ENV: 'production',
    },
  },
})
