// Wrapper store for analytics.js
import { AnalyticsBrowser } from '@segment/analytics-next'
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      allEvents: [],
      userID: null,
      anonymousID: '',
      activeSource: null, // make sure to run setup!
      manualWriteKey: '',
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
      setup() {
        this.refreshIDs()
        
        this.activateWatcher()
      },
      loadWriteKey(writeKey) {
        console.log('Loading write key: ', writeKey)
        this.manualWriteKey = writeKey
        this.activeSource = AnalyticsBrowser.load({writeKey})
        this.setup()
      },
      unloadWriteKey() {
        this.manualWriteKey = ''
        this.activeSource = null
        useRouter().go()
      },
      refreshIDs() {
        const promise = this.activeSource.user()
        const promise2 = promise.then((result) => {
          this.anonymousID = result.anonymousId()
          this.userID = result.id()
        })

        this.identify()
      },
      page(pageTitle, propertyObject = null) {
        try {
          this.analytics.page(pageTitle, propertyObject)
        } catch {
          console.log('Segment Page call failed; retrying')
          setTimeout(() => {
            this.page(pageTitle, propertyObject)
          }, 2000)
        }
      },
      track(eventName, propertyObject = null) {
        console.log('track call', eventName)
        try {
          this.analytics.track(eventName, propertyObject) 
        } catch {
          console.log('Segment Track call failed; retrying')
          setTimeout(() => {
            this.track(eventName, propertyObject)
          }, 2000)
        }
      },
      async trackServerSide(eventName, propertyObject = null) {
        try {
          const body = {
            event: eventName,
            properties: propertyObject,
          }

          if (!this.bestIDIsAnonymous){
            body.userId = this.userID
          } else {
            body.anonymousId = this.anonID
          }

          // console.log('body', body)
  
          const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
            },
            body: JSON.stringify(body)
          }
  
          const response = await fetch('/api/analytics/track', options)

          if (response.ok) {
            // console.log('fetch went OK')
            const {data} = await response.json()
            this.allEvents.unshift(eventName + ' (Server)')
            return data
          } else {
            return Promise.reject({error: 'Server-side Track error: ' + response.status})
          }
        } catch {
          console.log('Segment Server-side Track call failed; retrying')
          setTimeout(() => {
            this.trackServerSide(eventName, propertyObject)
          }, 2000)
        }
      },
      async trackTransaction(eventName, propertyObject = null) {
        try {
          const body = {
            event: eventName,
            properties: propertyObject,
          }

          if (!this.bestIDIsAnonymous){
            body.userId = this.userID
          } else {
            body.anonymousId = this.anonID
          }

          // console.log('body', body)
  
          const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
            },
            body: JSON.stringify(body)
          }
  
          const response = await fetch('/api/jpmc/transaction', options)

          if (response.ok) {
            // console.log('fetch went OK')
            const {data} = await response.json()
            this.allEvents.unshift(eventName + ' (Transaction)')
            return data
          } else {
            return Promise.reject({error: 'Transaction error: ' + response.status})
          }
        } catch {
          console.log('Segment Transaction failed; retrying')
          setTimeout(() => {
            this.trackTransaction(eventName, propertyObject)
          }, 2000)
        }
      },
      identify(traitsObject = {}, syncAfter = false) {
        const profiles = useProfileStore()

        // if (useID !== null) {  // ID override
        //   this.analytics.identify(useID, traitsObject)     

        //   if (syncAfter) {
        //     setTimeout(() => {
        //       profiles.startSyncing(3)
        //     }, 2000)
        //   }
        //   return
        // }

        if (this.userID !== null) {  // can be anonymous
          this.analytics.identify(this.userID, traitsObject)     

          if (syncAfter) {
            setTimeout(() => {
              profiles.startSyncing(3)
            }, 2000)
          }
          
        } else {
          //console.log('adding traits to anon')
          this.analytics.identify(traitsObject) // automatically prepends the anonymous ID

          if (syncAfter) {
            setTimeout(() => {
              profiles.startSyncing(10)
            }, 2000)
          }
        }
      },
      async identifyServerSide(traitsObject = {}, syncAfter = false) {
        try {
          const body = {
            traits: traitsObject,
          }

          if (!this.bestIDIsAnonymous){
            body.userId = this.userID
          } else {
            body.anonymousId = this.anonID
          }

          // console.log('body', body)
  
          const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`,
            },
            body: JSON.stringify(body)
          }
  
          const response = await fetch('/api/analytics/identify', options)

          if (response.ok) {
            // console.log('fetch went OK')
            const {data} = await response.json()
            if (syncAfter) {
              const profiles = useProfileStore()
              setTimeout(() => {
                profiles.startSyncing(10)
              }, 2000)
            }
            return data
          } else {
            return Promise.reject({error: 'Server-side Track error: ' + response.status})
          }
        } catch {
          console.log('Segment Server-side Track call failed; retrying')
          setTimeout(() => {
            this.trackServerSide(eventName, propertyObject)
          }, 2000)
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
        // this.refreshIDs()
      }
    }
  })