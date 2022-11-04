// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({}),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation

      userID: (state) => window.analytics?._user.id() ?? null,
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
        console.log('Identify call for ' + user_id === null ? 'Anonymous' : user_id)

        const profile = useProfileStore()
        if (user_id) {
          profile.userID = user_id
          profile.traits = traitsObject

          this.analytics.identify(user_id, traitsObject)

          this.activateAnalyticsWatcher()

          setTimeout(() => {
            profile.startSyncing(10)
          }, 2000)
          
        } else {
          this.analytics.identify(traitsObject) // automatically prepends the anonymous ID
        }
      },
      activateAnalyticsWatcher() {
        // analytics.js emitter
        // works for alias, group, identify, track, and page
        // callback to augment this data
        this.analytics.on('track', (eventName, traits = {}) => console.log('Watcher caught Track Call for ' + eventName))
      },
      reset() {
        this.analytics.reset()
      }
    }
  })