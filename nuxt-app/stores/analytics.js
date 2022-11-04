// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({}),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation
    },
  
    actions: {
      page(pageTitle) {
        console.log('Page call for ' + pageTitle)
        this.analytics.page(pageTitle)
      },
      track(eventName, traitsObject = null) {
        console.log('Track call for ' + eventName)
        this.analytics.track(eventName, traitsObject)
      },
      identify(user_id = null, traitsObject = {}) {
        console.log('Identify call for ' + user_id !== null ? user_id : 'anon')
        const profile = useProfileStore()
        if (user_id) {
          profile.userID = user_id
          profile.traits = traitsObject
          console.log('Identify call for ' + user_id)
          this.analytics.identify(user_id, traitsObject)
          setTimeout(() => {
            profile.startSyncing(5)
          }, 2000)
          
        } else {
          this.analytics.identify(traitsObject)
        }
      },
      reset() {
        this.analytics.reset()
      }
    }
  })