<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profile.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
import { useArticleCatalog } from '~/stores/articles.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const profile = useProfileStore()
const traitStore = useProfileTraitsStore()
const tab = ref(null)

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    if (traitStore.hasSpecificTrait('personalized_hero_image')) return traitStore.traits.personalized_hero_image
    return traitStore.hasTraits ? '/sq/unknownUser.jpeg' : '/sq/unknownUser.jpeg'
})

const nameFromTraits = computed(() => (traitStore.hasSpecificTrait('first_name') && traitStore.hasSpecificTrait('last_name')) ? `${traitStore.traits.first_name} ${traitStore.traits.last_name}` : analytics.bestID)
const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : nameFromTraits.value)

async function loadPhoto() {
    console.log('loading profile photo from Dall-E')
    // if (keepLoading.value) {
    //     keepLoading.value = false
    //     return
    // }
    // imageLoading.value = true
    // keepLoading.value = true
    const generatedPhoto = await profile.fetchPersonalizedImage('Image of a happy person sitting comfortably on a couch talking into a phone, using the first name to determine gender')
    // console.log('gen photo URL', generatedPhoto)
    if (generatedPhoto !== '') {
        heroImageOverrideURL.value = generatedPhoto
        // analytics.identify({ 'personalized_hero_image': generatedPhoto })
    } else {
        console.log('error fetching profile photo from dall-e')
    }
    // imageLoading.value = false


    // setTimeout(() => {
    //     if (keepLoading.value) {
    //         keepLoading.value = false
    //         return
    //     }
    //     loadPhoto()
    // }, 5000)
}

watch(nameFromTraits, (newValue, oldValue) => {
    if (newValue.indexOf(' ') > -1) {
        loadPhoto()
    } else {
        heroImageOverrideURL.value = null
        // tab.value = null
    }
})

const syncing = computed({
    get: () => profile.isSyncing,
    set: (value) => {
        if (value === true) {
            profile.startSyncing(10)
        } else {
            profile.stopSyncing()
        }
    }
})

function hitSourceFunction() {
    console.log('source function')
    const hookURL = 'https://platform.segmentapis.com/webhook?n=qbtwrw5hl3qgs3krfggnnbzfe5e2gsoq&s=A40PHhek&t=1673549858&w=cWBgjiLvqmfWSiUjyonfVR'

    const requestURL = `${hookURL}`

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Basic ${Buffer.from(`${runtimeConfig.profileKey}:`).toString('base64')}`
        },
        body: '{}'
    }

    const response = fetch(requestURL, options)
    const status = response.then((data) => {
        console.log(data)
        /*const convertToJSON = data.json()
        const status = convertToJSON.then((json) => {
            this.status = json.status
            if (this.statusOK) {
                analytics.track('SMS Sent', { eventName, message: withMessage })
                setTimeout(() => {
                    this.status = ''
                }, 20000)
            }
        }
        )*/
    }).catch(
        console.log('Webhook call failed')
    )

}

function resetProfile() {
    profile.unload()
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
            <v-card-actions>
                <v-fade-transition>
                    <v-img v-if="heroImagePath" :src="heroImagePath" width="125" height="125" />
                </v-fade-transition>
                <span>Profile: {{ IDforPrint }}</span>
                <v-spacer />
                <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'"
                    :color="traitStore.hasTraits ? 'black' : 'white'" @click="toggleList()" />
                <v-spacer />
            </v-card-actions>
            <v-card-actions>
                <v-switch v-model="syncing" :loading="profile.storesLoading ? 'gray' : false" class="my-0">
                    <template v-slot:label>
                        <v-icon icon="mdi-cached" color="gray" />
                    </template>
                </v-switch>
                <v-btn @click="hitSourceFunction()" icon="mdi-webhook" color="gray" />
                <v-btn @click="resetProfile()" icon="mdi-delete" color="gray" />
            </v-card-actions>
            <div v-show="!collapse">

                <v-tabs v-model="tab" bg-color="#08ACC7">
                    <v-tab value="traits">
                        Traits
                    </v-tab>
                    <v-tab value="events">
                        Events
                    </v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="traits">
                        <SharedProfileTraits />
                    </v-window-item>
                    <v-window-item value="events">
                        <SharedProfileEvents />
                    </v-window-item>
                </v-window>
                <!-- <v-card-text>
                    <SharedProfileTraitTiles />
                </v-card-text> -->
            </div>

        </v-card>
    </div>
</template>

<style lang="scss" scoped></style>