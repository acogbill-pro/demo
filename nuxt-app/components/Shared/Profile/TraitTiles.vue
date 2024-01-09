<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

function addTrait(withTraitObject) {
    analytics.identify(withTraitObject)
}
</script>

<template>
    <div>
        <v-btn icon="mdi-dog"
            @click="addTrait({ dogs: [{ breed: 'Siberian Husky', name: 'Rover', size: 'large', age: 7 }] })" class="ma-1" />
        <v-btn icon="mdi-cat"
            @click="addTrait({ cats: [{ breed: 'Maine Coon', name: 'Whiskers', size: 'small', age: 1 }] })" class="ma-1" />
        <v-btn icon="mdi-human-child" @click="addTrait({ children: [{ gender: 'girl', name: 'Violet', age: 3 }] })"
            class="ma-1" />
        <v-btn icon="mdi-gender-female" @click="addTrait({ gender: 'female' })" class="ma-1" />
        <v-btn icon="mdi-gender-male" @click="addTrait({ gender: 'male' })" class="ma-1" />
        <v-btn icon="mdi-weather-lightning-rainy" @click="addTrait({ weather: 'dark, rainstorm' })" class="ma-1" />
        <v-btn icon="mdi-weather-sunny" @click="addTrait({ weather: 'warm, sunny' })" class="ma-1" />
        <v-btn icon="mdi-weather-snowy" @click="addTrait({ weather: 'cold, snowy' })" class="ma-1" />
    </div>
</template>

<style lang="scss" scoped></style>