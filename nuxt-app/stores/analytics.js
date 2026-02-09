// Wrapper store for analytics.js
import { AnalyticsBrowser } from '@segment/analytics-next'
import { SignalsPlugin } from '@segment/analytics-signals'
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profile'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      allEvents: [],
      userID: null,
      IDLabel: 'anonymous_id',
      anonymousID: '',
      activeSource: null, // make sure to run setup!
      manualWriteKey: '',
    }),
  
    getters: {
      analytics: (state) => {
        // console.log(state.activeSource)
        return state.activeSource
      },
      bestID: (state) => {
        return state.userID ? state.userID : state.anonymousID
      },
      bestIDLabel: (state) => {
        return state.IDLabel
      },
      bestIDIsAnonymous: (state) => {
        return !state.userID//state.IDLabel === 'anonymous_id'
      },
      hasIDs(state) {
        return !(state.bestID === null || state.bestID === '')
      },
    },
    actions: {
      setup(withAJSInstance) {
        this.activeSource = withAJSInstance
        this.refreshIDs()
        
        this.activateWatcher()
      },
      loadWriteKey(writeKey) {
        console.log('Loading write key: ', writeKey)
        this.manualWriteKey = writeKey
        const analyticsInstance = new AnalyticsBrowser()

        // add on Signals
        const signalsPlugin = new SignalsPlugin();
        analyticsInstance.register(signalsPlugin);
        
        this.activeSource = analyticsInstance.load({writeKey})
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
          if (this.userID) this.IDLabel = "user_id"
        })

        this.identify()
      },
      page(pageTitle, propertyObject = null, category = null) {
        try {
          this.analytics.page(category, propertyObject, pageTitle)
        } catch {
          console.log('Segment Page call failed; retrying')
          setTimeout(() => {
            this.page(category, propertyObject, pageTitle)
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
            // console.log('setting body ID to anonymousId', this.anonymousID)
            body.anonymousId = this.anonymousID
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
        return
      },
      async loginWithTraits(traitsObject) {
        const {user_id, anonymous_id, phone} = traitsObject
        if (user_id) {
          this.userID = user_id
          this.IDLabel = 'user_id'
          this.identify(traitsObject, true)
          this.track("Signed In", traitsObject.value)
          return
        }

        if (phone) {
          console.log('login with phone commented out in analytics store')
          // this.userID = phone
          // this.IDLabel = 'phone'
          // this.identify(traitsObject, true)
          // this.track("Signed In", traitsObject.value)
          // return
        }

        this.anonymousID = anonymous_id
        this.identify(traitsObject, true)
      },
      identify(newTraits = {}, syncAfter = false) {
        return
      },
      async identifyServerSide(traitsObject = {}, syncAfter = false) {
        return
      },
      group(accountId, accountTraits = {}) {
        if (this.userID === null && this.anonymousID === '') return
        this.analytics.group(accountId, accountTraits) 
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
        this.IDLabel = 'anonymous_id'
        // this.refreshIDs()
      }
    }
  })