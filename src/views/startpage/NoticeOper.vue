<style lang="scss">
    .v-dialog{
        .v-input.custom_vselect {
            .v-input__control{
                width: 100% !important;
            }
        }
    }

    #noticeopervue{
        .v-input {
            .v-input__control{
                .v-text-field__slot{
                    input, textarea{
                        font-size: 0.875rem;
                    }
                }
            }
        }

        .v-input.info--text{
            .v-input__control{
                .v-text-field__slot{
                    input{
                        font-size: 0.875rem;
                        color: #2196f3 !important;
                        caret-color: #2196f3 !important;
                    }
                }
            }
        }

    }
</style>
<template>
    <v-row id="noticeopervue" align="center" justify="center">
        <v-col cols="12" sm="12" md="12" lg="12" class="py-0 white">
            <v-sheet color="white" class="pa-5">
                <div>
                    <div class="dotted mr-2"></div>
                    <h2 class="d-inline-block">공지사항</h2>
                    <h3 class="d-inline-block grey--text pl-2"><small>{{ this.subtitle }}</small></h3>
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

                        <!-- <v-tab :key="1" :href="`#tab-1`" @click="changetab(1)">
                        스마트 알람
                        </v-tab> -->
                        <v-tab :key="1" :href="`#tab-1`" @click="changetab(1)">
                        공지사항
                        </v-tab>
                        <v-tab :key="2" :href="`#tab-2`" @click="changetab(2)">
                        업데이트 소식
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
                                    <div class="py-2">
                                        <v-btn class="float-right" color="success" outlined elevation="0" style="margin-top: 1.5px;" @click="backbtn">
                                            <v-icon dark>mdi-arrow-left</v-icon>&nbsp;뒤로 가기
                                        </v-btn>
                                        <v-btn class="float-right mr-2" color="success" elevation="0" style="margin-top: 1.5px;" :disabled="!valid" @click="noticeAdd" v-if="mode == 'add'">
                                            <v-icon dark>mdi-plus</v-icon>&nbsp;공지 등록
                                        </v-btn>
                                        <v-btn class="float-right mr-2" color="success" elevation="0" style="margin-top: 1.5px;" :disabled="valid_oper" @click="noticeAdd" v-if="mode == 'modify'">
                                            <v-icon dark>mdi-plus</v-icon>&nbsp;공지 수정
                                        </v-btn>
                                        <div style="clear: both;"></div>
                                    </div>

                                    <div class="bg-white height-inherit">
                                        <v-col cols="12" sm="12" md="12" lg="8" class="pa-0" style="margin: 0 auto;">
                                            <div style="height: 35px; width: 100%; background: #eeeeee; border-bottom : 1px solid light gray;"></div>
                                            <div style="width: 100%; border-bottom : 1px solid rgba(0, 0, 0, 0.12);">
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
                                                        <v-btn
                                                        depressed
                                                        text height="48" width="100%"
                                                        style="justify-content: start;"
                                                        class="grey--text px-3" @click="openTypeDialog"
                                                        >
                                                            공지 항목
                                                            <v-icon class="ml-2">mdi-chevron-right</v-icon>
                                                            <v-text-field
                                                            v-model="notice_type"
                                                            solo dense flat :hide-details="true"
                                                            required readonly
                                                            :rules="[v => !!v || '']"
                                                            class="info--text"
                                                            >
                                                            </v-text-field>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div style="width: 100%; border-bottom : 1px solid rgba(0, 0, 0, 0.12);">
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
                                                        <v-btn
                                                        depressed
                                                        text height="48" width="100%"
                                                        style="justify-content: start;"
                                                        class="grey--text px-3" @click="openRangeDialog"
                                                        >
                                                            공지 범위
                                                            <v-icon class="ml-2">mdi-chevron-right</v-icon>
                                                            <v-text-field
                                                            v-model="notice_range"
                                                            solo dense flat :hide-details="true"
                                                            required readonly
                                                            :rules="[v => !!v || '']"
                                                            class="info--text"
                                                            >
                                                            </v-text-field>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div style="width: 100%; border-bottom : 1px solid rgba(0, 0, 0, 0.12);">
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
                                                        <v-text-field
                                                        v-model="title"
                                                        color="success"
                                                        placeholder="제목"
                                                        :hide-details="true"
                                                        solo flat
                                                        stlye="font-size: 0.875rem;"
                                                        required
                                                        :rules="[v => !!v || '']"
                                                        >
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            <div style="width: 100%;">
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12" lg="12">
                                                        <v-textarea
                                                        v-model="content"
                                                        :auto-grow="true"
                                                        :autofocus="true"
                                                        full-width
                                                        no-resize
                                                        color="success"
                                                        placeholder="내용"
                                                        :hide-details="true"
                                                        stlye="font-size: 0.875rem;"
                                                        required
                                                        :rules="[v => !!v || '']"
                                                        >
                                                        </v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-col>
                                    </div>
                                </v-form>
                            </div>
                        </v-tab-item>
                    </v-tabs>
                </div>
            </v-sheet>
        </v-col>
        <Dialogs>
            <div slot="notice_open_type">
                <v-card-title class="justify-start headline text-center pb-0 pt-8">
                    <h5>공지 항목</h5>
                </v-card-title>

                <v-card-text style="max-height: 170px; overflow-y: scroll;">
                    <v-radio-group
                    v-model="notice_type_group"
                    class="change_lr" hide-details @change="noticeTypeChange">
                      <v-radio key="1" label="전체공지" value="전체공지" color="success"></v-radio>
                      <v-radio key="2" label="학원소식" value="학원소식" color="success"></v-radio>
                      <v-radio key="3" label="반별공지" value="반별공지" color="success"></v-radio>

                      <v-select
                      v-model="notice_rid"
                      :disabled="!vs_disabled"
                      :items="vs_items" item-color="success" :hide-details="true"
                      dense solo flat full-width outlined
                      no-data-text="클래스를 먼저 생성해주세요."
                      class="custom_vselect" color="success"
                      >
                      </v-select>
                    </v-radio-group>
                </v-card-text>

                <v-card-actions class="justify-end px-9 pb-8">
                    <b class="select_ntype_btn cursor" @click="noticeTypeSubmit">취소</b>
                </v-card-actions>
            </div>

            <div slot="notice_open_range">
                <v-card-title class="justify-start headline text-center pb-0 pt-8">
                    <h5>공지 범위</h5>
                </v-card-title>

                <v-card-text style="max-height: 170px; overflow-y: scroll;">
                    <v-radio-group
                    v-model="notice_type_group"
                    class="change_lr" hide-details @change="noticeRangeChange">
                      <v-radio key="1" label="학생" value="학생" color="success"></v-radio>
                      <v-radio key="2" label="학부모" value="학부모" color="success"></v-radio>
                      <v-radio key="3" label="전체" value="전체" color="success"></v-radio>
                    </v-radio-group>
                </v-card-text>

                <v-card-actions class="justify-end px-9 pb-8">
                    <b class="select_ntype_btn cursor" @click="noticeRangeSubmit">취소</b>
                </v-card-actions>
            </div>

            <div slot="notice_back">
                <v-card-text class="text-center">
                    <h4><b>작성 중인 내용이 있습니다.<br />뒤로 가시겠습니까?</b></h4>
                </v-card-text>

                <!-- Two Button -->
                <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                    <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                        <b class="success--text">취소</b>
                    </v-btn>
                    <v-btn x-large class="ml-0" text style="width:50%;" @click="back">
                        <b>확인</b>
                    </v-btn>
                </v-card-actions>
            </div>

            <div slot="notice_add_confirm">
                <v-card-text class="text-center">
                    <h4><b>공지사항을 {{ this.mode == 'modify' ? '수정' : '등록' }}하시겠습니까?</b></h4>
                </v-card-text>

                <!-- Two Button -->
                <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                    <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="noticeAddSubmit">
                        <b class="success--text">확인</b>
                    </v-btn>
                    <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                        <b>취소</b>
                    </v-btn>
                </v-card-actions>
            </div>

        </Dialogs>
    </v-row>
