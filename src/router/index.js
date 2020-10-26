import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/pages/MainPage'
import RentDataPage from '@/components/pages/RentDataPage'
import SaleDataPage from '@/components/pages/SaleDataPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      props: true
    },
    {
      path: '/rent-data',
      name: 'RentDataPage',
      component: RentDataPage,
      props: true
    },
    {
      path: '/sale-data',
      name: 'SaleDataPage',
      component: SaleDataPage,
      props: true
    }
  ]
})
