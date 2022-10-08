/*var analytics=window.analytics=window.analytics||[]
  
if(!analytics.initialize)if(analytics.invoked) {
    console.log('Segment snippet included twice')
} else {
    analytics.invoked=!0
    analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"]
    analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t)
        return analytics
    }}
    for(var e=0;e<analytics.methods.length;e++){
        var key=analytics.methods[e];
        analytics[key]=analytics.factory(key)}analytics.load=function(key,e){
            var t=document.createElement("script")
            t.type="text/javascript"
            t.async=!0
            t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js"
            var n=document.getElementsByTagName("script")[0]
            n.parentNode.insertBefore(t,n)
            analytics._loadOptions=e
        }
        
}
analytics._writeKey="DtDvPaJzJ7sw0EJD6RkYKO9BkPIhFh97"
analytics.SNIPPET_VERSION="4.15.3"
analytics.load("DtDvPaJzJ7sw0EJD6RkYKO9BkPIhFh97")*/

//const Analytics = require('analytics-node')
//import Analytics from 'analytics-node'
  
import {defineStore} from 'pinia'

export const useAnalytics = defineStore('analyticsStore', {
    state: () => ({
      analytics: new Analytics('DtDvPaJzJ7sw0EJD6RkYKO9BkPIhFh97'),
    }),
  
    getters: {
      double: (state) => state.n * 2,
    },
  
    actions: {
      increment(amount = 1) {
        this.n += amount
      },
    },
  })