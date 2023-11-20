<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~/stores/profiles';
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

useHead({
    //title: 'Segment App Home',
    // or, instead:
    titleTemplate: (title) => `Carnival POC - ${title}`,
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

    const cart = useCartStore()

    // analytics.track('Shop Closed', cart.asSummaryObject)
}

onMounted(() => {
    profiles.startSyncingCartStore()

    /*window.addEventListener(
        "beforeunload",
        leaving
    )*/
})
</script>

<template>
    <div class="default-layout">
        <v-app>
            <CarnivalShopNavBar />
            <v-main>
                <slot />
            </v-main>
            <!-- <ShopFooter /> -->
        </v-app>
    </div>
</template>

<style lang="scss" scoped></style>