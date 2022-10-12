<template>
    <div class="default-layout">
        <v-app>
            <AppNavBar />
            <v-main>
                <slot />
            </v-main>
            <AppFooter />
        </v-app>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

useHead({
    title: 'My App',
    // or, instead:
    // titleTemplate: (title) => `My App - ${title}`,
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
            src: "static/js/analytics.js"
        }
    ]
})
</script>

<style lang="scss" scoped>

</style>