import router, { asyncRoutes } from './index'
// import axios from 'axios'
import { getToken } from '@/utils/auth' // get token from cookie

// 全局守卫
var getRouter = null //用来获取后台拿到的路由
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  // console.log(asyncRoutes, 'asyncRoutes');
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // console.log('beforeEach==>');
      var isAllow = localStorage.getItem('userName')
      if (!getRouter) {//避免死循环
        // { path: '*', redirect: '/404', hidden: true }404路由一定要凭借进去，不能放在静态路由里面
        asyncRoutes[0].children.push({ path: '*', redirect: '/404', hidden: true })

        console.log(asyncRoutes, 'kjgdf');
        getRouter = asyncRoutes
        router.addRoutes(asyncRoutes)
        // console.log({ ...to, replace: true }, '{ ...to, replace: true }');
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }



})

