// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'

export const useProfileEventsStore = defineStore('profileEventsStore', {
    state: () => ({
      isLoading: false,
      events: [],
      eventBlacklist: [],
      unwatchers: [], // because watch returns a function to call when you want to unwatch
    }),
    getters: {
      hasEvents: (state) => {
        if (state?.events instanceof Object) {
          return state.events.length > 0
        } else {
          return false
        }
      },
      cleanEvents: (state) => {
        // remove metadata
        return state.events.map((rawEvent) => {
          const {event,properties} = rawEvent
          return {event, properties}
        })
      },
      cleanEventNames: (state) => {
        // remove metadata
        return state.events.map((rawEvent) => {
          const {event} = rawEvent
          return event
        })
      },
    },
  
    actions: {
      loadEventsForUser(IDObject) {

        const runtimeConfig = useRuntimeConfig()

        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
          },
          body: JSON.stringify(IDObject)
        }

        this.isLoading = true

        fetch('/api/user/events', options)
        .then((response) => {
          this.isLoading = false  // stop all the downloading

          if (response.ok) {
            return response.json()
          } else if(response.status === 404) {
            console.log('404 error')
            this.isLoading = false
            return Promise.reject('error 404')
          } else {
            this.isLoading = false
            console.log('error in profile API response')
            return Promise.reject('some other error: ' + response.status)
          }
        })
        .then(({data: fetchedProfile}) => {
          // console.log('fetchedEvents', fetchedProfile)

          if (!fetchedProfile.data) {
            console.log('no events back from Profile API')
            this.isLoading = false
            return
          }

          this.events = fetchedProfile.data
        })
        .catch((error) => {
          console.log(error)
        });
      },
      unload() {
       this.events = []
      },
      
    }
  })