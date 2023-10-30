// As managed in the Twilio Console 
  
import {defineStore} from 'pinia'
import {useAnalytics} from '~/stores/analytics'

export const useTwilio = defineStore('twilioStore', {
    state: () => ({
        status: '',
        manualToNumber: '',
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
            analytics.track('SMS Sent', {eventName, message: withMessage})
            this.status = ''

            const toNumberToUse = toNumberString !== '' ? toNumberString : this.manualToNumber !== '' ? this.manualToNumber : '9177576756'

            const headers = {
              "Access-Control-Allow-Origin": `${runtimeConfig.public.CORSdomain}`,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Content-Type": "application/json"
            }

            const requestURL = 
            `${runtimeConfig.public.twilioSMS}?From=${encodeURIComponent('+1')}${encodeURIComponent(fromNumberString === '' ? JSON.parse(runtimeConfig.public.fromTwilioNumbers)[0] : fromNumberString)}&To=${encodeURIComponent('+1')}${encodeURIComponent(toNumberToUse)}&Body=${encodeURIComponent(withMessage)}`

            const response = fetch(requestURL, {headers})
            const status = response.then((data) => {
              const convertToJSON = data.json()
              const status = convertToJSON.then((json) => {
                this.status = json.status
                if (this.statusOK) {
                  // analytics.track('SMS Sent', {eventName, message: withMessage})
                  setTimeout(() => {
                    this.status = ''
                  }, 20000)
                }
              }
            )}).catch(
              //console.log('Call to Twilio failed, likely due to CORS')
            )
        },
        async sendMMS(eventName = 'General MMS', fromNumberString = '', toNumberString, withMessage = 'Ahoy!') {
          // enabled by Twilio Function https://www.twilio.com/console/functions/api/start/ZSbaccfcf229a0615df5a0ff35dca021ca
          // Largely built following these instructions: https://www.twilio.com/blog/send-sms-vue
          // Needed another article to confirm that URL params are pulled through an `event` object
          // Payload for eventual call to SMS API includes `body`, `to`, and `from`
            const analytics = useAnalytics()
            const runtimeConfig = useRuntimeConfig()

            this.status = ''

            const toNumberToUse = toNumberString !== '' ? toNumberString : this.manualToNumber !== '' ? this.manualToNumber : '9177576756'

            const headers = {
              "Access-Control-Allow-Origin": `${runtimeConfig.public.CORSdomain}`,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Content-Type": "application/json"
            }

            const requestURL = 
            `${runtimeConfig.public.twilioMMS}?From=${encodeURIComponent('+1')}${encodeURIComponent(fromNumberString === '' ? JSON.parse(runtimeConfig.public.fromTwilioNumbers)[0] : fromNumberString)}&To=${encodeURIComponent('+1')}${encodeURIComponent(toNumberToUse)}&Body=${encodeURIComponent(withMessage)}`

            const response = fetch(requestURL, {headers})
            const status = response.then((data) => {
              const convertToJSON = data.json()
              const status = convertToJSON.then((json) => {
                this.status = json.status
                if (this.statusOK) {
                  analytics.track('MMS Sent', {eventName, message: withMessage})
                  setTimeout(() => {
                    this.status = ''
                  }, 20000)
                }
              }
            )}).catch(
              //console.log('Call to Twilio failed, likely due to CORS')
            )
        },
        loadToNumber(withNumber) {
          this.manualToNumber = withNumber
        },
        unloadToNumber() {
          this.manualToNumber = ''
        },
    }
  })