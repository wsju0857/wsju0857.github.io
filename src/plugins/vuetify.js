import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Scroll } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
    directives: {
        Scroll
    }
});

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
          light: {
            success: '#1BD05B',
            warning: '#FE9017',
            info: '#2196F3',
            danger: '#FF0000'
          }
        }
    }
});
