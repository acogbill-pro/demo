// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      n: 0//new Analytics('DtDvPaJzJ7sw0EJD6RkYKO9BkPIhFh97'),
    }),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation
      double: (state) => state.n * 2,
    },
  
    actions: {
      increment(amount = 1) {
        this.n += amount
        this.track("Incremented")
      },
      page(pageTitle) {
        this.analytics?.page(pageTitle)
      },
      track(eventName) {
        this.analytics?.track(eventName)
      },
    },
  })