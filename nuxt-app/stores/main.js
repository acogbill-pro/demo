// Main store for app
  
import {defineStore} from 'pinia'
import {useAnalytics} from '~/stores/analytics'

export const useMainStore = defineStore('mainStore', {
    state: () => ({
      n: 0,
    }),
  
    getters: {
      double: (state) => state.n * 2,
    },
  
    actions: {
      increment(amount = 1) {
        const analytics = useAnalytics()
        this.n += amount
        analytics.track("Incremented")
      },
    }
  })