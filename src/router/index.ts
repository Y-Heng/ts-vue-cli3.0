import Vue from 'vue'
import VueRouter from 'vue-router'
import layout_full from '@/layout/full/index.vue'

Vue.use(VueRouter)

/*
  hidden: false, 是否导航条显示
  meta: {
    title: '', // 默认空，页面标题,用于导航栏显示
    icon: '', 图标
    roles: '', // 权限码 为空都展示
  }
*/

// 动态路由配置
export const constantRouterMap = [
  {
    name: 'dashboard',
    path: '',
    component: layout_full,
    redirect: '/dashboard',
    meta: {
      title: 'dashboard',
      icon: 'star'
    },
    children: [
      {
        name: 'dashboards',
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue'),
        meta: {
          title: 'dashboard',
          icon: 'star'
        }
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: layout_full,
    redirect: '/home/demo1',
    alwaysShow: true,
    meta: {
      title: 'home',
      icon: 'star'
    },
    children: [
      {
        name: 'home_demo1',
        path: 'demo1',
        component: () => import(/* webpackChunkName: "home-demo1" */ '@/views/home/demo1.vue'),
        meta: {
          title: 'demo1',
          icon: 'star',
          roles: 888
        }
      },
      {
        name: 'home_demo2',
        path: 'demo2',
        component: () => import(/* webpackChunkName: "home-demo2" */ '@/views/home/demo2.vue'),
        meta: {
          title: 'demo2',
          icon: 'star',
          roles: 888
        }
      },
      {
        name: 'home_demo3',
        path: 'demo3',
        component: () => import(/* webpackChunkName: "home-demo3" */ '@/views/home/demo3.vue'),
        meta: {
          title: 'demo3',
          icon: 'star'
        }
      }
    ]
  },
  {
    path: '/other',
    name: 'other',
    component: layout_full,
    redirect: '/other/demo1',
    alwaysShow: true,
    meta: {
      title: 'other',
      icon: 'star'
    },
    children: [
      {
        name: 'other_demo1',
        path: 'demo1',
        component: () => import(/* webpackChunkName: "other-demo1" */ '@/views/other/demo1.vue'),
        meta: {
          title: 'demo1',
          icon: 'star',
          roles: 888
        }
      },
      {
        name: 'other_demo2',
        path: 'demo2',
        component: () => import(/* webpackChunkName: "other-demo2" */ '@/views/other/demo2.vue'),
        meta: {
          title: 'demo2',
          icon: 'star'
        }
      },
      {
        name: 'other_demo3',
        path: 'demo3',
        component: () => import(/* webpackChunkName: "other-demo3" */ '@/views/other/demo3.vue'),
        meta: {
          title: 'demo3',
          icon: 'star'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PATH,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "svg" */ '@/views/login.vue')
    },
    {
      path: '/svg',
      name: 'svg',
      component: () => import(/* webpackChunkName: "svg" */ '@/views/demo/svg-icon.vue')
    },
    // 错误页
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
    }
  ]
})

export default router
