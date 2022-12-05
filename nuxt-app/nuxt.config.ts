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
    modules: ['@pinia/nuxt'],
    alias: {
        //pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    },
    runtimeConfig: {
      // to use: const runtimeConfig = useRuntimeConfig(); runtimeConfig.varName
      privateAPIKey: process.env.SERVER_ONLY_KEY,
      public: {
        // to use: runtimeConfig.public.varName
        blogWriteKey: process.env.BLOG_WRITE_KEY,
        shopWriteKey: process.env.SHOP_WRITE_KEY,
        profilesSpaceID: process.env.PROFILES_SPACE_ID,
        profilesAccessToken: process.env.PROFILES_ACCESS_TOKEN,
        justCORSurl: process.env.JUST_CORS,
        categoryNames: process.env.CATEGORY_NAMES,
        twilioSMS: process.env.TWILIO_SMS_URL,
        fromTwilioNumbers: JSON.parse(process.env.TWILIO_PHONE_NUMBERS),
      }
    },
    /*head: {
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      "link": [],
      "style": [],
      "script": [],
      "noscript": []
    },*/
})
