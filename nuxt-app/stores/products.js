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
            category: 'Category 1',
            priceUSD: 10,
        },
        {
            SKU: '0002',
            name: 'Product B',
            description: 'Description B',
            category: 'Category 1',
            priceUSD: 20,
        },
        {
            SKU: '0003',
            name: 'Product C',
            description: 'Description C',
            category: 'Category 1',
            priceUSD: 30,
        },
        {
            SKU: '0004',
            name: 'Product D',
            description: 'Description D',
            category: 'Category 1',
            priceUSD: 40,
        },
        {
            SKU: '0005',
            name: 'Product E',
            description: 'Description E',
            category: 'Category 1',
            priceUSD: 50,
        },
        {
            SKU: '0006',
            name: 'Product F',
            description: 'Description F',
            category: 'Category 2',
            priceUSD: 60,
        },
        {
            SKU: '0007',
            name: 'Product G',
            description: 'Description G',
            category: 'Category 2',
            priceUSD: 70,
        },
        {
            SKU: '0008',
            name: 'Product H',
            description: 'Description H',
            category: 'Category 2',
            priceUSD: 80,
        },
        {
            SKU: '0009',
            name: 'Product I',
            description: 'Description I',
            category: 'Category 2',
            priceUSD: 90,
        },
        {
            SKU: '0010',
            name: 'Product J',
            description: 'Description J',
            category: 'Category 2',
            priceUSD: 100,
        },
      ],
    }),
  
    getters: {
      double: (state) => state.n * 2,
    },
  
    actions: {
      /*increment(amount = 1) {
        const analytics = useAnalytics()
        this.n += amount
        analytics.track("Incremented")
      },*/
    }
  })