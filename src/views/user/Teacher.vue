<template>
    <v-row id="teachervue" align="center" justify="center">
      <v-col cols="12" sm="12" md="12" lg="12" class="py-0 white">
        <v-sheet color="white" class="pa-5">
            <div>
                <div class="dotted mr-2"></div>
                <h2 class="d-inline-block">선생님 관리</h2>
                <h3 class="d-inline-block grey--text pl-2"><small>학생 관리를 위해 선생님을 등록/관리합니다.</small></h3>
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

                <v-btn class="float-right" color="success" elevation="0" style="margin-top: 1.5px;" @click="go_add_teacher">
                    <v-icon dark>mdi-plus</v-icon>&nbsp;선생님 등록
                </v-btn>
                <div style="clear: both;"></div>
            </div>

            <div>
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
                        no-data-text="등록된 선생님이 없습니다."
                        no-results-text="검색된 선생님이 없습니다."
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

                        <template v-slot:item.uclass="{ item }">
                            <span :class="[item.uclass == '대표원장' ? 'pink--text' : 'info--text','font-weight-bold']">
                                {{ item.uclass }}
                            </span>
                        </template>

                        <template v-slot:expanded-item="{ item }">

                            <td :colspan="headers_arr.length+1" class="px-0">
                                <v-simple-table class="grey lighten-4 custom_simple_table"
                                >
                                  <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <!-- <td
                                            v-for="i in headers_arr.length+1"
                                            :key="i"
                                            >
                                                <div v-if="i==3" class="dotted"></div>
                                                <b v-if="i==3">클래스</b>
                                                <span v-if="i==4" class="custom-left">{{ item.sub_data.cname == "" ? "담당반이 없습니다." : item.sub_data.cname }}</span>
                                            </td> -->
                                            <td
                                            :colspan="headers_arr.length+1"
                                            >
                                                <div class="dotted custom-position-1"></div>
                                                <b class="custom-position-2">클래스</b>
                                                <span class="custom-left custom-position-3">{{ item.sub_data.cname == "" ? "담당반이 없습니다." : item.sub_data.cname }}</span>
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
        </v-sheet>
      </v-col>
      <Dialogs>
          <div slot="add_teacher_success">
              <v-card-text class="black text-center" style="opacity: 0.75;">
                  <b class="white--text">선생님이 신규 등록되었습니다.</b>
              </v-card-text>
          </div>
          <div slot="teacher_del_confirm">
              <v-card-text class="text-center">
                  <h4><b>선택 항목을 정말 삭제하시겠습니까?</b></h4>
                  <h5 class="grey--text">(삭제된 선생님은 복구되지 않습니다.)</h5>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                      <b class="success--text">취소</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="teacher_del">
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
@import '@/assets/scss/views/user/teacher.scss';
</style>

<script>
import { mapGetters } from "vuex";
import LogoImg from "@/components/common/LogoImg"
import Dialogs from "@/components/common/Dialogs"
import {bus} from '@/main'

