//配置路由
import Vue from 'vue'

import login from "@/views/login";
import vueRouter from "vue-router";
import VueRouterEsm from "vue-router";
import main from "@/views/main";
import index from "@/views/index";
import studentHome from "@/views/student/studentHome";
import studentManage from "@/views/student/studentManage";
import scoreHome from "@/views/score/scoreHome";
import scoreManage from "@/views/score/scoreManage";
import addScore from "@/views/score/addScore";
import updateScore from "@/views/score/updateScore";
import {getItem} from "@/storage";
import {USER_TOKEN_KEY} from "@/config/constants";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(vueRouter)

const routes=[
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  // /score/manage
  {
    path: '/',
    name: 'Main',
    component: main,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: index,
        meta: {
          title: '首页'
        }
      },
      {
        // /student/manage(add/update....)
        path: 'student',
        name: 'StudentHome',
        component: studentHome,
        children: [
          {
            path: 'manage',
            name: 'StudentManage',
            component: studentManage,
            meta: {
              title: '学生管理'
            }
          }
        ]
      },
      {
        // /score/manage(add/update....)
        path: 'score',
        name: 'ScoreHome',
        component: scoreHome,
        children: [
          {
            path: 'manage',
            name: 'ScoreManage',
            component: scoreManage,
            meta: {
              title: '成绩管理'
            }
          },
          {
            path: 'add',
            name: 'AddScore',
            component: addScore,
            meta: {
              title: '添加成绩'
            }
          },
          {
            path: 'update',
            name: 'UpdateScore',
            component: updateScore,
            meta: {
              title: '修改成绩'
            }
          }
        ]
      }
    ]
  }
]

const router= new VueRouterEsm({
  routes
})

const IGNORE_URLS=['/','/login']
//前置守卫，进行权限控制
router.beforeEach((toRoute,fromRoute,next)=>{
    Nprogress.start()
  if(IGNORE_URLS.includes(toRoute.path)){
    //要访问的路径在白名单中
    next()
  }else{
    let token=  getItem(USER_TOKEN_KEY)
    if(token){
      return next()
    }
    //无权限跳转到登录页面
    return next({path:IGNORE_URLS[0]})
  }
})




//后置守卫
router.afterEach((toRoute,fromRoute) => {
  Nprogress.done()
  document.title= toRoute.meta.title
})
export default router
