// Main store for app
  
import {defineStore} from 'pinia'
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
import { useProductCatalog } from '~/stores/products.js'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
      contents: new Map(), // SKU => quantity
    }),
  
    getters: {
        totalQuantity() {
            //this.contents.set('0001', 3)
            const count = [...this.contents.values()].reduce((result, value) => {
                result += value;
                return result;
              }, 0)
            return count
        },
    },
  
    actions: {
        loadCart(withTraits) {
            console.log('Would update client-side cart data')
        },
        updateScores(withArticleID) {
            // could do a round-trip to an API to calculate scores first
            console.log('Would update score data from client side')
            
            const profiles = useProfileStore()
            profiles.syncWithStore()
        },
        add(withSKU, withQuantity) {
            const prevQuantity = this.contents.has(withSKU) ? this.contents.get(withSKU) : 0
            this.contents.set(withSKU, prevQuantity + withQuantity)

            const productCatalog = useProductCatalog()
            const product = productCatalog.all.find(product => product.SKU === withSKU)

            const analytics = useAnalytics()
            analytics.track('Product Added to Cart', product)
            console.log(product.name + ' added to Cart')
        },
        remove(withSKU) {
            this.contents.delete(withSKU)
        },
    }
  })