<template>
    <v-row
      id="studentvue"
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
                <h2 class="d-inline-block">학생 관리</h2>
                <h3 class="d-inline-block grey--text pl-2"><small> {{ this.subtitle_text }}을 등록/관리합니다.</small></h3>
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

                  <v-tab :key="1" :href="`#tab-1`" @click="changetab(1)">
                      재원생
                  </v-tab>
                  <v-tab :key="2" :href="`#tab-2`" @click="changetab(2)">
                      퇴원생
                  </v-tab>

                  <v-tab-item
                    v-for="i in tabs"
                    :key="i"
                    :value="'tab-' + i"
                  >

                    <div v-if="i == 1">
                        <div class="py-2">
                            <div class="float-left searchdiv" style="width: 25%;">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="이름, 아이디"
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

                            <v-btn class="float-right" color="success" elevation="0" style="margin-top: 1.5px;" @click="push_student_oper">
                                <v-icon dark>mdi-plus</v-icon>&nbsp;학생 등록
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
                            class="border-b-1-grey border-t-1-grey"
                            :search="search"
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
                                                v-for="i in 6"
                                                :key="i"
                                                :class="[(i == 1 ? 'd-none': '')]"
                                                >
                                                    <td
                                                    v-for="y in headers_arr.length+1"
                                                    :key="y"
                                                    >
                                                        <div v-if="y==3" class="dotted"></div>
                                                        <b v-if="i==2 && y==3">연락처</b>
                                                        <b v-if="i==3 && y==3">학교명</b>
                                                        <b v-if="i==4 && y==3">생년월일</b>
                                                        <b v-if="i==5 && y==3">학부모 이름</b>
                                                        <b v-if="i==6 && y==3">학부모 연락처</b>
                                                        <span v-if="i==2 && y==4" class="custom-left">{{ item.sub_data.phone == "" ? "" : item.sub_data.phone }}</span>
                                                        <span v-if="i==3 && y==4" class="custom-left">{{ item.sub_data.school == "" ? "" : item.sub_data.school }}</span>
                                                        <span v-if="i==4 && y==4" class="custom-left">{{ item.sub_data.birthdate == "" ? "" : item.sub_data.birthdate }}</span>
                                                        <span v-if="i==5 && y==4" class="custom-left">{{ item.sub_data.parent_name == "" ? "" : item.sub_data.parent_name }}</span>
                                                        <span v-if="i==6 && y==4" class="custom-left">{{ item.sub_data.parent_phone == "" ? "" : item.sub_data.parent_phone }}</span>
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

                    <div v-if="i == 2">
                        <div class="py-2">
                            <div class="float-left searchdiv" style="width: 25%;">
                                <v-text-field
                                    v-model="search_quit"
                                    append-icon="mdi-magnify"
                                    label="이름, 아이디"
                                    id="search"
                                    dense
                                    solo
                                    outlined
                                    rounded
                                    single-line
                                    hide-details
                                    color="success"
                                    background-color="grey lighten-3"
                                    @keydown="search_keyword_quit"
                                    @click:append="search_icon_click_quit"
                                  ></v-text-field>
                            </div>

                            <div class="float-left ml-3 optiondiv" style="width: 21%;">
                                <v-overflow-btn
                                :key="overflow_component_quit"
                                :items="sel_list_quit"
                                label="편집"
                                id="option_select"
                                dense
                                solo
                                outlined
                                single-line
                                hide-details
                                x-small
                                color="info"
                                @change="select_row_event_quit"
                                :disabled="!select_row"
                                ></v-overflow-btn>
                            </div>

                            <div style="clear: both;"></div>
                        </div>

                        <div class="bg-white height-inherit">
                            <v-data-table
                            :key="datatable_component_quit"
                            :headers="headers_arr_quit"
                            :items="items_quit"
                            :mobile-breakpoint="10"
                            :hide-default-footer="hide_default_footer"
                            :single-expand="true"
                            :show-expand="true"
                            :expanded.sync="expanded_quit"
                            :item-key="item_key"
                            expand-icon="mdi-menu-down"
                            @click:row="toggleClassRowQuit"
                            class="border-b-1-grey border-t-1-grey"
                            :search="search_quit"
                            no-data-text="등록된 학생이 없습니다."
                            no-results-text="검색된 학생이 없습니다."
                            :footer-props="{
                                itemsPerPageText: '표시 개수',
                                itemsPerPageOptions: [5,10,30,50]
                            }"

                            :options.sync="options_quit"
                            :server-items-length="items_length_quit"
                            :page="page_quit"
                            :items-per-page="items_per_page_quit"
                            :sort-by="sortby_quit"
                            :sort-desc="sortdesc_quit"
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

                                    <td :colspan="headers_arr_quit.length+1" class="px-0">
                                        <v-simple-table class="grey lighten-4 custom_simple_table"
                                        >
                                          <template v-slot:default>
                                            <tbody>
                                                <tr
                                                v-for="i in 7"
                                                :key="i"
                                                :class="[(i == 1 ? 'd-none': '')]"
                                                >
                                                    <td
                                                    v-for="y in headers_arr_quit.length+1"
                                                    :key="y"
                                                    >
                                                        <div v-if="y==3" class="dotted"></div>
                                                        <b v-if="i==2 && y==3">등록일</b>
                                                        <b v-if="i==3 && y==3">연락처</b>
                                                        <b v-if="i==4 && y==3">학교명</b>
                                                        <b v-if="i==5 && y==3">생년월일</b>
                                                        <b v-if="i==6 && y==3">학부모 이름</b>
                                                        <b v-if="i==7 && y==3">학부모 연락처</b>
                                                        <span v-if="i==2 && y==4" class="custom-left">{{ item.sub_data.postdate == "" ? "" : item.sub_data.postdate }}</span>
                                                        <span v-if="i==3 && y==4" class="custom-left">{{ item.sub_data.phone == "" ? "" : item.sub_data.phone }}</span>
                                                        <span v-if="i==4 && y==4" class="custom-left">{{ item.sub_data.school == "" ? "" : item.sub_data.school }}</span>
                                                        <span v-if="i==5 && y==4" class="custom-left">{{ item.sub_data.birthdate == "" ? "" : item.sub_data.birthdate }}</span>
                                                        <span v-if="i==6 && y==4" class="custom-left">{{ item.sub_data.parent_name == "" ? "" : item.sub_data.parent_name }}</span>
                                                        <span v-if="i==7 && y==4" class="custom-left">{{ item.sub_data.parent_phone == "" ? "" : item.sub_data.parent_phone }}</span>
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
          <div slot="null_class">
              <v-card-text class="text-center">
                  <h4><b>생성된 클래스가 없습니다.<br /> 클래스를 먼저 생성해주세요.</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="push_class">
                      <b class="success--text">생성</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="null_student">
              <v-card-text class="text-center">
                  <h4><b>학생이 등록되지 않았습니다.<br />학생 등록을 진행해주세요.</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="push_student_oper">
                      <b class="success--text">등록</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="add_student_success">
              <v-card-text class="black text-center" style="opacity: 0.75;">
                  <b class="white--text">학생이 신규 등록되었습니다.</b>
              </v-card-text>
          </div>

          <div slot="student_quit_confirm">
              <v-card-text class="text-center">
                  <h4><b>선택 학생을 퇴원처리 하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                      <b class="success--text">취소</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="student_quit">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="student_recovery_confirm">
              <v-card-text class="text-center">
                  <h4><b>선택 학생을 재원처리 하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                      <b class="success--text">취소</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="student_recovery">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="student_del_confirm">
              <v-card-text class="text-center">
                  <h4><b>선택 학생을 완전히 삭제하시겠습니까?</b></h4>
                  <h5><small class="grey--text">(삭제된 학생은 복구되지 않습니다.)</small></h5>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="dialog_false">
                      <b class="success--text">취소</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="student_del">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

      </Dialogs>
    </v-row>
