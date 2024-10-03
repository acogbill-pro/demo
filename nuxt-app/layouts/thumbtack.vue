<script setup>
import { useAnalytics } from '~/stores/analytics';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()
const runtimeConfig = useRuntimeConfig()
const brandName = computed(() => runtimeConfig.brandedAssetsPath)

useHead({
    //title: 'Segment App Home',
    // or, instead:
    titleTemplate: (title) => `Thumbtack POC - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: 'Example web application integrated with Segment' }
    ],
    bodyAttrs: {
        class: 'from-useHead-default-layout'
    },
    // script: [
    //     "https://cdn.jsdelivr.net/npm/@statsig/js-client@3/build/statsig-js-client+session-replay+web-analytics.min.js?apikey=client-Jw0SnohUaBLKPx5qjuQWWC2cTQfmsa7yq0m1GDfINcq",
    // ],
})

function leaving(e) {
    e.returnValue = ""
}

onMounted(() => {
    profiles.startSyncingArticleStore()


})
</script>

<template>
    <div class="default-layout">
        <v-app class="bg-red-lighten-5">
            <ThumbtackNavBar :cart="true" />
            <v-main>
                <slot />
            </v-main>
            <!-- <KFCFooter /> -->
        </v-app>
    </div>
</template>

<style lang="scss" scoped></style>