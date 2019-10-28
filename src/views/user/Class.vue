<template>
    <v-row
      id="classvue"
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
                <h2 class="d-inline-block">클래스 관리</h2>
                <h3 class="d-inline-block grey--text pl-2"><small>학생 관리를 위해 클래스를 등록/관리합니다.</small></h3>
            </div>

            <div class="py-2 mt-2" style="border-top: 1px solid lightgray;">
                <div class="float-left searchdiv" style="width: 25%;">
                    <v-text-field
                        v-model="search"
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
                        @keydown="search_keyword"
                        @click:append="search_icon_click"
                      ></v-text-field>
                </div>

                <div class="float-left ml-3 optiondiv" style="width: 21%;">
                    <v-overflow-btn
                    :key="overflow_component"
                    :items="sel_list"
                    label="편집"
                    id="option_select"
                    dense
                    solo
                    outlined
                    single-line
                    hide-details
                    x-small
                    color="info"
                    @change="select_row_event"
                    :disabled="!select_row"
                    ></v-overflow-btn>
                </div>

                <v-btn class="float-right" color="success" elevation="0" @click="push_class_add" style="margin-top: 1.5px;">
                    <v-icon dark>mdi-plus</v-icon>&nbsp;클래스 등록
                </v-btn>
                <div style="clear: both;"></div>
            </div>

            <div class="bg-white height-inherit">
                <v-data-table
                :key="datatable_component"
                :headers="headers_arr"
                :items="items"
                :mobile-breakpoint="10"
                :hide-default-footer="hide_default_footer"
                :single-expand="true"
                :show-expand="true"
                :expanded.sync="expanded"
                :item-key="item_key"
                expand-icon="mdi-menu-down"
                @click:row="toggleClassRow"
                class="border-b-1-grey"
                no-data-text="등록된 학생이 없습니다."
                no-results-text="검색된 학생이 없습니다."
                :footer-props="{
                    itemsPerPageText: '표시 개수',
                    itemsPerPageOptions: [5,10,30,50]
                }"

                :options.sync="options"
                :server-items-length="items_length"
                :page="page"
                :items-per-page="items_per_page"
                :sort-by="sortby"
                :sort-desc="sortdesc"
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
                                    <tr
                                    v-if="typeof(item.sub_data) == 'string'"
                                    >
                                        <td
                                        v-for="i in headers_arr.length+1"
                                        :key="i"
                                        >
                                            <div v-if="i==3" class="dotted"></div>
                                            <span v-if="i==4">{{ item.sub_data }}</span>
                                        </td>
                                    </tr>

                                    <tr
                                    v-if="typeof(item.sub_data) == 'object'"
                                    v-for="(value, i) in item.sub_data"
                                    :key="i"
                                    >
                                        <td
                                        v-for="y in headers_arr.length+1"
                                        :key="y"
                                        >
                                            <div v-if="y==3" class="dotted"></div>
                                            <span v-if="y==3">{{ value.uname }}</span>
                                            <b v-if="y==4">{{ value.loginid }}</b>
                                        </td>
                                    </tr>

                                </tbody>
                              </template>
                            </v-simple-table>
                        </td>
                    </template>
                </v-data-table>
            </div>
        </v-sheet>
      </v-col>
      <Dialogs>
          <div slot="add_class_success">
              <v-card-text class="black text-center" style="opacity: 0.75;">
                  <b class="white--text">클래스가 생성되었습니다.</b>
              </v-card-text>
          </div>

          <div slot="null_classroom">
              <v-card-text class="text-center">
                  <h4><b>생성된 클래스가 없습니다.<br />클래스를 먼저 등록해주세요.</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="push_class_add">
                      <b class="success--text">등록</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="del_class_confirm">
              <v-card-text class="text-center">
                  <h4><b>선택 항목을 정말 삭제하시겠습니까?</b></h4>
                  <h5 class="grey--text">(삭제된 클래스는 복구되지 않습니다.)</h5>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                      <b class="success--text">취소</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="del_class">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>
          <div slot="teacher_del_error">
              <v-card-text class="text-center">
                  <b>잘못된 접근입니다.</b>
              </v-card-text>
          </div>
      </Dialogs>
    </v-row>
</template>

<style lang="scss">
@import '@/assets/scss/views/user/class.scss';
</style>

