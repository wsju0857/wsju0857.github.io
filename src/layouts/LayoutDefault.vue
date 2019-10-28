<style lang="scss" >
@import "@/assets/scss/_mixins";
$breakpoints: (
    xs : 600px,
    sm : 960px,
    md : 1264px,
    lg : 1904px
);


    .resize-width-logo {
        width: 103px !important;
        @include respond-between(xs,sm) {
          width: 163px !important;
        }
        @include respond-between(sm,md) {
          width: 203px !important;
        }
        @include respond-above(md) {
          width: 243px !important;
        }
    }
    #default-navigation-drawer {

        .v-list-group__header:after {
            content: "";
            position:absolute;
            width: 0.4rem;
            top: 4px;
            bottom: 4px;
            left: 0;
            background-color: #9e9e9e;
        }
        .v-list-group--active .v-list-group__header:after {
            background-color: #1bd05b !important;
        }
        .v-list-item__icon.v-list-group__header__prepend-icon {
            margin-right: 0 !important;
        }
        .v-list-item__icon.v-list-group__header__append-icon {
            justify-content: start;
        }
        .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
            color : #9e9e9e !important;
        }
        .v-list-item--active .before-doticon:before {
            border-color: #1bd05b !important;
        }
        .border-top-grey-3 {
            border-top: 1px solid #eeeeee !important;
        }
        &.v-navigation-drawer--mini-variant {
            .before-doticon {
                &.pl-7 {
                    padding-left: 0 !important;
                }
                &:before {
                    display: none !important;
                }
            }
        }
    }


</style>


<template>
    <v-app id="default-layout">
        <v-navigation-drawer
          id="default-navigation-drawer"
          v-if="['', 'index'].indexOf(main_active) == -1"
          clipped
          :mini-variant="$vuetify.breakpoint.xsOnly"
          permanent
          app
          overflow
          :width="resizeWidth"
          class="grey lighten-3"
        >
          <v-list expand class="py-0 grey lighten-2">

              <v-list-group
                :key="main_active"
                v-model="showsublist"
                :prepend-icon="sub_title_icon[main_active]"
                append-icon="mdi-chevron-down"
                color="success"
              >
                <template v-slot:activator>
                  <v-list-item class="pl-1">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold" :class="{ 'success--text' : showsublist }">
                        {{ '내공 ' + main_category[main_active] }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-list-item
                  v-for="(child, key) in sub_category[main_active]"
                  :key="key"
                  :to="{ name : main_active + '-' + key }"
                  class="border-top-grey-3"
                >
                <!-- :to="{ }" -->
                  <!-- <v-list-item-action v-if="child.icon">
                    <v-icon>{{ child.icon }}</v-icon>
                  </v-list-item-action> -->
                  <v-list-item-content class="pl-7 before-doticon">
                    <v-list-item-title class="font-weight-bold">
                      {{ child }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>

          </v-list>
        </v-navigation-drawer>

        <v-app-bar
          id="headerdefault"
          clipped-left
          color="white"
          flat
          elevation=1
          app
        >
          <v-toolbar-title
            class="ml-0 pl-1 resize-width-logo"
          >
            <router-link to="/">
              <span class="title">관리자모드</span>
            </router-link>
          </v-toolbar-title>
          <v-divider
            class="py-2"
            inset
            vertical
          ></v-divider>


            <v-tabs
              align-with-title
              background-color="transparent"
              color="black"
              class="elevation-0"
              hide-slider
            >
              <v-tab v-for="(cat, key) in main_category" class="title font-weight-bold" :key="key" :to="{ name : key + '-' + default_sub_category[key] }">{{ cat }}</v-tab>
            </v-tabs>

            <v-btn text icon color="grey" x-large absolute right @click="$router.go(-1)">
              <v-icon>mdi-power-standby</v-icon>
            </v-btn>

        </v-app-bar>

        <v-content class="bg-default">
            <v-container fluid class="body-default">
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
// import LogoImgAdmin from "@/components/common/LogoImgAdmin";

export default {
    components: {
        // LogoImgAdmin
    },
    data () {
        return {
            drawer: null,
            main_category : {
                'startpage' : '초기화면',
                'user' : '학생관리',
                'lesson' : '수업준비',
                'analysis' : '성적분석',
                'exam' : '진단평가',
            },
            main_active : '',
            sub_category : {
                'startpage' : {
                    'notice' : '공지사항',
                    'studyview' : '간편 학습조회',
                    'manual' : '사용 설명서',
                    'errorreport' : '문제 해결',
                    'paymentview' : '이용료 조회',
                    'admininfo' : '관리자 정보'
                },
                'user' : {
                    'teacher' : '선생님 관리',
                    'class' : '클래스 관리',
                    'student' : '학생 관리',
                    'studentexcel' : '학생 일괄등록',
                    'assignclass' : '클래스 배정'
                },
                'lesson' : {
                    'schedule' : '스케쥴 설정',
                    'bookmaking' : '교재 만들기',
                    'booklist' : '교재 목록',
                    'bookprint' : '교재 출력',
                    'testprint' : '시험지 출력',
                    'testmanaging' : '시험지 관리'
                },
                'analysis' : {
                    'reportview' : '레포트 조회',
                    'individualtotal' : '개인별 종합분석',
                    'counsel' : '상담일지',
                    'leaderboard' : '리더보드'
                },
                'exam' : {
                    '1': '3',
                    '2': '4',
                }
            },
            sub_active : '',
            sub_title_icon : {
                'startpage' : 'mdi-home',
                'user' : 'mdi-account-circle-outline',
                'lesson' : 'mdi-signal', //
                'analysis' : 'mdi-file-document-box-search-outline',
                'exam' : 'mdi-pen'
            },
            default_sub_category : {
                'startpage' : 'notice' ,
                'user' : 'teacher' ,
                'lesson' : 'schedule' ,
                'analysis' : 'reportview' ,
                'exam' : '1'
            },
            showsublist : true,
        }
    },
    watch: {
        $route(to, from) {
            let splited = to.name.split('-');
            this.main_active = splited[0];
            this.sub_active = splited[1];
            this.showsublist = true;
            window.console.log( splited );
        }
    },
    computed : {
        resizeWidth () {
            let width = 120;
            if (this.$vuetify.breakpoint.smOnly) {
                width = 180;
            }
            if (this.$vuetify.breakpoint.mdOnly) {
                width = 220;
            }
            if (this.$vuetify.breakpoint.lgAndUp) {
                width = 260;
            }
            return width
        }
    },
    mounted () {
        console.log( "mounted lay" );
    },
    created () {

    }
};
</script>
