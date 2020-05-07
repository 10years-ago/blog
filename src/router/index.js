import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/index') 
const HTML = () => import('../views/html/index') 
const CSS = () => import('../views/css/index') 
const JavaScript = () => import('../views/JavaScript/index') 
const vue = () => import('../views/vue/index') 

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      model:'testWife/kesshouban_v1.2.model.json'
    }
  },
  {
    path:'/html',
    component:HTML,
    meta:{
      model:'haru_1/assets/haru01.model.json'
    }
  },
  {
    path:'/css',
    component:CSS,
    meta:{
      model:'haru_2/assets/haru02.model.json'
    }
  },
  {
    path:'/JavaScript',
    component:JavaScript,
    meta:{
      model:'shizuku/assets/shizuku.model.json'
    }
  },
  {
    path:'/vue',
    component:vue,
    meta:{
      model:'wanko/assets/wanko.model.json'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  router.app.$options.store.commit('modelChange',to.meta.model)
  next()
})

export default router
