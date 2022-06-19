//菜单左侧列表
<template>
<div class="collapse">
  <span @click="toggleCollapse"
    :class="isCollapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'">
  </span>
<!--  菜单列表-->

   <el-menu
    :default-active="activeName"
    class="el-menu-vertical-demo"

    :collapse="isCollapsed"
    :collapse-transition="false"
    text-color="#fff"
    active-text-color="#ffd04b">
          <el-menu-item
          :index="item.path"
          v-for="item in menuList"
          :key="item.path"
                      @click="clickMenuItem(item)"
        >
          <i :class="item.iconClassName"></i>
          <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
     <div @click="logout">
       <el-menu-item
         :index="logout"
       >
         <i class="el-icon-unlock"></i>
         <span slot="title">退出</span>
       </el-menu-item>
     </div>
  </el-menu>
</div>
</template>

<script>
import menuList from "@/config/menuList";
import {clearAll} from "@/storage";

export default {
  name: "sideBar",
  data(){
    return{
      menuList: menuList,
      //ture表示折叠的
      isCollapsed: false
    }
  },
  computed:{
    activeName(){
          return this.$route.path
      }
  },
  methods:{
    toggleCollapse(){
      //修改el-aside的宽度
      if(this.isCollapsed){
        this.$emit("update:asideWith",'160px')
      }else {
        this.$emit("update:asideWith",'65px')
      }
      this.isCollapsed=!this.isCollapsed
    },
    clickMenuItem(item){
      this.$router.replace({path : item.path})
    },
    logout(){
      clearAll()
      this.$router.replace("/")
    }
  }
}
</script>

<style scoped>
.el-menu{
  border-right-width: 0;
}
.collapse{
  background-color: rgb(110,170,220);
  padding: 0;
  color: #FFFFFF;
  text-align: center;
  cursor: pointer;
  line-height: 1.5;
}
el-menu-item{
  padding-left: 0;
  text-align: left;
}
aside ul,aside li{
  background-color: #003c7f;
}
/*悬浮背景  */
li.el-submenu >>> .el-submenu__title:hover{
  background-color: rgb(0,48,102) !important;
}
.el-menu-item:focus,.el-menu-item:hover,.el-menu-item.is-active{
  background-color: rgb(0,48,102) !important;
}
</style>
