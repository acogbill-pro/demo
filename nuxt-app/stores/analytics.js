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
        this.analytics.page(pageTitle)
      },
      track(eventName, traitsObject = null) {
        console.log('calling Analytics with Track - ' + eventName)
        console.log(this.analytics.track)
        this.analytics.track(eventName, traitsObject)
      },
      identify(user_id = null, traitsObject = {}) {
        const profile = useProfileStore()
        if (user_id) {
          this.analytics.identify(user_id, traitsObject)
          profile.loadProfileForUser(user_id)
        } else {
          this.analytics.identify(traitsObject)
        }
      },
    }
  })