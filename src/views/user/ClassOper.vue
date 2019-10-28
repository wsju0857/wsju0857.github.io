<template>
    <v-row
      id="classopervue"
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
                <v-btn class="float-right" color="success" elevation="0" outlined @click="backbtn">
                    <v-icon dark>mdi-arrow-left</v-icon>&nbsp;뒤로가기
                </v-btn>
                <div style="clear: both;"></div>
            </div>

            <div>
                <v-row align="center" justify="center">
                    <v-form
                      ref="form"
                      v-model="valid"
                    >

                    <label for="class_name">클래스 명</label>
                    <v-text-field
                      v-model="class_name"
                      id="class_name"
                      name="class_name"
                      outlined
                      dense
                      required
                      type="text"
                      hide-details
                      color="success"
                      style="margin: 5px 0 10px 0;"
                      :rules="[v => !!v || '']"
                    ></v-text-field>

                      <label for="class_teacher">담당 선생님</label>
                      <v-text-field
                        v-model="class_teacher"
                        id="class_teacher"
                        name="class_teacher"
                        outlined
                        dense
                        required
                        type="text"
                        hide-details
                        color="success"
                        style="margin: 5px 0 10px 0;"
                        :rules="[v => !!v || '']"
                        @click="select_teacher"
                        readonly
                      ></v-text-field>



                      <label>수업 요일</label>
                      <br />
                      <div style="margin: 5px 0px 10px;">
                      <v-btn
                      v-for="i in daysnum"
                      :key="`selday-${i}`"
                      :id="`selday-${i}`"
                      @click="sel_daybtn(i)"
                      outlined
                      style="min-width: 50px;"
                      :class="i == 0 ? 'float-right' : ''"
                      :style="i != 0 ? 'margin-right: 5px;' : ''"
                      color="grey"
                      >
                          {{ days[i] }}
                      </v-btn>
                      </div>

                      <div class="text-center">
                          <v-btn
                            v-if="this.$route.params.rid==undefined"
                            :disabled="!valid"
                            color="success"
                            class="mr-4 elevation-0"
                            @click="validate"
                          >
                            등록
                          </v-btn>

                          <v-btn
                            v-if="this.$route.params.rid!=undefined"
                            :disabled="valid_oper"
                            color="success"
                            class="mr-4 elevation-0"
                            @click="validate"
                          >
                            수정
                          </v-btn>
                      </div>

                    </v-form>
                  </v-row>
            </div>
        </v-sheet>
      </v-col>
      <Dialogs>
          <div slot="class_teacher_change">
              <v-card-title class="justify-start headline text-center pb-0 pt-8">
                  <h5>담당 선생님</h5>
              </v-card-title>

              <v-card-text style="max-height: 170px; overflow-y: scroll;">
                  <v-radio-group
                  :key="class_radio_group"
                  v-model="class_radio_group"
                  class="change_lr" hide-details @change="class_teacher_change">
                    <b v-if="typeof(teacher_list) == 'string'">{{ teacher_list }}</b>
                    <v-radio
                    v-for="(value, i) in teacher_list"
                    v-if=" typeof(teacher_list) != 'string' "
                    :key="i"
                    :label="value.tlname"
                    :value="value.tlid+'@'+value.tlname"
                    color="success"
                    >
                    </v-radio>
                  </v-radio-group>
              </v-card-text>

              <v-card-actions class="justify-end px-9 pb-8">
                  <b class="teacher_class cursor" @click="class_teacher_submit">취소</b>
              </v-card-actions>
          </div>

          <div slot="class_back_confirm">
              <v-card-text class="text-center">
                  <h4><b>작성 중인 내용이 있습니다.<br />뒤로 가시겠습니가?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%">
                      <b class="success--text" @click="dialog_false">취소</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="class_back">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="add_class_confirm">
              <v-card-text class="text-center">
                  <h4><b>클래스를 등록하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="class_submit">
                      <b class="success--text">확인</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="modify_class_confirm">
              <v-card-text class="text-center">
                  <h4><b>클래스 정보를 수정하시겠습니까?</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" @click="class_submit">
                      <b class="success--text">확인</b>
                  </v-btn>
                  <v-btn x-large class="ml-0" text style="width:50%;" @click="dialog_false">
                      <b>취소</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="duplicate_rid">
              <v-card-text class="text-center">
                  <h4><b>중복된 클래스명이 있습니다.</b></h4>
              </v-card-text>

              <!-- Two Button -->
              <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                  <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 100%;" @click="dialog_false">
                      <b>확인</b>
                  </v-btn>
              </v-card-actions>
          </div>

          <div slot="add_class_error">
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
// import { mapGetters } from "vuex";
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

            days: ['일', '월', '화', '수', '목', '금', '토'],
            daysnum: [0, 1, 2, 3, 4, 5, 6],

            select_teacher_id : '',
            select_teacher_name : '',
            seldays: [],
            class_name : '',
            class_teacher: '',

            mode : 'add',
            operclass_name : '',
            operclass_teacher : '',
            operclass_teacher_id : '',
            operseldays: [],

            teacher_list: [],
            class_radio_group: 1,
            error_code: '',

            returnpage : '',
            returnitems_per_page : '',
            returnsortby : '',
            returnsortdesc : '',
        }
    },
    methods: {
        dialog_false : function () {
            bus.$emit('dialog', false);
            this.class_radio_group += 1;
        },
        validate : function () {
            if (this.$refs.form.validate()) {
                bus.$emit('dialog', {
                    status : true,
                    name : (this.mode == 'add') ? 'add_class_confirm' : 'modify_class_confirm'
                });
            }
        },
        backbtn : function () {
            let sum = this.class_name + this.class_teacher;
            let is_selday = (this.seldays.length == 0) ? false : true;
            if(sum == '' && is_selday == false){
                this.class_back();
            }
            else {
                bus.$emit('dialog', {
                    'status': true,
                    'name' : 'class_back_confirm'
                });
            }
        },
        class_back : function () {
            this.$router.push({name:'user-class', params: {
                returnpage: this.returnpage,
                returnitems_per_page: this.returnitems_per_page,
                returnsortby: this.returnsortby,
                returnsortdesc: this.returnsortdesc
            }});
        },
        select_teacher : function () {
            this.class_radio_group += 1;
            bus.$emit('dialog', {
                'status': true,
                'name': 'class_teacher_change'
            });
        },
        sel_daybtn : function (day){

            let selday = document.getElementById("selday-" + day);
            if( selday.classList.contains('success') ){
                document.getElementById("selday-" + day).classList.remove("success","lighten-5","success--text");
                if( this.seldays.indexOf(day) != -1 ){
                    let idx = this.seldays.indexOf(day);
                    this.seldays.splice(idx, 1);
                }
            }else{
                document.getElementById("selday-" + day).classList.add("success","lighten-5","success--text");
                if( this.seldays.indexOf(day) == -1 ){
                    this.seldays.push(day);
                }
            }

        },
        class_teacher_change : function (obj) {
            this.select_teacher_id = obj.split("@")[0];
            this.select_teacher_name = obj.split("@")[1];

            let btn = document.getElementsByClassName('teacher_class')[0];
            btn.innerText = '확인';
            btn.classList.add('success--text');
        },
        class_teacher_submit : function () {
            let btn = document.getElementsByClassName('teacher_class')[0];
            if( btn.innerText == '취소' ){
                bus.$emit('dialog', false);

            }else if( btn.innerText == '확인' ){
                bus.$emit('dialog', false);
                this.class_teacher = this.select_teacher_name;
                btn.innerText = '취소';
                btn.classList.remove('success--text');
            }
            this.class_radio_group += 1;
        },
        class_submit : function (){
            let _this = this;
            let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

            let tmp_data = {
                name : this.class_name,
                user_id : this.select_teacher_id,
                lesson_day : this.seldays
            };

            if( _this.mode == 'modify' ){
                tmp_data.rid = this.$route.params.rid;
            }

            this.$axios.post(`${this.$store.state.host}/class/` + cid + '/' + _this.mode + 'class', tmp_data )
            .then(function(response){
                bus.$emit('dialog', false);

                if( response.status == 200 ){
                    _this.$router.push({name:'user-class', params:{
                        dialog: (_this.mode == 'add' ? 'success' : 'fail'),
                        returnpage: _this.returnpage,
                        returnitems_per_page: _this.returnitems_per_page,
                        returnsortby: _this.returnsortby,
                        returnsortdesc: _this.returnsortdesc
                    }});
                }
                else if( response.status == 202 ){
                    bus.$emit('dialog', {
                        'status': true,
                        'name': 'duplicate_rname'
                    });
                }
                else{
                    this.error_code = response.status;
                    bus.$emit('dialog', {
                        'status': true,
                        'name': 'add_class_error'
                    });
                }

            }).catch(function(err){
                console.log(err);
                bus.$emit('dialog', false);
            });

        }
    },
    created : function () {
        let _this = this;
        let cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;

        this.$axios.get(`${this.$store.state.host}/user/` + cid + '/getteacher/min')
        .then(function(response){
            if(response.status == 200){
                for(let i=0; i<response.data.length; i++){
                    _this.teacher_list.push({
                        tlid : response.data[i].user_id,
                        tlname : response.data[i].name,
                    });
                }
            }
            else if(response.status == 204){
                _this.teacher_list = '클래스를 관리할 선생님이 없습니다.';
            }
        }).catch(function(err){
            console.log(err);
        });

    },
    watch : {
        class_name : function(val){
            if( this.mode == 'modify' && this.operclass_name != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        class_teacher : function(val){
            if( this.mode == 'modify' && this.operclass_teacher != val && val != "" ) this.valid_oper = false;
            else this.valid_oper = true;
        },
        seldays: function(val){
            if( this.mode == 'add' ){
                if( this.class_teacher != "" && this.class_name != ""){
                    if(val.length > 0 ){
                        this.valid = true;
                    }
                    else{
                        this.valid = false;
                    }
                }
            }
            else if( this.mode == 'modify' ){
                if( this.seldays.join() == this.operseldays.join() ){
                    this.valid_oper = true;
                }
                else{
                    this.valid_oper = false;
                }
            }
        },
        valid: function(val){
            if( this.mode == 'add' ){
                if( val == true && this.seldays.length == 0 ){
                    this.valid = false;
                }
            }
        }
    },
    mounted () {

        if( this.$route.params.rid != undefined ){
            this.mode = 'modify';
            for(let value of this.$route.params.lesson_day){
                let num = '';
                switch (value) {
                    case '일': num = 0; break;
                    case '월': num = 1; break;
                    case '화': num = 2; break;
                    case '수': num = 3; break;
                    case '목': num = 4; break;
                    case '금': num = 5; break;
                    case '토': num = 6; break;
                    default: console.log(''); break;
                }
                this.seldays.push(num);
                this.operseldays.push(num);
                document.getElementById('selday-' + num).classList.add('success', 'lighten-5', 'success--text');
            }

            this.class_name = this.$route.params.class_name;
            this.class_teacher = this.$route.params.teacher_name;
            this.select_teacher_id = this.$route.params.teacher_id;

            this.operclass_name = this.$route.params.class_name;
            this.operclass_teacher = this.$route.params.teacher_name;
            this.operclass_teacher_id = this.$route.params.teacher_id;
        }

        this.returnpage = (this.$route.params.page != undefined) ? this.$route.params.page : '';
        this.returnitems_per_page = (this.$route.params.items_per_page != undefined) ? this.$route.params.items_per_page : '';
        this.returnsortby = (this.$route.params.returnsortby != undefined) ? this.$route.params.returnsortby : undefined;
        this.returnsortdesc = (this.$route.params.returnsortdesc != undefined) ? this.$route.params.returnsortdesc : undefined;
    }

};
</script>
