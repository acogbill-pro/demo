<script setup>
import scripts from '~/middleware/scripts.js'
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~~/stores/profileTraits';
import { useProductCatalog } from '~~/stores/products';
const products = useProductCatalog()
const analytics = useAnalytics()
const { bestID } = analytics
const profiles = useProfileTraitsStore()

const props = defineProps({
    product: {
        type: Object,
        default: { sku: '0001', name: 'Loading' },
    },
})

// const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading' })
const productImage = computed(() => '/pristine/images/products/' + product.value.image)

const form = ref(null)
const eventName = ref('Product Review')
const eventText = ref(null)
const valid = ref(true)
const showCalendar = ref(false)
const serverSide = ref(true)
const switchLabel = computed(() => {
    return serverSide.value ? 'Server-side' : 'Client-side'
})

const emit = defineEmits(['andThen'])

const validationRules = [
    v => !!v || 'Name is required',
    v => (v && v !== '') || 'Name must be less than 10 characters',
]

function submitForm() {
    if (!eventText.value || eventText.value === '' || !eventName.value) return
    const propertiesObject = { user: bestID, contents: eventText.value, product: props.product }
    // console.log('would calll Tracks here', propertiesObject)
    if (!serverSide.value) {
        analytics.track(eventName.value, propertiesObject)
    } else {
        analytics.trackServerSide(eventName.value, propertiesObject)
    }
    //console.log(propertiesAsObject.value)
    eventName.value = 'Product Review'
    eventText.value = null
    form.value.resetValidation()
    emit('andThen')
}
</script>

<template>
    <v-card width="500">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title>
                <h5>Add a Product Review for {{ product.name }}</h5>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-text-field v-model="eventName" :rules="validationRules" required density="compact"
                                variant="solo" single-line hide-details label="Event Name" />
                        </v-col>
                        <!--<v-col cols="2">
                    <v-btn icon="mdi-calendar" @click="showCalendar = !showCalendar" variant="plain" block />
                </v-col>-->


                    </v-row>
                    <v-expand-transition>
                        <v-row v-if="!showCalendar">
                            <v-col cols="12">
                                <v-textarea v-model="eventText" variant="solo" auto-grow label="Write Your Review:" />
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12">
                                Calendar
                            </v-col>
                        </v-row>
                    </v-expand-transition>
                    <v-row>
                        <v-col cols="10">
                            <v-switch v-model="serverSide" :label="switchLabel"></v-switch>
                        </v-col>
                        <v-col cols="2">
                            <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-form>
    </v-card>
</template>

<style lang="scss" scoped></style>