<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileStore } from '~/stores/profiles';
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const profiles = useProfileStore()
/*import { useRoute } from 'vue-router'
const route = useRoute()*/
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
            src: `https://cdn.segment.com/analytics.js/v1/${runtimeConfig.public.shopWriteKey}/analytics.min.js`,
            type: 'text/javascript',
        }
    ]
})

function leaving(e) {
    e.returnValue = ""

    const cart = useCartStore()

    analytics.track('Shop Closed', cart.asSummaryObject)
}

onMounted(() => {
    analytics.activateWatcher()

    profiles.startSyncingCartStore()

    window.addEventListener(
        "beforeunload",
        leaving
    )
})
</script>

<template>
    <div class="default-layout">
        <v-app>
            <ShopNavBar />
            <v-main>
                <slot />
            </v-main>
            <ShopFooter />
        </v-app>
    </div>
</template>

<style lang="scss" scoped>

</style>