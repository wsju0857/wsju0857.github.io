<template>
    <v-row
      id="user-alignclass"
      justify="center"
      align="stretch"
      class="height-inherit"
    >
      <v-col
        cols="6"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        class="pa-0 pr-1 height-inherit"
      >
        <div class="bg-white height-inherit">
            <v-subheader class="justify-center title grey lighten-4 ">클래스</v-subheader>

            <v-data-table
                :items-per-page="9999"
                :headers="headers_arr"
                :items="items"
                :mobile-breakpoint="10"
                :hide-default-header="true"
                :hide-default-footer="true"
                :single-expand="true"
                :show-expand="true"
                :expanded="expanded"
                :item-key="item_key"
                key="class-0"
                disable-pagination
                @click:row="toggleClassRow"
                class="border-b-1-grey border-t-1-grey"
                >

                <template v-slot:item.data-table-expand="{ expand, isExpanded }">
                    <v-icon v-if="isExpanded" @click="expand(!isExpanded)" class="info--text">mdi-menu-down</v-icon>
                    <v-icon v-if="!isExpanded" @click="expand(!isExpanded)">mdi-menu-right</v-icon>
                </template>

                <template v-slot:item.name="{ item }">
                    <span class="info--text font-weight-bold">
                        {{ item.name }}
                    </span>
                </template>

                <template v-slot:expanded-item="{ item }">

                    <td :colspan="headers_arr.length+1" class="px-0">
                        <v-simple-table class="grey lighten-4"
                        >
                          <template v-slot:default>
                            <tbody v-if="Number(item.class_id) > 0">
                                <tr>
                                    <td rowspan="2">
                                        <v-icon color="transparent">mdi-play</v-icon>
                                    </td>
                                    <td class="before-doticon font-weight-bold">수업 요일</td>
                                    <td>{{ item.sub_data.lesson_day }}</td>
                                </tr>
                                <tr>
                                    <td class="before-doticon font-weight-bold">생성일</td>
                                    <td>{{ item.sub_data.postdate }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td rowspan="2">
                                        <v-icon color="transparent">mdi-play</v-icon>
                                    </td>
                                    <td colspan="2" class="before-doticon font-weight-bold danger--text">배정된 클래스가 없습니다.</td>
                                </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                    </td>
                </template>
            </v-data-table>
        </div>

      </v-col>

      <v-col
        cols="6"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        class="pa-0 pl-1 height-inherit"
      >
        <div class="bg-white height-inherit position-relative" style="width: 100%; max-width: 800px;">
            <div class="pb-12">
                <v-subheader class="justify-center title grey lighten-4">재원생&nbsp;
                    <b v-if="select_class_id != null" class="danger--text">{{ items_2.length }}</b>
                </v-subheader>

                <v-list
                  flat
                  class="py-0"
                >

                  <v-list-item-group
                    multiple
                    v-if="items_2.length > 0"
                  >
                    <v-list-item v-for="(user, key) in items_2" :key="user.user_id"
                        class="border-b-1-grey"
                        :class="{ 'border-t-1-grey' : key == 0 }"
                        >
                      <template>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="select_user_id"
                            color="info"
                            :value="user.user_id"
                          ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title>
                              <v-row class="ma-0">
                                  <v-col cols="4" class="pa-0">
                                  {{ user.uname }}
                                  </v-col>
                                  <v-col cols="4" class="pa-0">
                                  {{ user.loginid }}
                                  </v-col>
                                  <v-col cols="4" class="pa-0">
                                  {{ user.grade }}
                                  </v-col>
                              </v-row>
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>

                  <v-list-item-group
                    multiple
                    v-else-if="expanded.length != 0"
                  >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="grey--text lighten-4 text-center">
                            배정된 학생이 없습니다.
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
            </div>

            <div v-if="items_2.length > 0" id="assign-act-footer" class="bottom-fix px-3">
                <v-row
                    v-if="0 < Number(select_class_id)"
                >
                    <v-col
                        cols="6"
                        xs="6"
                        sm="6"
                        md="6"
                        lg="6"
                        class="pa-0"
                    >
                        <v-btn block
                            :outlined="select_user_id.length == 0"
                            x-large
                            elevation='0'
                            :disabled="select_user_id.length == 0"
                            class="disabled-bg-grey font-weight-bold"
                            :class="{ 'white--text' : select_user_id.length > 0 }"
                            color="#fe8425"
                            @click="openDialogClasslist('MOVE')"
                            tile>
                            클래스 이동
                        </v-btn>
                    </v-col>
                    <v-col
                        cols="6"
                        xs="6"
                        sm="6"
                        md="6"
                        lg="6"
                        class="pa-0"
                    >
                        <v-btn block
                            outlined
                            x-large
                            :disabled="select_user_id.length == 0"
                            class="disabled-bg-grey font-weight-bold"
                            color="#fe8425"
                            @click="openDialogClasslist('DUPL')"
                            tile>
                            중복 수강
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row
                    v-else
                >
                    <v-col
                        cols="12"
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        class="pa-0"
                    >
                        <v-btn block
                            :outlined="select_user_id.length == 0"
                            x-large
                            elevation='0'
                            :disabled="select_user_id.length == 0"
                            class="disabled-bg-grey font-weight-bold"
                            :class="{ 'white--text' : select_user_id.length > 0 }"
                            color="#fe8425"
                            @click="openDialogClasslist('MOVE')"
                            tile>
                            클래스 배정
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
      </v-col>

      <Dialogs>
          <div slot="class_list">
              <v-card-title class="justify-start headline text-center pb-0 pt-8">
                  <h5>{{ this.post_target == 'MOVE' ? '클래스 이동' : '중복 수강' }}</h5>
              </v-card-title>

              <v-card-text>

                  <v-radio-group
                  v-model="change_class_id"
                  class="change_lr" hide-details >
                    <v-radio
                        v-for="(val, key) in radioClassGroup"
                        :key="key"
                        :value="val.class_id"
                        :label="val.name"
                        color="success"
                    >
                    </v-radio>
                  </v-radio-group>
              </v-card-text>

              <v-card-actions class="justify-end px-9 pb-8">
                  <v-btn text
                    v-if="this.post_target == 'MOVE'"
                    class="cursor"
                    @click="postMoveUserInClass"
                  >
                      <span class="title">확인</span>
                  </v-btn>

                  <v-btn text
                    v-if="this.post_target == 'DUPL'"
                    class="cursor"
                    @click="postMoveUserInClass"
                  >
                      <span class="title">확인</span>
                  </v-btn>
              </v-card-actions>
          </div>
      </Dialogs>
    </v-row>
</template>

<style lang="scss">
// @import '@/assets/scss/views/login.scss';
@import "@/assets/scss/_mixins";
$breakpoints: (
    xs : 600px,
    sm : 960px,
    md : 1264px,
    lg : 1904px
);
#user-alignclass {
    .v-expansion-panel {
        &>.v-expansion-panel-header {
            flex-direction: row-reverse !important;

            .v-expansion-panel-header__icon {
                margin-left: unset !important;
                margin-right: auto;
            }
        }
    }
}
#assign-act-footer {
    background-color: white;

    @include respond-below(xs) {
        width: calc(50% -44px) !important;
    }
    @include respond-between(xs,sm) {
      width: calc(50% - 94px) !important;
    }
    @include respond-between(sm,md) {
      width: calc(50% - 114px) !important;
    }
    @include respond-above(md) {
      width: calc(50% - 134px) !important;
    }
}
.after-doticon {
    width: 24px;
    height: 24px;
}
</style>

