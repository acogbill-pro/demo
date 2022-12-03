<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
import { useArticleCatalog } from '~/stores/articles.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const profiles = useProfileStore()
const articles = useArticleCatalog()
const cart = useCartStore()

function loadProfile() {
    /*analytics.identify('Andy_Cogbill_id', { edge: null })
    const exampleMap = new Map()
    exampleMap.set('articles', 2)
    exampleMap.set('sleep', 3)
    const exampleArray = ['trait1', 'trait2']
    console.log(exampleMap)
    console.log(JSON.stringify(Array.from(exampleMap.entries())))
    const reviveMap = new Map(Array.from(exampleMap.entries()))
    console.log(reviveMap)*/
    console.log(articles.forEdge)
    console.log(cart.forEdge)
}

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const isSyncing = computed({
    get: () => profiles.isSyncing,
    set: (value) => {
        if (value === true) {
            profiles.startSyncing(10)
        } else {
            profiles.stopSyncing()
        }
    }
})

function resetProfile() {
    profiles.unload()
}

onMounted(() => {

})

const collapse = ref(true)

function toggleList() {
    collapse.value = !collapse.value
}
</script>

<template>
    <div>
        <v-card class="mb-5">
            <!--<v-form ref="form">
                    <v-text-field v-model="userID" label="User ID" required />
                </v-form>-->
            <v-card-actions @click="toggleList()">
                <span>Profile: {{ IDforPrint }}</span>
                <v-spacer />
                <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'"
                    :color="profiles.hasTraits ? 'black' : 'white'" />

            </v-card-actions>
            <v-expand-transition>
                <v-card-text v-if="!collapse">
                    <p class="mb-5">Anon ID: {{ analytics.anonymousID }}</p>
                    <ul>
                        <li v-for="[key, value] in Object.entries(profiles.cleanTraits)" :key="key">{{ key + ': ' +
                                value
                        }}
                        </li>
                    </ul>
                    <SharedAddTrait />
                </v-card-text>
            </v-expand-transition>
            <v-card-actions>
                <v-switch v-model="isSyncing" :loading="profiles.isLoading ? 'gray' : false" class="my-0">
                    <template v-slot:label>
                        <v-icon icon="mdi-cached" color="gray" />
                    </template>
                </v-switch>
                <v-btn @click="resetProfile()" icon="mdi-delete" color="gray">
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style lang="scss" scoped>

</style>