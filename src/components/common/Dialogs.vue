<style lang="scss">
    .v-card__text{
        .change_lr{
            justify-content: center;
            .v-input__control{
                width: 95%;
            }
            .v-radio .v-input--selection-controls__input{
                position: absolute;
                right: 0;
            }
            .v-radio:not(:last-child):not(:only-child){
                margin-bottom: 15px;
            }
        }
    }
</style>

<template>
    <div id="dialog_component">
        <v-dialog v-model="dialog" scrollable style="" @click:outside="close_event" max-width="480">
            <v-card>

                <!-- 로그인 -->
                <slot name="login_success" v-if="p_name == 'login_success'"></slot>
                <slot name="login_fail" v-if="p_name == 'login_fail'"></slot>

                <!-- 공지사항 -->
                <slot name="notice_open_type" v-if="p_name == 'notice_open_type'"></slot>
                <slot name="notice_open_range" v-if="p_name == 'notice_open_range'"></slot>
                <slot name="notice_back" v-if="p_name == 'notice_back'"></slot>
                <slot name="notice_add_confirm" v-if="p_name == 'notice_add_confirm'"></slot>
                <slot name="add_notice_success" v-if="p_name == 'add_notice_success'"></slot>
                <slot name="del_notice_confirm" v-if="p_name == 'del_notice_confirm'"></slot>

                <!-- 선생님 관리 -->
                <slot name="teacher_confirm" v-if="p_name == 'teacher_confirm'"></slot>
                <slot name="teacher_modify_confirm" v-if="p_name == 'teacher_modify_confirm'"></slot>
                <slot name="teacher_del_confirm" v-if="p_name == 'teacher_del_confirm'"></slot>
                <slot name="teacher_del_error" v-if="p_name == 'teacher_del_error'"></slot>
                <slot name="add_teacher_success" v-if="p_name == 'add_teacher_success'"></slot>
                <slot name="duplicate_id" v-if="p_name == 'duplicate_id'"></slot>
                <slot name="teacher_class_change" v-if="p_name == 'teacher_class_change'"></slot>
                <slot name="teacher_back" v-if="p_name == 'teacher_back'"></slot>
                <slot name="add_teacher_error" v-if="p_name == 'add_teacher_error'"></slot>

                <!-- 클래스 관리 -->
                <slot name="null_classroom" v-if="p_name == 'null_classroom'"></slot>
                <slot name="del_class_confirm" v-if="p_name == 'del_class_confirm'"></slot>
                <slot name="class_teacher_change" v-if="p_name == 'class_teacher_change'"></slot>
                <slot name="class_back_confirm" v-if="p_name == 'class_back_confirm'"></slot>
                <slot name="add_class_confirm" v-if="p_name == 'add_class_confirm'"></slot>
                <slot name="add_class_success" v-if="p_name == 'add_class_success'"></slot>
                <slot name="add_class_error" v-if="p_name == 'add_class_error'"></slot>
                <slot name="modify_class_confirm" v-if="p_name == 'modify_class_confirm'"></slot>
                <slot name="duplicate_rid" v-if="p_name == 'duplicate_rid'"></slot>

                <!-- 학생 관리 -->
                <slot name="null_class" v-if="p_name == 'null_class'"></slot>
                <slot name="null_student" v-if="p_name == 'null_student'"></slot>
                <slot name="student_select_class" v-if="p_name == 'student_select_class'"></slot>
                <slot name="student_select_grade" v-if="p_name == 'student_select_grade'"></slot>
                <slot name="student_back" v-if="p_name == 'student_back'"></slot>
                <slot name="student_confirm" v-if="p_name == 'student_confirm'"></slot>
                <slot name="student_modify_confirm" v-if="p_name == 'student_modify_confirm'"></slot>
                <slot name="add_student_error" v-if="p_name == 'add_student_error'"></slot>
                <slot name="add_student_success" v-if="p_name == 'add_student_success'"></slot>
                <slot name="class_list" v-if="p_name == 'class_list'"></slot>

                <slot name="student_quit_confirm" v-if="p_name == 'student_quit_confirm'"></slot>
                <slot name="student_recovery_confirm" v-if="p_name == 'student_recovery_confirm'"></slot>
                <slot name="student_del_confirm" v-if="p_name == 'student_del_confirm'"></slot>

                <!-- 학생 일괄등록 -->
                <slot name="add_student_multiple" v-if="p_name == 'add_student_multiple'"></slot>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {bus} from '@/main'

export default {
    data() {
        return {
            dialog: false,
            tmp : '',

            p_name: this.name,
            c_auto_close: this.auto_close,

            rto: this.to
        }
    },
    props: [
        'name', 'to', 'auto_close',
    ],
    created: function () {
        // console.log( "created" );
        var d = this;
        bus.$on('dialog', function (data)
        {

            if( data == true || data == false) d.dialog = data
            if( data.status == true || data.status == false ) d.dialog = data.status
            if( data.name ) d.p_name = data.name
            if( data.auto_close ) d.p_auto_close = data.auto_close

            // if( d.p_auto_close == true ){
            //     test = setTimeout(function(){
            //         d.close_event()
            //     }, 2000)
            // }
        })


    },
    methods: {
        close_event : function(){
            if( this.p_name == 'login_success'){
                this.$router.push('/').catch(err => {console.log('err', err);});
            }else{
                this.dialog = false;
                bus.$emit('close_event', { status: true } );
            }
        },
    }
}
</script>
