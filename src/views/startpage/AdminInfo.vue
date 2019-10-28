<template>
    <v-row
    id="admininfovue"
    align="center"
    justify="center"
    >
        <v-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        class="py-0 white"
        >
            <v-sheet
            color="white"
            class="pa-5"
            >
                <div>
                    <div class="dotted mr-2"></div>
                    <h2 class="d-inline-block">관리자 정보</h2>
                    <h3 class="d-inline-block grey--text pl-2"><small>학원 정보를 수정합니다.</small></h3>
                </div>

                <div>
                    <v-tabs
                    v-model="tab"
                    background-color="white"
                    color="success"
                    class="elevation-0"
                    dark
                    >
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab :key="1" :href="`#tab-1`">
                            정보 수정
                        </v-tab>
                        <v-tab :key="2" :href="`#tab-2`" style="color: #808080;">
                            로고 설정
                        </v-tab>
                        <v-tab :key="3" :href="`#tab-3`" style="color: #808080;">
                            학습 설정
                        </v-tab>

                        <v-tab-item
                        v-for="i in tabs"
                        :key="i"
                        :value="'tab-' + i"
                        >

                            <div v-if="i == 1">
                                <v-form
                                ref="form"
                                v-model="valid"
                                >
                                    <v-text-field
                                        v-model="product"
                                        label="상품"
                                    ></v-text-field>
                                </v-form>
                            </div>

                            <div v-if="i == 2">

                            </div>

                            <div v-if="i == 3">

                            </div>

                        </v-tab-item>
                    </v-tabs>
                </div>

            </v-sheet>
        </v-col>

    <Dialogs></Dialogs>

    </v-row>
</template>

<style lang="scss">
@import '@/assets/scss/views/user/studentoper.scss';
</style>

<script>
import { mapGetters } from "vuex";
import LogoImg from "@/components/common/LogoImg"
import Dialogs from "@/components/common/Dialogs"
import {bus} from '@/main'

export default {
    name: "studentoper",
    components: {
        LogoImg, Dialogs
    },
    data () {
        return{
            tab: null,
            tabs: 2,

            valid : true,
            product : '',
        }
    },
    methods: {

    },
    created : function () {

    },
    watch: {

    },
    computed : {
        ...mapGetters([
            'getUclass'
        ])
    }

};
</script>
