// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { useProfileTraitsStore } from '~/stores/profileTraits'
import { useProfileEventsStore } from '~/stores/profileEvents'
import { useAnalytics } from '~/stores/analytics'

export const useProfileStore = defineStore('profileStore', {
    state: () => ({
      isSyncing: false,
    }),
    getters: {
      profile: (state) => {
        const {traits} = useProfileTraitsStore()
        const {events} = useProfileEventsStore()
        
        return {traits, events}
      },
      storesLoading: (state) => {
        const {isLoading: traitsLoading} = useProfileTraitsStore()
        const {isLoading: eventsLoading} = useProfileEventsStore()
        return traitsLoading || eventsLoading
      },
    //   cleanTraits: (state) => {

    //     const removePropertyOLD = (obj, prop) => {
    //       console.log('removing property', prop)
    //       let {[prop]: omit, ...res} = obj
    //       return res
    //     }

    //     const removeProperty = (obj, prop) => {
    //       //delete obj[prop]
    //       return obj
    //     }

    //     var traitsToReturn = state.traits
    //     // console.log(traitsToReturn)

    //     for (let i = 0; i < state.traitBlacklist.length; i++) {
    //       traitsToReturn = removeProperty(traitsToReturn, state.traitBlacklist[i])
    //     }

    //     Object.keys(traitsToReturn).forEach((trait) => {
    //       const firstFour = trait.slice(0, 4)
    //       if (firstFour === 'j_o_') removeProperty(traitsToReturn, trait)
    //     })

    //     console.log(state.traits)
    //     return state.traits
    //   },
    //   productSKUsOwned: (state) => {
    //     return scripts.listToArray(state.traits.products_owned ?? '')
    //   },
    },
  
    actions: {
      loadProfileForUser(attemptsRemaining = 0) {
        this.isSyncing = true
        const {loadTraitsForUser} = useProfileTraitsStore()
        const {loadEventsForUser} = useProfileEventsStore()

        const {bestID, bestIDIsAnonymous, hasIDs} = useAnalytics()

        if (!hasIDs) {
          console.log('bailing on loadProfile since no ID')
          this.isSyncing = false
          return
        }

        const IDObject = {
          userID: bestID,
          anon: bestIDIsAnonymous
        }

        loadTraitsForUser(IDObject)
        loadEventsForUser(IDObject)

        if (attemptsRemaining > 0) {
          setTimeout(() => {
            if (this.isSyncing) this.loadProfileForUser(attemptsRemaining - 1)
          }, 2000)
        } else {
          this.isSyncing = false
        }
      },
      startSyncing(retryCount) {
        const {bestID, refreshIDs} = useAnalytics()
        refreshIDs()

        if (bestID !== null && !this.isSyncing) {
          this.isSyncing = true
          
          this.loadProfileForUser(retryCount)
        } else {
          //console.log('no User ID to sync in startSyncing()')
        }
      },
      stopSyncing() {
        this.isSyncing = false
      },
      unload() {
        const {unload: unloadTraits} = useProfileTraitsStore()
        const {unload: unloadEvents} = useProfileEventsStore()

        unloadTraits()
        unloadEvents()

        const analytics = useAnalytics()
        analytics.reset()
      },
    //   startSyncing(retryCount) {
    //     const analytics = useAnalytics()
    //     analytics.refreshIDs()

    //     if (analytics.bestID !== null && !this.isSyncing) {
    //       this.isSyncing = true
          
    //       this.loadTraitsForUser(retryCount)
    //     } else {
    //       //console.log('no User ID to sync in startSyncing()')
    //     }
    //   },
    //   stopSyncing() {
    //     this.isSyncing = false
    //     this.isLoading = false
    //   },
    //   startSyncingArticleStore() {
    //     const articles = useArticleCatalog()
    //     const { favorites, articlesRead } = storeToRefs(articles)
    //     //articles.edgeToProfile()
    //     this.unwatchers.push(watch(favorites.value, articles.edgeToProfile))
    //     this.unwatchers.push(watch(articlesRead.value, articles.edgeToProfile))
    //   },
    //   startSyncingCartStore() {
    //     const cart = useCartStore()
    //     const {contents} = storeToRefs(cart)
    //     //cart.edgeToProfile()
    //     this.unwatchers.push(watch(contents.value, cart.edgeToProfile))
    //   },
    //   stopSyncingStores() {
    //     this.unwatchers.forEach(unwatcher => unwatcher());
    //   },
    //   addTrait(withTraitName, withTraitValue) {
    //     if (withTraitName === '' || withTraitValue === '') {
    //       return
    //     }

    //     var valueToUse = scripts.transformStringToType(withTraitValue)

    //     const traitObject = {[withTraitName]: valueToUse}

    //     const analytics = useAnalytics()
    //     analytics.identify(traitObject, true)
    //   },
    //   unload() {
    //     this.isSyncing = false

    //     this.traits = {}

    //     const analytics = useAnalytics()
    //     analytics.reset()
    //   },
      
    }
  })