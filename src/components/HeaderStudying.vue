<template>
    <v-app-bar
      fixed
      color="white"
      flat
    >
        <v-chip
         class="ma-2"
         color="success font-weight-bold"
        >
         &nbsp;&nbsp;&nbsp;&nbsp;
         학습하기
         &nbsp;&nbsp;&nbsp;&nbsp; 
        </v-chip>
        <span class="title">중등영어2 YBM 박준언</span>
        &nbsp;&nbsp;
        <span class="subtitle-1 grey--text text--darken-2 font-weight-thin">Lesson 1. Manage Yourself!</span>
        <div class="position-absolute study-header-counter"><span class="title success--text">4</span>/50</div>
        <v-btn text icon color="grey" x-large absolute right @click="$router.go(-1)">
          <v-icon>mdi-power-standby</v-icon>
        </v-btn>
        <div class="default-divider in-study"></div>
    </v-app-bar>
</template>

<script>

export default {
    name: 'header-studying',
    components : {
        
    },
    computed: {
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/header-studying";
</style>
