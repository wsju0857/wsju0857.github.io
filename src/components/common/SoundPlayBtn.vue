<template>
    <v-btn large class="elevation-1 text-capitalize" :class="{ 'danger--text text--lighten-2 v-btn--outlined' : !is_playing , 'info' : !!is_playing }" @click="toggleSoundPlay" style="min-width: 145px;">
        <span v-if="!is_playing" style="max-width: 1.1rem; width: 1.1rem; padding-top: 0.15rem;">
            <icon-sound-wave :color="'#ff603b'" ></icon-sound-wave>
        </span>
        <v-icon v-if="!!is_playing">mdi-play</v-icon>
        &nbsp;
        {{ !!is_playing ? '  Play   ' : 'Listening' }}
    </v-btn>
</template>

<script>
import IconSoundWave from "@/components/common/IconSoundWave";

export default {
    props: {
        toggleSoundPlay: {
            type: Function,
            required: true,
        },
        is_playing: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        IconSoundWave
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
