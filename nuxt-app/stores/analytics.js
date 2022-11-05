// Wrapper store for analytics.js
  
import {defineStore} from 'pinia'
import {useProfileStore} from '~/stores/profiles'
import { useArticleCatalog } from '~/stores/articles'
import { storeToRefs } from 'pinia'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({}),
  
    getters: {
      analytics: (state) => window.analytics? window.analytics : null, // TODO: add some validation

      userID: (state) => window.analytics?._user.id() ?? null,
    },
  
    actions: {
      page(pageTitle) {
        this.analytics.page(pageTitle)
      },
      track(eventName, traitsObject = null) {
        this.analytics.track(eventName, traitsObject)
      },
      identify(user_id = null, traitsObject = {}) {
        const profile = useProfileStore()
        if (user_id !== null) {
          profile.userID = user_id
          //profile.traits = traitsObject
          
          this.analytics.identify(user_id, traitsObject)

          setTimeout(() => {
            profile.startSyncing(10)
          }, 2000)
          
        } else {
          this.analytics.identify(traitsObject) // automatically prepends the anonymous ID
        }
      },
      activateWatcher() {
        // analytics.js emitter
        // works for alias, group, identify, track, and page
        // callback to augment this data

        this.analytics.on('track', (event, properties) => console.log('Track Call for ' + event))
        this.analytics.on('page', (event, properties) => console.log('Page Call for ' + properties))
        this.analytics.on('identify', (event, properties) => console.log('Identify Call for ' + event))

        const articles = useArticleCatalog()
        const { categoryScores } = storeToRefs(articles)
        watch(categoryScores, articles.syncScores)
      },
      reset() {
        this.analytics.reset()
      }
    }
  })