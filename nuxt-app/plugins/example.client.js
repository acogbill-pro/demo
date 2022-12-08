//import * as Analytics from 'analytics-node'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('hello2', () => console.log('hello world'));
  })