<template>
    <v-row id="adminindexvue" align="start" justify="start">
        <v-col
            cols="4"
            sm="4"
            md="4"
            lg="4"
            class="main-col pr-0 py-0"
        >
            <div>
                <v-card
                class="mx-auto"
                >

                    <div class="main-title text-center grey lighten-4" style="height: 100%; position: relative;">
                      <span>학원 정보</span>
                      <div class="mt-arrow">
                          <v-btn fab text icon large elevation='0' class="mr-1" color="grey" to="/book">
                            <v-icon dark>mdi-chevron-right</v-icon>
                          </v-btn>
                      </div>
                    </div>
                    <div class="main-student-info-wrap">
                        <v-row>
                            <v-col
                                cols="5"
                                sm="5"
                                md="5"
                                class="pl-8"
                            >
                                <div class="main-student-info-img cursor" style="height: 50%;">
                                    <v-img src="../assets/images/info.jpeg" cover class="info-img" style="height: 100%;"></v-img>
                                    <v-btn elevation=0 x-small block class="btn-darkgray" >편집</v-btn>
                                </div>
                            </v-col>
                            <v-col
                                cols="7"
                                sm="7"
                                md="7"
                                class="pl-0 pr-8"
                            >
                                <div class="main-student-info-text">
                                    <div class="academy_name" style="border: 1px solid lightgray;">
                                        <v-simple-table>
                                            <tbody>
                                                <tr>
                                                    <td class="text-center">
                                                        <b>{{ cname }}</b>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-simple-table>
                                    </div>
                                    <div class="user_name" style="border: 1px solid lightgray;">
                                        <v-simple-table>
                                            <tbody>
                                                <tr>
                                                    <td class="text-center">
                                                        <b>{{ uname }}</b>
                                                        <v-icon dark color="grey" class="mt-arrow">mdi-chevron-right</v-icon>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-simple-table>
                                    </div>
                                </div>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                                class="text-center"
                            >
                                <div style="padding: 0 1.3rem;">
                                    <v-btn elevation="0" rounded style="width: 100%;">
                                        현재 사용 학생 수&nbsp;<b class="success--text">{{ now_users_cnt }}명</b>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </div>

                    <div class="main-title text-center grey lighten-4" style="height: 100%; position: relative;">
                      내공학습 관리
                      <div class="mt-arrow">
                          <v-btn fab text icon large elevation='0' class="mr-1" color="grey" to="/book" >
                            <v-icon dark>mdi-chevron-right</v-icon>
                          </v-btn>
                      </div>
                    </div>

                    <div class="main-nav-buttons-1">
                        <v-row class="py-4">
                            <v-col class="py-0 pr-0">
                                <v-btn x-large tile block text to="/leaderboard">리더보드</v-btn>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col class="py-0 pl-0">
                                <v-btn x-large tile block text to="/incorrectnote">오답노트</v-btn>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="py-0 pr-0">
                                <v-btn x-large tile block text to="/settings">학습설정</v-btn>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col class="py-0 pl-0">
                                <v-btn x-large tile block text to="/guide-error">사용 설명서</v-btn>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                    </div>
                    <div class="main-footer-padding">
                    </div>
                    <div class="main-footer font-weight-thin text-center subtitle-1 py-3">
                        <span>내공스터디 v. 1.1.0</span>
                        <v-btn fab icon x-small dressed elevation='0' class="ml-1 grey" color="white" >
                          <v-icon dark>mdi-autorenew</v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </v-col>
        <v-col
            cols="8"
            xs="8"
            sm="8"
            md="8"
            lg="8"
            class="main-col py-0"
        >
            <v-row>
                <v-col
                cols="12"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                class="py-0 top-col"
                style="padding-right: 6px;"
                >
                    <v-card>
                        <v-card-title>
                            <div style="width: 50%;"><h5>학습 현황</h5></div>
                            <div style="width: 50%;">
                                <v-select
                                  :items="sel_list"
                                  label="Today"
                                  solo
                                  dense
                                  rounded
                                  outlined
                                  single-line
                                  hide-details
                                  color="success"
                                ></v-select>
                            </div>
                        </v-card-title>
                        <v-card-text class="py-2">
                            <v-row>
                            <!-- <v-col class="pa-0 text-center">
                                <vprogress
                                    :psize="70"
                                    :pwidth="8"
                                    :pvalue="70"
                                    pcolor="#0cc2f4"
                                    :ptextstatus="true"
                                    ptext="점"
                                ></vprogress>
                            </v-col>
                            <v-col class="pa-0 text-center">
                                <vprogress
                                    :psize="70"
                                    :pwidth="8"
                                    :pvalue="70"
                                    pcolor="#0cc2f4"
                                    :ptextstatus="true"
                                    ptext="점"
                                ></vprogress>
                            </v-col>
                            <v-col class="pa-0 text-center">
                                <vprogress
                                    :psize="70"
                                    :pwidth="8"
                                    :pvalue="70"
                                    pcolor="#0cc2f4"
                                    :ptextstatus="true"
                                    ptext="점"
                                ></vprogress>
                            </v-col> -->
                            </v-row>
                        </v-card-text>
                        <v-card-actions style="justify-content: center;">
                            Details
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col
                cols="12"
                xs="6"
                sm="6"
                md="6"
                lg="6"
                class="py-0 top-col"
                style="padding-left: 6px;"
                >
                    <v-card>
                        <v-card-title>
                            <div style="width: 50%;"><h5>학습량 조회</h5></div>
                            <div style="width: 50%;">
                                <v-select
                                  :items="sel_list"
                                  label="Today"
                                  dense
                                  solo
                                  rounded
                                  outlined
                                  single-line
                                  hide-details
                                  color="success"
                                ></v-select>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                class="py-0 bot-col"
                >
                    <v-card>

                    </v-card>
                </v-col>
            </v-row>
        </v-col>

    </v-row>
</template>

<style lang="scss">
@import "@/assets/scss/views/index.scss";
</style>

<script>
// import { mapGetters } from "vuex";
import vprogress from '@/components/common/Progress';
import {mapState} from 'vuex';

export default {
    name: "index",
    components: {
        vprogress,
    },
    data: () => ({
      dense: false,
      fixedHeader: false,
      height: 300,
      sel_list: ['Today', 'Week', 'Year'],

      uname : '',
      cname : '',
    }),
    created : function () {
        this.cname = this.$cookies.get('user').cname;
        this.uname = this.$cookies.get('user').name;
    },
    computed : {
        ...mapState([
            // 'uname', 'cname', 'now_users_cnt'
        ]),
    }
};
</script>
