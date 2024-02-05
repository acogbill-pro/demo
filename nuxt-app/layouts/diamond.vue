<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~/stores/profileTraits';
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

useHead({
    //title: 'Segment App Home',
    // or, instead:
    titleTemplate: (title) => `${title}`,
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

    const cart = useCartStore()

    // analytics.track('Shop Closed', cart.asSummaryObject)
}

onMounted(() => {
    // profiles.startSyncingCartStore()

    /*window.addEventListener(
        "beforeunload",
        leaving
    )*/
})
</script>

<template>
    <div class="background-colorer">
        <v-container>
            <v-row>
                <v-col>
                    <v-app>

                        <DiamondNavBar />
                        <v-main>
                            <slot />
                        </v-main>

                    </v-app>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<style lang="scss" scoped>
.background-colorer {
    background-color: #DDDDDD,
}
</style>