import {STORE_USER_INFO} from './mutations-type'
export default {
  storeUserInfo(context, payload) {
    context.commit(STORE_USER_INFO, payload)
  },
  addTabIfNotExist(context,tabToAdd){
    //判断state是否存在要添加的tab
    let existFlag=context.state.openedTabs.some(obj => obj.path === tabToAdd.path)
    if(existFlag){
      return
    }
    //不存在则加入
    context.commit("addTab",tabToAdd)
  },
  closeTab(context,tabName) {
    context.commit("closeTab",tabName)
  }
}
