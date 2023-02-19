import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: () => ({ name: 'ftt-dashboard-rank' })
  },
  {
    path: '/ftt',
    component: () => import('@/components/nested-router-view.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/ftt/dashboard/index.vue'),
        children: [
          {
            path: '',
            name: 'ftt-dashboard',
            component: () =>
              import('@/views/ftt/dashboard/device-distribution/index.vue')
          },
          {
            path: 'alarm-distribution',
            name: 'ftt-dashboard-alarm-distribution',
            component: () =>
              import('@/views/ftt/dashboard/alarm-distribution/index.vue')
          },
          {
            path: 'rank',
            name: 'ftt-dashboard-rank',
            component: () => import('@/views/ftt/dashboard/rank/index.vue')
          },
          {
            path: 'report',
            name: 'ftt-dashboard-report',
            component: () => import('@/views/ftt/dashboard/report/index.vue')
          }
        ]
      },
      {
        path: 'dignosis',
        name: 'ftt-dignosis',
        component: () => import('@/views/ftt/dignosis/index.vue')
      }
    ]
  },
  {
    path: '/energy-consumption',
    component: () => import('@/components/nested-router-view.vue'),
    children: [
      {
        path: 'dashboard',
        component: () =>
          import('@/views/energy-comsumption/dashboard/index.vue'),
        children: [
          {
            path: '',
            name: 'energy-consumption',
            component: () =>
              import('@/views/energy-comsumption/dashboard/home/index.vue')
          },
          {
            path: 'dimension',
            name: 'energy-consumption-dimension',
            component: () =>
              import(
                '@/views/energy-comsumption/dashboard/dimensions/index.vue'
              )
          },
          {
            path: 'target',
            name: 'energy-consumption-target',
            component: () =>
              import(
                '@/views/energy-comsumption/dashboard/dimensions/index.vue'
              )
          }
        ]
      }
    ]
  },
  {
    path: '/__test',
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error-view/not-found.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base:
    process.env.NODE_ENV === 'production'
      ? '/alarm-analysis-platform-demo/'
      : '/',
  routes
})

export default router