</template>

<style lang="scss">
@import '@/assets/scss/views/user/student.scss';
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
            subtitle_text: '재원생',

            componentKey: 0,
            datatable_component: 0,
            datatable_component_quit: 0,
            overflow_component: 0,
            overflow_component_quit: 0,
            expanded: [],
            expanded_quit: [],
            search: '',
            searchable_value : [],
            keyword : '',
            search_quit: '',
            searchable_value_quit : [],
            keyword_quit : '',
            select_id: '',
            select_id_class: '',
            select_row: false,
            sel_list: [
                { text : '학생 수정', value : '0' },
                { text : '퇴원 처리', value : '1' },
            ],
            sel_list_quit: [
                { text : '재원 처리', value : '0' },
                { text : '학생 삭제', value : '1' },
            ],
            headers_arr : new Array(
                { text: '클래스', value: 'class_name', align: 'left', sortable: true, search: false },
                { text: '이름', value: 'name', align: 'left', sortable: true, search: true },
                { text: '학년', value: 'grade', align: 'left', sortable: true, search: false },
                { text: '아이디', value: 'loginid', align: 'left', sortable: true, search: true },
                { text: '비밀번호', value: 'password', align: 'left', sortable: true, search: false },
                { text: '등록일', value: 'postdate', align: 'left', sortable: true, search: false },
            ),
            headers_arr_quit : new Array(
                { text: '클래스', value: 'class_name', align: 'left', sortable: true, search: false },
                { text: '이름', value: 'name', align: 'left', sortable: true, search: true },
                { text: '학년', value: 'grade', align: 'left', sortable: true, search: false },
                { text: '아이디', value: 'loginid', align: 'left', sortable: true, search: true },
                { text: '비밀번호', value: 'password', align: 'left', sortable: true, search: false },
                { text: '퇴원일', value: 'quitdate', align: 'left', sortable: true, search: false },
            ),
            items : new Array(),
            items_quit : new Array(),
            hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
            item_key : 'uid',

            options: {},
            page: 1,
            items_per_page : 10,
            sortby: undefined,
            sortdesc: undefined,
            items_length: 0,

            options_quit: {},
            page_quit: 1,
            items_per_page_quit : 10,
            sortby_quit: undefined,
            sortdesc_quit: undefined,
            items_length_quit: 0,
        }
    },
    created : function () {
        let _this = this;
        let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

        this.tab = 'tab-' + (this.$route.params.tab != undefined ? this.$route.params.tab : 1);

        this.page = (this.$route.params.returnpage == undefined) ? 1 : this.$route.params.returnpage;
        this.items_per_page = (this.$route.params.returnitems_perpage == undefined) ? 10 : this.$route.params.returnitems_per_page;
        this.sortby = (this.$route.params.returnsortby == undefined) ? undefined : this.$route.params.returnsortby;
        this.sortdesc = (this.$route.params.returnsortdesc == undefined) ? undefined : this.$route.params.returnsortdesc;

        this.page_quit = (this.$route.params.returnpage_quit == undefined) ? 1 : this.$route.params.returnpage_quit;
        this.items_per_page_quit = (this.$route.params.returnitems_per_page_quit == undefined) ? 10 : this.$route.params.returnitems_per_page_quit;
        this.sortby_quit = (this.$route.params.returnsortby_quit == undefined) ? undefined : this.$route.params.returnsortby_quit;
        this.sortdesc_quit = (this.$route.params.returnsortdesc_quit == undefined) ? undefined : this.$route.params.returnsortdesc_quit;

        this.$axios.get(`${this.$store.state.host}/class/` + cid + '/classcnt')
        .then(function (response) {
            _this.items_length = parseInt(response.data);
            if( response.status == 204 ){
                bus.$emit('dialog', {
                    status : true,
                    name : 'null_class'
                });
            }else{
                _this.check_student_cnt();
            }
        }).catch(function (err) {
            console.log(err);
        });

        bus.$on('close_event', function(data){
            _this.overflow_component += 1;
            _this.overflow_component_quit += 1;
        });

    },
    watch : {
        options : {
            handler () {
                this.page = this.options.page;
                this.items_per_page = this.options.itemsPerPage;
                this.sortby = this.options.sortBy[0];
                this.sortdesc = this.options.sortDesc[0];

                this.get_stuedent(this.page, this.items_per_page, this.sortby, this.sortdesc, this.keyword);
            },
            deep: true,
        },
        options_quit : {
            handler () {
                this.page_quit = this.options_quit.page;
                this.items_per_page_quit = this.options_quit.itemsPerPage;
                this.sortby_quit = this.options_quit.sortBy[0];
                this.sortdesc_quit = this.options_quit.sortDesc[0];

                this.get_stuedent_quit(this.page_quit, this.items_per_page_quit, this.sortby_quit , this.sortdesc_quit, this.keyword_quit);
            },
            deep: true,
        },
    },
    computed : {
        ...mapGetters([
            'getUclass_txt'
        ])
    },
    mounted () {
        if( this.$route.params.dialog != undefined && this.$route.params.dialog == "success" ){
            bus.$emit('dialog', { 'status': true, 'name': 'add_student_success' });
        }

        // 검색 가능 컬럼 미리 정의
        for(let arr of this.headers_arr){
            if( arr.search == true )
                this.searchable_value.push( arr.value );
        }

        // 검색 가능 컬럼 미리 정의 퇴원생
        for(let arr of this.headers_arr_quit){
            if( arr.search == true )
                this.searchable_value_quit.push( arr.value );
        }
    },
    methods: {
        dialog_false : function () {
            bus.$emit('dialog', false);
            this.overflow_component += 1;
            this.overflow_component_quit += 1;
        },
        changetab : function (idx) {
            if( idx == 1 ) this.subtitle_text = '재원생';
            else if( idx == 2 ) this.subtitle_text = '퇴원생';
            this.overflow_component += 1;
            this.overflow_component_quit += 1;
            this.expanded = [];
            this.expanded_quit = [];
            this.tab = 'tab-' + idx;
        },
        push_class : function () {
            this.$router.push({name: 'user-class'});
        },
        push_student_oper : function () {
            let _this = this;
            this.$router.push({name:'user-student-oper', params:{
                page : _this.page,
                items_per_page : _this.items_per_page,
                sortby: _this.sortby,
                sortdesc: _this.sortdesc,
            }});
        },
        check_student_cnt : function () {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            this.$axios.get(`${this.$store.state.host}/user/` + cid + '/getstudent/cnt')
            .then(function (response) {
                if( response.status == 204 ){
                    bus.$emit('dialog', { status : true, name : 'null_student' });
                }
                else{
                    _this.items_length = parseInt(response.data.student_cnt);
                    _this.items_length_quit = parseInt(response.data.student_quit_cnt);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        get_stuedent : function (start, end, sortby, sortdesc, keyword){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            this.items = [];
            let p_start = (start - 1) * end;
            let p_end = end;
            let p_sortby = sortby;
            let p_sortdesc = sortdesc;

            let url = `${this.$store.state.host}/user/` + cid + '/getstudent/' + p_start + '/' + p_end;
            if( p_sortby != undefined && p_sortdesc != undefined )
                url += '/' + p_sortby + '/' + (p_sortdesc == true ? 'desc' : 'asc');

            if( keyword == '' ){
                this.check_student_cnt();
                this.$axios.get(url).then(function (response) {
                    if( response.status == 200 ){
                        console.log( response );
                        for (var [key, val] of Object.entries(response.data)) {
                            if( val.id != 0 ){
                                let data = {
                                    uid: val.id,
                                    class_name: val.class_name,
                                    name: val.name,
                                    grade: val.grade,
                                    loginid: val.loginid,
                                    password: val.password,
                                    postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                                    sub_data: {
                                        phone: val.phone,
                                        school: val.school,
                                        birthdate: val.birthdate,
                                        parent_name: val.parent_name,
                                        parent_phone: val.parent_phone,
                                    }
                                };
                                _this.items.push(data);
                            }
                        }
                    }
                }).catch(function (err) { console.log(err); });
            }
            else {
                url += '/search';
                this.$axios.post(url, {
                    searchable_value : _this.searchable_value,
                    keyword : keyword
                }).then(function (response) {
                    if( response.status == 200 ){
                        for (var [key, val] of Object.entries(response.data)) {
                            if( key == 'search_length' ) _this.items_length = val;
                            if( val.id != 0 && val.id != undefined ){
                                let data = {
                                    uid: val.id,
                                    class_name: val.class_name,
                                    name: val.name,
                                    grade: val.grade,
                                    loginid: val.loginid,
                                    password: val.password,
                                    postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                                    sub_data: {
                                        phone: val.phone,
                                        school: val.school,
                                        birthdate: val.birthdate,
                                        parent_name: val.parent_name,
                                        parent_phone: val.parent_phone,
                                    }
                                };
                                _this.items.push(data);
                            }
                        }
                    }
                }).catch(function (err) { console.log(err); });
            }
        },
        get_stuedent_quit : function (start, end, sortby, sortdesc, keyword){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            this.items_quit = [];
            let p_start = (start - 1) * end;
            let p_end = end;
            let p_sortby = sortby;
            let p_sortdesc = sortdesc;

            let url = `${this.$store.state.host}/user/` + cid + '/getstudentquit/' + p_start + '/' + p_end;
            if( p_sortby != undefined && p_sortdesc != undefined )
                url += '/' + p_sortby + '/' + (p_sortdesc == true ? 'desc' : 'asc');

            if( keyword == '' ){
                this.check_student_cnt();
                this.$axios.get(url).then(function (response) {
                    console.log( response );
                    if( response.status == 200 ){
                        for (var [key, val] of Object.entries(response.data)) {
                            if( val.id != 0 ){
                                let data = {
                                    uid: val.id,
                                    class_name: val.class_name,
                                    name: val.name,
                                    grade: val.grade,
                                    loginid: val.loginid,
                                    password: val.password,
                                    quitdate: !!val.quitdate ? val.quitdate.split(" ")[0].replace(/-/gi,'.') : '',
                                    sub_data: {
                                        postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                                        phone: val.phone,
                                        school: val.school,
                                        birthdate: val.birthdate,
                                        parent_name: val.parent_name,
                                        parent_phone: val.parent_phone,
                                    }
                                };
                                _this.items_quit.push(data);
                            }
                        }
                    }
                }).catch(function (err) { console.log(err); });
            }
            else{
                url += '/search';
                this.$axios.post(url, {
                    searchable_value : _this.searchable_value_quit,
                    keyword : keyword
                }).then(function (response) {
                    if( response.status == 200 ){
                        for (var [key, val] of Object.entries(response.data)) {
                            if( key == 'search_length' ) _this.items_length_quit = val;
                            if( val.id != 0 && val.id != undefined ){
                                let data = {
                                    uid: val.id,
                                    class_name: val.class_name,
                                    name: val.name,
                                    grade: val.grade,
                                    loginid: val.loginid,
                                    password: val.password,
                                    quitdate: !!val.quitdate ? val.quitdate.split(" ")[0].replace(/-/gi,'.') : '',
                                    sub_data: {
                                        postdate: !!val.postdate ? val.postdate.split(" ")[0].replace(/-/gi,'.') : '',
                                        phone: val.phone,
                                        school: val.school,
                                        birthdate: val.birthdate,
                                        parent_name: val.parent_name,
                                        parent_phone: val.parent_phone,
                                    }
                                };
                                _this.items_quit.push(data);
                            }
                        }
                    }
                }).catch(function (err) { console.log(err); });
            }
        },
        toggleClassRow(value) {
            if ( !(this.expanded.length > 0 && this.expanded[0].uid == value.uid) ) {
                this.select_row = true;
                this.select_id = value.uid;
                this.expanded.pop();
                this.expanded.push(value);
            } else {
                this.select_row = false;
                this.select_id = '';
                this.expanded.pop();
            }
        },
        toggleClassRowQuit(value){
            if ( !(this.expanded_quit.length > 0 && this.expanded_quit[0].uid == value.uid) ) {
                this.select_row = true;
                this.select_id = value.uid;
                this.expanded_quit.pop();
                this.expanded_quit.push(value);
            } else {
                this.select_row = false;
                this.select_id = '';
                this.expanded_quit.pop();
            }
        },
        select_row_event : function (val) {
            if(val == 0){

                for(let i=0; i<this.items.length; i++){
                    if(this.items[i].uid == this.select_id){

                        this.$router.push({name:'user-student-oper', params:{
                            'operuid' : this.select_id,
                            'operclass_name' : this.items[i].class_name,
                            'opergrade' : this.items[i].grade,
                            'opername' : this.items[i].name,
                            'operphone' : this.items[i].sub_data.phone,
                            'operloginid' : this.items[i].loginid,
                            'operpassword' : this.items[i].password,
                            'operschool' : this.items[i].sub_data.school,
                            'operbirthdate' : this.items[i].sub_data.birthdate,
                            'operparent_name' : this.items[i].sub_data.parent_name,
                            'operparent_phone' : this.items[i].sub_data.parent_phone,

                            page: this.page,
                            items_per_page: this.items_per_page,
                            sortby: this.sortby,
                            sortdesc: this.sortdesc
                        }});

                    }
                }

            }else if(val == 1){
                bus.$emit('dialog', {
                    'status': true,
                    'name': 'student_quit_confirm'
                })
            }
        },
        select_row_event_quit : function (val) {
            if(val == 0){
                bus.$emit('dialog', {
                    'status': true,
                    'name': 'student_recovery_confirm'
                });
            }else if(val == 1){
                bus.$emit('dialog', {
                    'status': true,
                    'name': 'student_del_confirm'
                });
            }
        },
        student_quit : function () {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            this.$axios.post(`${this.$store.state.host}/user/` + cid + '/' + this.select_id + '/studentquit')
            .then(function(response){
                if(response.status == 200){
                    bus.$emit('dialog', false);
                    _this.items_length -= 1;
                    _this.items_length_quit += 1;
                    _this.datatable_component += 1;
                    _this.datatable_component_quit += 1;
                    _this.changetab(2);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        student_recovery : function () {
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            this.$axios.post(`${this.$store.state.host}/user/` + cid + '/' + this.select_id + '/recoverystudent')
            .then(function(response){
                if(response.status == 200){
                    bus.$emit('dialog', false);
                    _this.items_length += 1;
                    _this.items_length_quit -= 1;
                    _this.datatable_component += 1;
                    _this.datatable_component_quit += 1;
                    _this.changetab(1);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        student_del : function (){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            this.$axios.post(`${this.$store.state.host}/user/` + cid + '/' + this.select_id + '/delstudent')
            .then(function(response){
                if(response.status == 200){
                    bus.$emit('dialog', false);
                    _this.items_length_quit -= 1;
                    _this.datatable_component_quit += 1;
                }
            }).catch(function(err){
                console.log(err);
            });
        },

        search_keyword : function (e) {
            if( e.keyCode == 13 ){
                this.keyword = e.target.value;
                if( this.page != 1 ){
                    this.page = 1;
                }
                else if (this.page == 1){
                    this.get_stuedent( 1, this.items_per_page, this.sortby, this.sortdesc, this.keyword );
                }
            }
        },
        search_icon_click : function () {
            this.keyword = document.getElementById("search").value;
            if( this.page != 1 ){
                this.page = 1;
            }
            else if (this.page == 1){
                this.get_stuedent( 1, this.items_per_page, this.sortby, this.sortdesc, this.keyword );
            }
        },

        search_keyword_quit : function (e) {
            if( e.keyCode == 13 ){
                this.keyword_quit = e.target.value;
                if( this.page != 1 ){
                    this.page = 1;
                }
                else if (this.page == 1){
                    this.get_stuedent_quit( 1, this.items_per_page, this.sortby, this.sortdesc, this.keyword_quit );
                }
            }
        },
        search_icon_click_quit : function () {
            this.keyword_quit = document.getElementById("search_quit").value;
            if( this.page != 1 ){
                this.page = 1;
            }
            else if (this.page == 1){
                this.get_stuedent_quit( 1, this.items_per_page, this.sortby, this.sortdesc, this.keyword_quit );
            }
        },
    },


};
</script>
