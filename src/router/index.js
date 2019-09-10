import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import axios from 'axios'

Vue.use(Router)


export const constantRoutes = [
  // 默认跳转的路由规则
  { name: 'default', path: '/', redirect: '/site/home' },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
  },
  {
    path: '/404',
    component: () => import('@/view/404'),
  },
  // { path: '*', redirect: '/404' },
]
// 异步路由
export const asyncRoutes = [
  // 布局   每多一个children，就要加一个占位符<router-view />
  {
    path: '/site',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/site/home',
        name: 'home',
        component: () => import('@/view/home'),
        meta: { title: '首页', icon: 'home' }
      },

      {
        path: '/site/map',
        name: 'mapIndex',
        component: () => import('@/view/map/index'),
        meta: { title: '地图组件', icon: 'user' },
        children: [
          {
            path: '/site/map/initMap',
            name: 'initMap',
            component: () => import('@/view/map/initMap'),
            meta: { title: '地图初始化', icon: 'user' }
          },
          {
            path: '/site/map/pointAnimation',
            name: 'pointAnimation',
            component: () => import('@/view/map/pointAnimation'),
            meta: { title: '点位动画', icon: 'user' }
          },
          {
            path: '/site/map/long',
            name: 'long',
            component: () => import('@/view/map/long'),
            meta: { title: '龙哥', icon: 'user' },
            children: [
              {
                path: '/site/map/long/imageStatic',
                name: 'imageStatic',
                component: () => import('@/view/map/long/imageStatic'),
                meta: { title: 'imageStatic', icon: 'user' }
              },
            ]
          }
        ]
      },
      {
        path: '/site/table',
        name: 'iTable',
        component: () => import('@/view/table/index'),
        meta: { title: '表格组件', icon: 'user' },
      }
    ]
  }
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // routes: constantRoutes.concat(homeRoutes)
  routes: constantRoutes

})

const router = createRouter()

/*  重置路由 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router



