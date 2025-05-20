<script setup>
const topLinks = [
    {
        label: 'Cars',
        url: '/cr/cars',
    },
    {
        label: 'Home & Garden',
        url: '/cr/home',
    },
    {
        label: 'Appliances',
        url: '/cr/appliances',
    },
    {
        label: 'Electronics',
        url: '/cr/electronics',
    },
    {
        label: 'Babies',
        url: '/cr/babies',
    },
    {
        label: 'Digital Security',
        url: '/cr/security',
    },
    {
        label: 'Deals',
        url: '/cr/deals',
    },
    {
        label: 'More+',
        url: '/cr/more',
    },
]

</script>

<template>
    <v-toolbar>
        <!-- <v-toolbar-title>Nav</v-toolbar-title> -->
        <v-spacer />
        <span v-for="link in topLinks" :key="`${link.label}-nav-link`">
            <v-btn text rounded :to="link.url" nuxt color="#000000">
                <span class="topLink">{{ link.label }}</span>
                <!-- <v-icon icon="mdi-chevron-down" /> -->
            </v-btn>


        </span>
        <v-spacer />
    </v-toolbar>
</template>

<style lang="scss" scoped>
.topLink {
    color: '#444444';
    font-weight: 'bold';
    text-transform: capitalize;
}
</style>