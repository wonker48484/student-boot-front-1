import {getItem} from "@/storage";
import {USER_INFO_KEY} from "@/config/constants";

const state={
  userInfo: getItem(USER_INFO_KEY) ? JSON.parse(getItem(USER_INFO_KEY)) : {
    id: -1,
    userName:'AAA'
  },
  //打开的tabs数组
  openedTabs:[
    {
      //打开当前tab对应的router路径
      path:'/index',
      text:"首页",
      //router的全路径
      fullPath:'/index'
    }
  ]
}

export default state
