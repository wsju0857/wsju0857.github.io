<template>
    <v-app-bar
      id="headerdefault"
      fixed
      color="white"
      flat
    >
        <v-row>
            <v-col
            cols="12"
            sm="3"
            md="3"
            lg="3"
            class="py-0"
            >
                <logo-img :size='2' class="float-left"></logo-img>
                <h3 class="ml-2 float-left d-inline-block">관리자모드</h3>
                <div style="clear-both"></div>
                <!-- <v-divider
                  class="mx-5"
                  inset
                  vertical
                ></v-divider> -->
            </v-col>
            <v-col
            cols="12"
            sm="9"
            md="9"
            lg="9"
            class="py-0"
            >
                <v-tabs
                  v-model="tab"
                  background-color="white"
                  color="black"
                  class="elevation-0"
                  dark
                  hide-slider
                >
                  <!-- <v-tabs-slider></v-tabs-slider> -->

                  <v-tab :key="1" to="/1">
                    초기화면
                  </v-tab>
                  <v-tab :key="2" to="/student">
                    학생관리
                  </v-tab>
                  <v-tab :key="3" to="/2">
                    수업준비
                  </v-tab>
                  <v-tab :key="4" to="/3">
                    성적분석
                  </v-tab>
                  <v-tab :key="5" to="/4">
                    진단평가
                  </v-tab>
                  <v-tab :key="6">
                      <v-btn text icon color="grey" x-large absolute right @click="$router.go(-1)">
                        <v-icon>mdi-power-standby</v-icon>
                      </v-btn>
                  </v-tab>
                </v-tabs>

                <div class="default-divider"></div>
            </v-col>
            <!-- <logo-img :size='2' href='/'></logo-img>
            <h3 class="ml-2">관리자모드</h3> -->
            <!-- <v-divider
              class="mx-5"
              inset
              vertical
            ></v-divider>
            <v-tabs
              v-model="tab"
              background-color="white"
              color="black"
              class="elevation-0"
              dark
              hide-slider
            > -->
              <!-- <v-tabs-slider></v-tabs-slider> -->

              <!-- <v-tab :key="1" to="/1">
                초기화면
              </v-tab>
              <v-tab :key="2" to="/student">
                학생관리
              </v-tab>
              <v-tab :key="3" to="/2">
                수업준비
              </v-tab>
              <v-tab :key="4" to="/3">
                성적분석
              </v-tab>
              <v-tab :key="5" to="/4">
                진단평가
              </v-tab>
              <v-tab :key="6">
                  <v-btn text icon color="grey" x-large absolute right @click="$router.go(-1)">
                    <v-icon>mdi-power-standby</v-icon>
                  </v-btn>
              </v-tab>
            </v-tabs>

            <div class="default-divider"></div> -->
        </v-row>

    </v-app-bar>
</template>

<style lang="scss">
@import '@/assets/scss/components/HeaderDefault.scss';
</style>

<script>
import LogoImg from "@/components/common/LogoImg";

export default {
    components : {
        LogoImg
    },
    data () {
        return {
            tab: null,
        }
    },
};
</script>
