// Wrapper store for User's Segment Profile
  
import {defineStore} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import { useArticleCatalog } from '~/stores/articles'
import { isProxy, toRaw } from 'vue'

export const useProfileStore = defineStore('profilesStore', {
    state: () => ({
      userID: null,
      traits: {},
    }),
  
    getters: {
      hasTraits: (state) => {
        //console.log('checking for traits')
        return Object.keys(state.traits).length > 0
      },
    },
  
    actions: {
      loadProfileForUser(userID, attemptNumber = 0) {
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
        fetch(requestURL, options)
        .then((response) => response.json())
        //.then((profile) => (this.traits = profile.traits !== null ? profile.traits : {}))
        .then((fetchedProfile) => {
          if (JSON.stringify(fetchedProfile.traits) !== JSON.stringify(this.traits) || userID !== this.userID) {
            this.userID = userID
            this.traits = fetchedProfile.traits
            articleStore.loadFavesAndScores(fetchedProfile.traits)
          } else if (attemptNumber < 10) {
            console.log('No new traits for profile, will retry')
            setTimeout(() => {
              this.loadProfileForUser(userID, attemptNumber+1)
            }, 2000)
          } else {
            console.log('No more retries.')
          }
        })
        //.then((data) => console.log(data))
        .catch((error) => console.log(error));
      },
      syncWithStore() {
        console.log('would send Identify call with latest traits')
       // const analytics = useAnalytics()
        //analytics.identify(this.userID, this.traits)
      },
      unload() {
        const analytics = useAnalytics()
        this.traits = {}
        analytics.reset()
      }
    }
  })