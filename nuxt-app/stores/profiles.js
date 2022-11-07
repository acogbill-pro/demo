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
      traitBlacklist: ['incrementers', 'phone', 'email'],
    }),
  
    getters: {
      hasTraits: (state) => {
        if (state?.traits instanceof Object) {
          return Object.keys(state.traits).length > 0
        } else {
          return false
        }
        
      },
      cleanTraits: (state) => {

        const removeProperty = (obj, prop) => {
          let {[prop]: omit, ...res} = obj
          return res
        }

        var traitsToReturn = state.traits

        for (let i = 0; i < state.traitBlacklist.length; i++) {
          traitsToReturn = removeProperty(traitsToReturn, state.traitBlacklist[i])
        }

        return traitsToReturn
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
        .then((fetchedProfile) => {

          /* Logic to only update traits if they changed */
          /*if (JSON.stringify(fetchedProfile.traits) !== JSON.stringify(this.traits) || userID !== this.userID) { // If the traits aren't the same OR it's a new user
            this.userID = userID
            this.traits = fetchedProfile.traits
            articleStore.loadFavesAndScores(fetchedProfile.traits)
          } */

          this.userID = userID

          this.traits = fetchedProfile.traits
          articleStore.loadFavesAndScores(fetchedProfile.traits)

          if (this.isSyncing && attemptsRemaining > 0) {
            setTimeout(() => {
              this.loadProfileForUser(userID, attemptsRemaining - 1)
            }, 2000)
          } else {
            this.isSyncing = false
          }
        })
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
        //console.log('would send Identify call with latest traits')
       // const analytics = useAnalytics()
        //analytics.identify(this.userID, this.traits)
      },
      persistUser() {
        const analytics = useAnalytics()

        if (analytics.userID !== null && this.userID === null) {
          this.userID = analytics.userID

          analytics.identify(analytics.userID)
        }
      },
      unload() {
        this.isSyncing = false

        const analytics = useAnalytics()

        if (this.userID !== null) {
          console.log('calling identify from unload')
          analytics.identify(this.userID, {favorited_pregnancy_articles: 0, favorited_sleep_articles: 0})
        }

        this.userID = null
        this.traits = {}

        analytics.reset()
      }
    }
  })