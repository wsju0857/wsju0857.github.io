<template>
    <v-row
      id="loginvue"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="7"
        lg="7"
      >

      <v-tabs
          v-model="tab"
          dark
          hide-slider
        >

          <v-tab
            v-for="i in tabs"
            :key="i"
            :href="`#tab-${i}`"
          >
          </v-tab>

          <!-- 메인 로그인 -->
          <v-tab-item
            :key="1"
            :value="'tab-1'"
            :transition="false"
            :reverse-transition="false"
          >
            <v-card class="elevation-0" outlined>
                <v-card-text :class="`pb-0`">
                  <v-row align="center" justify="center">
                      <v-col
                        cols="12"
                        sm="8"
                        md="7"
                        lg="7"
                        class="pb-0"
                      >

                          <logo-img :size='1' :center='true' ></logo-img>
                          <h2 class="subtitle-1 text-center">내일을 공부하는 확실한 영어 내신공략!</h2>
                          <br />
                          <v-form
                              v-model="loginvalid"
                              ref="loginform"
                          >
                            <v-text-field
                              v-model="loginid"
                              :rules="rules"
                              id="loginid"
                              label="아이디 입력"
                              name="login"
                              type="text"
                              outlined
                              hide-details
                              single-line
                              required
                              color="success"
                            ></v-text-field>
                            <div class="padding-divider"></div>
                            <v-text-field
                              v-model="password"
                              :rules="rules"
                              id="password"
                              label="비밀번호 입력"
                              name="password"
                              type="password"
                              outlined
                              hide-details
                              single-line
                              class="text-center"
                              required
                              color="success"
                              @keydown="enter_loginvalidate"
                            ></v-text-field>
                          </v-form>
                      </v-col>
                  </v-row>


                </v-card-text>
                <v-card-actions class="text-center py-3">
                    <v-row align="center" justify="center">
                        <v-btn @click="loginvalidate" color="success" x-large elevation="0">
                            로그인
                        </v-btn>
                    </v-row>
                </v-card-actions>
                <v-card-actions class="text-center pb-12">
                    <v-row align="center" justify="center">
                        <a @click="changetab('2')" class="success--text mr-2" style="text-decoration: underline;">아이디 찾기</a>
                        <a @click="changetab('3')" class="success--text ml-1" style="text-decoration: underline;">비밀번호 찾기</a>
                        <!-- <a href="/searchid" class="success--text mr-2" style="text-decoration: underline;">아이디 찾기</a>
                        <a href="/searchpw" class="success--text ml-1" style="text-decoration: underline;">비밀번호 찾기</a> -->
                    </v-row>
                </v-card-actions>
            </v-card>
          </v-tab-item>

          <!-- 아이디 찾기 -->
          <v-tab-item
            :key="2"
            :value="'tab-2'"
            :transition="false"
            :reverse-transition="false"
          >
            <v-card class="elevation-0" outlined>
                <v-card-text>
                  <v-row class="pl-4">
                      <v-icon class="cursor" @click="changetab('1')">mdi-arrow-left</v-icon>
                  </v-row>
                  <v-row align="center" justify="center">
                      <v-col
                        cols="12"
                        sm="9"
                        md="8"
                        lg="8"
                      >
                          <h2 class="black--text">아이디 찾기</h2>
                          <br />
                          <v-form
                              v-model="idvalid"
                              ref="idform"
                          >
                            <v-text-field
                              v-model="suname"
                              :rules="rules"
                              id="suname"
                              label="이름 입력"
                              name="suname"
                              type="text"
                              hide-details
                              single-line
                              required
                              color="success"
                            ></v-text-field>
                            <div class="padding-divider"></div>
                            <v-text-field
                              v-model="uphone"
                              :rules="rules"
                              id="uphone"
                              label="휴대폰 번호 입력"
                              name="uphone"
                              type="text"
                              hide-details
                              single-line
                              class="text-center"
                              required
                              color="success"
                            >
                                <template v-slot:append>
                                    <v-btn depressed outlined color="grey" @click="postcert('id')">
                                        인증
                                    </v-btn>
                                </template>
                            </v-text-field>
                            <div class="padding-divider"></div>
                            <v-text-field
                              v-model="inputcertnum"
                              :rules="rules"
                              id="inputcertnum"
                              label="인증번호 입력"
                              name="inputcertnum"
                              type="text"
                              hide-details
                              single-line
                              class="text-center"
                              required
                              color="success"
                              autocomplete="new-password"
                            ></v-text-field>
                            <v-btn @click="idvalidate" color="success" x-large elevation="0" block class="my-7" :disabled="!idvalid">
                                아이디 조회
                            </v-btn>
                          </v-form>
                      </v-col>
                  </v-row>
                </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- 비밀번호 찾기 -->
          <v-tab-item
            :key="3"
            :value="'tab-3'"
            :transition="false"
            :reverse-transition="false"
          >
            <v-card class="elevation-0" outlined>
                <v-card-text>
                  <v-row class="pl-4">
                      <v-icon class="cursor" @click="changetab('1')">mdi-arrow-left</v-icon>
                  </v-row>
                  <v-row align="center" justify="center">
                      <v-col
                        cols="12"
                        sm="9"
                        md="8"
                        lg="8"
                      >
                          <h2 class="black--text">비밀번호 찾기</h2>
                          <br />
                          <v-form
                              v-model="pwvalid"
                              ref="pwform"
                          >
                            <v-text-field
                              v-model="sloginid"
                              :rules="rules"
                              id="sloginid"
                              label="이름 입력"
                              name="sloginid"
                              type="text"
                              hide-details
                              single-line
                              required
                              color="success"
                            ></v-text-field>
                            <div class="padding-divider"></div>
                            <v-text-field
                              v-model="pwuphone"
                              :rules="rules"
                              id="pwuphone"
                              label="휴대폰 번호 입력"
                              name="pwuphone"
                              type="text"
                              hide-details
                              single-line
                              class="text-center"
                              required
                              color="success"
                            >
                                <template v-slot:append>
                                    <v-btn depressed outlined color="grey" @click="postcert('pw')">
                                        인증
                                    </v-btn>
                                </template>
                            </v-text-field>
                            <div class="padding-divider"></div>
                            <v-text-field
                              v-model="pwinputcertnum"
                              :rules="rules"
                              id="pwinputcertnum"
                              label="인증번호 입력"
                              name="pwinputcertnum"
                              type="text"
                              hide-details
                              single-line
                              class="text-center"
                              required
                              color="success"
                              autocomplete="new-password"
                            ></v-text-field>
                            <v-btn @click="pwvalidate" color="success" x-large elevation="0" block class="my-7" :disabled="!pwvalid">
                                비밀번호 조회
                            </v-btn>
                          </v-form>
                      </v-col>
                  </v-row>
                </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- 아이디 찾기 성공 -->
          <v-tab-item
            :key="4"
            :value="'tab-4'"
            :transition="false"
            :reverse-transition="false"
          >
            <v-card class="elevation-0" outlined>
                <v-card-text>
                  <v-row class="pl-4">
                      <v-icon class="cursor" @click="changetab('2')">mdi-arrow-left</v-icon>
                  </v-row>
                  <v-row align="center" justify="center">
                      <v-col
                        cols="12"
                        sm="9"
                        md="8"
                        lg="8"
                        class="pb-7"
                      >
                          <h2 class="black--text">아이디 찾기</h2>
                          <hr class="my-7" />
                          <div class="text-center mb-5">
                              <h3 class="py-2">가입해주신 아이디는 다음과 같습니다.</h3>
                              <h3 class="py-2 success--text">{{ postloginid }}</h3>
                              <h3 class="py-2 grey--text text--lighten-2">{{ postdate }}</h3>
                          </div>

                          <div class="text-center">
                              <v-btn class="mr-4" color="success" @click="changetab('1')" style="width: 150px;" elevation="0">
                                  로그인
                              </v-btn>
                              <v-btn class="ml-4" color="success" outlined @click="changetab('3')" style="width: 150px;" elevation="0">
                                  비밀번호 찾기
                              </v-btn>
                          </div>
                      </v-col>
                  </v-row>
                </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- 아이디 찾기 성공 -->
          <v-tab-item
            :key="5"
            :value="'tab-5'"
            :transition="false"
            :reverse-transition="false"
          >
            <v-card class="elevation-0" outlined>
                <v-card-text>
                  <v-row class="pl-4">
                      <v-icon class="cursor" @click="changetab('3')">mdi-arrow-left</v-icon>
                  </v-row>
                  <v-row align="center" justify="center">
                      <v-col
                        cols="12"
                        sm="9"
                        md="8"
                        lg="8"
                        class="pb-7"
                      >
                          <h2 class="black--text">비밀번호 찾기</h2>
                          <hr class="my-7" />
                          <div class="text-center mb-5">
                              <h3 class="py-2">휴대폰 번호로 임시 비밀번호를 발급해드렸습니다.</h3>
                              <h3 class="py-2 success--text">{{ postloginid }}</h3>
                              <h3 class="py-2 grey--text text--lighten-2">(관리자페이지 "학원정보"란에서 변경하세요.)</h3>
                          </div>

                          <div class="text-center">
                              <v-btn color="success" @click="changetab('1')" style="width: 150px;" elevation="0">
                                  로그인
                              </v-btn>
                          </div>
                      </v-col>
                  </v-row>
                </v-card-text>
            </v-card>
          </v-tab-item>

        </v-tabs>
      </v-col>
      <Dialogs>
          <div slot="login_success">
              <v-card-text class="text-center">
                  <h4><b class="success--text">{{ uname }} 선생님!</b><br /><b>내공스터디</b>에 오신 것을 환영합니다.</h4>
              </v-card-text>
          </div>
          <div slot="login_failed">
              <v-card-text class="text-center">
                  <h4>아이디 or 비밀번호가 일치하지 않습니다.</h4>
              </v-card-text>
          </div>
      </Dialogs>
    </v-row>
