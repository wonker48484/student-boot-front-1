<template>
<div>
<!--  value表示要激活名字为value的tab-->
  <el-tabs :value="activeTabName"
           @tab-click="tabClick"
           @tab-remove="closeTab">
    <el-tab-pane
      v-for="item in openedTabs"
      :name="item.path"
      :key="item.path"
      :label="item.text"
      :closable="item.path !== '/index'"
    >

    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {
  name: "tabs",
  computed:{
    activeTabName(){
      return this.$route.path
    }
  },
  props:{
    "openedTabs":{
      type: Array,
      required: true
    }
  },
  watch:{
    $route:{
      immediate:true,
      handler(newVal,oldVal){
        console.log(newVal,oldVal)
        //路由对象转成tab存储到vuex
        let tab={
          path:newVal.path,
          text:newVal.meta.title,
          //保存地址栏的参数
          fullPath:newVal.fullPath
        }
        this.$store.dispatch("addTabIfNotExist",tab);
      }
    }
  },
  methods:{
    //回显已有tab的内容
    tabClick(tab){
      let clickedTab=this.openedTabs.find(valObj => valObj.path === tab.name)
      this.$router.replace(clickedTab.fullPath)
    },
    //关闭tab
    closeTab(tabName){
        //关闭的不是激活项时
      if(tabName !== this.activeTabName){
        this.$store.dispatch("closeTab",tabName)
        return
      }
      //关闭后，激活紧挨着的一个tab
      let tabToCloseIndex=this.openedTabs.findIndex(valObj => valObj.path === tabName);
      let tabToActive=this.openedTabs[tabToCloseIndex-1];
      //改变地址栏的地址
      this.$router.replace(tabToActive.fullPath)
      //关闭tab
      this.$store.dispatch("closeTab",tabName)
    }
  }
}
</script>

<style scoped>

</style>
