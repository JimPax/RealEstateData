import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import RentDataPage from '@/components/RentDataPage'
import SaleDataPage from '@/components/SaleDataPage'

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