</template>

<style lang="scss">
@import '@/assets/scss/views/startpage/notice.scss';
</style>

<script>
import { mapGetters } from "vuex";
import LogoImg from "@/components/common/LogoImg"
import Dialogs from "@/components/common/Dialogs"
import {bus} from '@/main'
/* eslint no-use-before-define: 0 */
export default {
    name: "login",
    components: {
        LogoImg, Dialogs
    },
    data () {
        return{
            tmp: '',
            tab: null,
            tabs: 2,
            subtitle : '선생님 학원의 공지사항을 등록합니다.',

            mode : 'add',
            valid : true,
            valid_oper : false,
            notice_type : '',
            notice_range : '',
            notice_rid : '',
            title: '',
            content: '',

            nid: '',
            old_notice_type : '',
            old_notice_range : '',
            old_notice_rid : '',
            old_title: '',
            old_content: '',

            notice_type_group : 0,
            notice_range_group : 0,
            vs_items : [],
            vs_disabled : false,
        }
    },
    created : function () {
        let _this = this;
        let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

        this.$axios.get(`${this.$store.state.host}/class/` + cid + '/getclassroom')
        .then((res) => {
            if(res.status == 200){
                for (var [key, val] of Object.entries(res.data)) {
                    if( val.id != 0 ){
                        _this.vs_items.push({
                            text : val.name,
                            value : val.id
                        });
                    }
                }
            }
        }).catch((err) => {
            console.log(err);
        });

        if( this.$route.params.nid != undefined ){
            this.mode = "modify";
            this.nid = this.$route.params.nid;
            this.notice_type = this.$store.getters.getNtype_txt( parseInt(this.$route.params.notice_type) );
            this.notice_range = (this.$store.getters.getNrange_txt(parseInt(this.$route.params.notice_range)) == '학생, 학부모' ? '전체' : this.$store.getters.getNrange_txt(parseInt(this.$route.params.notice_range)));
            this.notice_rid = this.$route.params.notice_rid;
            this.title = this.$route.params.title;
            this.content = this.$route.params.content;

            this.old_notice_type = this.$store.getters.getNtype_txt( parseInt(this.$route.params.notice_type) );
            this.old_notice_range = (this.$store.getters.getNrange_txt(parseInt(this.$route.params.notice_range)) == '학생, 학부모' ? '전체' : this.$store.getters.getNrange_txt(parseInt(this.$route.params.notice_range)));
            this.old_notice_rid = this.$route.params.notice_rid;
            this.old_title = this.$route.params.title;
            this.old_content = this.$route.params.content;

        }

    },
    watch : {
        notice_options : {
            handler () {
                console.log( "watch notice.option" );
                // this.page = this.options.page;
                // this.items_per_page = this.options.itemsPerPage;
                // this.sortby = this.options.sortBy[0];
                // this.sortdesc = this.options.sortDesc[0];
                //
                // this.get_stuedent(this.page, this.items_per_page, this.sortby, this.sortdesc, this.keyword);
            },
            deep: true,
        },
        notice_type : function (val) {
            if( this.mode == 'modify' && this.old_notice_type != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        notice_range : function (val) {
            if( this.mode == 'modify' && this.old_notice_range != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        notice_rid : function (val) {
            if( this.mode == 'modify' && this.old_notice_rid != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        title : function (val) {
            if( this.mode == 'modify' && this.old_title != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        content : function (val) {
            if( this.mode == 'modify' && this.old_content != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
    },
    computed : {
        ...mapGetters([
            'getNtype_txt', 'getNrange_txt'
        ])
    },
    mounted () {

    },
    methods: {
        changetab : function (idx){
            // if(idx == 1){
            //     this.subtitle = '학습 간 주요사항을 자동 안내합니다.';
            // }
            // else
            if(idx == 1){
                this.subtitle = '선생님 학원의 공지사항을 등록합니다.';
            }
            else if(idx == 2){
                this.subtitle = '내공스터디 본사 공지사항을 확인합니다.';
            }
        },
        dialog_false : function () {
            bus.$emit('dialog', false);
        },
        back : function () {
            this.$router.push({name : 'startpage-notice'});
        },
        backbtn : function () {
            let sum = this.notice_type + this.notice_range + this.title + this.content;
            if(sum == ''){
                this.back();
            }
            else{
                bus.$emit('dialog', {status: true, name : 'notice_back'});
            }
        },
        openTypeDialog : function() {
            bus.$emit('dialog', { status : true, name : 'notice_open_type' });
        },
        openRangeDialog : function() {
            bus.$emit('dialog', { status : true, name : 'notice_open_range' });
        },
        noticeTypeChange : function (val) {
            if( val == '반별공지' ) this.vs_disabled = true;
            else this.vs_disabled = false;

            let btn = document.getElementsByClassName('select_ntype_btn')[0];
            btn.innerText = '확인';
            btn.classList.add('success--text');
            this.tmp = val;
        },
        noticeTypeSubmit : function () {
            let btn = document.getElementsByClassName('select_ntype_btn')[0];
            if( btn.innerText == '취소' ){ bus.$emit('dialog', false); }
            else if( btn.innerText == '확인' ){

                if( this.tmp == '반별공지' && this.notice_rid == '' ){
                    console.log( this.notice_rid );
                }
                else{
                    bus.$emit('dialog', false);
                    this.notice_type_group += 1;
                    btn.innerText = '취소';
                    btn.classList.remove('success--text');
                }
                this.notice_type = this.tmp;
            }
        },
        noticeRangeChange : function (val) {
            let btn = document.getElementsByClassName('select_ntype_btn')[0];
            btn.innerText = '확인';
            btn.classList.add('success--text');
            this.tmp = val;
        },
        noticeRangeSubmit : function () {
            let btn = document.getElementsByClassName('select_ntype_btn')[0];
            if( btn.innerText == '취소' ){ bus.$emit('dialog', false); }
            else if( btn.innerText == '확인' ){

                bus.$emit('dialog', false);
                this.notice_range_group += 1;
                btn.innerText = '취소';
                btn.classList.remove('success--text');

                this.notice_range = this.tmp;
            }
        },
        noticeAdd : function () {
            bus.$emit('dialog', {status: true, name: 'notice_add_confirm'})
        },
        noticeAddSubmit : function () {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            let data = {
                notice_type : this.notice_type,
                notice_range : this.notice_range,
                notice_rid : this.notice_rid,
                title : this.title,
                content : this.content,
            };

            if(this.mode == 'modify'){
                data.nid = this.nid;
            }

            console.log( data );

            this.$axios.post(`${this.$store.state.host}/notice/` + cid + '/' + this.mode, data)
            .then((res) => {
                if(res.status == 200){
                    bus.$emit('dialog', false);
                    _this.$router.push({name : 'startpage-notice', params: {
                        dialog : 'success'
                    }});
                }
            }).catch((err) => {
                console.log(err);
            });

        }

    },


};
</script>
