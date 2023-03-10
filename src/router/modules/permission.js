import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission/index'),
      meta: {
        title: '权限',
        icon: 'lock'
      }
    }
  ]
}
