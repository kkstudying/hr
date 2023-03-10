import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'settings',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/setting/index'),
      meta: {
        title: '公司设置',
        icon: 'tsetting'
      }
    }
  ]
}
