import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'news' }
  },
  {
    path: '/admin_panel',
    name: 'admin_panel',
    component: () => import('@/elements/pages/AdminPanel'),
    meta: {
      title: 'Админ панель'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/elements/pages/page-news'),
    meta: {
      title: 'Новости'
    }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/elements/pages/page-gallery'),
    meta: {
      title: 'Галерея'
    }
  },
  {
    path: '/films',
    name: 'films',
    component: () => import('@/elements/pages/page-films'),
    meta: {
      title: 'Фильмы'
    }
  },
  {
    path: '/other',
    name: 'other',
    component: () => import('@/elements/pages/page-other'),
    meta: {
      title: 'Разное'
    }
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('@/elements/pages/Pagination'),
    meta: {
      title: 'Информация'
    }
    // beforeEnter: (to, from, next) => {
    //    next('/pagination?page=1')
    // },
    // children: [
    //    {
    //       path: '/pagination/info',
    //       component: InfoPage
    //    }
    // ]
  },
  {
    path: '/info',
    props: true,
    component: () => import('@/elements/pages/info-page'),
    meta: {
      title: 'Информация'
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/elements/pages/shop/ShopApp'),
    meta: {
      title: 'Магазин'
    }
  },
  {
    path: '/dynamics',
    name: 'dynamics',
    component: () => import('@/elements/pages/chartsPage/DynamicsPage'),
    meta: {
      title: 'Динамика'
    }
  }
]

window.onload = () => {
  routes.slice(1).forEach((route) => {
    if (route.name) {
      localStorage.setItem(`${route.name}_scroll`, '0')
    }
  })

  const route = routes.find((route) => route.path === location.pathname)
  document.title = route.meta.title
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
