<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~~/stores/profileTraits';
import { useProfileStore } from '~/stores/profile';
const analytics = useAnalytics()
const profileTraits = useProfileTraitsStore()
const profile = useProfileStore()

const props = defineProps({
    trait: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: 'Trait',
    },
    icon: {
        type: String,
        default: 'mdi-account',
    },
})

const hasTrait = computed(() => profileTraits.hasSpecificTrait(props.trait))
const traitValue = computed(() => profileTraits.getSpecificTrait(props.trait))
</script>

<template>
    <v-card v-if="hasTrait">
        <v-card-title class="branded" style="text-align: center">
            <v-icon :icon="icon" size="x-small" />
            <h5 style="text-align: left;">{{ label }}</h5>
        </v-card-title>
        <v-card-text>
            <h3>{{ traitValue }}</h3>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped>
.branded {
    color: #75CAAA;
}
</style>