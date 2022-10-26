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
            category: 'Category 1',
            priceUSD: 10,
        },
        {
            ID: '0002',
            title: 'Article B',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 1',
            priceUSD: 20,
        },
        {
            ID: '0003',
            title: 'Article C',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 1',
            priceUSD: 30,
        },
        {
            ID: '0004',
            title: 'Article D',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 1',
            priceUSD: 40,
        },
        {
            ID: '0005',
            title: 'Article E',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 1',
            priceUSD: 50,
        },
        {
            ID: '0006',
            title: 'Article F',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 2',
            priceUSD: 60,
        },
        {
            ID: '0007',
            title: 'Article G',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 2',
            priceUSD: 70,
        },
        {
            ID: '0008',
            title: 'Article H',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 2',
            priceUSD: 80,
        },
        {
            ID: '0009',
            title: 'Article I',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 2',
            priceUSD: 90,
        },
        {
            ID: '0010',
            title: 'Article J',
            fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet justo donec enim. Placerat orci nulla pellentesque dignissim enim. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Rhoncus dolor purus non enim praesent. Sit amet luctus venenatis lectus. Tellus orci ac auctor augue mauris augue neque gravida. Sodales ut eu sem integer vitae. Tellus in metus vulputate eu. Viverra mauris in aliquam sem fringilla ut morbi. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Neque gravida in fermentum et sollicitudin ac.',
            category: 'Category 2',
            priceUSD: 100,
        },
      ],
      favoriteIDs: new Set(), // ID Strings
    }),
  
    getters: {
      //getArticle: (state) => (withID) => state.all.find(article => article.ID === withID),
      /*getArticleByID: (state) => {
        return (articleID) => state.all.find((article) => article.id === articleID)
      },*/
    },
  
    actions: {
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