// Main store for app
  
import {defineStore} from 'pinia'
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
import { useRecommendations } from '~/stores/recommendations'


export const useArticleCatalog = defineStore('articleCatalog', {
    state: () => ({
      all: [
        {
            ID: '0001',
            title: 'Article A',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'pregnancy',
            priceUSD: 10,
        },
        {
            ID: '0002',
            title: 'Article B',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'pregnancy',
            priceUSD: 20,
        },
        {
            ID: '0003',
            title: 'Article C',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'pregnancy',
            priceUSD: 30,
        },
        {
            ID: '0004',
            title: 'Article D',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'pregnancy',
            priceUSD: 40,
        },
        {
            ID: '0005',
            title: 'Article E',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'pregnancy',
            priceUSD: 50,
        },
        {
            ID: '0006',
            title: 'Article F',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'sleep',
            priceUSD: 60,
        },
        {
            ID: '0007',
            title: 'Article G',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'sleep',
            priceUSD: 70,
        },
        {
            ID: '0008',
            title: 'Article H',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'sleep',
            priceUSD: 80,
        },
        {
            ID: '0009',
            title: 'Article I',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'sleep',
            priceUSD: 90,
        },
        {
            ID: '0010',
            title: 'Article J',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'food',
            priceUSD: 100,
        },
      ],
      favorites: new Set(), // ID Strings
      articlesRead: new Set(), // ID Strings
    }),
  
    getters: {
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
        const recommendations = useRecommendations()

        const union = new Set([...state.favorites, ...state.articlesRead])
        const array = Array.from(union)

        // find Difference between the two Arrays
        const leftInCategory = state.all.filter(({ ID: id1, category }) => {
            return !array.some((id2) => {
                return id2 === id1
            }) && category === recommendations.recommendedCategory
        })

        if (leftInCategory.length > 0) {
            return leftInCategory[0]
        } else {
            return state.all.filter(article => article.category === recommendations.recommendedCategory)[0] // TODO: Filter out favorites, pick the best, etc.
        }
    }, 
      hasRecommendation: (state) => state.recommendedArticle instanceof Object,
      forEdge: (state) => {
        return {articleStore_favorites: Array.from(state.favorites), articleStore_read: Array.from(state.articlesRead)}
      },
    },
  
    actions: {
        markAsRead(withArticleID) {
            this.articlesRead.add(withArticleID)

            const article = this.all.find(article => article.ID === withArticleID)

            const analytics = useAnalytics()
            analytics.page('Article Page')
            analytics.track('Article Read', article)
        },
        profileToEdge(withTraits) {
            console.log('articles.profileToEdge')
            //console.log(withTraits.edge)
            // imagine this as a function that takes the traits and calculates scores
            
        },
        edgeToProfile() {  
            const analytics = useAnalytics()
            const profiles = useProfileStore()
            console.log('articles.edgeToProfile')

            //analytics.identify(profiles.userID, this.scoresAsObject)
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