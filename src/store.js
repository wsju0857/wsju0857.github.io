import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(Vuex);
Vue.use(VueCookies);

export const store = new Vuex.Store({
// counter 라는 state 속성을 추가
	state: {
        host : 'http://106.10.52.151',
        // 이동페이지
        cr: '',

        // class 정보
        UCLASS_STUDENT_QUIT  : 10,
        UCLASS_STUDENT       : 19,
        UCLASS_ETC           : 20,
        UCLASS_TEACHER       : 21,
        UCLASS_COUNSELOR     : 22,
        UCLASS_VICEPRESIDENT : 28,
        UCLASS_PRESIDENT     : 29,

        // class 정보
        SMART_BIRTH         : 1,
        SMART_RATE          : 2,
        SMART_EVAL          : 3,

        NOTICE_ALL          : 11,
        NOTICE_NEWS         : 12,
        NOTICE_ROOM         : 13,

        HEAD_NOTICE         : 21,
        HEAD_UPDATE         : 22,
        HEAD_SERVER         : 23,

        NOTICE_RANGE_ALL    : 0,
        NOTICE_RANGE_STU    : 1,
        NOTICE_RANGE_PAR    : 2,

        // 개인정보
        uid: '',
        uname: '',
        uclass: '',
        uphone: '',
        ulogofile: '',
        is_mobile: '',

        // 학원 정보
        cid: '',
        cname: '',
        now_users_cnt: '',

        // 학습 설정
        is_random: '',
        is_skip: '',
        is_scoring: '',
        is_controllable: '',
	},
	getters: {
		getUclass_txt : () => (code) => {
            let text = '';
            switch (code) {
                case 10: text='퇴원생'; break;
                case 19: text='재원생'; break;
                case 20: text='기타'; break;
                case 21: text='선생님'; break;
                case 22: text='상담실장'; break;
                case 28: text='부원장'; break;
                case 29: text='대표원장'; break;
                default: text='오류'; break;
            }
            return text;
        },
        getUclass : () => (txt) => {
            let code = '';
            switch (txt) {
                case '퇴원생': code=10; break;
                case '재원생': code=19; break;
                case '기타': code=20; break;
                case '선생님': code=21; break;
                case '상담실장': code=22; break;
                case '부원장': code=28; break;
                case '대표원장': code=29; break;
                default: code=0; break;
            }
            return code;
        },

        getNtype_txt : () => (code) => {
            let text = '';
            switch (code) {
                case 1: text='생일축하'; break;
                case 2: text='진도안내'; break;
                case 3: text='평가알람'; break;

                case 11: text='전체공지'; break;
                case 12: text='학원소식'; break;
                case 13: text='반별공지'; break;

                case 21: text='공지사항'; break;
                case 22: text='업데이트'; break;
                case 23: text='서버점검'; break;
                default: text='Err'; break;
            }
            return text;
        },

        getNrange_txt : () => (code) => {
            let text = '';
            switch (code) {
                case 0: text='학생, 학부모'; break;
                case 1: text='학생'; break;
                case 2: text='학부모'; break;
                default: text='Err'; break;
            }
            return text;
        },
	},
	mutations: {
        checkref (state, payload) {
            state.cr = payload.cr;
        },
        save_user_info (state, payload){

            state.uid = payload.id;
            state.uname = payload.name;
            state.is_mobile = payload.is_mobile;

            state.cid = payload.academy_id;
            state.cname = payload.cname;
            state.now_users_cnt = payload.now_users_cnt;
        },
	},
	actions : {
		adminlogin({ commit }, loginObj) {

            axios
            .post('http://106.10.52.151/user/loginadmincheck', loginObj)
            .then((res) => {
                // 성공 시 token 반환
                // 토큰을 헤더에 포함시켜서 유저 정보를 요청

                // axios
                // .get  ('http://106.10.52.151/user/loginadmincheck', loginObj)
                // .then((res) => {
                //
                //     window.console.log(res);
                //     // if( res.status == 200 ){
                //     //     // store 저장
                //     //     res.data.is_mobile = this.isMobile();
                //     //     this.$store.commit('save_user_info', res.data);
                //     //     this.openMyDialog("success");
                //     // }
                //     // else{
                //     //     this.openMyDialog("fail");
                //     // }
                //
                // }).catch((err) => {
                //     window.console.log(err);
                //     // this.openMyDialog("fail");
                // });

            }).catch((err) => {
                window.console.log(err);
            });

        }
	}
});
