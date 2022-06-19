import axios from 'axios'
import {BASE_URL, USER_TOKEN_KEY} from "@/config/constants";
import qs from 'qs'
import {Message, MessageBox} from "element-ui";
import {clearAll, getItem} from "@/storage";
import Nprogress from "nprogress";
import 'nprogress/nprogress.css'

axios.defaults.baseURL=BASE_URL
axios.defaults.timeout=1000*60*3//单位ms
axios.defaults.headers["contentType"]="application/json"

//给axiosInstance添加拦截器
function addInterceptors(axiosInstance){

  //请求拦截器
  axiosInstance.interceptors.request.use(config =>{
      Nprogress.start()
//获取token并加入到请求头中
    let userToken=getItem(USER_TOKEN_KEY)
    //判断token是否为空
    if(userToken){
      config.headers['Authorization']=userToken
    }
    return config;
  },error =>{
    console.log("请求发送失败",error)
    MessageBox.alert("请求发送失败","错误提示")
  }
  )
  //响应拦截器
  axiosInstance.interceptors.response.use(resultWrapper =>{
    Nprogress.done()
    let result=resultWrapper.data;
    if(result.success){
      return result;
    }
    else {
      if(result.code &&result.code== 60000){
        //跳转到登录页面
        clearAll()
        //token被清除，被路由的前置守卫拦截
        window.location.reload()
      }
      else {
        MessageBox.alert(result.msg,"错误提示")
        return Promise.reject(result)
      }
    }
    },error =>{
    Nprogress.done()
      console.log("服务器响应失败",error)
      Message.error("服务器响应失败")
    return Promise.reject("服务器响应失败")
    }
  )
}
//用来发送get请求的axios实例
let getInstance=axios.create();
addInterceptors(getInstance);
//用来发送post请求的axios实例
let FormPostInstance=axios.create({
  method:"post",
  headers:{
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest:[function (data,headers){
    console.log("data:",data)
      return qs.stringify(data)
  }]
});
addInterceptors(FormPostInstance);

let appPostJsonInstance=axios.create({
  method:"post"
});
addInterceptors(appPostJsonInstance);

export function doGet(config){
  return getInstance(config)
}

export function FormPost(config){
  return FormPostInstance(config)
}

export function appJsonPost(config){
  return appPostJsonInstance(config)
}
