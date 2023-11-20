<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()
// const { auth } = useSupabaseClient()

definePageMeta({
    layout: "diamond",
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
        <v-row>
            <v-col v-if="!isLoggedIn || (isLoggedIn && !collapse)">

                <UserRegister />
                <UserLogin />
                <!-- <v-card>
                                        <v-card-title>
                                            Log in with...
                                        </v-card-title>
                                        <v-card-text>
                                            <v-btn icon="mdi:google" @click="auth.signInWithOAuth({ provider: 'google' })" block>Google</v-btn>
                                        </v-card-text>
                                    </v-card> -->
            </v-col>
            <v-col>

                <SharedSidebar />
            </v-col>

        </v-row>
        <!-- <v-row>
            <v-col>
                <UserLogin />
            </v-col>
            <v-col>

            </v-col>
        </v-row> -->
        <v-row v-if="isLoggedIn">
            <NuxtLink to="/diamond/"><v-btn class="mr-3">Continue to Home</v-btn></NuxtLink>
            <v-btn @click="logout()">Logout</v-btn>
            <v-btn v-if="!collapse" @click="toggleCollapse()">Hide Login</v-btn>
            <v-btn v-else @click="toggleCollapse">Login Again</v-btn>
        </v-row>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>