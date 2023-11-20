// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import scripts from '~/middleware/scripts.js'

export const useProfileEventsStore = defineStore('profileEventsStore', {
    state: () => ({
      isSyncing: false,
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

        return state.events
      },
    },
  
    actions: {
      loadEventsForUser(attemptsRemaining = 0) {
        const analytics = useAnalytics()
        const runtimeConfig = useRuntimeConfig()

        const body = {
          userID: analytics.bestID,
          anon: analytics.bestIDIsAnonymous
        }

        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
          },
          body: JSON.stringify(body)
        }

        if (!this.isSyncing || analytics.bestID === null || analytics.bestID === '') {
          console.log('bailing on loadProfile since either not syncing or no ID')
          this.stopSyncing()
          return
        }

        this.isLoading = true

        fetch('/api/user/events', options)
        .then((response) => {
          this.isLoading = false  // stop all the downloading

          if (response.ok) {
            return response.json()
          } else if(response.status === 404) {
            console.log('404 error')
            this.stopSyncing()
            return Promise.reject('error 404')
          } else {
            this.stopSyncing()
            console.log('error in profile API response')
            return Promise.reject('some other error: ' + response.status)
          }
        })
        .then(({data: fetchedProfile}) => {
          //console.log('fetchedProfile', fetchedProfile)

          /* Logic to only update traits if they changed */
          /*if (JSON.stringify(fetchedProfile.events) !== JSON.stringify(this.events) || userID !== this.userID) { // If the traits aren't the same OR it's a new user
            this.userID = userID
            this.events = fetchedProfile.events
            articleStore.loadFavesAndScores(fetchedProfile.events)
          } */

          if (!fetchedProfile.data) {
            console.log('no events back from Profile API')
            this.stopSyncing()
            return
          }

          //articleStore.profileToEdge(fetchedProfile.events)
          this.events = fetchedProfile.events

          if (this.isSyncing && attemptsRemaining > 0) {
            setTimeout(() => {
              this.loadEventsForUser(attemptsRemaining - 1)
            }, 2000)
          } else {
            this.isSyncing = false
          }
        })
        .catch((error) => {
          this.stopSyncing()
          console.log(error)
        });
      },
      startSyncing(retryCount) {
        const analytics = useAnalytics()
        analytics.refreshIDs()

        if (analytics.bestID !== null && !this.isSyncing) {
          this.isSyncing = true
          
          this.loadEventsForUser(retryCount)
        } else {
          //console.log('no User ID to sync in startSyncing()')
        }
      },
      stopSyncing() {
        this.isSyncing = false
        this.isLoading = false
      },
      unload() {
        this.isSyncing = false

        this.events = []

        const analytics = useAnalytics()
        analytics.reset()
      },
      
    }
  })