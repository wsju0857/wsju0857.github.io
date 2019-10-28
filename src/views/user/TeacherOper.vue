<template>
    <v-row
      id="teacheropervue"
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
                <h2 class="d-inline-block">선생님 관리</h2>
                <h3 class="d-inline-block grey--text pl-2"><small>학생 관리를 위해 선생님을 등록/관리합니다.</small></h3>
            </div>

            <div class="py-2 mt-2" style="border-top: 1px solid lightgray;">
                <v-btn class="float-right" color="success" elevation="0" outlined @click="backbtn">
                    <v-icon dark>mdi-arrow-left</v-icon>&nbsp;뒤로가기
                </v-btn>
                <div style="clear: both;"></div>
            </div>

            <div>
                <v-row align="center" justify="center">
                    <v-col
                    cols="10"
                    sm="9"
                    md="5"
                    lg="4"
                    xl="3"
                    >
                    <v-form
                      ref="form"
                      v-model="valid"
                    >

                      <label for="tclass">구분</label>
                      <v-text-field
                        v-model="tclass"
                        id="tclass"
                        name="tclass"
                        outlined
                        dense
                        required
                        type="text"
                        hide-details
                        color="success"
                        style="margin: 5px 0 10px 0;"
                        :rules="[v => !!v || '']"
                        @click="select_class"
                        readonly
                        :disabled="disabled"
                      ></v-text-field>

                      <label for="tname">선생님 이름</label>
                      <v-text-field
                        v-model="tname"
                        id="tname"
                        name="tname"
                        outlined
                        dense
                        required
                        type="text"
                        hide-details
                        color="success"
                        style="margin: 5px 0 10px 0;"
                        :rules="[v => !!v || '']"
                      ></v-text-field>

                      <label for="tphone">휴대폰 번호</label>
                      <v-text-field
                        v-model="tphone"
                        id="tphone"
                        name="tphone"
                        outlined
                        dense
                        required
                        type="text"
                        hide-details
                        color="success"
                        style="margin: 5px 0 10px 0;"
                        :rules="[v => !!v || '']"
                      ></v-text-field>

                      <label for="tloginid">아이디</label>
                      <v-text-field
                        v-model="tloginid"
                        id="tloginid"
                        name="tloginid"
                        outlined
                        dense
                        required
                        type="text"
                        hide-details
                        color="success"
                        style="margin: 5px 0 10px 0;"
                        :rules="[v => !!v || '']"
                      ></v-text-field>

                      <label for="tpassword">비밀번호</label>
                      <v-text-field
                        v-model="tpassword"
                        id="tpassword"
                        name="tpassword"
                        outlined
                        dense
                        required
                        type="password"
                        class="msfont"
                        hide-details
                        color="success"
                        style="margin: 5px 0 10px 0;"
                        :rules="[v => !!v || '']"
                      ></v-text-field>

                      <div class="text-center">
                          <v-btn
                            v-if="this.$route.params.operuid == undefined"
                            :disabled="!valid"
                            color="success"
                            class="mr-4 elevation-0 mt-2"
                            @click="validate"
                            style="width: 50%;"
                          >
                            등록
                          </v-btn>

                          <v-btn
                            v-if="this.$route.params.operuid != undefined"
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
                    </v-col>
                  </v-row>
            </div>
        </v-sheet>
      </v-col>

      <Dialogs>
          <div slot="teacher_class_change">
              <v-card-title class="justify-start headline text-center pb-0 pt-8">
                  <h5>구분</h5>
              </v-card-title>

              <v-card-text>
                  <v-radio-group
                  v-model="teacher_class_group"
                  class="change_lr" hide-details @change="teacher_class_change">
                    <v-radio :key="1" label="부원장" value="부원장" color="success"></v-radio>
                    <v-radio :key="2" label="상담실장" value="상담실장" color="success"></v-radio>
                    <v-radio :key="3" label="선생님" value="선생님" color="success"></v-radio>
                    <v-radio :key="4" label="기타" value="기타" color="success"></v-radio>
                  </v-radio-group>
              </v-card-text>

              <v-card-actions class="justify-end px-9 pb-8">
                  <b class="teacher_class cursor" @click="teacher_class_submit">취소</b>
              </v-card-actions>
          </div>

          <div slot="teacher_back">
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

          <div slot="teacher_confirm">
              <v-card-text class="text-center">
                  <h4><b>선생님을 등록하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="teacher_submit">
                      <b class="success--text">확인</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="teacher_modify_confirm">
              <v-card-text class="text-center">
                  <h4><b>선생님 정보를 수정하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="teacher_submit">
                      <b class="success--text">수정</b>
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

          <div slot="add_teacher_error">
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
// @import '@/assets/scss/views/user/index.scss';
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
            valid: true,
            valid_oper: true,
            disabled: false,

            mode: 'add',
            tclass : '',
            tclass_tmp: '',
            tname : '',
            tphone : '',
            tloginid : '',
            tpassword : '',

            operclass : '',
            opername : '',
            operphone : '',
            operloginid : '',
            operpassword : '',

            returnpage : '',
            returnitems_per_page : '',
            returnsortby : '',
            returnsortdesc : '',

            teacher_class_group: 1,
            error_code: '',
        }
    },
    created : function () {
        console.log( this.$route.params );
        if( this.$route.params.operuid != undefined ){
            this.mode = 'modify';
            this.tclass = this.$route.params.operclass_txt;
            this.tname = this.$route.params.opername;
            this.tphone = this.$route.params.operphone;
            this.tloginid = this.$route.params.operloginid;
            this.tpassword = this.$route.params.operpassword;

            this.operclass = this.$route.params.operclass_txt;
            this.opername = this.$route.params.opername;
            this.operphone = this.$route.params.operphone;
            this.operloginid = this.$route.params.operloginid;
            this.operpassword = this.$route.params.operpassword;

            if( this.$route.params.operclass == 29 ){
                this.disabled = true;
            }
        }

        this.returnpage = (this.$route.params.page != undefined) ? this.$route.params.page : '';
        this.returnitems_per_page = (this.$route.params.items_per_page != undefined) ? this.$route.params.items_per_page : '';
        this.returnsortby = (this.$route.params.returnsortby != undefined) ? this.$route.params.returnsortby : undefined;
        this.returnsortdesc = (this.$route.params.returnsortdesc != undefined) ? this.$route.params.returnsortdesc : undefined;

    },
    watch: {
        tclass : function (val) {
            if( this.mode == 'modify' && this.operclass != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        tname : function (val) {
            if( this.mode == 'modify' && this.opername != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        tphone : function (val) {
            if( this.mode == 'modify' && this.operphone != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        tloginid : function (val) {
            if( this.mode == 'modify' && this.operloginid != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        tpassword : function (val) {
            if( this.mode == 'modify' && this.operpassword != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
    },
    computed : {
        ...mapGetters([
            'getUclass'
        ])
    },
    methods: {
        dialog_false : function (){ bus.$emit('dialog', false); },
        back : function () {
            this.$router.push({name:'user-teacher', params:{
                returnpage: this.returnpage,
                returnitems_per_page: this.returnitems_per_page,
                returnsortby: this.returnsortby,
                returnsortdesc: this.returnsortdesc
            }});
        },
        validate : function () {
            if (this.$refs.form.validate()) {
                bus.$emit('dialog', { 'status': true, 'name': 'teacher_confirm' });
            }
        },
        validate_modify : function () {
            if (this.$refs.form.validate()) {
                bus.$emit('dialog', { 'status': true, 'name': 'teacher_modify_confirm' });
            }
        },
        backbtn : function () {
            let sum = this.tclass + this.tname + this.tphone + this.tloginid + this.tpassword;
            if(sum == ''){
                this.$router.push({name:'user-teacher',params:{
                    returnpage: this.returnpage,
                    returnitems_per_page: this.returnitems_per_page,
                    returnsortby: this.returnsortby,
                    returnsortdesc: this.returnsortdesc
                }});
            }
            else {
                bus.$emit('dialog', {
                    'status': true,
                    'name' : 'teacher_back'
                });
            }
        },
        select_class : function () {
            bus.$emit('dialog', {
                'status': true,
                'name': 'teacher_class_change'
            });
        },
        teacher_class_change : function (obj) {
            let btn = document.getElementsByClassName('teacher_class')[0];
            btn.innerText = '확인';
            btn.classList.add('success--text');
            this.tclass_tmp = obj;
        },
        teacher_class_submit : function () {
            let btn = document.getElementsByClassName('teacher_class')[0];
            if( btn.innerText == '취소' ){
                bus.$emit('dialog', false);
            }else if( btn.innerText == '확인' ){
                bus.$emit('dialog', false);
                this.tclass = this.tclass_tmp;
                this.teacher_class_group += 1;
                btn.innerText = '취소';
                btn.classList.remove('success--text');
            }
        },

        teacher_submit : function () {

            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            let tclass = this.tclass;
            tclass = this.$store.getters.getUclass( tclass );

            let tmp_data = {
                loginid : this.tloginid,
                password: this.tpassword,
                uclass: tclass,
                name: this.tname,
                phone: this.tphone
            };
            if( _this.mode == 'modify' ){
                tmp_data.uid = this.$route.params.operuid;
            }

            this.$axios.post(`${this.$store.state.host}/user/` + cid + '/' + _this.mode + 'teacher', tmp_data )
            .then(function(response){
                // console.log( response );
                bus.$emit('dialog', false);

                if( response.status == 200 ){
                    if( _this.mode == 'add' ){
                        _this.$router.push({name:'user-teacher',params:{
                            dialog:'success',
                            returnpage: _this.returnpage,
                            returnitems_per_page: _this.returnitems_per_page,
                            returnsortby: _this.returnsortby,
                            returnsortdesc: _this.returnsortdesc
                        }});
                    }
                    else if( _this.mode == 'modify'){
                        _this.$router.push({name:'user-teacher',params:{
                            returnpage: _this.returnpage,
                            returnitems_per_page: _this.returnitems_per_page,
                            returnsortby: _this.returnsortby,
                            returnsortdesc: _this.returnsortdesc
                        }});
                    }
                    // d.$router.push('Teacher');
                    // bus.$emit('submit', true);
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
                        'name': 'add_teacher_error'
                    });
                }

            }).catch(function(err){
                console.log(err);
                bus.$emit('dialog', false);
            });
        },
    },

};
</script>
