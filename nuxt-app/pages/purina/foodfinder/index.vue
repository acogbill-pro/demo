<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "foodfinder",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Adoption Home'
})

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    // if (profiles.hasSpecificTrait('personalized_hero_image')) return profiles.traits.personalized_hero_image
    return '/purina/images/products/Cupid.jpeg'//profiles.hasTraits ? '/purina/images/dogsPlaying.jpeg' : '/purina/images/puppyPlaying.jpeg'
})

const petInTraits = ref(true)

function skipPetInfo() {
    navigateTo({
        path: '/purina/foodfinder/four/',
    })
}

onMounted(() => {
    analytics.page('Food Finder: Step One')

    //profiles.startSyncing(3)
})
</script>

<template>
    <v-container>
        <v-row no-gutters v-if="profiles.hasTraits && petInTraits">
            <v-col>
                <v-fade-transition>
                    <v-img :src="heroImagePath" width="800" />
                </v-fade-transition>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="profiles.hasTraits && petInTraits">
            <v-col>
                <v-switch v-model="petInTraits" label="This food is for Cupid"></v-switch>
                <v-btn @click="skipPetInfo">Continue</v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters v-else>
            <v-col>
                <PurinaSurveyOne />
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>