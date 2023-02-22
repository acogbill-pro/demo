import { AnalyticsBrowser } from '@segment/analytics-next'
import { useAnalytics } from '~/stores/analytics'

export default defineNuxtPlugin(nuxtApp => {
  const wifiWriteKey = nuxtApp.$config.wifiWriteKey
  const wifiAnalytics = AnalyticsBrowser.load({ writeKey: wifiWriteKey })//.catch((err) => ...);

  const shopWriteKey = nuxtApp.$config.shopWriteKey
  const shopAnalytics = AnalyticsBrowser.load({ writeKey: shopWriteKey })//.catch((err) => ...);

  // console.log(wifiAnalytics)
  // console.log(shopAnalytics)

  // From Adding Middleware Dynamically: https://nuxt.com/docs/guide/directory-structure/middleware
  addRouteMiddleware('analytics-env', (to, from) => {
    const analytics = useAnalytics()

    const routePath = to.fullPath

    if (routePath !== '' && analytics.activeSource === null) {
      const routeAsArray = routePath.split('/')
      //console.log('route as array', routeAsArray)

      const isWifi = routeAsArray.length > 1 ? routeAsArray[1] === 'wifi' : false

      analytics.activeSource = isWifi ? wifiAnalytics : shopAnalytics

      analytics.setup()
    }

  }, { global: true })
  /*
  addRouteMiddleware('named-test', () => {
    console.log('this named middleware was added in a plugin and would override any existing middleware of the same name')
  })
  */
})