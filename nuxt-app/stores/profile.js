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
        const {cleanTraits} = useProfileTraitsStore()
        const {cleanEvents} = useProfileEventsStore()
        
        return {traits: cleanTraits, events: cleanEvents}
      },
      storesLoading: (state) => {
        const {isLoading: traitsLoading} = useProfileTraitsStore()
        const {isLoading: eventsLoading} = useProfileEventsStore()
        return traitsLoading || eventsLoading
      },
      hasLoaded: (state) => {
        const {hasTraits} = useProfileTraitsStore()
        const {hasEvents} = useProfileEventsStore()
        return hasTraits || hasEvents
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
        const analytics = useAnalytics()

        if (!analytics.hasIDs || !this.hasLoaded) {
          console.log('bailing on summary load because no ID or no Profile loaded')
          return
        }

        const profileAsString = JSON.stringify(this.profile)

        // console.log('Profile object:', profileAsString)

        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
          },
          body: profileAsString,
        }

        fetch('/api/user/summary', options)
        .then((response) => {

          // console.log('Response from API', response)

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
        .then((response) => {
          // console.log('fetchedEvents', fetchedProfile)
          // console.log(response)

          if (!response) {
            console.log('no summary generated from  OpenAI')
            return
          }

          const {data} = response
          const {summary} = JSON.parse(data)
          // console.log(summary)
          this.summary = summary
        })
        .catch((error) => {
          console.log(error)
        });
      },
    }
  })