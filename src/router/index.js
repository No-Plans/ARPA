import Vue from 'vue'
import Router from 'vue-router'
import Flicker from '@/components/Flicker'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Flicker
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
