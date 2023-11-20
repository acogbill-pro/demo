// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import { useArticleCatalog } from '~/stores/articles'
import { useCartStore } from './cart'
import scripts from '~/middleware/scripts.js'

export const useProfileTraitsStore = defineStore('profilesStore', {
    state: () => ({
      isSyncing: false,
      isLoading: false,
      traits: {},
      traitBlacklist: ['incrementers', 'edge'],
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

        const removePropertyOLD = (obj, prop) => {
          console.log('removing property', prop)
          let {[prop]: omit, ...res} = obj
          return res
        }

        const removeProperty = (obj, prop) => {
          //delete obj[prop]
          return obj
        }

        var traitsToReturn = state.traits
        // console.log(traitsToReturn)

        for (let i = 0; i < state.traitBlacklist.length; i++) {
          traitsToReturn = removeProperty(traitsToReturn, state.traitBlacklist[i])
        }

        Object.keys(traitsToReturn).forEach((trait) => {
          const firstFour = trait.slice(0, 4)
          if (firstFour === 'j_o_') removeProperty(traitsToReturn, trait)
        })

        console.log(state.traits)
        return state.traits
      },
      productSKUsOwned: (state) => {
        return scripts.listToArray(state.traits.products_owned ?? '')
      },
    },
  
    actions: {
      loadTraitsForUser(attemptsRemaining = 0) {
        const cartStore = useCartStore()
        const articleStore = useArticleCatalog()
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
        this.stopSyncingStores() // don't want a loop of trait updates calling this again

        fetch('/api/user/traits', options)
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
          /*if (JSON.stringify(fetchedProfile.traits) !== JSON.stringify(this.traits) || userID !== this.userID) { // If the traits aren't the same OR it's a new user
            this.userID = userID
            this.traits = fetchedProfile.traits
            articleStore.loadFavesAndScores(fetchedProfile.traits)
          } */

          if (!fetchedProfile.traits) {
            console.log('no traits back from Profile API')
            this.stopSyncing()
            return
          }

          //articleStore.profileToEdge(fetchedProfile.traits)
          cartStore.profileToEdge(fetchedProfile.traits.cartStore)
          this.traits = fetchedProfile.traits

          //this.startSyncingArticleStore()
          this.startSyncingCartStore()

          if (this.isSyncing && attemptsRemaining > 0) {
            setTimeout(() => {
              this.loadTraitsForUser(attemptsRemaining - 1)
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
          
          this.loadTraitsForUser(retryCount)
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

        const analytics = useAnalytics()
        analytics.reset()
      },
      
    }
  })