import Layout from '@/layout'
export default {
  name: 'departments',
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments/index'),
      meta: {
        title: '部门',
        icon: 'tree'
      }
    }
  ]
}
