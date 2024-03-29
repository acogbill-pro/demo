// Main store for app
  
import {defineStore} from 'pinia'
//import {useAnalytics} from '~/stores/analytics'

export const useProductCatalog = defineStore('productCatalog', {
    state: () => ({
      all: [
        {
            SKU: '0001',
            name: 'Product A',
            description: 'Description A',
            category: 'food',
            priceUSD: 10,
        },
        {
            SKU: '0002',
            name: 'Product B',
            description: 'Description B',
            category: 'food',
            priceUSD: 20,
        },
        {
            SKU: '0003',
            name: 'Product C',
            description: 'Description C',
            category: 'food',
            priceUSD: 30,
        },
        {
            SKU: '0004',
            name: 'Product D',
            description: 'Description D',
            category: 'food',
            priceUSD: 40,
        },
        {
            SKU: '0005',
            name: 'Product E',
            description: 'Description E',
            category: 'food',
            priceUSD: 50,
        },
        {
            SKU: '0006',
            name: 'Product F',
            description: 'Description F',
            category: 'drink',
            priceUSD: 60,
        },
        {
            SKU: '0007',
            name: 'Product G',
            description: 'Description G',
            category: 'drink',
            priceUSD: 70,
        },
        {
            SKU: '0008',
            name: 'Product H',
            description: 'Description H',
            category: 'drink',
            priceUSD: 80,
        },
        {
            SKU: '0009',
            name: 'Product I',
            description: 'Description I',
            category: 'drink',
            priceUSD: 90,
        },
        {
            SKU: '0010',
            name: 'Product J',
            description: 'Description J',
            category: 'drink',
            priceUSD: 100,
        },
      ],
    }),
  
    getters: {
      categories: (state) => {
        return state.all.reduce(function (acc, obj) { return acc.add(obj.category); }, new Set())
      },
    },
  
    actions: {
    }
  })