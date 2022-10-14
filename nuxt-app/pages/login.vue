<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profile = useProfileStore()

onMounted(() => {
    analytics.page('Login Page')
})

const isLoggedIn = computed(() => {
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
            Logged in as {{profile.traits.fname}} {{profile.traits.lname}}
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>