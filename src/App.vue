<template>
  <div id="app">
    <component :is="layout">
        <router-view/>
    </component>
  </div>
</template>

<script>
import Child from './components/Child.vue';
import { mapGetters, mapMutations , mapActions } from 'vuex';

import './assets/scss/app.scss';

const default_layout = "layout-default";

export default {
    name: 'App',
    methods: {
        ...mapMutations({
            //addCounter:'addCounter' ,
            subCounter:'subCounter'
        }),
        ...mapActions({
            addCounter:'addCounter'
        })
    },
    computed: {
        ...mapGetters({
            parentCounter : 'getCounter'
        }),
        layout() {
            return (this.$route.meta.layout || default_layout);
        }
    },
    components: {
        'child':Child,
    },
    data: () => ({
    //
    }),
    created () {
       //this.$router.push('/login');
    }
};
</script>
