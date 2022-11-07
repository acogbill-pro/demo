<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "default",
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
    return profiles.hasTraits
})

const loginTitle = computed(() => `Logged in as ${profiles.traits.fname} ${profiles.traits.lname}`)

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
                <p>{{ loginTitle }}</p>
            </v-col>
            <v-col>

            </v-col>
        </v-row>
        <v-row v-if="isLoggedIn">
            <v-btn @click="logout()">Logout</v-btn>
            <v-btn v-if="!collapse" @click="toggleCollapse()">Hide Login</v-btn>
            <v-btn v-else @click="toggleCollapse">Login Again</v-btn>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>