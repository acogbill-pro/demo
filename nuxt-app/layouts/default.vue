<script setup>
//import { useRoute } from 'vue-router'

import { useAnalytics } from '~/stores/analytics';
import { useProfileStore } from '~/stores/profiles';
const analyticsStore = useAnalytics()
const profiles = useProfileStore()

//const route = useRoute()
const runtimeConfig = useRuntimeConfig()

useHead({
    //title: 'Segment App Home',
    // or, instead:
    titleTemplate: (title) => `Cogbill Demo App - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: 'My amazing site.' }
    ],
    bodyAttrs: {
        class: 'from-useHead-default-layout'
    },
    script: [
        {
            src: 'js/blogAnalytics.js',
            type: 'text/javascript',
        }
    ]
})

function leaving(e) {
    e.returnValue = ""

    analyticsStore.track('Blog Closed')
}

onMounted(() => {
    console.log(window.analytics)
    console.log(analytics)
    window.analytics.load("DtDvPaJzJ7sw0EJD6RkYKO9BkPIhFh97")

    //analytics.activateWatcher()

    profiles.startSyncingArticleStore()

    /*window.addEventListener(
        "beforeunload",
        leaving
    )*/
})
</script>

<template>
    <div class="default-layout">
        <v-app>
            <BlogNavBar />
            <v-main>
                <slot />
            </v-main>
            <BlogFooter />
        </v-app>
    </div>
</template>

<style lang="scss" scoped>

</style>