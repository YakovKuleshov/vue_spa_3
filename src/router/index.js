import { createRouter, createWebHistory } from 'vue-router'
// import { productTabs } from '@/constants/index'

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
      title: 'Админ панель',
      keepAlive: true
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/elements/pages/page-news'),
    meta: {
      title: 'Новости',
      keepAlive: true
    }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/elements/pages/page-gallery'),
    meta: {
      title: 'Галерея',
      keepAlive: true
    }
  },
  {
    path: '/films',
    name: 'films',
    component: () => import('@/elements/pages/page-films'),
    meta: {
      title: 'Фильмы',
      keepAlive: true
    }
  },
  {
    path: '/other',
    name: 'other',
    component: () => import('@/elements/pages/page-other'),
    meta: {
      title: 'Разное',
      keepAlive: true
    }
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('@/elements/pages/Pagination'),
    meta: {
      title: 'Информация',
      keepAlive: true
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
      title: 'Информация',
      keepAlive: true
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/elements/pages/shop/ShopApp'),
    meta: {
      title: 'Магазин',
      keepAlive: true
    }
  },
  {
    path: '/shop/:id(\\d+)',
    name: 'product_page',
    component: () => import('@/elements/pages/shop/productPage/ProductPage.vue'),
    redirect: { name: 'product_page_price' },
    keepAlive: false,
    // beforeEnter: (to, from, next) => {
    //   const pathId = to.path.replace('/shop/', '')
    //   const validId = productTabs.some((tab) => tab.id === pathId)

    //   if (!validId) {
    //     next('/shop/price')
    //   } else {
    //     next()
    //   }
    // }
    children: [
      {
        path: 'price',
        name: 'product_page_price',
        component: () => import('@/elements/pages/shop/productPage/Price.vue'),
        meta: {
          tab: 'price'
        }
      },
      {
        path: 'remains',
        name: 'product_page_remains',
        component: () => import('@/elements/pages/shop/productPage/Remains.vue'),
        meta: {
          tab: 'remains'
        }
      },
      {
        path: 'reviews',
        name: 'product_page_reviews',
        component: () => import('@/elements/pages/shop/productPage/Reviews.vue'),
        meta: {
          tab: 'reviews'
        }
      },
      {
        path: 'lostRevenue',
        name: 'product_page_lostRevenue',
        component: () => import('@/elements/pages/shop/productPage/LostRevenue.vue'),
        meta: {
          tab: 'lostRevenue'
        }
      }
    ]
  },
  {
    path: '/dynamics',
    name: 'dynamics',
    component: () => import('@/elements/pages/Dynamics/DynamicsPage'),
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
  if (route?.meta?.title) document.title = route.meta.title
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
