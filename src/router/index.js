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
    redirect: '/dashboard',
    meta: {title: '系统管理', icon: 'el-icon-setting'},
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/manager/index'),
        meta: {title: '系统首页', icon: 'el-icon-star-off'}
      },
      {
        path: 'accessory',
        name: 'Accessory',
        component: () => import('@/views/dashboard/accessory/index'),
        meta: {title: '附件管理', icon: 'el-icon-picture'}
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/dashboard/user/index'),
        meta: {title: '用户管理', icon: 'el-icon-s-custom'}
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/dashboard/menu/index'),
        meta: {title: '菜单权限', icon: 'el-icon-folder'}
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/dashboard/department/index'),
        meta: {title: '部门管理', icon: 'el-icon-s-home'}
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/dashboard/role/index'),
        meta: {title: '角色管理', icon: 'el-icon-postcard'}
      },
      {
        path: 'announcement',
        name: 'Announcement',
        component: () => import('@/views/dashboard/announcement/index'),
        meta: {title: '公告管理', icon: 'el-icon-edit'}
      }]
  },
  {
    path: '/business ',
    name: 'Business ',
    component: Layout,
    redirect: '/business/acquisition',
    meta: {title: '业务管理', icon: 'el-icon-s-cooperation'},
    children: [
      {
        path: 'acquisition',
        name: 'Acquisition',
        component: () => import('@/views/business/acquisition/index'),
        meta: {title: '物质入库', icon: 'el-icon-plus'}
      },
      {
        path: 'materials',
        name: 'Materials',
        component: () => import('@/views/business/materials/index'),
        redirect: '/business/materials/addedRecord',
        meta: {
          title: '物资管理', icon: 'el-icon-date'
        },
        children: [
          {
            path: 'addedRecord',
            name: 'AddedRecord',
            component: () => import('@/views/business/materials/addedRecord/index'),
            meta: {title: '入库记录', icon: 'el-icon-date'}
          },
          {
            path: 'material',
            name: 'Material',
            component: () => import('@/views/business/materials/material/index'),
            meta: {title: '物资资料', icon: 'el-icon-folder-opened'}
          },
          {
            path: 'suppliesCategory',
            name: 'SuppliesCategory',
            component: () => import('@/views/business/materials/suppliesCategory/index'),
            meta: {title: '物资类别', icon: 'el-icon-star-off'}
          },
          {
            path: 'releaseRecord',
            name: 'ReleaseRecord',
            component: () => import('@/views/business/materials/releaseRecord/index'),
            meta: {title: '发放记录', icon: 'el-icon-s-cooperation'}
          },
          {
            path: 'repertory',
            name: 'Repertory',
            component: () => import('@/views/business/materials/repertory/index'),
            meta: {
              title: '物资库存', icon: 'el-icon-edit'
            }
          }
        ]
      },
      {
        path: 'materialFlow',
        name: 'MaterialFlow',
        component: () => import('@/views/business/materialFlow/index'),
        redirect: '/business/materialFlow/materialsFor',
        meta: {title: '物资流向', icon: 'el-icon-place'},
        children: [
          {
            path: 'materialsFor',
            name: 'MaterialsFor',
            component: () => import('@/views/business/materialFlow/materialsFor/index'),
            meta: {
              title: '物资去处', icon: 'el-icon-location'
            }
          },
          {
            path: 'materialSource',
            name: 'MaterialSource',
            component: () => import('@/views/business/materialFlow/materialSource/index'),
            meta: {
              title: '物资来源', icon: 'el-icon-map-location'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/other',
    name: 'Other',
    component: Layout,
    meta: {title: '其它管理', icon: 'el-icon-s-management'},
    redirect: '/business/monitorSupervisor',
    children: [
      {
        path: 'monitorSupervisor',
        name: 'MonitorSupervisor',
        component: () => import('@/views/other/monitorSupervisor/index'),
        meta: {
          title: '监控管理', icon: 'el-icon-warning'
        },
        redirect: '/business/monitorSupervisor/sqlMonitor',
        children: [
          {
            path: 'sqlMonitor',
            name: 'SQLMonitor',
            component: () => import('@/views/other/monitorSupervisor/sqlMonitor/index'),
            meta: {
              title: 'SQL监控', icon: 'el-icon-view'
            }
          }
        ]
      },
      {
        path: 'icons',
        name: 'Icons',
        component: () => import('@/views/other/icons/index'),
        meta: {
          title: '图标管理', icon: 'el-icon-edit'
        }
      },
      {
        path: 'qqGroup',
        name: 'QQGroup',
        component: () => import('@/views/other/qqGroup/index'),
        meta: {
          title: 'QQ交流群', icon: 'el-icon-monitor'
        }
      }
    ]
  },
  {
    path: '/employeeHealth',
    name: 'EmployeeHealth',
    component: Layout,
    meta: {
      title: '员工健康', icon: 'el-icon-loading'
    },
    redirect: '/employeeHealth/refuteSlanders',
    children: [
      {
        path: 'refuteSlanders',
        name: 'RefuteSlanders',
        component: () => import('@/views/employeeHealth/refuteSlanders/index'),
        meta: {
          title: '疫情辟谣', icon: 'el-icon-magic-stick'
        }
      },
      {
        path: 'domesticOutbreak',
        name: 'DomesticOutbreak',
        component: () => import('@/views/employeeHealth/domesticOutbreak/index'),
        meta: {
          title: '全国疫情', icon: 'el-icon-magic-stick'
        }
      },
      {
        path: 'healthPunch',
        name: 'HealthPunch',
        component: () => import('@/views/employeeHealth/healthPunch/index'),
        meta: {
          title: '健康打卡', icon: 'el-icon-document-checked'
        }
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
  {
    path: '/swagger',
    name: 'Swagger',
    component: Layout,
    redirect: '/swagger/userServiceSwagger',
    meta: {title: '文档管理', icon: 'el-icon-notebook-1'},
    children: [
      {
        path: 'userServiceSwagger',
        name: 'UserServiceSwagger',
        component: () => import('@/views/swagger/userServiceSwagger/index'),
        meta: {title: '用户文档', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'departmentServiceSwagger',
        name: 'DepartmentServiceSwagger',
        component: () => import('@/views/swagger/departmentServiceSwagger/index'),
        meta: {title: '部门文档', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'logServiceSwagger',
        name: 'LogServiceSwagger',
        component: () => import('@/views/swagger/logServiceSwagger/index'),
        meta: {title: '日志文档', icon: 'el-icon-notebook-2'}
      },
      {
        path: 'repertoryServiceSwagger',
        name: 'RepertoryServiceSwagger',
        component: () => import('@/views/swagger/repertoryServiceSwagger/index'),
        meta: {title: '物资文档', icon: 'el-icon-notebook-2'}
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
