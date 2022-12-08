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
      blogAnalytics: (state) => {
        //nuxtApp.$blogAnalytics.load(runtimeConfig.blogWriteKey)
        const nuxtApp = useNuxtApp()
        console.log(nuxtApp.$blogAnalytics)
        return nuxtApp.$blogAnalytics
       }, // TODO: add some validation
      //userID: (state) => window.analytics.user().id(),
      anonymousID: (state) => state.analytics._user().anonymousId() ?? null,
      bestID: (state) => {
        return state.userID !== null ? state.userID : state.anonymousID
      },
      bestIDIsAnonymous: (state) => {
        //const analytics = useAnalytics()
        const value = state.userID === null
        //this.bestID.split('_').pop() !== 'id'
        return value
      },
    },
  
    actions: {
      page(pageTitle) {
        try {
          console.log('Page call!')
         //console.log(useNuxtApp())
          this.blogAnalytics.page(pageTitle)
        } catch {
          console.log('Page call failed; retrying')
          /*setTimeout(() => {
            this.page(pageTitle)
          }, 1000)*/
        }
      },
      track(eventName, traitsObject = null) {
        console.log('Track call!')
        this.blogAnalytics.track(eventName, traitsObject)
      },
      refreshID() {
        if (this.userID === null) this.userID = window.analytics?.user().id() ?? null
      },
      identify(traitsObject = {}, syncAfter = false) {
        const profiles = useProfileStore()

        if (this.userID !== null) {  // can be anonymous
          this.blogAnalytics.identify(this.userID, traitsObject)     

          if (syncAfter) {
            setTimeout(() => {
              profiles.startSyncing(3)
            }, 2000)
          }
          
        } else {
          console.log('adding traits to anon')
          this.blogAnalytics.identify(traitsObject) // automatically prepends the anonymous ID

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
          this.blogAnalytics.on('track', (event, properties) => this.allEvents.unshift(event + ' (Track)'))
          this.blogAnalytics.on('page', (event, properties) => this.allEvents.unshift(properties + ' (Page)'))
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
        this.blogAnalytics.reset()
        this.refreshID()
      }
    }
  })