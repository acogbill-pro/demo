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
    titleTemplate: (title) => `Purina POC - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: 'Example web application integrated with Segment' }
    ],
    bodyAttrs: {
        class: 'from-useHead-default-layout'
    },
})

function leaving(e) {
    e.returnValue = ""
}

onMounted(() => {
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
            <PurinaPetFinderNavBar />

            <v-main>
                <!-- <v-no-ssr> -->
                <v-container>
                    <v-row>
                        <v-col cols="9">
                            <slot />
                        </v-col>
                        <v-col cols="3">
                            <SharedSidebar />
                        </v-col>
                    </v-row>
                </v-container>
                <!-- </v-no-ssr> -->

            </v-main>
            <!-- <KFCFooter /> -->
        </v-app>
    </div>
</template>

<style lang="scss" scoped></style>