import { AnalyticsBrowser } from '@segment/analytics-next'

export default defineNuxtPlugin(nuxtApp => {
  const blogWriteKey = nuxtApp.$config.blogWriteKey
  const blogAnalytics = AnalyticsBrowser.load({ writeKey: blogWriteKey })//.catch((err) => ...);
  nuxtApp.provide('blogAnalytics', blogAnalytics)

  const shopWriteKey = nuxtApp.$config.shopWriteKey
  const shopAnalytics = AnalyticsBrowser.load({ writeKey: shopWriteKey })//.catch((err) => ...);
  nuxtApp.provide('shopAnalytics', shopAnalytics)
})