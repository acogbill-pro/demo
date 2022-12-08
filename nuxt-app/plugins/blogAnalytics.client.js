import { AnalyticsBrowser } from '@segment/analytics-next'

export default defineNuxtPlugin(nuxtApp => {
  const writeKey = nuxtApp.$config.blogWriteKey

  const analytics = AnalyticsBrowser.load({ writeKey })

  nuxtApp.provide('blogAnalytics', analytics)
})