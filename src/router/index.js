import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    children: [{
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/overview/index'),
      meta: { title: '总览', icon: 'eyes' }
    }]
  },

  {
    path: '/device',
    component: Layout,
    redirect: '/device/dev',
    name: 'Device',
    meta: { title: '全设备管理', icon: 'device' },
    children: [
      {
        path: 'sto',
        name: 'Sto',
        component: () => import('@/views/device/storage'),
        meta: { title: '设备入库', icon: 'storage' }
      },
      {
        path: 'out',
        name: 'Out',
        component: () => import('@/views/device/out'),
        meta: { title: '借用审批', icon: 'out' }
      },
      // {
      //   path: 'nested',
      //   name: 'Nested',
      //   component: () => import('@/views/nested/index'),
      //   meta: { title: '带出审批', icon: 'lease' }
      // },
      {
        path: 'dev',
        name: 'Dev',
        component: () => import('@/views/device'),
        meta: { title: '设备管理', icon: 'manage' }
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: () => import('@/views/inventory/index'),
        meta: { title: '设备盘点', icon: 'inventory' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'user',
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/credit',
    component: Layout,
    redirect: '/credit',
    children: [
      {
        path: 'credit',
        name: 'Credit',
        component: () => import('@/views/credit/index'),
        meta: { title: '信用中心', icon: 'credit' }
      }
    ]
  },

  {
    path: '/risk',
    component: Layout,
    redirect: '/risk',
    children: [
      {
        path: 'risk',
        name: 'Risk',
        component: () => import('@/views/risk/index'),
        meta: { title: '风控管理', icon: 'risk' }
      }
    ]
  },

  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: 'personal',
        name: 'Personal',
        component: () => import('@/views/personal/index'),
        meta: { title: '个人中心', icon: 'personal' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '设置', icon: 'el-icon-setting' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
