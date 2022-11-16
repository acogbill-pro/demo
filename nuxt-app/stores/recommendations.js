// Example store for app
  
import {defineStore} from 'pinia'
import {useArticleCatalog} from '~/stores/articles'
import { useCartStore } from '~/stores/cart'
import { useProductCatalog } from '~/stores/products'

export const useRecommendations = defineStore('recommendations', {
    state: () => ({}),
  
    getters: {
      categoryScores: (state) => {
        const articles = useArticleCatalog()

        // SCORES FROM ARTICLES

        const favesAsArray = Array.from(articles.favorites)

        const favesScoreMap = favesAsArray.reduce(
            function (acc, obj) { 
                const article = articles.all.find(article => article.ID === obj)
                const category = article.category
                return acc.set(category, acc.has(category) ? acc.get(category) + 1 : 1)
            }, 
        new Map())

        // SCORES FROM CART

        const cart = useCartStore()
        const products = useProductCatalog()

        const contentsAsArray = Array.from(cart.contents.entries()) ?? [] [[key, value]]
    
            const categoryScoreMap = contentsAsArray.reduce(
                function (acc, obj) { 
                    const product = products.all.find(product => product.SKU === obj[0])
                    const category = product.category
                    return acc.set(category, acc.has(category) ? acc.get(category) + 1 : 1) // TODO: factor in quantity as multiplier?
                }, 
            favesScoreMap)
    
        return categoryScoreMap
      },
      recommendedCategory: (state) => {
        const scoreArray = Array.from(state.categoryScores.entries()) // [[key, value]]
        const topCategory = scoreArray.reduce((a, e) => e[1] > a[1] ? e : a, [null, null])[0]
        return topCategory
      },
    },
  
    actions: {
        profileToEdge() {
            //console.log('This all populates via other stores now')
        }
    }
  })