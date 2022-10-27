// Wrapper store for User's Segment Profile
  
import {defineStore} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import { useArticleCatalog } from '~/stores/articles'

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
      loadProfileForUser(userID) {
        this.userID = userID

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
        .then((profile) => (this.traits = profile.traits !== null ? profile.traits : {}))
        .then((traits) => articleStore.loadFavesAndScores(traits))
        //.then((data) => console.log(data))
        .catch((error) => console.log(error));
      },
      syncWithStore() {
        const analytics = useAnalytics()
        analytics.identify(this.userID, this.traits)
      },
      unload() {
        const analytics = useAnalytics()
        this.traits = {}
        analytics.reset()
      }
    }
  })