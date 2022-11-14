// Main store for app
  
import {defineStore} from 'pinia'
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
import { useProductCatalog } from '~/stores/products.js'
import { useRecommendations } from './recommendations'

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
        forEdge: (state) => {
            return {cartStore_contents: Array.from(state.contents.entries())}
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
          recommendedProductOLD: (state) => {
            const products = useProductCatalog()
            const recommendations = useRecommendations()
            return products.all.filter(product => product.category === recommendations.recommendedCategory)[0] // TODO: Filter out favorites, pick the best, etc.
          },

        recommendedProduct: (state) => {
            const recommendations = useRecommendations()
            const products = useProductCatalog()

            const array = Array.from(state.contents.keys())

            // find Difference between the two Arrays
            const leftInCategory = products.all.filter(({ SKU: SKU1, category }) => {
                return !array.some((SKU2) => {
                    return SKU2 === SKU1
                }) && category === recommendations.recommendedCategory
            })

            if (leftInCategory.length > 0) {
                return leftInCategory[0]
            } else {
                return products.all.filter(article => article.category === recommendations.recommendedCategory)[0] // TODO: Filter out favorites, pick the best, etc.
            }
        }, 
    },
    
    actions: {
        profileToEdge(withTraits) {
            console.log('cart.loadToEdge')
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