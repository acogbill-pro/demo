// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'
import { useArticleCatalog } from '~/stores/articles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      allEvents: [],
      userID: null,
    }),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation
      //userID: (state) => window.analytics.user().id(),
      anonymousID: (state) => window.analytics.user().anonymousId(),
    },
  
    actions: {
      page(pageTitle) {
        try {
          this.analytics.page(pageTitle)
        } catch {
          console.log('Page call failed; retrying')
          setTimeout(() => {
            this.page(pageTitle)
          }, 1000)
        }
      },
      track(eventName, traitsObject = null) {
        this.analytics.track(eventName, traitsObject)
      },
      refreshID() {
        if (this.userID === null) this.userID = window.analytics?.user().id() ?? null
      },
      identify(user_id = null, traitsObject = {}, syncAfter = false) {
        console.log('identify call with user_id ' + user_id)
        //console.log(this.userID)
        //console.log(this.anonymousID)
        //console.log(this.analytics.user())
        const profile = useProfileStore()

        if (user_id !== null) {  // can be anonymous
          this.userID = user_id
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
              profile.startSyncing(10)
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
        this.refreshID()
      }
    }
  })