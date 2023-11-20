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
    nitro: {
      plugins: ["~/server/index.js"],
    },
    runtimeConfig: {
      // to use: const runtimeConfig = useRuntimeConfig(); runtimeConfig.varName
      public: {
        // to use: runtimeConfig.public.varName
        wifiWriteKey: process.env.WIFI_WRITE_KEY,
        shopWriteKey: process.env.SHOP_WRITE_KEY,
        profileKey: process.env.BE_API_KEY,
        twilioSMS: process.env.TWILIO_SMS_URL,
        twilioMMS: process.env.TWILIO_MMS_URL,
        fromTwilioNumbers: process.env.TWILIO_PHONE_NUMBERS,
        env: process.env.ENVIRONMENT,
        openAIKey: process.env.OPENAI_API_KEY,
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
