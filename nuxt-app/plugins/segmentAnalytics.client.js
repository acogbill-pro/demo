import { AnalyticsBrowser } from '@segment/analytics-next'
import { useAnalytics } from '~/stores/analytics'

export default defineNuxtPlugin(nuxtApp => {
  const blogWriteKey = nuxtApp.$config.blogWriteKey
  const blogAnalytics = AnalyticsBrowser.load({ writeKey: blogWriteKey })//.catch((err) => ...);

  const shopWriteKey = nuxtApp.$config.shopWriteKey
  const shopAnalytics = AnalyticsBrowser.load({ writeKey: shopWriteKey })//.catch((err) => ...);

  // From Adding Middleware Dynamically: https://nuxt.com/docs/guide/directory-structure/middleware
  addRouteMiddleware('analytics-env', (to, from) => {
    const analytics = useAnalytics()

    const routePath = to.fullPath

    if (routePath !== '' && analytics.activeSource === null) {
      const routeAsArray = routePath.split('/')

      const isShop = routeAsArray.length > 1 ? routeAsArray[1] === 'shop' : false

      analytics.activeSource = isShop ? shopAnalytics : blogAnalytics

      analytics.setup()
    }

  }, { global: true })
  /*
  addRouteMiddleware('named-test', () => {
    console.log('this named middleware was added in a plugin and would override any existing middleware of the same name')
  })
  */
})