<script>
import Dialogs from "@/components/common/Dialogs"
import {bus} from '@/main'

export default {
    name: "assign-class",
    components: {
        Dialogs
    },
    data () {
        return{
            expanded: [],
            select_class_id : null,
            headers_arr : new Array(
                { text: '반명', value: 'name', align:'start',  sortable: true },
                { text: '선생', value: 'tname', align:'start', sortable: true },
            ),

            items : [],

            items_per_page : (this.$store.state.is_mobile == true ? 99999 : 10),
            hide_default_footer : (this.$store.state.is_mobile == true ? true : false),
            item_key : 'class_key',

            items_2 : [],

            select_user_id : [],
            post_target : null,
            change_class_id : null,
        }
    },
    watch : {
        expanded (value, oldValue) {
            window.console.log( value );
            if (value.length > 0) {
                this.select_class_id = value[0].class_id;
                this.getStudentInClass();
            } else {
                this.items_2.splice(0, this.items_2.length);
                this.select_class_id = null;
            }
            this.select_user_id.splice(0, this.select_user_id.length);
        },
        change_class_id (value, oldValue) {
            window.console.log( value, oldValue );
        }
    },
    methods: {
        toggleClassRow(value) {
            window.console.log(this.expanded);
            if ( !(this.expanded.length > 0 && this.expanded[0].class_id == value.class_id) ) {
                this.expanded.splice(0, 1, value);
            } else {
                this.expanded.pop();
            }
        },
        getStudentInClass() {
            const _this = this;
            const cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            const class_id = _this.select_class_id;

            this.$axios.get(
                `${this.$store.state.host}/class/` + cid + '/getstudent/' + class_id
            ).then(function (response) {

                if ( response.status == 200 ) {
                    if (response.data.length > 0) {
                        _this.items_2.splice(0, _this.items_2.length);
                        for (var [key, val] of Object.entries(response.data)) {
                            let res_data = Object.assign(response.data[key], {user_key: key});
                            _this.items_2.push(res_data);
                        }
                    }
                } else if ( response.status == 204 ) {
                    _this.items_2.splice(0, _this.items_2.length);
                }

            }).catch(function (err) {
                window.console.log( err );
            });
        },
        openDialogClasslist (val) {
            window.console.log( this.select_user_id );
            bus.$emit('dialog', { status : true ,name : 'class_list'  });
            this.post_target = val;
        },
        postMoveUserInClass (e) {
            if (null === this.post_target) return false;
            if (0 === this.select_user_id.length) return false;
            if (null === this.select_class_id) return false;
            if (null === this.change_class_id) return false;

            const _this = this;
            const cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
            const postdata = {
                old_class_id : _this.select_class_id ,
                change_class_id : _this.change_class_id,
                user_id_group : _this.select_user_id,
                mode : _this.post_target
            };

            this.$axios.post(
                `${this.$store.state.host}/class/` + cid + '/changeclass', postdata
            ).then(function (response) {
                if ( response.status == 200 ) {

                    _this.updated = _this.select_user_id;
                    _this.select_user_id.splice(0, _this.select_user_id.length);
                    _this.getStudentInClass();

                    bus.$emit('dialog', { status : false ,name : 'class_list'  });
                }

            }).catch(function (err) {
                window.console.log( err );
            });
        },
    },
    computed: {
        radioClassGroup () {
            let result = [];
            for (var i = 0; i < this.items.length; i++ ) {
                if (this.select_class_id !== this.items[i].class_id) {
                    result.push({
                        class_id: this.items[i].class_id,
                        name : this.items[i].name
                    });
                }
            }
            // console.log(result);
            return result;
        },

    },
    // beforeCreated() {
    //
    // },
    created() {
        const _this = this;
        const cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;


        this.$axios.get(
            `${this.$store.state.host}/class/` + cid + '/getclassroom'
        ).then(function (response) {
            window.console.log(response);
            if ( response.status == 200 ) {
                let tmp_items = [];
                for (var [key, val] of Object.entries(response.data)) {
                    let data = {
                        class_id : val.id,
                        name : val.name,
                        user_id : val.user_id,
                        tname : val.tname,
                        class_key : key,
                        sub_data : {
                            lesson_day : !!val.lesson_day ?  JSON.parse(val.lesson_day).join(',') : '',
                            postdate : !!val.postdate ? val.postdate.split(' ')[0].replace(/-/gi,'.') : ''
                        }
                    };
                    _this.items.push(data);
                }
            }

        }).catch(function (err) {
            window.console.log( err );
        });

        bus.$on('close_event', function(data) {
            _this.post_target = null;
        });
    }
};
</script>
