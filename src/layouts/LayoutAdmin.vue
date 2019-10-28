<template>
    <v-content class="bg-default">
        <header-default style="position : relative;"></header-default>
        <v-container fluid>
            <slot />
        </v-container>
    </v-content>
</template>

<style scoped>
    .container{
        padding: 0;
    }
</style>

<script>
import HeaderDefault from "@/components/HeaderDefault";
export default {
    components: {
        HeaderDefault
    },
    mounted () {
        console.log( "mounted admin" );
    }
};
</script>

<style>
</style>
