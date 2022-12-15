<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "shop",
})

useHead({
    title: 'Account Page'
})

onMounted(() => {
    analytics.page('Login Page')

    //profiles.persistUser()
})

const collapse = ref(true)

function toggleCollapse() {
    collapse.value = !collapse.value
}

const isLoggedIn = computed(() => {
    return !analytics.bestIDIsAnonymous
})

const loginTitle = computed(() => {
    return profiles.hasTraits ? `Logged in as ${profiles.traits.name}` : `Logged in`
})

function logout() {
    profiles.unload()
}
</script>

<template>
    <v-container>
        <v-row v-if="!isLoggedIn || (isLoggedIn && !collapse)">
            <v-col>
                <UserLogin />
            </v-col>
            <v-col>
                <UserRegister />
            </v-col>

        </v-row>
        <v-row v-else>
            <v-col>
                <p>Logged In</p>
            </v-col>
        </v-row>
        <v-row v-if="isLoggedIn" class="my-5">
            <NuxtLink to="/shop"><v-btn class="mr-3">Continue to Shop</v-btn></NuxtLink>
            <v-btn @click="logout()" class="mr-3">Logout</v-btn>
            <v-btn v-if="!collapse" @click="toggleCollapse()" class="mr-3">Hide Login</v-btn>
            <v-btn v-else @click="toggleCollapse" class="mr-3">Login Again</v-btn>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>