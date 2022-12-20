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
    runtimeConfig: {
      // to use: const runtimeConfig = useRuntimeConfig(); runtimeConfig.varName
      public: {
        // to use: runtimeConfig.public.varName
        blogWriteKey: process.env.BLOG_WRITE_KEY,
        shopWriteKey: process.env.SHOP_WRITE_KEY,
        CORSdomain: process.env.NODE_ENV === 'production' ? 'andycogbill.com' : 'localhost:3000',
        twilioSMS: process.env.TWILIO_SMS_URL,
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
