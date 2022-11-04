// Wrapper store for User's Segment Profile
  
import {defineStore} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import { useArticleCatalog } from '~/stores/articles'
import { isProxy, toRaw } from 'vue'

export const useProfileStore = defineStore('profilesStore', {
    state: () => ({
      userID: null,
      isSyncing: false,
      isLoading: false,
      traits: {},
    }),
  
    getters: {
      hasTraits: (state) => {
        if (state?.traits instanceof Object) {
          return Object.keys(state.traits).length > 0
        } else {
          return false
        }
        
      },
    },
  
    actions: {
      loadProfileForUser(userID, attemptsRemaining = 0) {
        const runtimeConfig = useRuntimeConfig()
        const articleStore = useArticleCatalog()

        const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // NOTE the `:` after the Token in the below
            'Authorization': `Basic ${Buffer.from(`${runtimeConfig.public.profilesAccessToken}:`).toString('base64')}`,
            },
        }

        const justCors = runtimeConfig.public.justCORSurl

        const requestURL = justCors + 'https://profiles.segment.com/v1/spaces/' + runtimeConfig.public.profilesSpaceID + '/collections/users/profiles/user_id:' + userID + '/traits'
        //console.log(requestURL)

              
        if (this.isSyncing) {
          this.isLoading = true  
        } else {
          return
        }

        fetch(requestURL, options)
        .then((response) => {
          this.isLoading = false  // stop all the downloading

          if (response.ok) {
            return response.json()
          } else if(response.status === 404) {
            console.log('404 error')
            return Promise.reject('error 404')
          } else {
            return Promise.reject('some other error: ' + response.status)
          }
        })
        //.then((profile) => (this.traits = profile.traits !== null ? profile.traits : {}))
        .then((fetchedProfile) => {

          /* Logic to only update traits if they changed */
          /*if (JSON.stringify(fetchedProfile.traits) !== JSON.stringify(this.traits) || userID !== this.userID) { // If the traits aren't the same OR it's a new user
            this.userID = userID
            this.traits = fetchedProfile.traits
            articleStore.loadFavesAndScores(fetchedProfile.traits)
          } else if (attemptsRemaining > 0) {
            console.log('No new traits for profile, will retry')
            setTimeout(() => {
              this.loadProfileForUser(userID, attemptsRemaining - 1)
            }, 2000)
          } else {
            console.log('No more retries.')
            this.isSyncing = false
          }*/

          this.userID = userID

          this.traits = fetchedProfile.traits
          articleStore.loadFavesAndScores(fetchedProfile.traits)

          if (this.isSyncing && attemptsRemaining > 0) {
            setTimeout(() => {
              this.loadProfileForUser(userID, attemptsRemaining - 1)
            }, 5000)
          } else {
            this.isSyncing = false
          }
        })
        /*.then(() => {
          this.isLoading = false
          //this.loadProfileForUser(userID, attemptsRemaining - 1)
        })*/
        .catch((error) => console.log(error));
      },
      startSyncing(retryCount) {
        if (this.userID !== null) {
          this.isSyncing = true
          this.loadProfileForUser(this.userID, retryCount)
        } else {
          console.log('no User ID to sync in startSyncing()')
        }
      },
      stopSyncing() {
        this.isSyncing = false
        this.isLoading = false
      },
      syncWithStore() {
        console.log('would send Identify call with latest traits')
       // const analytics = useAnalytics()
        //analytics.identify(this.userID, this.traits)
      },
      persistUser() {
        const analytics = useAnalytics()

        if (analytics.userID !== null && this.userID === null) {
          this.userID = analytics.userID

          this.startSyncing(1)
        }
      },
      unload() {
        this.isSyncing = false

        this.userID = null
        this.traits = {}

        const analytics = useAnalytics()
        analytics.reset()
      }
    }
  })