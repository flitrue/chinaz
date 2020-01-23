"use strict";
//路由组-配置

export default [
  {
    path: "/", //根目录
    name: "home",
    meta: {
      auth: true,
      right: "0"
    },
    component: () => import("@/views/Page.vue")
  },
  {
    path: "/page",
    meta: {
      auth: true,
      right: "0"
    },
    component: () => import("@/views/Page.vue"),
    children: [
      {
        path: "1",
        name: "1",
        meta: {
          auth: true,
          right: "0"
        },
        component: () => import("@/views/pages/page1.vue")
      },
      {
        path: "2",
        name: "2",
        meta: {
          auth: true,
          right: "0"
        },
        component: () => import("@/views/pages/page2.vue")
      },
      {
        path: "3",
        name: "3",
        meta: {
          auth: true,
          right: "0"
        },
        component: () => import("@/views/pages/page3.vue")
      }
    ]
  },
];
