// Main store for app
  
import {defineStore} from 'pinia'
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'

export const useArticleCatalog = defineStore('articleCatalog', {
    state: () => ({
      all: [
        {
            ID: '0001',
            title: 'Article A',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Pregnancy',
            priceUSD: 10,
        },
        {
            ID: '0002',
            title: 'Article B',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Pregnancy',
            priceUSD: 20,
        },
        {
            ID: '0003',
            title: 'Article C',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Pregnancy',
            priceUSD: 30,
        },
        {
            ID: '0004',
            title: 'Article D',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Pregnancy',
            priceUSD: 40,
        },
        {
            ID: '0005',
            title: 'Article E',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Pregnancy',
            priceUSD: 50,
        },
        {
            ID: '0006',
            title: 'Article F',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Sleep',
            priceUSD: 60,
        },
        {
            ID: '0007',
            title: 'Article G',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Sleep',
            priceUSD: 70,
        },
        {
            ID: '0008',
            title: 'Article H',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Sleep',
            priceUSD: 80,
        },
        {
            ID: '0009',
            title: 'Article I',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Sleep',
            priceUSD: 90,
        },
        {
            ID: '0010',
            title: 'Article J',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Sleep',
            priceUSD: 100,
        },
      ],
      favorites: new Set(), // ID Strings
      articlesRead: new Set(), // ID Strings
    }),
  
    getters: {
      categoryScores: (state) => {

        // process all traits into scores
        // could make a call to anotoher API to pull / build these scores

        const favesAsArray = Array.from(state?.favorites) ?? []

        const favesScoreMap = favesAsArray.reduce(
            function (acc, obj) { 
                const article = state.all.find(article => article.ID === obj)
                return acc.set(article.category, acc.has(article.category) ? acc.get(article.category) + 1 : 1)
            }, 
        new Map([]))

        return favesScoreMap
        },
        scoresAsObject: (state) => {
            return Object.fromEntries(state.categoryScores)
        },
      recommendedCategory: (state) => {
        const scoreArray = Array.from(state.categoryScores.entries()) // [[key, value]]
        const topCategory = scoreArray.reduce((a, e) => e[1] > a[1] ? e : a, [null, null])[0]
        return topCategory
      },
      categories: (state) => {
        return state.all.reduce(function (acc, obj) { return acc.add(obj.category); }, new Set())
      },
      categoriesWithoutRecommended: (state) => {
        if (state.recommendedCategory !== null) {
            const setToReturn = new Set(state.categories)
            setToReturn.delete(state.recommendedCategory)
            return setToReturn
        } else {
            return state.categories
        }
        
      },
      recommendedArticle: (state) => {
        return state.all.filter(article => article.category === state.recommendedCategory)[0] // TODO: Filter out favorites, pick the best, etc.
      }
    },
  
    actions: {
        loadFavesAndScores(withTraits) {
            console.log('To-do: set up article store to import scores from Profile')
        },
        markAsRead(withArticleID) {
            this.articlesRead.add(withArticleID)

            const article = this.all.find(article => article.ID === withArticleID)

            const analytics = useAnalytics()
            analytics.page('Article Page')
            analytics.track('Article Read', article)
        },
        syncScores() {  
            const analytics = useAnalytics()
            const profiles = useProfileStore()

            analytics.identify(profiles.userID, this.scoresAsObject)
        },
        addFavorite(withArticleID) {
            this.favorites.add(withArticleID)

            const article = this.all.find(article => article.ID === withArticleID)

            const analytics = useAnalytics()
            analytics.track('Article Favorited', article)
        },
        removeFavorite(withArticleID) {
            this.favorites.delete(withArticleID)
        },
    }
  })