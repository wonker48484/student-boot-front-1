const menuList=[
  {
  //跳转到哪里与路由保持一致
  path: '/index',
  comName: 'Index',
  //菜单的名字
  menuName:'首页',
  //图标的css类名称
  iconClassName: 'el-icon-s-home'
},
  {
    //跳转到哪里与路由保持一致
    path: '/student/manage',
    comName: 'StudentManage',
    //菜单的名字
    menuName:'学生管理',
    //图标的css类名称
    iconClassName: 'el-icon-s-custom'
  },
  {
    //跳转到哪里与路由保持一致
    path: '/score/manage',
    comName: 'ScoreManage',
    //菜单的名字
    menuName:'成绩管理',
    //图标的css类名称
    iconClassName: 'el-icon-s-flag'
  },
]
export default menuList
