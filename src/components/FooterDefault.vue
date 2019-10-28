<template>
    <v-footer
      fixed
      color="white"
      class="font-weight-medium" 
      :class="{ 'd-none' : this.$route.name == 'index' }"
      padless
    >
        <div 
            class="default-divider" 
            :class="{ 'in-study' : this.$route.meta.layout == 'layout-studying' }"
        ></div>
        <v-col
            class="text-center"
            cols="12"
        >
            {{ new Date().getFullYear() }} — <strong>footer</strong>{{ this.$route.meta.layout }}
        </v-col>
    </v-footer>
</template>

<script>

export default {
    computed: {
    }
};
</script>
