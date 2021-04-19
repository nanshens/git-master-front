export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'smile',
    component: './Dashboard',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Dashboard',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/project',
    name: 'project',
    icon: 'smile',
    component: './project',
  },
  {
    path: '/project/:id',
    name: 'project.detail',
    hideInMenu:true,
    component: './project/detail',
  },
  {
    path: '/module',
    name: 'module',
    icon: 'smile',
    component: './module',
  },
  {
    path: '/repository',
    name: 'repository',
    icon: 'smile',
    component: './repository',
  },
  {
    path: '/config',
    name: 'config',
    icon: 'smile',
    component: './Config',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
