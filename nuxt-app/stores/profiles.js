// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import { useArticleCatalog } from '~/stores/articles'
import { isProxy, toRaw } from 'vue'
import { useCartStore } from './cart'
import { useRecommendations } from '~/stores/recommendations'
import scripts from '~/middleware/scripts.js'

export const useProfileStore = defineStore('profilesStore', {
    state: () => ({
      isSyncing: false,
      isLoading: false,
      traits: {},
      traitBlacklist: ['incrementers', 'phone', 'email', 'edge', 'articleStore', 'cartStore'],
      unwatchers: [], // because watch returns a function to call when you want to unwatch
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
      productSKUsOwned: (state) => {
        return scripts.listToArray(state.traits.products_owned ?? '')
      },
    },
  
    actions: {
      loadProfileForUser(attemptsRemaining = 0) {
        const runtimeConfig = useRuntimeConfig()
        const cartStore = useCartStore()
        const articleStore = useArticleCatalog()
        const analytics = useAnalytics()

        const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // NOTE the `:` after the Token in the below
            'Authorization': `Basic ${Buffer.from(`${runtimeConfig.public.profilesAccessToken}:`).toString('base64')}`,
            },
        }

        const justCors = runtimeConfig.public.justCORSurl

        const requestURL = justCors + 'https://profiles.segment.com/v1/spaces/' + runtimeConfig.public.profilesSpaceID + '/collections/users/profiles/' + (analytics.bestIDIsAnonymous ? 'anonymous_id:' : 'user_id:') + analytics.bestID + '/traits'

        if (!this.isSyncing || analytics.bestID === null) {
          console.log('bailing on loadProfile since either not syncing or no ID')
          this.stopSyncing()
          return
        }

        this.isLoading = true  
        this.stopSyncingStores() // don't want a loop of trait updates calling this again

        fetch(requestURL, options)
        .then((response) => {
          this.isLoading = false  // stop all the downloading

          if (response.ok) {
            return response.json()
          } else if(response.status === 404) {
            console.log('404 error')
            //this.stopSyncing()
            return Promise.reject('error 404')
          } else {
            //this.stopSyncing()
            console.log('error in profile API response')
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
          
          articleStore.profileToEdge(fetchedProfile.traits)
          cartStore.profileToEdge(fetchedProfile.traits)
          this.traits = fetchedProfile.traits

          this.startSyncingArticleStore()
          this.startSyncingCartStore()

          if (this.isSyncing && attemptsRemaining > 0) {
            setTimeout(() => {
              this.loadProfileForUser(attemptsRemaining - 1)
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
        analytics.refreshID()

        if (analytics.bestID !== null && !this.isSyncing) {
          this.isSyncing = true
          
          this.loadProfileForUser(retryCount)
        } else {
          //console.log('no User ID to sync in startSyncing()')
        }
      },
      stopSyncing() {
        this.isSyncing = false
        this.isLoading = false
      },
      startSyncingArticleStore() {
        const articles = useArticleCatalog()
        const { favorites, articlesRead } = storeToRefs(articles)
        //articles.edgeToProfile()
        this.unwatchers.push(watch(favorites.value, articles.edgeToProfile))
        this.unwatchers.push(watch(articlesRead.value, articles.edgeToProfile))
      },
      startSyncingCartStore() {
        const cart = useCartStore()
        const {contents} = storeToRefs(cart)
        //cart.edgeToProfile()
        this.unwatchers.push(watch(contents.value, cart.edgeToProfile))
      },
      stopSyncingStores() {
        this.unwatchers.forEach(unwatcher => unwatcher());
      },
      addTrait(withTraitName, withTraitValue) {
        if (withTraitName === '' || withTraitValue === '') {
          return
        }

        var valueToUse = scripts.transformStringToType(withTraitValue)

        const traitObject = {[withTraitName]: valueToUse}

        const analytics = useAnalytics()
        analytics.identify(traitObject, true)
      },
      unload() {
        this.isSyncing = false

        this.traits = {}

        /*const articles = useArticleCatalog()
        articles.reset()

        const cart = useCartStore()
        cart.reset()*/

        const analytics = useAnalytics()
        analytics.reset()
      },
      
    }
  })