// Wrapper store for User's Segment Profile
  
import {defineStore} from 'pinia'
import { Buffer } from 'buffer'

export const useProfileStore = defineStore('profilesStore', {
    state: () => ({
      traits: {},
    }),
  
    getters: {
      analytics: (state) => window.analytics, // TODO: add some validation
      double: (state) => state.n * 2,
      hasTraits: (state) => {
        console.log('checking for traits')
        return Object.keys(state.traits).length > 0
      },
    },
  
    actions: {
      loadProfileForUser(userID) {
        const runtimeConfig = useRuntimeConfig()
        const spaceID = runtimeConfig.public.profilesSpaceID

        const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // NOTE the `:` after the Token in the below
            'Authorization': `Basic ${Buffer.from(`${runtimeConfig.public.profilesAccessToken}:`).toString('base64')}`,
            },
        }

        const justCors = runtimeConfig.public.justCORSurl

        const requestURL = justCors + 'https://profiles.segment.com/v1/spaces/' + spaceID + '/collections/users/profiles/user_id:' + userID + '/traits'
        //console.log(requestURL)
        fetch(requestURL, options)
        .then((response) => response.json())
        .then((data) => (this.traits = data.traits))
        //.then((data) => console.log(data))
        .catch((error) => console.log(error));
      },
    }
  })