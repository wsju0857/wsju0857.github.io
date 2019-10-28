<template>
    <v-row
      id="student-excel"
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
                <div class="position-relative">
                    <div class="dotted mr-2"></div>
                    <h2 class="d-inline-block">학생 일괄등록</h2>
                    <h3 class="d-inline-block grey--text pl-2"><small> 엑셀파일로 학생을 일괄 등록합니다.</small></h3>
                    <v-btn right depressed absolute tile small color="warning" class="right-0" @click="downloadSample">
                        <b>엑셀 양식 다운로드</b>
                    </v-btn>
                </div>
                <v-divider class="my-2"></v-divider>
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete" @vdropzone-success="uploadSuccess" >

                </vue-dropzone>
                <div class="width-100 py-3"></div>

                <v-form
                    v-if="excel_data.length > 0"
                    ref="excelform"
                    lazy-validation
                    id="excelform"
                    @submit="formSubmit"
                >
                <v-simple-table class="custom-table">

                    <template v-slot:default>
                        <colgroup>
                            <col width="12%" />
                            <col width="12%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="12%" />
                        </colgroup>
                      <thead>
                        <tr>
                          <th class="text-left">이름</th>
                          <th class="text-left">연락처</th>
                          <th class="text-left">아이디</th>
                          <th class="text-left">비밀번호</th>
                          <th class="text-left">학교명</th>
                          <th class="text-left">학년</th>
                          <th class="text-left">생년월일</th>
                          <th class="text-left">학부모 이름</th>
                          <th class="text-left">학부모 연락처</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, key1) in excel_data" :key="'r-'+key1">
                          <td v-for="(col, key2) in row" :key="'c-'+key2">
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="0 == key2"
                                  name="names[]"
                                  v-model="excel_data[key1][key2]"
                                  :rules="nameRules"
                                  required
                                  solo single-line dense flat hide-details
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="필수항목"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="1 == key2"
                                  name="phones[]"
                                  v-model="excel_data[key1][key2]"
                                  :rules="phoneRules"
                                  required
                                  solo single-line dense flat hide-details
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="필수항목"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="2 == key2"
                                  name="loginids[]"
                                  v-model="excel_data[key1][key2]"
                                  :rules="loginidRules"
                                  required
                                  solo single-line dense flat hide-details
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="필수항목"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="3 == key2"
                                  name="passes[]"
                                  v-model="excel_data[key1][key2]"
                                  :rules="passRules"
                                  required
                                  solo single-line dense flat hide-details
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="필수항목"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="4 == key2"
                                  name="schools[]"
                                  v-model="excel_data[key1][key2]"
                                  solo single-line dense flat hide-details
                                  placeholder="학교명"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="5 == key2"
                                  name="grades[]"
                                  v-model="excel_data[key1][key2]"
                                  solo single-line dense flat hide-details
                                  placeholder="학년"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="6 == key2"
                                  name="births[]"
                                  v-model="excel_data[key1][key2]"
                                  solo single-line dense flat hide-details
                                  :rules="birthRules"
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="생년월일"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="7 == key2"
                                  name="parentnames[]"
                                  v-model="excel_data[key1][key2]"
                                  solo single-line dense flat hide-details
                                  :rules="parentnameRules"
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="학부모 이름"
                                  ></v-text-field>
                              <v-text-field
                                  :id="'s-'+key1+'-'+key2"
                                  v-if="8 == key2"
                                  name="parentphones[]"
                                  v-model="excel_data[key1][key2]"
                                  solo single-line dense flat hide-details
                                  :rules="parentphoneRules"
                                  @update:error="setFieldError($event, 's-'+key1+'-'+key2)"
                                  placeholder="학부모 연락처"
                                  ></v-text-field>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                </v-simple-table>
                <div class="text-center width-100 pa-5">
                    <v-btn color="success" type="button" min-width="100" @click="openDialog"><b class="subtitle-1">등록</b></v-btn>
                </div>

                <v-btn id="submit-btn" type="submit" class="d-none"></v-btn>

            </v-form>

            </v-sheet>
        </v-col>

        <Dialogs>

            <div slot="add_student_multiple">
                <v-card-text class="text-center">
                    <h4><b>학생을 등록하시겠습니까?</b></h4>
                </v-card-text>

                <!-- Two Button -->
                <v-card-actions class="pa-0" style="border-top: 1px solid lightgray;">
                    <v-btn x-large text style="border-radius: 0; border-bottom-left-radius: 4px; border-right: 1px solid lightgray; width: 50%" type="submit" @click="triggerForm">
                        <b class="success--text">확인</b>
                    </v-btn>
                    <v-btn x-large class="ml-0" text style="width:50%;" @click="closeDialog">
                        <b>취소</b>
                    </v-btn>
                </v-card-actions>
            </div>

        </Dialogs>
    </v-row>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Dialogs from "@/components/common/Dialogs"
import {bus} from '@/main'

