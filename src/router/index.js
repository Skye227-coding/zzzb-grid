import Vue from 'vue'
import VueRouter from 'vue-router'
// import InputCom from '../components/InputCom.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/CustomDemo',
    name:'CustomDemo',
    component:()=> import('@/views/CustomTabelDemo')
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
