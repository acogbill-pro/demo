<script setup>
const topLinks = [
    {
        label: 'Cars',
        url: '/cr/articles/cars',
    },
    {
        label: 'Home & Garden',
        url: '/cr/articles/home',
    },
    {
        label: 'Appliances',
        url: '/cr/articles/appliances',
    },
    {
        label: 'Electronics',
        url: '/cr/articles/electronics',
    },
    {
        label: 'Babies',
        url: '/cr/articles/babies',
    },
    {
        label: 'Digital Security',
        url: '/cr/articles/security',
    },
    {
        label: 'Deals',
        url: '/cr/articles/deals',
    },
    {
        label: 'More+',
        url: '/cr/articles/deals',
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