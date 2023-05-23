<script setup>
import { useAnalytics } from '~/stores/analytics';
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()
const runtimeConfig = useRuntimeConfig()

useHead({
    //title: 'Segment App Home',
    // or, instead:
    titleTemplate: (title) => `NCR POC - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: 'My amazing site.' }
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
            <NCRNavBar />
            <v-main>
                <slot />
            </v-main>
            <!-- <KFCFooter /> -->
        </v-app>
    </div>
</template>

<style lang="scss" scoped></style>