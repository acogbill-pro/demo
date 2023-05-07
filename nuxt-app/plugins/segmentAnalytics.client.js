import { AnalyticsBrowser } from '@segment/analytics-next'
import { useAnalytics } from '~/stores/analytics'

export default defineNuxtPlugin(nuxtApp => {
  const writeKeys = new Map([
    ['KFCwifi', AnalyticsBrowser.load({ writeKey: 'r23PTccSinXGqJzzsDiBPWZDbG7ccoQq'})],
    ['KFCshop', AnalyticsBrowser.load({ writeKey: '8sRWbzi9O0g7ZCK1IUqerqEJ6r7sDLFn'})],
    ['Demoshop', AnalyticsBrowser.load({ writeKey: 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'})],
    ['Carnival', AnalyticsBrowser.load({ writeKey: 'Z8CQECFCwALyZEbrCK4FIsJvPUuDR7np'})],
  ])
  // const wifiWriteKey = nuxtApp.$config.wifiWriteKey
  // const wifiAnalytics = AnalyticsBrowser.load({ writeKey: wifiWriteKey })//.catch((err) => ...);
  // // writeKeys.set('wifi', wifiAnalytics)

  // const shopWriteKey = nuxtApp.$config.shopWriteKey
  // const shopAnalytics = AnalyticsBrowser.load({ writeKey: shopWriteKey })//.catch((err) => ...);
  // writeKeys.set('shop', shopAnalytics)

  // console.log(wifiAnalytics)
  // console.log(shopAnalytics)

  // From Adding Middleware Dynamically: https://nuxt.com/docs/guide/directory-structure/middleware
  addRouteMiddleware('analytics-env', (to, from) => {
    const analytics = useAnalytics()

    const routePath = to.fullPath

    if (routePath !== '' && analytics.activeSource === null) {
      const routeAsArray = routePath.split('/')
      
      const currentDirectory = routeAsArray[1] + routeAsArray[2] || ''
      // const writeKey = writeKeys.has(currentDirectory) ? writeKeys.get(currentDirectory) : writeKeys.get('Demoshop')
      // console.log(writeKey)
      // const isWifi = routeAsArray.length > 1 ? routeAsArray[1] === 'wifi' : false
      // console.log(AnalyticsBrowser.load)
      analytics.activeSource = writeKeys.has(currentDirectory) ? writeKeys.get(currentDirectory) : writeKeys.get('Demoshop')

      analytics.setup()
    }

  }, { global: true })
  /*
  addRouteMiddleware('named-test', () => {
    console.log('this named middleware was added in a plugin and would override any existing middleware of the same name')
  })
  */
})