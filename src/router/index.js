import Vue from "vue";
import Router from "vue-router";

// 초기화면
import StartNotice from "../views/startpage/Notice";
import StartNoticeOper from "../views/startpage/NoticeOper";
import StartAdminInfo from "../views/startpage/AdminInfo";

// 학생관리
import UserTeacher from "../views/user/Teacher";
import UserTeacherOper from "../views/user/TeacherOper";
import UserClass from "../views/user/Class";
import UserClassOper from "../views/user/ClassOper";
import UserStudent from "../views/user/Student";
import UserStudentOper from "../views/user/StudentOper";
import UserStudentExcel from "../views/user/StudentExcel";
import UserAssignClass from "../views/user/AssignClass";


Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
          name: "index",
          path: "/",
          meta: { layout : "layout-default" },
          component: () => import("@/views/Index"),
        },
        {
          name: "login",
          path: "/login",
          meta: { layout : "layout-login" },
          component: require("@/views/Login").default
        },
        {
          name: "startpage",
          path: "/startpage",
          meta: { layout : "layout-default" },
          component: () => import("@/views/startpage/Index"),
          children: [
              {
                path: "",
                name: "startpage-index",
                component: UserTeacher
              },
              {
                path: "notice",
                name: "startpage-notice",
                component: StartNotice
              },
              {
                path: "noticeoper",
                name: "startpage-notice-oper",
                component: StartNoticeOper
              },
              {
                path: "studyview",
                name: "startpage-studyview",
                component: UserTeacher
              },
              {
                path: "manual",
                name: "startpage-manual",
                component: UserTeacher
              },
              {
                path: "errorreport",
                name: "startpage-errorreport",
                component: UserTeacher
              },
              {
                path: "paymentview",
                name: "startpage-paymentview",
                component: UserTeacher
              },
              {
                path: "admininfo",
                name: "startpage-admininfo",
                component: StartAdminInfo
              },
          ]
        },
        {
          name: "user",
          path: "/user",
          meta: { layout : "layout-default" },
          component: () => import("@/views/user/Index"),
          children: [
              {
                path: "",
                name: "user-index",
                component: UserTeacher
              },
              {
                path: "teacher",
                name: "user-teacher",
                component: UserTeacher
              },
              {
                path: "teacheroper",
                name: "user-teacher-oper",
                component: UserTeacherOper
              },
              {
                path: "class",
                name: "user-class",
                component: UserClass
              },
              {
                path: "classoper",
                name: "user-class-oper",
                component: UserClassOper
              },
              {
                path: "student",
                name: "user-student",
                component: UserStudent
              },
              {
                path: "studentoper",
                name: "user-student-oper",
                component: UserStudentOper
              },
              {
                path: "studentexcel",
                name: "user-studentexcel",
                component: UserStudentExcel
              },
              {
                path: "assignclass",
                name: "user-assignclass",
                component: UserAssignClass
              }
          ]
        },
        {
          name: "lesson",
          path: "/lesson",
          meta: { layout : "layout-default" },
          component: () => import("@/views/lesson/Index")
        },
        {
          name: "analysis",
          path: "/analysis",
          meta: { layout : "layout-default" },
          component: () => import("@/views/analysis/Index")
        },
        {
          name: "exam",
          path: "/exam",
          meta: { layout : "layout-default" },
          component: () => import("@/views/exam/Index")
        },
    ]
});
