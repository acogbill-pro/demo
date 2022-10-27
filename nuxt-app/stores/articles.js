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
            category: 'Toddler',
            priceUSD: 60,
        },
        {
            ID: '0007',
            title: 'Article G',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Toddler',
            priceUSD: 70,
        },
        {
            ID: '0008',
            title: 'Article H',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Toddler',
            priceUSD: 80,
        },
        {
            ID: '0009',
            title: 'Article I',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Toddler',
            priceUSD: 90,
        },
        {
            ID: '0010',
            title: 'Article J',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Toddler',
            priceUSD: 100,
        },
      ],
      favoriteIDs: new Set(), // ID Strings
      categoryScores: new Map(), // 'Category Name' => 0 (Number)
    }),
  
    getters: {
      //getArticle: (state) => (withID) => state.all.find(article => article.ID === withID),
      recommendedCategory: (state) => {
        return [...state.categoryScores.entries()].reduce((a, e) => e[1] > a[1] ? e : a)[0] // 'Category Name'
      },
      recommendedArticle: (state) => {
        return state.all.filter(article => article.category === state.recommendedCategory)[0] // TODO: Filter out favorites, pick the best, etc.
      }
    },
  
    actions: {
        loadFavesAndScores(withTraits) {
            console.log('Would update client-side score data from Profile API')
        },
        markAsRead(withArticleID) {
            const analytics = useAnalytics()

            const article = this.all.find(article => article.ID === withArticleID)

            analytics.page('Article Page')
            analytics.track('Article Read', article)

            this.updateScores(withArticleID)
        },
        updateScores(withArticleID) {
            // could do a round-trip to an API to calculate scores first
            console.log('Would update score data from client side')
            
            const profiles = useProfileStore()
            profiles.syncWithStore()
        },
        addFavorite(withArticleID) {
            this.favoriteIDs.add(withArticleID)

            const article = this.all.find(article => article.ID === withArticleID)

            const analytics = useAnalytics()
            analytics.track('Article Favorited', article)
        },
        removeFavorite(withArticleID) {
            this.favoriteIDs.delete(withArticleID)
        },
    }
  })