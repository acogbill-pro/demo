// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { Buffer } from 'buffer'
import { useAnalytics } from '~/stores/analytics'
import { useArticleCatalog } from '~/stores/articles'
import { useCartStore } from './cart'
import scripts from '~/middleware/scripts.js'

export const useProfileTraitsStore = defineStore('profileTraitsStore', {
    state: () => ({
      isLoading: false,
      traits: {},
      traitBlacklist: ['incrementers', 'edge', 'personalized_hero_image'],
      unwatchers: [], // because watch returns a function to call when you want to unwatch
    }),
    getters: {
      hasTraits: (state) => {
        // console.log(state?.traits)
        if (state?.traits instanceof Object) {
          return Object.keys(state.traits).length > 0
        } else {
          return false
        }
      },
      cleanTraits: (state) => {
        const traitsCopy = Object.assign({}, state.traits)

        state.traitBlacklist.forEach((trait) => {
          delete traitsCopy[trait]
        })

        return traitsCopy
      },
      productSKUsOwned: (state) => {
        return scripts.listToArray(state.traits.products_owned ?? '')
      },
    },
  
    actions: {
      loadTraitsForUser(IDObject) {
        const cartStore = useCartStore()
        const articleStore = useArticleCatalog()

        const runtimeConfig = useRuntimeConfig()

        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
          },
          compress: false,
          body: JSON.stringify(IDObject)
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
            this.isLoading = false
            return Promise.reject('error 404')
          } else {
            this.isLoading = false
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
            this.isLoading = false
            return
          }

          //articleStore.profileToEdge(fetchedProfile.traits)
          cartStore.profileToEdge(fetchedProfile.traits.cartStore)
          this.traits = fetchedProfile.traits

          //this.startSyncingArticleStore()
          this.startSyncingCartStore()
        })
        .catch((error) => {
          console.log(error)
        });
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
      addTrait(withTraitName, withTraitValue, serverSide = false) {
        if (withTraitName === '' || withTraitValue === '') {
          return
        }

        var valueToUse = scripts.transformStringToType(withTraitValue)

        const traitObject = {[withTraitName]: valueToUse}

        const {identify, identifyServerSide} = useAnalytics()
        if (!serverSide) {
          identify(traitObject, true)
        } else {
          identifyServerSide(traitObject, true)
        }
      },
      hasSpecificTrait(traitName) {
        return Object.keys(this.traits).includes(traitName)
      },
      unload() {
        this.traits = {}

      },
      
    }
  })