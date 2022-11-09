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
            category: 'pregnancy',
            priceUSD: 10,
        },
        {
            SKU: '0002',
            name: 'Product B',
            description: 'Description B',
            category: 'pregnancy',
            priceUSD: 20,
        },
        {
            SKU: '0003',
            name: 'Product C',
            description: 'Description C',
            category: 'pregnancy',
            priceUSD: 30,
        },
        {
            SKU: '0004',
            name: 'Product D',
            description: 'Description D',
            category: 'pregnancy',
            priceUSD: 40,
        },
        {
            SKU: '0005',
            name: 'Product E',
            description: 'Description E',
            category: 'pregnancy',
            priceUSD: 50,
        },
        {
            SKU: '0006',
            name: 'Product F',
            description: 'Description F',
            category: 'sleep',
            priceUSD: 60,
        },
        {
            SKU: '0007',
            name: 'Product G',
            description: 'Description G',
            category: 'sleep',
            priceUSD: 70,
        },
        {
            SKU: '0008',
            name: 'Product H',
            description: 'Description H',
            category: 'sleep',
            priceUSD: 80,
        },
        {
            SKU: '0009',
            name: 'Product I',
            description: 'Description I',
            category: 'sleep',
            priceUSD: 90,
        },
        {
            SKU: '0010',
            name: 'Product J',
            description: 'Description J',
            category: 'sleep',
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