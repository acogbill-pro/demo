// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      allEvents: [],
      userID: null,
      anonymousID: '',
      activeSource: null, // make sure to run setup!
    }),
  
    getters: {
      analytics: (state) => {
        return state.activeSource
      },
      bestID: (state) => {
        return state.userID !== null ? state.userID : state.anonymousID
      },
      bestIDIsAnonymous: (state) => {
        return state.userID === null
      },
    },
    actions: {
      setup(withPropertyName) {
        switch(withPropertyName) {
          case 'blog':
            console.log('Analytics using Blog source')
            this.activeSource = useNuxtApp().$blogAnalytics
            break;
          case 'shop':
            console.log('Analytics using Shop source')
            this.activeSource = useNuxtApp().$shopAnalytics
            break;
          default:
            this.activeSource = useNuxtApp().$blogAnalytics
        }

        this.refreshIDs()
        
        this.activateWatcher()
      },
      refreshIDs() {
        const promise = this.activeSource.user()
        const promise2 = promise.then((result) => {
          this.anonymousID = result.anonymousId()
          this.userID = result.id()
        })

        this.identify()
      },
      page(pageTitle, routePath = '') {
        if (routePath !== '') {
          const routeAsArray = routePath.split('/')

          const isShop = routeAsArray.length > 1 ? routeAsArray[1] === 'shop' : false

          this.activeSource = isShop ? useNuxtApp().$shopAnalytics : useNuxtApp().$blogAnalytics

          this.setup(isShop ? 'shop' : 'blog')
        }

        try {
          this.analytics.page(pageTitle)
        } catch {
          console.log('Segment Page call failed; retrying')
          setTimeout(() => {
            this.page(pageTitle)
          }, 2000)
        }
      },
      track(eventName, traitsObject = null) {
        try {
          this.analytics.track(eventName, traitsObject) 
        } catch {
          console.log('Segment Track call failed; retrying')
          setTimeout(() => {
            this.track(eventName, traitsObject)
          }, 2000)
        }
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
          console.log('Activate Watcher failed')
        }
      },
      reset() {
        this.userID = null
        this.analytics.reset()
        this.refreshIDs()
      }
    }
  })