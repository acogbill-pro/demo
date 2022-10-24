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

<script setup>
/*import { useRoute } from 'vue-router'
const route = useRoute()*/

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
            src: 'static/js/analytics-shop.js',
            type: 'text/javascript',
        }
    ]
})

//onMounted(() => {})
</script>

<style lang="scss" scoped>

</style>