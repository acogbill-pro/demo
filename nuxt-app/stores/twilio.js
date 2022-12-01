// As managed in the Twilio Console 
  
import {defineStore} from 'pinia'
import {useAnalytics} from '~/stores/analytics'

export const useTwilio = defineStore('twilioStore', {
    state: () => ({
        status: '',
    }),
  
    getters: {
      categories: (state) => {
        return state.all.reduce(function (acc, obj) { return acc.add(obj.category); }, new Set())
      },
    },
  
    actions: {
        async sendSMS(toNumberString, withMessage = 'Ahoy!') {
          // enabled by Twilio Function https://www.twilio.com/console/functions/api/start/ZSbaccfcf229a0615df5a0ff35dca021ca
            const analytics = useAnalytics()
            const runtimeConfig = useRuntimeConfig()

            const requestURL = `${runtimeConfig.public.justCORSurl}${runtimeConfig.public.twilioSMS}?To=${encodeURIComponent('+1')}${encodeURIComponent(toNumberString)}&Body=${encodeURIComponent(withMessage)}`

            const response = await fetch(requestURL)

            const data = await response.json();
            this.status = data.status;

            const successfulPrefix = data.status.split(' successfully with SID:')

            if (successfulPrefix[0] === 'Your message was sent') {
                analytics.track('SMS Sent', {message: withMessage})
            }
        }
    }
  })