export default {
    name: "login",
    components: {
        LogoImg, Dialogs
    },
    data () {
        return{
            page: 1,
            search: '',
            searchable_value : [],
            keyword : '',
            expanded: [],
            select_id: '',
            select_id_class: '',
            select_row: false,
            datatable_component: 0,
            overflow_component: 0,
            sel_list: [
                { text : '선생님 수정', value : '0' },
                { text : '선생님 삭제', value : '1' },
            ],
            headers_arr : new Array(
                { text: '구분', value: 'uclass', align: 'left', sortable: true, search: false },
                { text: '성함', value: 'name', align: 'left', sortable: true, search: true },
                { text: '아이디', value: 'loginid', align: 'left', sortable: true, search: true },
                { text: '비밀번호', value: 'password', align: 'left', sortable: true, search: false },
                { text: '전화번호', value: 'phone', align: 'left', sortable: true, search: true },
                { text: '등록일', value: 'postdate', align: 'left', sortable: true, search: false },
            ),
            items : [],
            // (this.$store.state.is_mobile == true ? 99999 : 10),
            hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
            item_key : 'uid',

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

        this.page = (this.$route.params.returnpage == undefined) ? 1 : this.$route.params.returnpage;
        this.items_per_page = (this.$route.params.returnitems_perpage == undefined) ? 10 : this.$route.params.returnitems_per_page;
        this.sortby = (this.$route.params.returnsortby == undefined) ? undefined : this.$route.params.returnsortby;
        this.sortdesc = (this.$route.params.returnsortdesc == undefined) ? undefined : this.$route.params.returnsortdesc;
        this.keyword = '';

        this.get_count();

        bus.$on('close_event', function(data){
            if(data.status == true)
                _this.overflow_component += 1;
        });

    },
    watch : {
        options : {
            handler () {
                this.page = this.options.page;
                this.items_per_page = this.options.itemsPerPage;
                this.sortby = this.options.sortBy[0];
                this.sortdesc = this.options.sortDesc[0];

                this.get_teacher(this.page, this.items_per_page, this.sortby, this.sortdesc, this.keyword);
            },
            deep: true,
        }
    },
    computed : {
        ...mapGetters([
            'getUclass_txt'
        ])
    },
    mounted () {
        document.getElementsByClassName('text-start')[0].childNodes[0].innerText = '조회';

        if( this.$route.params.dialog != undefined && this.$route.params.dialog == "success" ){
            // 선생님 등록 성공
            bus.$emit('dialog', { 'status': true, 'name': 'add_teacher_success' });
        }

        // 검색 가능 컬럼 미리 정의
        for(let arr of this.headers_arr){
            if( arr.search == true )
                this.searchable_value.push( arr.value );
        }

        console.log( document.getElementsByClassName('v-data-table-header')[0].childNodes[0].childNodes );
        console.log( document.getElementsByClassName('v-data-table-header')[0].childNodes[0].childNodes[2].getBoundingClientRect() );

        console.log(document.getElementsByClassName('custom-position-2'));

    },
    methods: {

        dialog_false : function () {
            bus.$emit('dialog', false);
            this.overflow_component += 1;
        },
        toggleClassRow(value) {
            if ( !(this.expanded.length > 0 && this.expanded[0].uid == value.uid) ) {
                this.select_row = true;
                this.select_id = value.uid;
                this.select_id_class = value.tclass;
                this.expanded.pop();
                this.expanded.push(value);
            } else {
                this.select_row = false;
                this.select_id = '';
                this.select_id_class = '';
                this.expanded.pop();
            }        
        },
        // 편집 -> 수정 ,삭제
        select_row_event : function (val) {
            let _this = this;
            if(val == 0){
                let operclass = '';
                let operclass_txt = '';
                let opername = '';
                let operloginid = '';
                let operpassword = '';
                let operphone = '';
                for(let i=0; i<this.items.length; i++){
                    if(this.items[i].uid == this.select_id){
                        operclass = this.items[i].tclass;
                        operclass_txt = this.items[i].uclass;
                        opername = this.items[i].name;
                        operloginid = this.items[i].loginid;
                        operpassword = this.items[i].password;
                        operphone = this.items[i].phone;
                    }
                }

                this.$router.push({name:'user-teacher-oper', params:{
                    'operuid': this.select_id,
                    'operclass': operclass,
                    'operclass_txt': operclass_txt,
                    'opername': opername,
                    'operloginid': operloginid,
                    'operpassword': operpassword,
                    'operphone': operphone,
                    page : _this.page,
                    items_per_page : _this.items_per_page,
                    sortby: _this.sortby,
                    sortdesc: _this.sortdesc
                }});
            }else if(val == 1){
                bus.$emit('dialog', {
                    'status': true,
                    'name': 'teacher_del_confirm'
                })
            }
        },
        get_count : function () {
            let _this= this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            this.$axios.get(`${this.$store.state.host}/user/` + cid + `/getteacher/cnt`)
            .then(function(response){
                if(response.status == 200){
                    _this.items_length = parseInt(response.data);
                }
            }).catch(function(err){ console.log( err ); });
        },
        get_teacher : function (start, end, sortby, sortdesc, keyword) {

            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            console.log( cid );

            _this.items = [];
            let p_start = (start - 1) * end;
            let p_end = end;
            let p_sortby = sortby;
            let p_sortdesc = sortdesc;

            let url = `${this.$store.state.host}/user/` + cid + '/getteacher/' + p_start + '/' + p_end;
            if( p_sortby != undefined && p_sortdesc != undefined )
                url += '/' + p_sortby + '/' + (p_sortdesc == true ? 'desc' : 'asc');

            if( keyword == ''){
                this.get_count();
                this.$axios.get(url).then(function(response){
                    if(response.status == 200){
                        for (var [key, val] of Object.entries(response.data)) {
                            let _class_txt = _this.$store.getters.getUclass_txt( parseInt(val.uclass) );
                            let data = {
                                uid: val.id,
                                tclass: val.uclass,
                                uclass: _class_txt,
                                name: val.name,
                                loginid: val.loginid,
                                password: val.password,
                                phone: val.phone,
                                postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                                sub_data: {
                                    cname : val.cname ? val.cname : ""
                                }
                            };
                            _this.items.push(data);
                        }
                    }
                }).catch(function(err){ console.log( err ); });
            }else{
                url += '/search';
                this.$axios.post(url,{
                    searchable_value : _this.searchable_value,
                    keyword : keyword
                }).then(function(response){
                    if(response.status == 200){
                        for (var [key, val] of Object.entries(response.data)) {
                            if( key == 'search_length' ) _this.items_length = val;
                            else{
                                let _class_txt = _this.$store.getters.getUclass_txt( parseInt(val.uclass) );
                                let data = {
                                    uid: val.id,
                                    tclass: val.uclass,
                                    uclass: _class_txt,
                                    name: val.name,
                                    loginid: val.loginid,
                                    password: val.password,
                                    phone: val.phone,
                                    postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                                    sub_data: {
                                        cname : val.cname ? val.cname : ""
                                    }
                                };
                                _this.items.push(data);
                            }
                        }

                    }
                }).catch(function(err){ console.log( err ); });

            }
        },
        teacher_del : function () {

            let _this = this;

            if( (this.select_id == "" && this.select_id_class == "") || this.select_id_class == this.$store.state.UCLASS_PRESIDENT ){
                bus.$emit('dialog', {
                    'status': true,
                    'name': 'teacher_del_error'
                });
            }
            else {
                let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

                this.$axios.post(`${this.$store.state.host}/user/` + cid + '/delteacher',{
                    uid: _this.select_id
                }).then(function(response){
                    if(response.status == 200){
                        bus.$emit('dialog', false);
                        _this.datatable_component += 1;
                        _this.overflow_component += 1;
                    }
                    else{
                        bus.$emit('dialog', {
                            'status': true,
                            'name': 'teacher_del_error'
                        });
                    }
                }).catch(function(err){
                    console.log( err );
                    bus.$emit('dialog', {
                        'status': true,
                        'name': 'teacher_del_error'
                    });
                });
            }
        },
        go_add_teacher : function () {
            let _this = this;
            this.$router.push({name:'user-teacher-oper', params:{
                page : _this.page,
                items_per_page : _this.items_per_page,
                sortby: _this.sortby,
                sortdesc: _this.sortdesc
            }});
        },
        search_keyword : function (e) {
            if( e.keyCode == 13 ){
                this.keyword = e.target.value;
                if( this.page != 1 ){
                    this.page = 1;
                }
                else if (this.page == 1){
                    this.get_teacher( 1, this.items_per_page, this.sortby, this.sortdesc, this.keyword );
                }

            }
        },
        search_icon_click : function () {
            this.keyword = document.getElementById("search").value;
            if( this.page != 1 ){
                this.page = 1;
            }
            else if (this.page == 1){
                this.get_teacher( 1, this.items_per_page, this.sortby, this.sortdesc, this.keyword );
            }
        },
    },

};
</script>
