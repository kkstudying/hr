import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys/index'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
