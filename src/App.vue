<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import {BASE_URL, USER_INFO_KEY} from '@/config/constants'
import {saveItem} from "@/storage";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  computed:{
    userInfo(){
      return this.$store.getters.userInfo
    }
  },
  // ...mapGetters["userInfo"],
  methods:{
    saveUserInfo(){
        saveItem(USER_INFO_KEY,this.userInfo)
    }
  },
  mounted () {
    console.log('baseUrl=', BASE_URL)
    //页面销毁之前回调
    window.addEventListener("unload", this.saveUserInfo)
  }
}
</script>

<style>
html,body,#app{
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