<script>
// import { mapGetters } from "vuex";
import LogoImg from "@/components/common/LogoImg"
import Dialogs from "@/components/common/Dialogs"
import DataTable from "@/components/common/DataTable"
import {bus} from '@/main'

export default {
    name: "login",
    components: {
        LogoImg, Dialogs, DataTable
    },
    data () {
        return{
            overflow_component: 0,
            datatable_component: 0,
            search: '',
            searchable_value : [],
            keyword : '',
            expanded: [],
            assign_user: [],
            sel_list: [
                { text : '클래스 수정', value : '0' },
                { text : '클래스 삭제', value : '1' },
            ],
            headers_arr : new Array(
                { text: '클래스', value: 'name', align: 'left', sortable: true, search: true },
                { text: '담임', value: 'tname', align: 'left', sortable: true, search: true },
                { text: '수업요일', value: 'lesson_day', align: 'left', sortable: true, search: false },
                { text: '학생수', value: 'student_cnt', align: 'left', sortable: true, search: false },
                { text: '생성일', value: 'postdate', align: 'left', sortable: true, search: false },
            ),
            items : new Array(),
            items_per_page : (this.$store.state.is_mobile == true ? 99999 : 10),
            hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
            item_key : 'class_id',
            select_row: false,
            select_id: '',

            options: {},
            page: 1,
            items_per_page : 10,
            sortby: undefined,
            sortdesc: undefined,
            items_length: 0,
        }
    },
    created : function () {
        let _this = this;
        let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

        this.page = (this.$route.params.returnpage == "") ? 1 : this.$route.params.returnpage;
        this.items_per_page = (this.$route.params.returnitems_perpage == "") ? 10 : this.$route.params.returnitems_per_page;
        this.sortby = (this.$route.params.returnsortby == "") ? undefined : this.$route.params.returnsortby;
        this.sortdesc = (this.$route.params.returnsortdesc == "") ? undefined : this.$route.params.returnsortdesc;
        this.keyword = '';

        this.get_count();

        bus.$on('close_event', function(data){
            if(data.status == true)
                this.overflow_component += 1;
        });
    },
    watch : {
        options : {
            handler () {
                this.page = this.options.page;
                this.items_per_page = this.options.itemsPerPage;
                this.sortby = this.options.sortBy[0];
                this.sortdesc = this.options.sortDesc[0];

                this.get_class(this.page, this.items_per_page, this.sortby, this.sortdesc, this.keyword);
            },
            deep: true,
        }
    },
    methods: {
        dialog_false : function (){
            bus.$emit('dialog', false);
        },
        push_class_add : function (){
            this.$router.push({name:'user-class-oper', params : {
                page : this.page,
                items_per_page : this.items_per_page,
                sortby: this.sortby,
                sortdesc: this.sortdesc
            }});
        },
        get_count : function () {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            this.$axios.get(`${this.$store.state.host}/class/` + cid + '/classcnt2')
            .then(function(response){
                if(response.status == 204){
                    bus.$emit('dialog', { status: true, name: 'null_classroom' });
                }
                else{
                    _this.items_length = parseInt(response.data);
                }
            }).catch(function(err){ console.log( err ) });
        },
        get_class : function (start, end, sortby, sortdesc, keyword){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            this.items = [];
            let p_start = (start - 1) * end;
            let p_end = end;
            let p_sortby = sortby;
            let p_sortdesc = sortdesc;

            let url = `${this.$store.state.host}/class/` + cid + '/getclassroom/' + p_start + '/' + p_end;
            if( p_sortby != undefined && p_sortdesc != undefined )
                url += '/' + p_sortby + '/' + (p_sortdesc == true ? 'desc' : 'asc');

            if( keyword == '' ){
                this.get_count();
                this.$axios.get(url).then(function(response){
                    if(response.status == 200){
                        for (var [key, val] of Object.entries(response.data)) {
                            if( val.id != 0 ){
                                let data = {
                                    class_id : val.id,
                                    name: val.name,
                                    tid: val.user_id,
                                    tname : val.tname,
                                    lesson_day : !!val.lesson_day ? JSON.parse(val.lesson_day).join(',') : '',
                                    student_cnt : val.student_cnt + '명',
                                    postdate : !!val.postdate ? val.postdate.split(' ')[0].replace(/-/gi,'.') : '',
                                    sub_data : ''
                                };
                                _this.items.push(data);
                            }
                        }
                    }
                }).catch(function(err){ console.log( err ) });
            }
            else {
                url += '/search';

                this.$axios.post(url, {
                    searchable_value : _this.searchable_value,
                    keyword : keyword
                }).then(function(response){
                    if(response.status == 200){
                        for (var [key, val] of Object.entries(response.data)) {
                            if( key == 'search_length' ) _this.items_length = val;
                            if( val.id != 0 && val.id != undefined ){
                                let data = {
                                    class_id : val.id,
                                    name: val.name,
                                    tid: val.user_id,
                                    tname : val.tname,
                                    lesson_day : !!val.lesson_day ? JSON.parse(val.lesson_day).join(',') : '',
                                    student_cnt : val.student_cnt + '명',
                                    postdate : !!val.postdate ? val.postdate.split(' ')[0].replace(/-/gi,'.') : '',
                                    sub_data : ''
                                };
                                _this.items.push(data);
                            }
                        }
                    }
                }).catch(function(err){ console.log( err ) });
            }
        },
        toggleClassRow(value) {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            if ( !(this.expanded.length > 0 && this.expanded[0].uid == value.uid) ) {
                this.select_row = true;
                this.select_id = value.class_id;

                let callbackFunc = function (data) {
                    value.sub_data = data;
                    _this.expanded.pop();
                    _this.expanded.push( value );
                }

                let tmp;
                this.$axios.get(`${this.$store.state.host}/class/` + cid + '/getstudent/' + this.select_id)
                .then(function(response){
                    if(response.status == 204){
                        tmp = '배정된 학생이 없습니다.';
                    }
                    else if(response.status == 200){
                        tmp = response.data;
                    }
                    callbackFunc( tmp );
                }).catch(function(err){ console.log(err); });

            } else {
                this.select_row = false;
                this.select_id = '';
                this.expanded.pop();
            }
        },
        select_row_event : function (val) {
            if( val == 0 ){
                for(let i=0; i<this.items.length; i++){
                    if(this.items[i].class_id == this.select_id){
                        this.$router.push({name:'user-class-oper', params:{
                            rid : this.select_id,
                            class_name : this.items[i].name,
                            teacher_id : this.items[i].tid,
                            teacher_name : this.items[i].tname,
                            lesson_day: this.items[i].lesson_day.split(','),

                            page : this.page,
                            items_per_page : this.items_per_page,
                            sortby: this.sortby,
                            sortdesc: this.sortdesc
                        }});
                    }
                }
            }
            else if( val == 1 ){
                bus.$emit('dialog', { status : true, name: 'del_class_confirm' });
            }
        },
        del_class : function () {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            this.$axios.post(`${this.$store.state.host}/class/` + cid + '/delclass', {
                rid : this.select_id
            })
            .then(function(response){
                console.log(response);
                if( response.status == 200 ){
                    bus.$emit('dialog', false);
                    for(let i=0; i<_this.items.length; i++){
                        if(_this.items[i].class_id == _this.select_id){
                            _this.items.splice(i, 1);
                        }
                    }
                    _this.items_length -= 1;
                    _this.datatable_component += 1;
                }
            }).catch(function(err){ console.log( err ); });
        },
        search_keyword : function (e) {
            if( e.keyCode == 13 ){
                this.keyword = e.target.value;
                if( this.page != 1 ){
                    this.page = 1;
                }
                else if (this.page == 1){
                    this.get_class(1, this.items_per_page, this.sortby, this.sortdesc, this.keyword );
                }
            }
        },
        search_icon_click : function () {
            this.keyword = document.getElementById("search").value;
            if( this.page != 1 ){
                this.page = 1;
            }
            else if (this.page == 1){
                this.get_class(1, this.items_per_page, this.sortby, this.sortdesc, this.keyword );
            }
        },

    },
    mounted() {
        if( this.$route.params.dialog != undefined && this.$route.params.dialog == "success" ){
            // 선생님 등록 성공
            bus.$emit('dialog', { status: true, name: 'add_class_success' });
        }

        // 검색 가능 컬럼 미리 정의
        for(let arr of this.headers_arr){
            if( arr.search == true )
                this.searchable_value.push( arr.value );
        }
    }

};
</script>
