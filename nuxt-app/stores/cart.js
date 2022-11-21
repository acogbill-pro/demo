// Main store for app
  
import {defineStore} from 'pinia'
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
import { useProductCatalog } from '~/stores/products.js'
import { useRecommendations } from './recommendations'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
      contents: new Map(), // SKU => quantity
      lastSyncTime: new Date(0),
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
        skus() {
            console.log(Array.from(this.contents.keys()))
            return Array.from(this.contents.keys())
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
        asSummaryObject() { 
            return Object.assign(this.categoryCountsAsObject, {skus: this.skus, quantity: this.totalQuantity, value: this.totalValue})
        },
        asObject() {

        },
        forEdge: (state) => {
            const syncTime = new Date()
            state.lastSyncTime = syncTime
            return {cart_contents: Array.from(state.contents.entries()), lastSyncTime: syncTime}
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
        add(withSKU, withQuantity) {
            const prevQuantity = this.contents.has(withSKU) ? this.contents.get(withSKU) : 0
            this.contents.set(withSKU, prevQuantity + withQuantity)

            const productCatalog = useProductCatalog()
            const product = productCatalog.all.find(product => product.SKU === withSKU)

            const analytics = useAnalytics()
            analytics.track('Product Added', product)
        },
        remove(withSKU) {
            this.contents.delete(withSKU)

            const productCatalog = useProductCatalog()
            const product = productCatalog.all.find(product => product.SKU === withSKU)

            const analytics = useAnalytics()
            analytics.track('Product Removed', product)
        },
        profileToEdge({cartStore = '{}'}) {
            console.log('cart.profileToEdge')
            const toObject = JSON.parse(cartStore)
            const contents = new Map(toObject.cart_contents)
            const lastSyncTime = new Date(toObject.lastSyncTime)

            const stateIsMaster = this.contents.size > 0 // should NOT merge

            const needsSync = this.lastSyncTime < lastSyncTime

            if (needsSync) { // needs to merge Profile return
                this.contents = new Map([...this.contents, ...contents]) 
                this.edgeToProfile()
            } else {
                //console.log('Not overwriting state')
            }          
        },
        edgeToProfile() {  
            const analytics = useAnalytics()
            const profiles = useProfileStore()

            const asString = JSON.stringify(this.forEdge)

            console.log('cart.edgeToProfile')
            analytics.identify(profiles.bestIDIsAnonymous ? null : profiles.bestID, {cartStore: asString}, true)
        },
        reset() {
            this.contents = new Map()
            this.lastSyncTime = new Date(0)
            this.edgeToProfile()
        }, 
        submitOrder() {
            const analytics = useAnalytics()

            analytics.track('Order Completed', this.asSummaryObject)

            this.reset()
        },
    }
  })