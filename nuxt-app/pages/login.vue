<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfiles } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profile = useProfiles()

onMounted(() => {
    analytics.page('Login Page')
})

const isLoggedIn = computed(() => {
    console.log(profile.hasTraits)
    return profile.hasTraits
})
</script>

<template>
    <v-container>
        <v-row v-if="!isLoggedIn">
            <!--<v-col>
                <UserLogin />
            </v-col>-->
            <v-col>
                <UserRegister />
            </v-col>

        </v-row>
        <v-row v-else>
            User is logged in
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>