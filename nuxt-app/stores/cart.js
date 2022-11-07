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
        totalValue() {
            const products = useProductCatalog()

            const count = [...this.contents.entries()].reduce((result, value) => {
                const product = products.all.find(product => product.SKU === value[0])
                result += value[1] * product.priceUSD
                return result;
              }, 0)
            return count
        },
        categoryCountsAsObject() {
            const products = useProductCatalog()

            const mapToReturn = [...this.contents.entries()].reduce((result, value) => {
                const product = products.all.find(product => product.SKU === value[0])
                const category = product.category
                result.set(category, result.has(category) ? result.get(category) + 1 : 1)
                return result;
              }, new Map())
            return Object.fromEntries(mapToReturn)
        },
        asObject() { 
            return Object.assign(this.categoryCountsAsObject, {quantity: this.totalQuantity, value: this.totalValue})
        },
        categoryScores: (state) => {
            const products = useProductCatalog()
            const profile = useProfileStore()

            // process all traits into scores
            // could make a call to anotoher API to pull / build these scores
    
            const contentsAsArray = Array.from(state?.contents.entries()) ?? [] [[key, value]]
    
            const categoryScoreMap = contentsAsArray.reduce(
                function (acc, obj) { 
                    const product = products.all.find(product => product.SKU === obj[0])
                    const category = product.category
                    return acc.set(category, acc.has(category) ? acc.get(category) + 1 : 1) // TODO: factor in quantity as multiplier?
                }, 
            profile.categoryScores)
    
            return categoryScoreMap
            },
            scoresAsObject: (state) => {
                return Object.fromEntries(state.categoryScores)
            },
          recommendedCategory: (state) => {
            const scoreArray = Array.from(state.categoryScores.entries()) // [[key, value]]
            const topCategory = scoreArray.reduce((a, e) => e[1] > a[1] ? e : a, [null, null])[0]
            return topCategory
          },
          categoriesWithoutRecommended: (state) => {
            const products = useProductCatalog()
            if (state.recommendedCategory !== null) {
                const setToReturn = products.categories
                setToReturn.delete(state.recommendedCategory)
                return setToReturn
            } else {
                return products.categories
            }
            
          },
          recommendedProduct: (state) => {
            const products = useProductCatalog()
            return products.all.filter(product => product.category === state.recommendedCategory)[0] // TODO: Filter out favorites, pick the best, etc.
          }
    },
  
    actions: {
        loadCart(withTraits) {
            console.log('Would update client-side cart data')
        },
        updateScores() {
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
        },
        remove(withSKU) {
            this.contents.delete(withSKU)
        },
    }
  })