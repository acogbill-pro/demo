// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'
import { useArticleCatalog } from '~/stores/articles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      allEvents: [],
    }),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation
      userID: (state) => window.analytics?._user.id() ?? null,
      anonymousID: (state) => window.analytics?._user.anonymousId() ?? null,
    },
  
    actions: {
      page(pageTitle) {
        this.analytics.page(pageTitle)
      },
      track(eventName, traitsObject = null) {
        this.analytics.track(eventName, traitsObject)
      },
      identify(user_id = null, traitsObject = {}, syncAfter = false) {
        console.log('identify call with user_id ' + user_id)
        const profile = useProfileStore()

        if (user_id !== null) {  // can be anonymous
          this.analytics.identify(user_id, traitsObject)

          if (syncAfter) {
            setTimeout(() => {
              profile.startSyncing(3)
            }, 2000)
          }
          
        } else {
          this.analytics.identify(traitsObject) // automatically prepends the anonymous ID

          if (syncAfter) {
            setTimeout(() => {
              profile.startSyncing(3)
            }, 2000)
          }
        }
      },
      activateWatcher() {
        // analytics.js emitter
        // works for alias, group, identify, track, and page
        // callback to augment this data

        this.analytics.on('track', (event, properties) => this.allEvents.unshift(event + ' (Track)'))
        this.analytics.on('page', (event, properties) => this.allEvents.unshift(properties + ' (Page)'))
        //this.analytics.on('identify', (event, properties) => this.allEvents.unshift(event + ' (Identify)'))
      },
      reset() {
        this.analytics.reset()
      }
    }
  })