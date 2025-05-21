<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
import { useProfileStore } from '~/stores/profile';
const profile = useProfileStore()
const analytics = useAnalytics()
const traits = useProfileTraitsStore()

const collapse = ref(true)

function toggleCollapse() {
    collapse.value = !collapse.value
}

const isLoggedIn = computed(() => {
    return profile.hasLoaded
})

function logout() {
    profile.unload()
}
</script>

<template>
    <v-container fluid>
        <v-row class="bg">
            <v-col>
                <UserEmailLogin />
            </v-col>
            <v-col>
                <UserRegister v-if="!isLoggedIn" />
                <v-card-text v-else>

                    <SharedProfileUserSummary />
                    <SharedProfilePrompter />
                    <SharedProfileConsent />
                </v-card-text>
            </v-col>
            `<v-col>
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