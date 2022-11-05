<script setup>
import { useAnalytics } from '~/stores/analytics'
const analytics = useAnalytics()
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

onMounted(() => {
    analytics.activateWatcher()
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