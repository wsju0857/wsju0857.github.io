<template>
    <div v-show="show" class="o-x-display-wrapper lighten-4" :class="{ 'info' : collect , 'danger' : !collect }" >
        <span v-show="collect">
            <v-chip
              color="white" large
            >
                <v-icon large color="info" >mdi-circle-outline</v-icon>
            </v-chip>
            <span class="display-2 info--text font-weight-bold">
                Perfect!
            </span>
        </span>
        <span v-show="!collect">
            <v-chip
              color="white" large
            >
                <v-icon large color="danger" >mdi-close</v-icon>
            </v-chip>
            <span class="display-2 danger--text font-weight-bold">
                Try hard!
            </span>
        </span>
    </div>
</template>

<script>

export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        collect: {
            type: Boolean,
            required: true,
        }
    },
    components: {
    },
    data () {
      return {
        
      }
    },
    watch: {
    },
    methods: { 
    }
};
</script>

<style lang="scss">
.o-x-display-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 900;
    left: -5rem !important;
    right: -5rem !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    
    .v-chip {
        padding-left: 9px;
        padding-right: 9px;
    }
    .display-2 {
        line-height: 54px;
        vertical-align: middle;
    }
}

@media (min-width: 960px) {
    .o-x-display-wrapper {
        left: calc( (900px - 100vw) / 2 ) !important;
        right: calc( (900px - 100vw) / 2 ) !important;
    }
}
@media (min-width: 1264px) {
    .o-x-display-wrapper {
        left: calc( (1185px - 100vw) / 2 ) !important;
        right: calc( (1185px - 100vw) / 2 ) !important;
    }
}
@media (min-width: 1904px) {
    .o-x-display-wrapper {
        left: calc( (1785px - 100vw) / 2 ) !important;
        right: calc( (1785px - 100vw) / 2 ) !important;
    }
}
</style>
