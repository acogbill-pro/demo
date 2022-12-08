// analytics.server.js
var Analytics = require('analytics-node');

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = nuxtApp.$config
  const blog = new Analytics(runtimeConfig.blogWriteKey)
  const shop = new Analytics(runtimeConfig.shopWriteKey)
  nuxtApp.provide('blogAnalytics-server', blog);
  nuxtApp.provide('shopAnalytics', shop);
  //console.log(nuxtApp)
})