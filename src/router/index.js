import { createRouter, createWebHashHistory } from 'vue-router'
import RoutesConfig from './config'
import store from '../store/index'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/mainbox.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

RoutesConfig.forEach(item => {
  router.addRoute('mainbox', item)
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      // ElMessage.error('登录信息失效，请重新登录')
      next()
      // ElMessage.error('登录信息失效，请重新登录')
      // next({
      //   path: '/login'
      // })
    } else {
      console.log('获取到token了');
      if (!store.state.isGetterRouter) {//判断是否为第一次
        
        router.removeRoute('mainbox')// 重新配置mainbox
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        console.log(router);
        next()
      }
    }
  }
})

const ConfigRouter = () => {

  // 判断当前主路由中是否存在mainbox
  if(!router.hasRoute("mainbox")){
    router.addRoute(  {
      path: "/mainbox",
      name: "mainbox",
      component:  () => import('../views/mainbox.vue')
    })
  }
  RoutesConfig.forEach(item => {
    router.addRoute('mainbox', item)
  })

  store.commit('changeGetterRouter', true)
}

export default router
