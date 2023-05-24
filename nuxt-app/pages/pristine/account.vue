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
    analytics.page('Account Page')

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
    <v-container fluid>
        <v-row v-if="!isLoggedIn || (isLoggedIn && !collapse)" class="bg">
            <v-col>
                <UserLogin />
            </v-col>
            <v-col>
                <UserRegister />
            </v-col>
            `<v-col>
                <SharedSidebar />
            </v-col>`
        </v-row>
        <v-row v-else class="bg">
            <v-col>
                <v-card>
                    <v-card-title>Logged In</v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <SharedSidebar />
            </v-col>`
        </v-row>
        <v-row v-if="isLoggedIn" class="my-5">
            <v-btn @click="logout()" class="mr-3">Logout</v-btn>
            <v-btn v-if="!collapse" @click="toggleCollapse()" class="mr-3">Hide Login</v-btn>
            <v-btn v-else @click="toggleCollapse" class="mr-3">Login Again</v-btn>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
.bg {
    // background: url("/images/kfcBG.jpeg") no-repeat center center;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>