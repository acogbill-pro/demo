// Main store for app
  
import {defineStore} from 'pinia'
//import {useAnalytics} from '~/stores/analytics'

export const useProductCatalog = defineStore('productCatalog', {
    state: () => ({
      all: [
        {
            SKU: '0001',
            name: 'Chick \'N Share Chicken',
            description: 'Chick\'N Share 6 pc.',
            category: 'family',
            priceUSD: 20,
        },
        {
            SKU: '0002',
            name: '8 Single Pieces',
            description: '8 Pieces of Chicken.',
            category: 'family',
            priceUSD: 10,
        },
        {
            SKU: '0003',
            name: 'Classic Pack 12 Pieces',
            description: '12 pieces of chicken + 2 family complements + 4 Traditional Biscuits',
            category: 'family',
            priceUSD: 15,
        },
        {
            SKU: '0004',
            name: 'Classic Pack 18 Pieces',
            description: '18 pieces of chicken + 3 family complements + 4 biscuits.',
            category: 'family',
            priceUSD: 20,
        },
        {
            SKU: '0005',
            name: 'Mix Pack',
            description: '5 Pieces of Chicken + 2 Ke Tiras® + 1 Kruncher Hamburger + 2 Family Complements.',
            category: 'family',
            priceUSD: 20,
        },
        {
            SKU: '0006',
            name: 'Kentucky Chicken Sandwich',
            description: '1 Kentucky Chicken Sandwich Classic Mayonnaise + 1 medium fries + 1 can of soda',
            category: 'individual',
            priceUSD: 10,
        },
        {
            SKU: '0007',
            name: 'Big Box Big Krunch',
            description: '1 Big Krunch® Hamburger + 1 Individual Complement + Medium Fries + 355 ml canned soft drink.',
            category: 'individual',
            priceUSD: 20,
        },
        {
            SKU: '0008',
            name: 'Chicken Megabox',
            description: '4 Pieces of Chicken + 1 Individual Puree + 1 Individual Salad + 1 Traditional Biscuit + 355 ml canned soft drink.',
            category: 'individual',
            priceUSD: 25,
        },
        {
            SKU: '0009',
            name: 'Large Popcorn Chicken Pack',
            description: '1 Large Popcorn Chicken® + Medium Potatoes + 355 ml can of soft drink.',
            category: 'individual',
            priceUSD: 15,
        },
        {
            SKU: '0010',
            name: 'Double Krunch Box',
            description: '1 Double Krunch + 1 medium potatoes + 1 individual salad + 355 ml canned soft drink.',
            category: 'individual',
            priceUSD: 20,
        },
      ],
    }),
  
    getters: {
      categories: (state) => {
        return state.all.reduce(function (acc, obj) { return acc.add(obj.category); }, new Set())
      },
    },
  
    actions: {
        productFromSKU(withSKU) {
            // console.log('finding product with SKU', withSKU)
            const product = this.all.find(element => element.SKU === withSKU)
            // console.log('product is', product)
            return product
        },
    }
  })