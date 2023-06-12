//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route
import AdminLyt from "@/components/adminLayout.vue"
import Login from "@/views/static/login.vue"
const routes = [
    { path: '/', name:'home',component:Login
   },
   {
    path: '/admin',
    name: 'admin',
    component: AdminLyt,
    children: [
      
      
      {
        path:'school',
        name:'admin-school',
        component:()=>import('@/views/static/school.vue')
      },
      {
        path:'department',
        name:'admin-department',
        component:()=>import('@/views/static/department.vue')
      },
      {
        path:'teacher',
        name:'admin-teacher',
        component:()=>import('@/views/static/teacher.vue')
      },
      {
        path:'addschool',
        name:'admin-addschool',
        component:()=>import('@/views/admin/addschool.vue')
      },
      {
        path:'adddepartment',
        name:'admin-adddepartment',
        component:()=>import('@/views/admin/adddepartment.vue')
      },
      {
        path:'addteacher',
        name:'admin-addteacher',
        component:()=>import('@/views/admin/addteacher.vue')
      },
      
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: AdminLyt,
    children: [
      
      {
        path: 'info',
        name: 'user-info',
        component: () => import('@/views/static/info.vue'),
      },
      
      {
        path: 'publishpaper',
        name: 'user-publishpaper',
        component:()=>import('@/views/static/publishpaper.vue')
      },
      {
        path: 'paperinfo',
        name: 'user-paperinfo',
        component:()=>import('@/views/static/paperinfo.vue')
      },
      
    ],
  },
  

    
 ]
 //创建路由管理 router
 const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHistory(),
   routes,})
   router.beforeEach((to,from,next)=>{
    //前置路由
    // if(to.name!=='cart'){
    //   next({name:'cart'})
    // }else{
    //   next();
    // }
    next();
   })
  //导出路由
 export default router  