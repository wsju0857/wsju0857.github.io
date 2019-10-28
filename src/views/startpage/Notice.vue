<template>
    <v-row id="noticevue" align="center" justify="center">
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
                            <!-- <div v-if="i == 1">
                                <div class="py-2">
                                    <div class="float-left searchdiv" style="width: 25%;">
                                        <v-text-field v-model="smart.search"
                                            append-icon="mdi-magnify"
                                            label="검색"
                                            id="search"
                                            dense
                                            solo
                                            outlined
                                            rounded
                                            single-line
                                            hide-details
                                            color="success"
                                            background-color="grey lighten-3"
                                        ></v-text-field>
                                    </div>

                                    <div class="float-left ml-3 optiondiv" style="width: 21%;">
                                        <v-overflow-btn
                                        :key="smart.option_component"
                                        :items="smart.sel_list"
                                        label="편집"
                                        id="option_select"
                                        dense
                                        solo
                                        outlined
                                        rounded
                                        single-line
                                        hide-details
                                        x-small
                                        color="info"
                                        background-color="grey lighten-3"
                                        ></v-overflow-btn>
                                    </div>
                                    <div style="clear: both;"></div>
                                </div>

                                <div class="bg-white height-inherit">
                                    <v-data-table
                                    :key="smart.table_component"
                                    :headers="smart.items_header"
                                    :items="smart.items"
                                    :mobile-breakpoint="10"
                                    :hide-default-footer="smart.hide_default_footer"
                                    :single-expand="true"
                                    :show-expand="true"
                                    :expanded.sync="smart.expanded"
                                    :item-key="smart.item_key"
                                    expand-icon="mdi-menu-down"
                                    class="border-b-1-grey border-t-1-grey"
                                    :search="smart.search"
                                    no-data-text="등록된 학생이 없습니다."
                                    no-results-text="검색된 학생이 없습니다."
                                    :footer-props="{
                                        itemsPerPageText: '표시 개수',
                                        itemsPerPageOptions: [5,10,30,50]
                                    }"

                                    :options.sync="smart.options"
                                    :server-items-length="smart.items_length"
                                    :page="smart.page"
                                    :items-per-page="smart.items_per_page"
                                    :sort-by="smart.sortby"
                                    :sort-desc="smart.sortdesc"

                                    @click:row="toggleClassRow"
                                    >
                                        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
                                            <v-icon v-if="isExpanded" @click="expand(!isExpanded)">mdi-menu-down</v-icon>
                                            <v-icon v-if="!isExpanded" @click="expand(!isExpanded)">mdi-menu-right</v-icon>
                                        </template>

                                        <template v-slot:item.name="{ item }">
                                            <span :class="['info--text','font-weight-bold']">
                                                {{ item.name }}
                                            </span>
                                        </template>

                                        <template v-slot:expanded-item="{ item }">

                                            <td :colspan="headers_arr.length+1" class="px-0">
                                                <v-simple-table class="grey lighten-4 custom_simple_table"
                                                >
                                                    <template v-slot:default>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <v-row>
                                                                        <v-col
                                                                        cols="2"
                                                                        sm="2"
                                                                        md="2"
                                                                        lg="2"
                                                                        >
                                                                            {{ item.sub_data.content }}
                                                                        </v-col>
                                                                        <v-col
                                                                        cols="10"
                                                                        sm="10"
                                                                        md="10"
                                                                        lg="10"
                                                                        >
                                                                            {{ item.sub_data.content }}
                                                                        </v-col>
                                                                    </v-row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </td>
                                        </template>
                                    </v-data-table>
                                </div>
                            </div> -->

                            <div v-if="i == 1">
                                <div class="py-2">
                                    <div class="float-left searchdiv" style="width: 25%;">
                                        <v-text-field v-model="notice.search"
                                            append-icon="mdi-magnify"
                                            label="검색"
                                            id="search"
                                            dense
                                            solo
                                            outlined
                                            rounded
                                            single-line
                                            hide-details
                                            color="success"
                                            background-color="grey lighten-3"
                                            @keydown="searchKeyword"
                                            @click:append="searchIconClick('notice')"
                                        ></v-text-field>
                                    </div>

                                    <div class="float-left ml-3 optiondiv" style="width: 21%;">
                                        <v-overflow-btn
                                        :key="notice.option_component"
                                        :items="notice.sel_list"
                                        label="편집"
                                        id="option_select"
                                        dense
                                        solo
                                        outlined
                                        rounded
                                        single-line
                                        hide-details
                                        x-small
                                        color="info"
                                        background-color="grey lighten-3"
                                        @change="selectRowEvent"
                                        ></v-overflow-btn>
                                    </div>

                                    <v-btn class="float-right" color="success" elevation="0" style="margin-top: 1.5px;" @click="go_add_notice">
                                        <v-icon dark>mdi-plus</v-icon>&nbsp;공지 등록
                                    </v-btn>
                                    <div style="clear: both;"></div>
                                </div>

                                <div class="bg-white height-inherit">
                                    <v-data-table
                                    :key="notice.table_component"
                                    :headers="notice.items_header"
                                    :items="notice.items"
                                    :mobile-breakpoint="10"
                                    :hide-default-footer="notice.hide_default_footer"
                                    :single-expand="true"
                                    :show-expand="true"
                                    :expanded.sync="notice.expanded"
                                    :item-key="notice.item_key"
                                    expand-icon="mdi-menu-down"
                                    class="border-b-1-grey border-t-1-grey"
                                    :search="notice.search"
                                    no-data-text="등록된 학생이 없습니다."
                                    no-results-text="검색된 학생이 없습니다."
                                    :footer-props="{
                                        itemsPerPageText: '표시 개수',
                                        itemsPerPageOptions: [5,10,30,50]
                                    }"

                                    :options.sync="notice_options"
                                    :server-items-length="notice.items_length"
                                    :page="notice.page"
                                    :items-per-page="notice.items_per_page"
                                    :sort-by="notice.sortby"
                                    :sort-desc="notice.sortdesc"

                                    @click:row="toggleClassRow"
                                    >
                                        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
                                            <v-icon v-if="isExpanded" @click="expand(!isExpanded)">mdi-menu-down</v-icon>
                                            <v-icon v-if="!isExpanded" @click="expand(!isExpanded)">mdi-menu-right</v-icon>
                                        </template>


                                        <template v-slot:item.notice_type="{ item }">
                                            <span :class="['info--text','font-weight-bold']">
                                                {{ getNtype_txt(parseInt(item.notice_type)) }}
                                            </span>
                                        </template>

                                        <template v-slot:expanded-item="{ item }">

                                            <td :colspan="notice.items_header.length+1" class="px-0">
                                                <v-simple-table class="grey lighten-4 custom_simple_table"
                                                >
                                                    <template v-slot:default>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <v-row>
                                                                        <v-col
                                                                        cols="3"
                                                                        sm="3"
                                                                        md="3"
                                                                        lg="3"
                                                                        class="text-center"
                                                                        >
                                                                            <v-chip
                                                                            color="white" small
                                                                            style="border: 1px solid grey !important;"
                                                                            >
                                                                                <b>{{ getNrange_txt( parseInt(item.notice_range) ) }}</b>
                                                                            </v-chip>
                                                                        </v-col>
                                                                        <v-col
                                                                        cols="9"
                                                                        sm="9"
                                                                        md="9"
                                                                        lg="9"
                                                                        >
                                                                            <div
                                                                            v-html="item.sub_data.content"
                                                                            >
                                                                            </div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </td>
                                        </template>

                                        <template v-slot:item.edit="{ item }">
                                            <v-icon small class="cursor" color="success" @click="editItem(item)">
                                                mdi-pencil
                                            </v-icon>
                                        </template>

                                        <template v-slot:item.del="{ item }">
                                            <v-icon small class="cursor" color="red" @click="deleteItem(item)">
                                                mdi-trash-can-outline
                                            </v-icon>
                                        </template>
                                    </v-data-table>
                                </div>
                            </div>

                            <div v-if="i == 2">
                                <div class="py-2">
                                    <div class="float-left searchdiv" style="width: 25%;">
                                        <v-text-field v-model="head.search"
                                            append-icon="mdi-magnify"
                                            label="검색"
                                            id="search"
                                            dense
                                            solo
                                            outlined
                                            rounded
                                            single-line
                                            hide-details
                                            color="success"
                                            background-color="grey lighten-3"
                                            @keydown="searchKeyword"
                                            @click:append="searchIconClick('head')"
                                        ></v-text-field>
                                    </div>

                                    <div class="float-left ml-3 optiondiv" style="width: 21%;">
                                        <v-overflow-btn
                                        :key="head.option_component"
                                        :items="head.sel_list"
                                        label="편집"
                                        id="option_select"
                                        dense
                                        solo
                                        outlined
                                        rounded
                                        single-line
                                        hide-details
                                        x-small
                                        color="info"
                                        background-color="grey lighten-3"
                                        @change="selectRowEvent"
                                        >
                                        </v-overflow-btn>
                                    </div>
                                    <div style="clear: both;"></div>
                                </div>

                                <div class="bg-white height-inherit">
                                    <v-data-table
                                    :key="head.table_component"
                                    :headers="head.items_header"
                                    :items="head.items"
                                    :mobile-breakpoint="10"
                                    :hide-default-footer="head.hide_default_footer"
                                    :single-expand="true"
                                    :show-expand="true"
                                    :expanded.sync="head.expanded"
                                    :item-key="head.item_key"
                                    expand-icon="mdi-menu-down"
                                    class="border-b-1-grey border-t-1-grey"
                                    :search="head.search"
                                    no-data-text="등록된 학생이 없습니다."
                                    no-results-text="검색된 학생이 없습니다."
                                    :footer-props="{
                                        itemsPerPageText: '표시 개수',
                                        itemsPerPageOptions: [5,10,30,50]
                                    }"

                                    :options.sync="head_options"
                                    :server-items-length="head.items_length"
                                    :page="head.page"
                                    :items-per-page="head.items_per_page"
                                    :sort-by="head.sortby"
                                    :sort-desc="head.sortdesc"

                                    @click:row="toggleClassRow"
                                    >
                                        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
                                            <v-icon v-if="isExpanded" @click="expand(!isExpanded)">mdi-menu-down</v-icon>
                                            <v-icon v-if="!isExpanded" @click="expand(!isExpanded)">mdi-menu-right</v-icon>
                                        </template>

                                        <template v-slot:item.notice_type="{ item }">
                                            <span :class="['info--text','font-weight-bold']">
                                                {{ getNtype_txt(parseInt(item.notice_type)) }}
                                            </span>
                                        </template>


                                        <template v-slot:expanded-item="{ item }">

                                            <td :colspan="head.items_header.length+1" class="px-0">
                                                <v-simple-table class="grey lighten-4 custom_simple_table"
                                                >
                                                    <template v-slot:default>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <v-row>
                                                                        <v-col
                                                                        offset="2"
                                                                        offset-sm="2"
                                                                        offset-md="2"
                                                                        offset-lg="2"
                                                                        cols="10"
                                                                        sm="10"
                                                                        md="10"
                                                                        lg="10"
                                                                        >
                                                                            <div
                                                                            v-html="item.sub_data.content"
                                                                            >
                                                                            </div>
                                                                        </v-col>
                                                                    </v-row>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </td>
                                        </template>


                                    </v-data-table>
                                </div>
                            </div>

                        </v-tab-item>
                    </v-tabs>
                </div>
            </v-sheet>
        </v-col>
        <Dialogs>
            <div slot="add_notice_success">
                <v-card-text class="black text-center" style="opacity: 0.75;">
                    <b class="white--text">공지사항이 등록되었습니다.</b>
                </v-card-text>
            </div>

            <div slot="del_notice_confirm">
                <v-card-text class="text-center">
                    <h4><b>선택 항목을 정말 삭제하시겠습니까?</b></h4>
                    <h5 class="grey--text">(삭제된 항목은 복구되지 않습니다.)</h5>
                </v-card-text>

                <!-- Two Button -->
                <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                    <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                        <b class="success--text">취소</b>
                    </v-btn>
                    <v-btn x-large class="ml-0" text style="width:50%;" @click="delNotice">
                        <b>확인</b>
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
            tab: null,
            tabs: 2,
            subtitle : '선생님 학원의 공지사항을 등록합니다.',

            smart : {
                option_component: 0,
                sel_list : [
                    { text : '전체', value : '0' },
                    { text : '생일축하', value : '1' },
                    { text : '진도안내', value : '2' },
                    { text : '평가알람', value : '3' },
                ],

                table_component: 0,
                items_header : [
                    { text: '항목', value: 'notice_type', align: 'left', sortable: true, search: false },
                    { text: '제목', value: 'title', align: 'left', sortable: true, search: true },
                    { text: '등록일', value: 'postdate', align: 'left', sortable: true, search: false },
                    { text: '수정', value: 'edit', align: 'center', sortable: false, search: false },
                    { text: '삭제', value: 'del', align: 'center', sortable: false, search: false },
                ],
                items : [],
                items_length : 0,
                expanded : [],
                hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
                item_key : 'nid',
                search : '',
                searchable_value : '',
                keyword: '',
                ftype : '1,2,3',

                page: 1,
                items_per_page: 10,
                sortby: undefined,
                sortdesc: undefined,
            },
            smart_options: {},

            notice : {
                option_component: 0,
                sel_list : [
                    { text : '전체', value : '0' },
                    { text : '전체공지', value : '1' },
                    { text : '학원소식', value : '2' },
                    { text : '반별공지', value : '3' },
                ],

                table_component: 0,
                items_header : [
                    { text: '항목', value: 'notice_type', align: 'left', sortable: true, search: false },
                    { text: '제목', value: 'title', align: 'left', sortable: true, search: true },
                    { text: '등록일', value: 'postdate', align: 'left', sortable: true, search: false },
                    { text: '수정', value: 'edit', align: 'center', sortable: false, search: false },
                    { text: '삭제', value: 'del', align: 'center', sortable: false, search: false },
                ],
                items : [],
                items_length : 0,
                expanded : [],
                hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
                item_key : 'nid',
                search : '',
                searchable_value : '',
                keyword: '',
                ftype : '11,12,13',

                page: 1,
                items_per_page: 10,
                sortby: undefined,
                sortdesc: undefined,
            },
            notice_options: {},

            head : {
                option_component: 0,
                sel_list : [
                    { text : '전체', value : '0' },
                    { text : '공지사항', value : '1' },
                    { text : '업데이트', value : '2' },
                    { text : '서버점검', value : '3' },
                ],

                table_component: 0,
                items_header : [
                    { text: '항목', value: 'notice_type', align: 'left', sortable: true, search: false },
                    { text: '제목', value: 'title', align: 'left', sortable: true, search: true },
                    { text: '등록일', value: 'postdate', align: 'left', sortable: true, search: false },
                ],
                items : [],
                items_length : 0,
                expanded : [],
                hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
                item_key : 'nid',
                search : '',
                searchable_value : '',
                keyword: '',
                ftype : '21,22,23',

                page: 1,
                items_per_page: 10,
                sortby: undefined,
                sortdesc: undefined,
            },
            head_options : {},
        }
    },
    created : function () {
        // 검색 가능 컬럼 미리 정의
        let tmp = '';
        for(let key of this.smart.items_header){
            if( key.search == true )
                tmp += key.value + ',';
        }
        this.smart.searchable_value = tmp.slice(0, -1);

        tmp = '';
        for(let key of this.notice.items_header){
            if( key.search == true )
                tmp += key.value + ',';
        }
        this.notice.searchable_value = tmp.slice(0, -1);

        tmp = '';
        for(let key of this.head.items_header){
            if( key.search == true )
                tmp += key.value + ',';
        }
        this.head.searchable_value = tmp.slice(0, -1);

    },
    watch : {
        notice_options : {
            handler () {
                console.log( 'notice' );
                this.notice.page = this.notice_options.page;
                this.notice.items_per_page = this.notice_options.itemsPerPage;
                this.notice.sortby = this.notice_options.sortBy[0];
                this.notice.sortdesc = this.notice_options.sortDesc[0];

                this.get_notice_cnt('notice', this.notice.ftype);
                this.get_notice(this.notice.page, this.notice.items_per_page, this.notice.sortby, this.notice.sortdesc, this.notice.keyword, 'notice', this.notice.ftype);
            },
            deep: true,
        },
        head_options: {
            handler () {
                console.log( 'head' );
                this.head.page = this.head_options.page;
                this.head.items_per_page = this.head_options.itemsPerPage;
                this.head.sortby = this.head_options.sortBy[0];
                this.head.sortdesc = this.head_options.sortDesc[0];

                this.get_notice_cnt('head', this.head.ftype);
                this.get_notice(this.head.page, this.head.items_per_page, this.head.sortby, this.head.sortdesc, this.head.keyword, 'head', this.head.ftype);
            }
        }
    },
    mounted () {
        if( this.$route.params.dialog == "success" ){
            bus.$emit('dialog', {status: true, name: 'add_notice_success'});
        }
    },
    methods: {
        dialog_false : function () {
            bus.$emit("dialog", false);
        },
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
        toggleClassRow : function (value) {
            if( this.tab == 'tab-1' ){
                if ( !(this.notice.expanded.length > 0 && this.notice.expanded[0].nid == value.nid) ) {
                    this.select_id = value.nid;
                    this.notice.expanded.pop();
                    this.notice.expanded.push(value);
                } else {
                    this.select_id = '';
                    this.notice.expanded.pop();
                }
            }
            else if( this.tab == 'tab-2' ){
                if ( !(this.head.expanded.length > 0 && this.head.expanded[0].nid == value.nid) ) {
                    this.select_id = value.nid;
                    this.head.expanded.pop();
                    this.head.expanded.push(value);
                } else {
                    this.select_id = '';
                    this.head.expanded.pop();
                }
            }

        },
        selectRowEvent : function (obj) {
            let tabname = '';
            let ftype = '';
            let tabidx = this.tab.substr(this.tab.length-1);

            let end;
            let sortby;
            let sortdesc;

            // 스마트 알람 추가되면 tabidx -1 하기
            if( obj == 0){
                ftype = tabidx + '1,' + tabidx + '2,' + tabidx + '3';
            }
            else{
                ftype = tabidx + obj;
            }

            // if(tabidx == 1) tabname = 'smart';
            if(tabidx == 1){
                tabname = 'notice';
                this.notice.page = 1;
                end = this.notice.items_per_page;
                sortby = this.notice.sortby;
                sortdesc = this.notice.sortdesc;
                this.notice.ftype = ftype;
            }
            else if(tabidx == 2){
                tabname = 'head';
                this.head.page = 1;
                end = this.head.items_per_page;
                sortby = this.head.sortby;
                sortdesc = this.head.sortdesc;
                this.head.ftype = ftype;
            }

            // start, end, sortby, sortdesc, keyword, tabname, ftype
            this.get_notice_cnt( tabname, ftype );
            this.get_notice(1, end, sortby, sortdesc, '', tabname, ftype);

        },
        get_notice_cnt : function (tabname, ftype){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            let url = `${this.$store.state.host}/notice/` + cid + '/getnotice/cnt';
            if( ftype != '' ){
                url += '?ftype=' + ftype;
            }

            this.$axios.get(url)
            .then((res) => {
                if( res.status == 200 ){
                    if(tabname == 'smart')
                        _this.smart.items_length = parseInt(res.data);
                    else if(tabname == 'notice')
                        _this.notice.items_length = parseInt(res.data);
                    else if(tabname == 'head')
                        _this.head.items_length = parseInt(res.data);
                }
            }).catch((err) => {
                console.log( err);
            });

        },
        get_notice : function (start, end, sortby, sortdesc, keyword, tabname, ftype){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            if(tabname == 'smart')
                this.smart.itemes = [];
            else if(tabname == 'notice')
                this.notice.itemes = [];
            else if(tabname == 'head')
                this.head.itemes = [];

            let p_start = (start - 1) * end;
            let p_end = end;
            let p_sortby = sortby;
            let p_sortdesc = sortdesc;

            let url = `${this.$store.state.host}/notice/` + cid + '/getnotice/' + p_start + '/' + p_end;

            if( p_sortby != undefined && p_sortdesc != undefined ){
                url += '/' + p_sortby + '/' + (p_sortdesc == true ? 'desc' : 'asc');
            }

            if( ftype != '' ){
                url += '?ftype=' + ftype;
            }

            if( keyword != '' ){
                if(tabname == 'smart')
                    url += '&searchable=' + this.smart.searchable_value + '&keyword=' + keyword;
                else if(tabname == 'notice')
                    url += '&searchable=' + this.notice.searchable_value + '&keyword=' + keyword;
                else if(tabname == 'head')
                    url += '&searchable=' + this.head.searchable_value + '&keyword=' + keyword;
            }

            this.$axios.get(url).then((res) => {
                console.log(res);
                let tmp_arr = [];
                for (var [key, val] of Object.entries(res.data)) {
                    if( key == 'search_length' ){
                        if(tabname == 'smart')
                            _this.smart.items_length = val;
                        else if(tabname == 'notice')
                            _this.notice.items_length = val;
                        else if(tabname == 'head')
                            _this.head.items_length = val;
                    }
                    if( val.id != 0 && val.id != undefined ){
                        let data = {
                            nid: val.id,
                            notice_type: val.notice_type,
                            notice_rid: val.notice_rid,
                            notice_range: val.notice_range,
                            title: val.title,
                            postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                            sub_data: {
                                content : val.content
                            }
                        };
                        tmp_arr.push(data);
                    }
                }

                if(tabname == 'smart')
                    _this.smart.items = tmp_arr;
                else if(tabname == 'notice')
                    _this.notice.items = tmp_arr;
                else if(tabname == 'head')
                    _this.head.items = tmp_arr;

            }).catch((err) => {
                console.log(err);
            });

        },
        go_add_notice : function () {
            this.$router.push({name : 'startpage-notice-oper'})
        },
        editItem : function (item) {
            event.stopPropagation();
            if( item.nid != '' ){
                this.$router.push({name: 'startpage-notice-oper', params : {
                    nid : item.nid,
                    notice_type: item.notice_type,
                    notice_rid: item.notice_rid,
                    notice_range: item.notice_range,
                    title: item.title,
                    content: item.sub_data.content
                }});
            }
        },
        deleteItem : function(item) {
            event.stopPropagation();
            if( item.nid != '' ){
                this.select_id = item.nid;
                bus.$emit('dialog', {status : true, name: 'del_notice_confirm'});
            }
        },
        delNotice : function() {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            let tabidx = this.tab.substr(this.tab.length-1);

            this.$axios.post(`${this.$store.state.host}/notice/` + cid + '/del', {
                del_id : _this.select_id
            }).then((res) => {
                if(res.status == 200){
                    _this.dialog_false();
                    // if( tabidx == 1 )
                    // else
                    if( tabidx == 1 ){
                        _this.notice.items_length -= 1;
                        _this.notice.table_component += 1;
                    }
                    else if( tabidx == 2 ){
                        _this.head.items_length -= 1;
                        _this.head.table_component += 1;
                    }
                }
            }).catch((err) => {
                console.log(err);
            });

        },
        searchKeyword : function (e) {
            if( e.keyCode == 13 ){
                let tabidx = this.tab.substr(this.tab.length-1);
                // if( tabidx == 1 )
                // else
                if( tabidx == 1 ){
                    this.notice.keyword = e.target.value;
                    if( this.notice.keyword == '' ) this.get_notice_cnt('notice', this.notice.ftype);
                    if( this.notice.page != 1 ){
                        this.notice.page = 1;
                    }
                    else if (this.notice.page == 1){
                        this.get_notice(1, this.notice.items_per_page, this.notice.sortby, this.notice.sortdesc, this.notice.keyword, 'notice', this.notice.ftype);
                    }
                }
                else if( tabidx == 2 ){
                    this.head.keyword = e.target.value;
                    if( this.head.keyword == '' ) this.get_notice_cnt('head', this.head.ftype);
                    if( this.head.page != 1 ){
                        this.head.page = 1;
                    }
                    else if (this.head.page == 1){
                        this.get_notice(1, this.head.items_per_page, this.head.sortby, this.head.sortdesc, this.head.keyword, 'head', this.head.ftype);
                    }
                }

            }
        },
        searchIconClick : function (tabname) {
            // if( tabname == 'smart' ){
            //
            // }
            // else

            console.log( tabname );

            if( tabname == "notice" ){
                console.log( this.notice.search );
                this.notice.keyword = this.notice.search;
                if( this.notice.keyword == '' ) this.get_notice_cnt('notice', this.notice.ftype);
                if( this.notice.page != 1 ){
                    this.notice.page = 1;
                }
                else if (this.notice.page == 1){
                    this.get_notice(1, this.notice.items_per_page, this.notice.sortby, this.notice.sortdesc, this.notice.keyword, 'notice', this.notice.ftype);
                }
            }
            else if( tabname == "head" ){
                this.head.keyword = this.head.search;
                if( this.head.keyword == '' ) this.get_notice_cnt('head', this.head.ftype);
                if( this.head.page != 1 ){
                    this.head.page = 1;
                }
                else if (this.head.page == 1){
                    this.get_notice(1, this.head.items_per_page, this.head.sortby, this.head.sortdesc, this.head.keyword, 'head', this.head.ftype);
                }
            }
        },

    },
    computed : {
        ...mapGetters([
            'getNtype_txt', 'getNrange_txt'
        ])
    },

};
</script>
