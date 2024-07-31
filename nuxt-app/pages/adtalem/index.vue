<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "adtalem",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Landing Page'
})

const selection = ref(null)

onMounted(() => {
    // analytics.page('POC Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div class="hero">

    </div>
    <v-container>
        <v-row>
            <v-col>
                <v-select :items="['Yes', 'No']" v-model="selection" label="Are you a registered nurse?"></v-select>
                <v-btn nuxt to="/adtalem/form" color="#F4B610">Get Started</v-btn>
                <v-spacer />
                <!-- <v-btn nuxt to="review" variant="outlined" class="my-10">Submit Course Review</v-btn> -->
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped>
.hero {
    background: url('../adtalem/images/heroBg.png');
    background-size: cover;
    // height: 100vh;
    height: 400px;
    background-position-x: -130px;
}
</style>