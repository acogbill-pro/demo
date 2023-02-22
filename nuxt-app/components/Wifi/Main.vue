<script setup>

</script>



<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col cols="6">
                    <v-card class="ma-0">
                        <v-img src="../images/cSanders.jpeg" width="1000" height="500" cover />
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card color="#F8F8F4">
                        <v-card-title>
                            <v-img src="../images/wifiLockup.png" height="400" class="my-5" />
                        </v-card-title>
                        <v-card-text>
                            <v-btn block color="#E4012B" text to="/wifi/login" class="my-5">CONNECT TO WIFI</v-btn>
                            <p>By accessing this free service, I am accepting <u>KFC's WI-FI Terms of Use</u></p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped></style>