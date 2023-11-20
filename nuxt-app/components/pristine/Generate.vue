<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const cart = useCartStore()
const profile = useProfileStore()

const heroImagePath = computed(() => profile.hasTraits ? '/pristine/images/bread.png' : '/pristine/images/grocery.jpg')

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="8">
                    Gen AI here
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>