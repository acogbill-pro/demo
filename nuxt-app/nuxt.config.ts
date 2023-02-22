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
    modules: ['@pinia/nuxt','@nuxtjs/supabase'],
    nitro: {
      plugins: ["~/server/index.js"],
    },
    runtimeConfig: {
      // to use: const runtimeConfig = useRuntimeConfig(); runtimeConfig.varName
      public: {
        // to use: runtimeConfig.public.varName
        wifiWriteKey: process.env.WIFI_WRITE_KEY,
        shopWriteKey: process.env.SHOP_WRITE_KEY,
        CORS_URL: process.env.CORS_URL,
        CORSdomain: process.env.NODE_ENV === 'production' ? 'andycogbill.com' : 'localhost:3000',
        //profileURL: process.env.NODE_ENV === 'production' ? 'https://segment-demo-backend.onrender.com:10000' : 'http://localhost:10000',
        profileKey: process.env.BE_API_KEY,
        profilesToken: process.env.PROFILES_ACCESS_TOKEN,
        profilesSpaceID: process.env.PROFILES_SPACE_ID,
        twilioSMS: process.env.TWILIO_SMS_URL,
        twilioMMS: process.env.TWILIO_MMS_URL,
        fromTwilioNumbers: process.env.TWILIO_PHONE_NUMBERS,
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
