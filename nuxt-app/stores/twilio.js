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
        async sendSMS(toNumber, withMessage = 'Ahoy!') {
            const analytics = useAnalytics()
            const runtimeConfig = useRuntimeConfig()

            const requestURL = `${runtimeConfig.public.justCORSurl}${runtimeConfig.public.twilioSMS}?To=${encodeURIComponent(toNumber)}&Body=${encodeURIComponent(withMessage)}`

            const response = await fetch(requestURL)

            const data = await response.json();
            this.status = data.status;

            const successfulPrefix = data.status.split(' successfully with SID:')

            if (successfulPrefix[0] === 'Your message was sent') {
                analytics.track('SMS Sent')
            }
        }
    }
  })