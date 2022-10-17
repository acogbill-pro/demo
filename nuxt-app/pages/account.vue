<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profile = useProfileStore()

useHead({
    title: 'Account Page'
})

onMounted(() => {
    analytics.page('Login Page')
})

const isLoggedIn = computed(() => {
    return profile.hasTraits
})

function logout() {
    profile.unload()
}
</script>

<template>
    <v-container>
        <v-row v-if="!isLoggedIn">
            <v-col>
                <UserLogin />
            </v-col>
            <v-col>
                <UserRegister />
            </v-col>

        </v-row>
        <v-row v-else>
            <v-col>
                <p>Logged in as {{profile.traits.fname}} {{profile.traits.lname}}</p>
            </v-col>
            <v-col>
                <v-btn @click="logout()">Logout</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>