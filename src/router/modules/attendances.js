import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/attendances/index'),
      meta: {
        title: '考勤',
        icon: 'table'
      }
    }
  ]
}
