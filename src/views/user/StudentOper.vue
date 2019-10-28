<template>
    <v-row
      id="studentopervue"
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
                <h3 class="d-inline-block grey--text pl-2"><small>{{ subtitle_text }}을 등록/관리합니다.</small></h3>
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

                  <v-tab :key="1" :href="`#tab-1`" @click="backbtn(1)">
                      재원생
                  </v-tab>
                  <v-tab :key="2" :href="`#tab-1`" @click="backbtn(2)" style="color: #808080;">
                      퇴원생
                  </v-tab>

                  <v-tab-item
                    v-for="i in tabs"
                    :key="i"
                    :value="'tab-' + i"
                  >

                    <div v-if="i == 1">
                        <div class="py-2 mt-1">
                            <b class="ml-7">* 는 필수 기재사항입니다.</b>
                            <v-btn class="float-right" color="success" elevation="0" outlined @click="backbtn(1)">
                                <v-icon dark>mdi-arrow-left</v-icon>&nbsp;뒤로가기
                            </v-btn>
                            <div style="clear: both;"></div>
                        </div>

                        <div>
                            <v-form
                              ref="form"
                              v-model="valid"
                            >
                                <v-row align="center" justify="center">
                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3">
                                      <label for="uclass">클래스 *</label>
                                      <v-text-field
                                        v-model="uclass"
                                        id="uclass"
                                        name="uclass"
                                        outlined
                                        dense
                                        required
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                        :rules="[v => !!v || '']"
                                        @click="select_class"
                                        readonly
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3">
                                      <label for="grade">학년 *</label>
                                      <v-text-field
                                        v-model="grade"
                                        id="grade"
                                        name="grade"
                                        outlined
                                        dense
                                        required
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                        :rules="[v => !!v || '']"
                                        @click="select_grade"
                                        readonly
                                      ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row align="center" justify="center">
                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="uname">이름 *</label>
                                      <v-text-field
                                        v-model="uname"
                                        id="uname"
                                        name="uname"
                                        outlined
                                        dense
                                        required
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                        :rules="[v => !!v || '']"
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="phone">연락처</label>
                                      <v-text-field
                                        v-model="phone"
                                        id="phone"
                                        name="phone"
                                        outlined
                                        dense
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                      ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row align="center" justify="center">
                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="loginid">아이디 *</label>
                                      <v-text-field
                                        v-model="loginid"
                                        id="loginid"
                                        name="loginid"
                                        outlined
                                        dense
                                        required
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                        :rules="[v => !!v || '']"
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="password">비밀번호 *</label>
                                      <v-text-field
                                        v-model="password"
                                        id="password"
                                        name="password"
                                        outlined
                                        dense
                                        required
                                        type="password"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                        :rules="[v => !!v || '']"
                                        class="msfont"
                                      ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row align="center" justify="center">
                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="school">학교명</label>
                                      <v-text-field
                                        v-model="school"
                                        id="school"
                                        name="school"
                                        outlined
                                        dense
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="birthdate">생년월일</label>
                                      <v-text-field
                                        v-model="birthdate"
                                        id="birthdate"
                                        name="birthdate"
                                        outlined
                                        dense
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                      ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row align="center" justify="center">
                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="parent_name">학부모 이름</label>
                                      <v-text-field
                                        v-model="parent_name"
                                        id="parent_name"
                                        name="parent_name"
                                        outlined
                                        dense
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="10" sm="9" md="5" lg="4" xl="3" class="pt-0">
                                      <label for="parent_phone">학부모 연락처</label>
                                      <v-text-field
                                        v-model="parent_phone"
                                        id="parent_phone"
                                        name="parent_phone"
                                        outlined
                                        dense
                                        type="text"
                                        hide-details
                                        color="success"
                                        style="margin: 3px 0 0 0;"
                                      ></v-text-field>
                                    </v-col>
                                </v-row>

                                <div class="text-center" style="width : 100%;">
                                    <v-btn
                                    v-if="mode == 'add'"
                                    :disabled="!valid"
                                    color="success"
                                    class="mr-4 elevation-0 mt-2"
                                    @click="validate"
                                    style="width: 50%;"
                                    >
                                      등록
                                    </v-btn>

                                    <v-btn
                                    v-if="mode == 'modify'"
                                    :disabled="valid_oper"
                                    color="success"
                                    class="mr-4 elevation-0 mt-2"
                                    @click="validate_modify"
                                    style="width: 50%;"
                                    >
                                      수정
                                    </v-btn>
                                </div>

                            </v-form>
                        </div>
                    </div>

                  </v-tab-item>
                </v-tabs>
            </div>

        </v-sheet>
      </v-col>

      <Dialogs>
          <div slot="student_select_class">
              <v-card-title class="justify-start headline text-center pb-0 pt-8">
                  <h5>클래스</h5>
              </v-card-title>

              <v-card-text style="max-height: 170px; overflow-y: scroll;">
                  <v-radio-group
                  v-model="student_select_class_group"
                  :key="student_select_class_group_key"
                  class="change_lr" hide-details @change="select_class_change">

                    <v-radio
                    v-for="(cl, idx) in class_list"
                    :key="idx"
                    :label="cl.name"
                    :value="cl.name"
                    color="success">
                    </v-radio>

                  </v-radio-group>
              </v-card-text>

              <v-card-actions class="justify-end px-9 pb-8">
                  <b class="select_class_btn cursor" @click="select_class_submit">취소</b>
              </v-card-actions>
          </div>

          <div slot="student_select_grade">
              <v-card-title class="justify-start headline text-center pb-0 pt-8">
                  <h5>학년</h5>
              </v-card-title>

              <v-card-text style="max-height: 170px; overflow-y: scroll;">
                  <v-radio-group
                  v-model="student_select_grade_group"
                  class="change_lr" hide-details @change="select_grade_change">
                    <v-radio key="1" label="초등학교 1학년" value="초등학교 1학년" color="success"></v-radio>
                    <v-radio key="2" label="초등학교 2학년" value="초등학교 2학년" color="success"></v-radio>
                    <v-radio key="3" label="초등학교 3학년" value="초등학교 3학년" color="success"></v-radio>
                    <v-radio key="4" label="초등학교 4학년" value="초등학교 4학년" color="success"></v-radio>
                    <v-radio key="5" label="초등학교 5학년" value="초등학교 5학년" color="success"></v-radio>
                    <v-radio key="6" label="초등학교 6학년" value="초등학교 6학년" color="success"></v-radio>
                    <v-radio key="7" label="중학교 1학년" value="중학교 1학년" color="success"></v-radio>
                    <v-radio key="8" label="중학교 2학년" value="중학교 2학년" color="success"></v-radio>
                    <v-radio key="9" label="중학교 3학년" value="중학교 3학년" color="success"></v-radio>
                    <v-radio key="10" label="고등학교 1학년" value="고등학교 1학년" color="success"></v-radio>
                    <v-radio key="11" label="고등학교 2학년" value="고등학교 2학년" color="success"></v-radio>
                    <v-radio key="12" label="고등학교 3학년" value="고등학교 3학년" color="success"></v-radio>
                  </v-radio-group>
              </v-card-text>

              <v-card-actions class="justify-end px-9 pb-8">
                  <b class="select_grade_btn cursor" @click="select_grade_submit">취소</b>
              </v-card-actions>
          </div>

          <div slot="student_back">
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

          <div slot="student_confirm">
              <v-card-text class="text-center">
                  <h4><b>학생을 등록하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="student_submit">
                      <b class="success--text">확인</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="duplicate_id">
              <v-card-text class="text-center">
                  <h4><b>중복된 아이디가 있습니다.</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 100%;" @click="dialog_false">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="add_student_error">
              <v-card-text class="text-center">
                  <h4><b>오류 코드 : {{ error_code }}</b></h4>
                  <h4><b>관리자에게 문의해주세요.</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 100%;" @click="dialog_false">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

      </Dialogs>

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
            subtitle_text: '재원생',

            valid: true,
            valid_oper: true,
            disabled: false,

            class_list: new Array(),
            class_list_tmp: new Array(),
            tmp: '',
            mode: 'add',
            uclass: '',
            uclass_id: '',
            grade: '',
            uname: '',
            phone: '',
            loginid: '',
            password: '',
            school: '',
            birthdate: '',
            parent_name: '',
            parent_phone: '',

            operuid: '',
            operuclass: '',
            opergrade: '',
            operuname: '',
            operphone: '',
            operloginid: '',
            operpassword: '',
            operschool: '',
            operbirthdate: '',
            operparent_name: '',
            operparent_phone: '',

            student_select_class_group: 1,
            student_select_grade_group: 1,
            student_select_class_group_key: 0,
            error_code: '',
        }
    },
    methods: {
        dialog_false : function (){ bus.$emit('dialog', false); },
        back : function () {
            this.$router.push({name:'user-student', params:{
                tab: this.tmp,
                returnpage : this.returnpage,
                returnitems_per_page : this.returnitems_per_page,
                returnsortby : this.returnsortby,
                returnsortdesc : this.returnsortdesc
            }});
        },
        validate () {
            if ( this.$refs.form[0].validate() ) {
                bus.$emit('dialog', {
                    'status': true,
                    'name': 'student_confirm'
                });
            }
        },
        validate_modify : function () {
            if (this.$refs.form[0].validate()) {
                this.student_submit();
            }
        },
        backbtn : function (idx) {
            let _this = this;
            this.tmp = idx;
            let sum = this.uclass + this.grade + this.uname + this.phone + this.loginid + this.password + this.school + this.birthdate + this.parent_name + this.parent_phone;
            if(sum == ''){
                this.$router.push({name:'user-student', params:{
                    tab: idx,
                    returnpage : this.returnpage,
                    returnitems_per_page : this.returnitems_per_page,
                    returnsortby : this.returnsortby,
                    returnsortdesc : this.returnsortdesc
                }});
            }
            else {
                bus.$emit('dialog', {
                    'status': true,
                    'name' : 'student_back'
                });
            }
        },
        select_class : function () {
            bus.$emit('dialog', {
                'status': true,
                'name': 'student_select_class'
            });
        },
        select_grade : function () {
            bus.$emit('dialog', {
                'status': true,
                'name': 'student_select_grade'
            });
        },
        select_class_change : function (obj) {
            let btn = document.getElementsByClassName('select_class_btn')[0];
            btn.innerText = '확인';
            btn.classList.add('success--text');
            this.tmp = obj;
        },
        select_grade_change : function (obj) {
            let btn = document.getElementsByClassName('select_grade_btn')[0];
            btn.innerText = '확인';
            btn.classList.add('success--text');
            this.tmp = obj;
        },
        select_class_submit : function () {
            let btn = document.getElementsByClassName('select_class_btn')[0];
            if( btn.innerText == '취소' ){
                bus.$emit('dialog', false);
            }else if( btn.innerText == '확인' ){
                bus.$emit('dialog', false);
                this.uclass = this.tmp;
                for(let i=0; i<this.class_list.length; i++){
                    if( this.class_list[i].name == this.uclass ){
                        this.uclass_id = this.class_list[i].id;
                    }
                }
                this.student_select_class_group += 1;
                btn.innerText = '취소';
                btn.classList.remove('success--text');
            }
        },
        select_grade_submit : function () {
            let btn = document.getElementsByClassName('select_grade_btn')[0];
            if( btn.innerText == '취소' ){
                bus.$emit('dialog', false);
            }else if( btn.innerText == '확인' ){
                bus.$emit('dialog', false);
                this.grade = this.tmp;
                this.student_select_grade_group += 1;
                btn.innerText = '취소';
                btn.classList.remove('success--text');
            }
        },

        student_submit : function () {

            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            let tmp_data = {
                class_name : this.uclass,
                class_id : this.uclass_id,
                grade : this.grade,
                uname : this.uname,
                phone : this.phone,
                loginid : this.loginid,
                password : this.password,
                uclass: this.$store.state.UCLASS_STUDENT,
                school : this.school,
                birthdate : this.birthdate,
                parent_name : this.parent_name,
                parent_phone : this.parent_phone
            };

            if( _this.mode == 'modify' ){
                tmp_data.uid = this.$route.params.operuid;
                tmp_data.old_class_id = this.operuclass_id;
            }

            this.$axios.post(`${this.$store.state.host}/user/` + cid + '/' + _this.mode + 'student', tmp_data )
            .then(function(response){
                bus.$emit('dialog', false);

                if( response.status == 200 ){
                    if( _this.mode == 'add' )
                        _this.$router.push({name:'user-student', params:{
                            dialog:'success',
                            returnpage : _this.returnpage,
                            returnitems_per_page : _this.returnitems_per_page,
                            returnsortby : _this.returnsortby,
                            returnsortdesc : _this.returnsortdesc
                        }});
                    else if( _this.mode == 'modify' )
                        _this.$router.push({name:'user-student', params:{
                            returnpage : _this.returnpage,
                            returnitems_per_page : _this.returnitems_per_page,
                            returnsortby : _this.returnsortby,
                            returnsortdesc : _this.returnsortdesc
                        }});
                    // bus.$emit('add_student_submit', true);
                }
                else if( response.status == 202 ){
                    bus.$emit('dialog', {
                        'status': true,
                        'name': 'duplicate_id'
                    });
                }
                else{
                    this.error_code = response.status;
                    bus.$emit('dialog', {
                        'status': true,
                        'name': 'add_student_error'
                    });
                }

            }).catch(function(err){
                console.log(err);
                bus.$emit('dialog', false);
            });
        },
    },
    created : function () {
        let _this = this;
        let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
        let callbackFunc = function() {
            if( _this.$route.params.operuid != undefined ){
                for(let i=0; i < _this.class_list.length; i++){
                    if( _this.class_list[i].name == _this.$route.params.operuclass ){
                        _this.uclass_id = _this.class_list[i].id;
                        _this.operuclass_id = _this.class_list[i].id;
                    }
                }
            }
        }

        this.$axios.get(`${this.$store.state.host}/class/` + cid + '/getclassroom')
        .then(function(response){
            if( response.status == 200 ){
                for(let i=0; i<response.data.length; i++){
                    _this.class_list.push({
                        id : response.data[i].id,
                        name : response.data[i].name
                    });

                    _this.class_list_tmp.push({
                        id : response.data[i].id,
                        name : response.data[i].name
                    });
                }
                _this.student_select_class_group_key += 1;
                callbackFunc();
            }else{
                console.log('no_class');
            }

        }).catch(function(err){
            console.log(err);
        });

        if( this.$route.params.operuid != undefined ){
            this.mode = 'modify';

            this.uclass = this.$route.params.operuclass;
            this.grade = this.$route.params.opergrade;
            this.uname = this.$route.params.operuname;
            this.phone = this.$route.params.operphone;
            this.loginid = this.$route.params.operloginid;
            this.password = this.$route.params.operpassword;
            this.school = this.$route.params.operschool;
            this.birthdate = this.$route.params.operbirthdate;
            this.parent_name = this.$route.params.operparent_name;
            this.parent_phone = this.$route.params.operparent_phone;

            this.operuid = this.$route.params.operuid;
            this.operuclass = this.$route.params.operuclass;
            this.opergrade = this.$route.params.opergrade;
            this.operuname = this.$route.params.operuname;
            this.operphone = this.$route.params.operphone;
            this.operloginid = this.$route.params.operloginid;
            this.operpassword = this.$route.params.operpassword;
            this.operschool = this.$route.params.operschool;
            this.operbirthdate = this.$route.params.operbirthdate;
            this.operparent_name = this.$route.params.operparent_name;
            this.operparent_phone = this.$route.params.operparent_phone;
        }

        this.returnpage = (this.$route.params.page != undefined) ? this.$route.params.page : '';
        this.returnitems_per_page = (this.$route.params.items_per_page != undefined) ? this.$route.params.items_per_page : '';
        this.returnsortby = (this.$route.params.returnsortby != undefined) ? this.$route.params.returnsortby : undefined;
        this.returnsortdesc = (this.$route.params.returnsortdesc != undefined) ? this.$route.params.returnsortdesc : undefined;

    },
    watch: {
        uclass : function (val) {
            if( this.mode == 'modify' && this.operuclass != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        grade : function (val) {
            if( this.mode == 'modify' && this.opergrade != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        uname : function (val) {
            if( this.mode == 'modify' && this.operuname != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        phone : function (val) {
            if( this.mode == 'modify' && this.operphone != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        loginid : function (val) {
            if( this.mode == 'modify' && this.operloginid != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        password : function (val) {
            if( this.mode == 'modify' && this.operpassword != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        school : function (val) {
            if( this.mode == 'modify' && this.operschool != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        birthdate : function (val) {
            if( this.mode == 'modify' && this.operbirthdate != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        parent_name : function (val) {
            if( this.mode == 'modify' && this.operparent_name != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        parent_phone : function (val) {
            if( this.mode == 'modify' && this.operparent_phone != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },

    },
    computed : {
        ...mapGetters([
            'getUclass'
        ])
    }

};
</script>
