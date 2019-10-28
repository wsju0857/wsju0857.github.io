<template>
        <v-img
            src="../../assets/logo1.png"
            lazy-src="../../assets/logo1.png"
            :aspect-ratio="5/2"
            :max-width="getLogoWidht"
            :class="{ 'mx-auto' : center }"
            contain
        >
        </v-img>
</template>

<script>
import { breakpointBarHeight } from "@/components/common/StyleConfig";

export default {
    props: {
        center: Boolean,
        size: Number
    },
    computed: {
        getLogoWidht() {
            let h = breakpointBarHeight[this.$vuetify.breakpoint.name];
            return (h + (h/this.size)) + 'px' ;
        }
    }
};
</script>
