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
      anonymousID: (state) => window.analytics?.user().anonymousId() ?? null,
      bestID: (state) => {
        const analytics = useAnalytics()
        return analytics.userID !== null ? analytics.userID : analytics.anonymousID
      },
      bestIDIsAnonymous: (state) => {
        const analytics = useAnalytics()
        const value = analytics.userID === null
        //this.bestID.split('_').pop() !== 'id'
        return value
      },
    },
  
    actions: {
      page(pageTitle) {
        try {
          this.analytics.page(pageTitle)
        } catch {
          console.log('Page call failed; retrying')
          /*setTimeout(() => {
            this.page(pageTitle)
          }, 1000)*/
        }
      },
      track(eventName, traitsObject = null) {
        console.log('store track')
        this.analytics.track(eventName, traitsObject)
      },
      refreshID() {
        if (this.userID === null) this.userID = window.analytics?.user().id() ?? null
      },
      identify(traitsObject = {}, syncAfter = false) {
        const profiles = useProfileStore()

        if (this.userID !== null) {  // can be anonymous
          this.analytics.identify(this.userID, traitsObject)     

          if (syncAfter) {
            setTimeout(() => {
              profiles.startSyncing(3)
            }, 2000)
          }
          
        } else {
          console.log('adding traits to anon')
          this.analytics.identify(traitsObject) // automatically prepends the anonymous ID

          if (syncAfter) {
            setTimeout(() => {
              profiles.startSyncing(10)
            }, 2000)
          }
        }
      },
      activateWatcher() {
        // analytics.js emitter
        // works for alias, group, identify, track, and page
        // callback to augment this data

        try {
          this.analytics.on('track', (event, properties) => this.allEvents.unshift(event + ' (Track)'))
          this.analytics.on('page', (event, properties) => this.allEvents.unshift(properties + ' (Page)'))
          //this.analytics.on('identify', (event, properties) => this.allEvents.unshift(event + ' (Identify)'))
        } catch {
          console.log('Activate Watcher failed; retrying')
          /*setTimeout(() => {
            this.activateWatcher()
          }, 1000)*/
        }
      },
      reset() {
        this.userID = null
        this.analytics.reset()
        this.refreshID()
      }
    }
  })