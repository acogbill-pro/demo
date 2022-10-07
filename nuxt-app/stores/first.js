import {defineStore} from 'pinia'

export const useFirstStore = defineStore('firstStore', {
    state: () => ({
      n: 2,
    }),
  
    getters: {
      double: (state) => state.n * 2,
    },
  
    actions: {
      increment(amount = 1) {
        this.n += amount
      },
    },
  })