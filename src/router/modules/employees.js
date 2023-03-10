import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: 'import',
      component: () => import('@/views/employees/import'),
      hidden: true
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true
    }, {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true

    }
  ]
}
