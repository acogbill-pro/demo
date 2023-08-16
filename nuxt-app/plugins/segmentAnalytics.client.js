import { AnalyticsBrowser } from '@segment/analytics-next'
import { useAnalytics } from '~/stores/analytics'

export default defineNuxtPlugin(nuxtApp => {
  const writeKeys = new Map([
    ['KFCwifi', 'r23PTccSinXGqJzzsDiBPWZDbG7ccoQq'],
    ['KFCshop', '8sRWbzi9O0g7ZCK1IUqerqEJ6r7sDLFn'],
    ['Demoshop', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
    ['Carnival', 'Z8CQECFCwALyZEbrCK4FIsJvPUuDR7np'],
    ['Carnivalshop', 'Z8CQECFCwALyZEbrCK4FIsJvPUuDR7np'],
    ['HGV', 'FVJPUjp2wipW2ymsvXFy4IdmkFNUm2Ni'],
    ['HGVresorts', 'FVJPUjp2wipW2ymsvXFy4IdmkFNUm2Ni'],
    ['HGVaccount', 'FVJPUjp2wipW2ymsvXFy4IdmkFNUm2Ni'],
    ['diamond', 'gQUnDkKaHkk4ZZ9HM5pA4rzarr8eJj1v'],
    ['diamondresorts', 'gQUnDkKaHkk4ZZ9HM5pA4rzarr8eJj1v'],
    ['diamondaccount', 'gQUnDkKaHkk4ZZ9HM5pA4rzarr8eJj1v'],
    ['pristine', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
    ['pristineshop', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
    ['NCR', 'iCaiT1qeXR5LWmy8PsnOzZyy7F3ua9GQ'],
    ['NCRscan', 'iCaiT1qeXR5LWmy8PsnOzZyy7F3ua9GQ'],
    ['pristine', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
    ['pristineproducts', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
    ['pristineproductscart', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
    ['pristineproductscheckout', 'vit8lA1X9mBPVlkj4YwEk99e7bJw8WGe'],
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
      
      const currentDirectory = routeAsArray[1]// + routeAsArray[2] || ''
      // const writeKey = writeKeys.has(currentDirectory) ? writeKeys.get(currentDirectory) : writeKeys.get('Demoshop')
      // console.log(writeKey)
      // const isWifi = routeAsArray.length > 1 ? routeAsArray[1] === 'wifi' : false
      // console.log(AnalyticsBrowser.load)
      if (writeKeys.has(currentDirectory)) {
        const writeKey = writeKeys.get(currentDirectory)
        console.log(`Loading write key in plugin for ${currentDirectory}: `, writeKey)
        const analyticsInstance = AnalyticsBrowser.load({ writeKey })
        analytics.activeSource = analyticsInstance
        analytics.setup()
      } else {
        console.log('No valid write key found')
        // analytics.activeSource = AnalyticsBrowser.load({ writeKey: writeKeys.get('Demoshop')})
      }

    }

  }, { global: true })
  /*
  addRouteMiddleware('named-test', () => {
    console.log('this named middleware was added in a plugin and would override any existing middleware of the same name')
  })
  */
})