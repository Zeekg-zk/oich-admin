import { createRouter, createWebHistory } from 'vue-router'
import RenderRouterView from '../layout/Render'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { isLogin, checkAuth } from '../utils/auth'

const routes = [
  // 管理员登录相关路由
  {
    path: '/user',
    component: () => import('../layout/UserLayout'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        meta: { title: '登录'},
        component: () => import('../views/Login'),
      },
      {
        path: '/user/register',
        meta: { title: '注册'},
        component: () => import('../views/Register')
      }
    ]
  },
  {
    path: '/',
    component: () => import('../layout/BasicLayout'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      // 首页
      {
        path: '/home',
        component: () => import('../views/Home')
      },
      // 个人信息
      {
        path: '/self',
        component: RenderRouterView,
        children: [
          {
            path: '/self/account',
            meta: { title: '个人账户信息'},
            component: () => import('../views/Self')
          },
        ]
      },
      // 非遗项目模块
      {
        path: '/ICH',
        component: RenderRouterView,
        meta: { title: '🗂 非遗模块', level: 1, auth: ['admin', 'user'] },
        children: [
          {
            path: '/ICH/projectList',
            name: 'projectList',
            meta: { title: '🎫 项目列表', level: 2, symbol: 'ICH-ProjectList' },
            component: () => import('../views/ICH/ProjectList')
          },
          {
            path: '/ICH/category',
            name: 'category',
            meta: { title: '🎫 项目类别列表', level: 2, symbol: 'ICH-Category' },
            component: () => import('../views/ICH/CategoryList')
          },
          {
            path: '/ICH/inheritor',
            name: 'inheritor',
            meta: { title: '🎫 传承人管理', level: 2, symbol: 'ICH-Inheritor' },
            component: () => import('../views/ICH/Inheritor'),
            children: [
              {
                path: '/ICH/inheritor',
                redirect: '/ICH/inheritor/list'
              },
              {
                path: '/ICH/inheritor/list',
                name: 'inheritorList',
                component: () => import('../views/ICH/Inheritor/List'),
                meta: { title: '🎫 传承人列表管理', symbol: 'ICH-Inheritor' },
              },
              {
                path: '/ICH/inheritor/region',
                name: 'inheritorListRegion',
                component: () => import('../views/ICH/Inheritor/Region'),
                meta: { title: '🎫 传承人地区管理', symbol: 'ICH-Inheritor' },
              }
            ]
          },
          {
            path: '/ICH/protectedunit',
            name: 'protectedUnit',
            meta: { title: '📍 保护单位', level: 2, symbol: 'ICH-ProtectedUnit'},
            component: () => import('../views/ICH/ProtectedUnit')
          },
          {
            path: '/ICH/rules',
            name: 'rules',
            meta: { title: '📐 审核规则', level: 2, symbol: 'ICH-Rules' },
            component: () => import('../views/ICH/Rules')
          },
          {
            path: '/ICH/addProject',
            name: 'addProject',
            meta: { title: '🔷 新建非遗项目', symbol: 'ICH-ProjectList' },
            component: () => import('../views/ICH/AddProject')
          },
        ]
      },
      // 咨询模块
      {
        path: '/consults',
        component: RenderRouterView,
        meta: { title: '🗂 咨询模块', level: 1, auth: ['admin', 'user'] },
        children: [
          {
            path: '/consults/news',
            name: 'news',
            meta: { title: '📜 新闻内容', level: 2, symbol: 'consults-News' },
            component: () => import('../views/Consults/News')
          },
          {
            path: '/consults/noticeList',
            name: 'noticeList',
            meta: { title: '🎫 公告列表', level: 2, symbol: 'consults-NoticeList' },
            component: () => import('../views/Consults/NoticeList')
          },
        ]
      },
      {
        path: '/user',
        component: RenderRouterView,
        meta: { title: '🗂 用户模块', level: 1, auth: ['admin']},
        children: [
          {
            path: '/user/userList',
            name: 'userList',
            meta: { title: '👨‍👦 用户列表', level: 2, symbol: 'user-userList'},
            component: () => import('../views/User/UserList')
          }
        ]
      },
      // 管理员模块
      {
        path: '/admin',
        component: RenderRouterView,
        meta: { title: '🗂 管理员模块', level: 1, auth: ['admin'] },
        children: [
          {
            path: '/admin/adminList',
            name: 'adminList',
            meta: { title: '🎫 管理员列表', level: 2, symbol: 'admin-AdminList' },
            component: () => import('../views/Admin/AdminList')
          },
          {
            path: '/admin/roles',
            name: 'roles',
            meta: { title: '👔 角色管理', level: 2, symbol: 'admin-Roles' },
            component: () => import('../views/Admin/Roles')
          },
          {
            path: '/admin/authority',
            name: 'authority',
            meta: { title: '⭕ 权限管理', level: 2, symbol: 'admin-Authority' },
            component: () => import('../views/Admin/Authority')
          }
        ]
      }
    ]
  },
  {
    path: '/operate',
    name: 'operate',
    component: RenderRouterView,
    children: [
      {
        path: '/operate/news',
        name: 'operateNews',
        meta: { title: '添加/编辑新闻' },
        component: () => import('../views/Consults/Operate/News'),
      },
      {
        path: '/operate/notice',
        name: 'operateNotice',
        meta: { title: '添加/编辑公告' },
        component: () => import('../views/Consults/Operate/Notice')
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    meta: { title: '403'},
    component: () => import('../views/403.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    Nprogress.start();
  }

  // 没有登录，并且也不是去跳转登录页面
  if (!isLogin() && to.path !== '/user/login') {
    if(to.paht === '/user/register') {
      next()
    }
    next('/user/login')
  } else {
    const record = to.matched.find(item => {
      return item.meta.auth
    })
    // 登录了，但是没有权限
    if (record && !checkAuth(record.meta.auth)) {
      next({
        path: '/403'
      })
    }
  }

  document.title = `湘西非遗 - ${to.meta.title ? to.meta.title : ''}`
  next();
})

router.afterEach(() => {
  Nprogress.done();
})

export default router
