// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass','mdi/css/materialdesignicons.min.css'],
    build: {
      transpile: ['vuetify'],
    },
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
    buildModules: ['@pinia/nuxt'],
    alias: {
        pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    },
    runtimeConfig: {
      // to use: const runtimeConfig = useRuntimeConfig(); runtimeConfig.varName
      privateAPIKey: process.env.SERVER_ONLY_KEY,
      public: {
        // to use: runtimeConfig.public.varName
        segmentWriteKey: process.env.SEGMENT_WRITE_KEY,
        profilesSpaceID: process.env.PROFILES_SPACE_ID,
        profilesAccessToken: process.env.PROFILES_ACCESS_TOKEN,
        justCORSurl: process.env.JUST_CORS,
      }
    }
})
