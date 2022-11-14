// Example store for app
  
import {defineStore} from 'pinia'
//import {useAnalytics} from '~/stores/analytics'

export const useProductCatalog = defineStore('productCatalog', {
    state: () => ({}),
  
    getters: {
      categories: (state) => {
        return state.all.reduce(function (acc, obj) { return acc.add(obj.category); }, new Set())
      },
    },
  
    actions: {}
  })