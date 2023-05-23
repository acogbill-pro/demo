// Main store for app
  
import {defineStore} from 'pinia'
//import {useAnalytics} from '~/stores/analytics'

export const useProductCatalog = defineStore('productCatalog', {
    state: () => ({
      all: [{name: 'Loading'}],
    }),
  
    getters: {
      categories: (state) => {
        return state.all.reduce(function (acc, obj) { return acc.add(obj.category); }, new Set())
      },
    },
  
    actions: {
        loadProducts(withProductArray) {
            this.all = withProductArray
        },
        productFromSKU(withSKU) {
            // console.log('finding product with SKU', withSKU)
            const product = this.all.find(element => element.SKU === withSKU)
            // console.log('product is', product)
            return product
        },
    }
  })