</template>

<style lang="scss">
@import '@/assets/scss/views/login.scss';
</style>

<script>
import { mapState, mapActions } from "vuex";
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
            loginvalid: true,
            loginid: '',
            password: '',
            suname: '',
            uphone: '',
            inputcertnum: '',
            sloginid: '',
            pwuphone: '',
            pwinputcertnum: '',
            postcertnum: '',
            postloginid: 'daebak20',
            postdate: '(2019년 7월 29일 가입)',
            idvalid: true,
            pwvalid: true,
            rules: [
                v => !!v || '',
            ],
            tab: 'tab-1',
            tabs: 5,
        }
    },
    created () {
        if( this.$cookies.get('user') != null ){
            this.$router.push('/');
        }
    },
    methods: {
        isMobile : function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        cleardata : function () {
            this.loginid = '';
            this.password = '';
            this.suname = '';
            this.uphone = '';
            this.inputcertnum = '';
            this.postcertnum = '';
        },
        changetab : function (idx) {
            // this.cleardata();
            if( idx == 1)   this.$router.push('/login');
            else if( idx == 2)  this.$router.push('/searchid');
            else if(idx == 3)   this.$router.push('/searchpw');
            this.tab = "tab-" + idx;
        },
        enter_loginvalidate : function (e) {
            if( e.keyCode == 13 ) this.loginvalidate();
        },
        loginvalidate : function () {
            let _this = this;

            if (this.$refs.loginform.validate()) {

                this.$store.dispatch('adminlogin', {
                    loginid : this.loginid,
                    password : this.password
                });

                this.$axios.post(`${this.$store.state.host}/user/loginadmincheck`,{
                    loginid : this.loginid,
                    password : this.password,
                }).then(function (response) {

                    if( response.status == 200 ){
                        // store 저장
                        response.data.is_mobile = _this.isMobile();
                        _this.$store.commit('save_user_info', response.data);
                        _this.$cookies.set('user', response.data);

                        _this.openMyDialog("success");
                    }
                    else{
                        _this.openMyDialog("fail");
                    }

                }).catch(function (err) {
                    console.log( err );
                    _this.openMyDialog("fail");
                });

            }else{
                _this.openMyDialog("fail");
            }
        },
        idvalidate : function () {
            if (this.$refs.idform.validate()) {
                if( this.postcertnum != "" && this.inputcertnum != "" && this.postcertnum == this.inputcertnum ){
                    this.tab = 'tab-4';
                }else{
                    alert("미일치");
                }
            }
        },
        pwvalidate : function () {
            if (this.$refs.pwform.validate()) {
                if( this.postcertnum != "" && this.pwinputcertnum != "" && this.postcertnum == this.pwinputcertnum ){
                    this.tab = 'tab-5';
                }else{
                    alert("미일치");
                }
            }
        },
        postcert : function (type) {
            if(type=="id"){
                if( this.uphone != "" ){
                    alert("인증번호는 1234 입니다.");
                    this.postcertnum = 1234;
                }
            }
            else if(type=="pw"){
                if( this.pwuphone != "" ){
                    alert("인증번호는 1234 입니다.");
                    this.postcertnum = 1234;
                }
            }
        },
        openMyDialog : function (status) {
            if(status == "success"){
                bus.$emit('dialog', {
                    'status': true,
                    'name' : 'login_success',
                    'auto_close' : true,
                });
            }
            else if(status == 'fail'){
                bus.$emit('dialog', {
                    'status': true,
                    'name' : 'login_fail'
                });
            }
        },
    },
    computed : {
        ...mapState([
            'uname', 'cname', 'now_users_cnt'
        ]),
    }
};
</script>