export default {
  name:'studentexcel',
  components: {
    vueDropzone: vue2Dropzone,
    Dialogs
  },
  data: function () {
    return {
      dropzoneOptions: {
          url: '${this.$store.state.host}/uploadstudentexcel',
          thumbnailWidth: 150,
          thumbnailheight: 106,
          maxFilesize: 10,
          chunking: true,
          headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Accept' : 'application/json, text/html'
              // 'Accept' : 'text/html'
          },
          dictDefaultMessage : 'Drag and drop Files Here to Upload.<br/><br/><div class="v-btn v-btn--depressed v-btn--tile theme--light v-size--small info text-lowercase subtitle-1" >Choose Files</div>'
      },

      excel_data: [],
      // error update 에 반영 안됨 -> 처리해야함
      valid: true,
      nameRules: [
          v => (v && v.length < 25 && v.length > 1) || ''
      ],
      phoneRules: [
          v => (v && v.length < 12 && v.length > 9 && new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test(v) ) || ''
      ],
      loginidRules: [
          v => (v && v.length > 3 && v.length < 25 && new RegExp(/^[A-Za-z0-9_]+$/).test(v) ) || ''
      ],
      passRules: [
          v => (v && v.length > 3 && v.length < 25 && new RegExp(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/).test(v) ) || ''
      ],
      birthRules: [
          v => (!v || new RegExp(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).test(v) ) || ''
      ],
      parentnameRules: [
          v => (!v || (v.length < 25 && v.length > 1) ) || ''
      ],
      parentphoneRules: [
          v => (!v || (v.length < 12 && v.length > 9 && new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test(v) ) ) || ''
      ],
    }
  },
  methods : {
      downloadSample() {
          this.$axios({
            url: `${this.$store.state.host}/studentexcelsample`,
            method: 'GET',
            responseType: 'blob', // important
            headers: { 'Accept': 'application/vnd.ms-excel' },
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'example.xlsx');
            document.body.appendChild(link);
            link.click();
          });
      },
      afterComplete(file, response) {
          window.console.log(file, response);
      },
      uploadSuccess (file, response) {
          window.console.log(file, response);
          for(var i=0; i < response.length; i++) {
              this.excel_data.push(response[i]);
          }
          //this.$refs.excelform.validate();
      },
      showError(a,b,c) {
          window.console.log(a, b, c);
      },
      setFieldError(err, id) {
          let field = document.getElementById(id).parentNode.parentNode.parentNode.parentNode;
          // if (err) {
          //     field.classList.add( 'error--text' );
          // } else if (field.classList.contains( 'error--text' )) {
          //     field.classList.remove( 'error--text' );
          // }

      },
      openDialog() {
          bus.$emit('dialog', {
              status : true,
              name: 'add_student_multiple'
          });
      },
      closeDialog() {
          bus.$emit('dialog', {
              status : false,
              name: 'add_student_multiple'
          });
      },
      triggerForm() {
          // this.$parent.$children[0].$refs.excelform.$el.submit()
          document.getElementById('submit-btn').click();
      },
      formSubmit (event) {
        const _this = this;
        const cid = /* this.$store.state.cid */ this.$cookies.get('user').academy_id;
        let form = document.getElementById(event.target.id);
        event.preventDefault();
        // let data = new URLSearchParams(Array.from(new FormData(form))).toString();
        let setValue = function(name) {
            let el = this.elements[name+'[]'];
            let re = [];
            for(let i=0; i< el.length; i++) {
                re.push(el[i].value);
            }
            return re;
        };
        let form_names = ['names', 'phones', 'loginids', 'passes', 'schools', 'grades', 'births', 'parentnames', 'parentphones'];

        let data = {};

        for (let i = 0; i < form_names.length ; i++) {
            data[form_names[i]] = setValue.call(form, form_names[i]);
        }

        this.$axios.post(`${this.$store.state.host}/user/` + cid + '/addstudentmultiple', data).then(function(response){
            console.log( response );
            if(response.status == 200){
                _this.$router.push({name:'user-assignclass'});
            }
        }).catch(function(err){
            console.log(err);
        });
      }
      // validate () {
      //   if (this.$refs.excelform.validate()) {
      //     this.snackbar = true;
      //   }
      // },
  }

}
</script>

<style lang="scss">
.vue-dropzone {
    border-style: dashed;
    padding: 16px;
    .dz-preview.dz-file-preview {
        width: 100px;
        height: 100px;
        margin: 6px;
        .dz-image {
            z-index: 2;
        }
        .dz-details {
            padding: 18px 8px;
            z-index: 3;
            .dz-size {
                margin-bottom: 10px;
            }
            .dz-filename {
                white-space: normal;
                word-break: break-all;
            }
        }
    }
}

#excelform {
    tbody tr:hover:not(.v-data-table__expanded__content) {
        background: transparent !important;
    }

    td {
        padding: 0 2px;
        .v-input__slot {
            padding: 0 1px;
            input {
                font-size: 0.9rem;

            }


        }
        .v-input.error--text {
            border: 1px solid red;
            background-color: #ffe4e4 !important;
            input::placeholder {
              color: red;
            }
        }
    }
}
</style>
