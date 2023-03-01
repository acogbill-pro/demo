<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const isLoggedIn = computed(() => {
    return !analytics.bestIDIsAnonymous
})

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC In-Store Wifi'
})

onMounted(() => {
    analytics.page('Wifi Main page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <v-container fluid>
            <v-row class="bg">
                <v-spacer></v-spacer>
                <v-col>
                    <UserRegister v-if="!isLoggedIn" />
                    <v-card v-else>
                        <v-card-title>Logged In</v-card-title>
                    </v-card>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
.bg {
    background: url("/images/kfcBG.jpeg") no-repeat center center;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>