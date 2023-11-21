// Wrapper store for User's Segment Profile
  
import {defineStore, storeToRefs} from 'pinia'
import { useProfileTraitsStore } from '~/stores/profileTraits'
import { useProfileEventsStore } from '~/stores/profileEvents'
import { useAnalytics } from '~/stores/analytics'

export const useProfileStore = defineStore('profileStore', {
    state: () => ({
      isSyncing: false,
      summary: '',
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
      loadSummary() {
        this.summary = 'Summary'
      },
    }
  })