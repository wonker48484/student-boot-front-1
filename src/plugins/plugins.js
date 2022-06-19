import {doGet,FormPost,appJsonPost} from "@/network/request";

export default {
  install(Vue){
    Vue.prototype.$doGet = doGet;
    Vue.prototype.$FormPost = FormPost;
    Vue.prototype.$appJsonPost = appJsonPost;
  }
}
