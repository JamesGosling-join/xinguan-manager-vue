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
    name: 'Login',
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
    redirect: '/',
    meta: {title: '系统管理', icon: 'el-icon-setting'},
    children: [{
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/manager/index'),
      meta: {title: '系统首页', icon: 'el-icon-star-off'}
    },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/dashboard/user/index'),
        meta: {title: '用户管理', icon: 'el-icon-s-custom'}
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/dashboard/department/index'),
        meta: {title: '部门管理', icon: 'el-icon-s-home'}
      }]
  },
  {
    path: '/swagger',
    name: 'Swagger',
    component: Layout,
    redirect: '/swagger/userSwagger',
    meta: {title: '文档管理', icon: 'el-icon-notebook-1'},
    children: [
      {
        path: 'userSwagger',
        name: 'UserSwagger',
        component: () => import('@/views/swagger/userSwagger/index'),
        meta: {title: '用户文档', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'departmentSwagger',
        name: 'DepartmentSwagger',
        component: () => import('@/views/swagger/departmentSwagger/index'),
        meta: {title: '部门文档', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'loginLogSwagger',
        name: 'LoginLogSwagger',
        component: () => import('@/views/swagger/loginLogSwagger/index'),
        meta: {title: '日志文档', icon: 'el-icon-notebook-2'}
      }
    ]
  },
  {
    path: '/log',
    name: 'Log',
    component: Layout,
    redirect: '/log/loginLog',
    meta: {title: '日志管理', icon: 'el-icon-s-management'},
    children: [
      {
        path: 'loginLog',
        name: 'LoginLog',
        component: () => import('@/views/log/loginLog/index'),
        meta: {
          title: '登录日志', icon: 'el-icon-date'
        }
      },
      {
        path: 'handelLog',
        name: 'HandelLog',
        component: () => import('@/views/log/log/index'),
        meta: {title: '操作日志', icon: 'el-icon-edit-outline'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
