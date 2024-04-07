<script setup>
const runtimeConfig = useRuntimeConfig()

useHead({
    //title: 'Segment App Home',
    // or, instead:
    titleTemplate: (title) => `pristine POC - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: 'Example web application integrated with Segment' }
    ],
    bodyAttrs: {
        class: 'from-useHead-default-layout'
    },
})

onMounted(() => {

})
</script>

<template>
    <div class="default-layout">
        <v-app>
            <pristineNavBar :cart="false" />
            <v-main>
                <slot />
            </v-main>
            <!-- <KFCFooter /> -->
        </v-app>
    </div>
</template>

<style lang="scss" scoped></style>