// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      n: 0,
    }),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation
      double: (state) => state.n * 2,
    },
  
    actions: {
      /*init(writeKey) {
        this.analytics._writeKey = writeKey;
        this.analytics.load(writeKey);
      },*/
      increment(amount = 1) {
        this.n += amount
        this.track("Incremented")
      },
      page(pageTitle) {
        this.analytics.page(pageTitle)
      },
      track(eventName, traitsObject = null) {
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