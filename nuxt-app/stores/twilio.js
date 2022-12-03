// As managed in the Twilio Console 
  
import {defineStore} from 'pinia'
import {useAnalytics} from '~/stores/analytics'

export const useTwilio = defineStore('twilioStore', {
    state: () => ({
        status: '',
    }),
  
    getters: {
      statusOK: (state) => {
        return state.status.split(' successfully with SID:')[0] === 'Your message was sent'
      },
    },
  
    actions: {
        async sendSMS(eventName = 'General SMS', fromNumberString = '', toNumberString, withMessage = 'Ahoy!') {
          // enabled by Twilio Function https://www.twilio.com/console/functions/api/start/ZSbaccfcf229a0615df5a0ff35dca021ca
          // Largely built following these instructions: https://www.twilio.com/blog/send-sms-vue
          // Needed another article to confirm that URL params are pulled through an `event` object
          // Payload for eventual call to SMS API includes `body`, `to`, and `from`
            const analytics = useAnalytics()
            const runtimeConfig = useRuntimeConfig()

            const requestURL = 
            `${runtimeConfig.public.justCORSurl}${runtimeConfig.public.twilioSMS}?From=${encodeURIComponent('+1')}${encodeURIComponent(fromNumberString === '' ? runtimeConfig.fromTwilioNumbers[0] : fromNumberString)}&To=${encodeURIComponent('+1')}${encodeURIComponent(toNumberString)}&Body=${encodeURIComponent(withMessage)}`

            const response = await fetch(requestURL)

            const data = await response.json();
            this.status = data.status;

            if (this.statusOK) {
                analytics.track('SMS Sent', {eventName, message: withMessage})
            }
        }
    }
  })