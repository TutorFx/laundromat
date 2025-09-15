// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/image', '@nuxt/eslint'],
  ui: {
    theme: {
      colors: [
        'primary'
      ]
    },
  },
  experimental: {
    typedPages: true,
  },
  i18n: {
    defaultLocale: 'pt-BR',
    locales: [
      {
        code: 'pt-BR',
        language: 'Português',
        file: 'pt-BR.ts'
      }
    ]
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-16'
})
