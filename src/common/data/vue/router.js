export let router={
  name:'router',
  method:[
    {
      title:"基本使用",
      code:[
        {
          now:"首先，这篇章关于router的代码都是在cli3环境下执行的",
          explain:[
            "下面是在入口文件main.js的配置"
          ],
          codeBlock:`
<script>
import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "下面是关于router的js文件的相关配置,其中有些配置在安装cli的时候就自动配置好的"
          ],
          codeBlock:`
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入的模块文件
const routerA = () => import('../components/routerA')
const routerB = () => import('../components/routerB')

Vue.use(VueRouter)
//安装VueRouter插件
const routes = [
  {
    path:'',
    redirect:'/routerA'//默认路由
  },
  {
    path:'/routerA',//跳转路由A
    component:routerA
  },
  {
    path:'/routerB/:id',//跳转路由B,并且传个ID
    component:routerB
  }
]

const router = new VueRouter({
  mode:'history', //地址以hash形式：#，还是history形式没有#
  base: process.env.BASE_URL,//环境变量
  routes
})

export default router
</script>
          `,
          mind:"当用路由参数时，原组件实例会被复用比如：routerB/kita和routerB/wife。虽然复用更高效，但也意味组件的生命周期钩子不会给调用，如果想监听响应，可用watch或导航守卫beforeRouteUpdate"
        },
        {
          now:"",
          explain:[
            "下面是App.vue文件配置"
          ],
          codeBlock:`
<template>
  <div id="app">
    <!-- <router-link> 默认会被渲染成一个 a 标签 -->
    <router-link to="/routerA">routerA </router-link>
    <router-link :to="'/routerB/' + id" replace>routerB </router-link>
    <!-- :to代表跳转的路由+参数   replace代表不可按返回键返回 -->
    <router-view/>
    <!-- 路由匹配到的组件将渲染在这里 -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      id:'kita',
      name:'routerChild/',
      test:'test/'
    }
  }
}
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"嵌套路由",
      code:[
        {
          now:"",
          explain:[
            "嵌套路由顾名思义就是再路由里面在放个路由，在要嵌套的子路由的组件文件内记得放<router-view/>",
            "下面是路由配置index.js文件的主要内容"
          ],
          codeBlock:`
<script>          
const routes = [
  {
    path:'',
    redirect:'/routerA'//默认路由
  },
  {
    path:'/routerA',//跳转路由A
    component:routerA
  },
  {
    path:'/routerB/:id',//跳转路由B
    component:routerB
  },
  {
    path:'/routerC/:name',//接收参数的嵌套路由
    component:routerC,
    children:[ //嵌套路由内的子路由
      {
        //当接收的参数为routerChild时跳转
        path:'routerChild',
        component:routerChild
      },
      {
        //当接收的参数为test时跳转
        path:'test',
        component:routerTest
      }
    ]
  }
]
</script>          
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "下面是组件的内容"
          ],
          codeBlock:`
<!-- App.vue -->
<template>
  <div id="app">
    <!-- <router-link> 默认会被渲染成一个 <a> 标签 -->
    <router-link to="/routerA">routerA </router-link>
    <router-link :to="'/routerB/' + id" replace>routerB </router-link>
    <!-- :to代表跳转的路由+参数   replace代表不可按返回键返回 -->
    <router-link :to="'/routerC/' + name">routerC </router-link>
     <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      id:'kita',
      name:'routerChild/',
      test:'test/'
    }
  }
}
</script>

<!-- routerC.vue要被嵌套的子路由 -->
<template>
  <div>
      这是routerC
      <router-link :to="nowR + name">routerChild </router-link>
      <router-link :to="nowR + test">routerTest </router-link>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'routerC',
  data(){
    return{
      nowR:this.$route.path,
      name:'routerChild',
      test:'test'
    }
  }
}
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"路由的API",
      code:[
        {
          now:"router.push",
          explain:[
            "在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push",
            "想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。"
          ],
          codeBlock:`
<script>
export default {
  name: 'App',
  data(){
    return{
      id:'kita',
      name:'routerChild/',
      test:'test/'
    }
  },
  methods:{
    jump(){
      //字符串路径
      this.$router.push('/routerB/' + this.id)
      this.$router.push({path:'/routerB/$ {this.id}' 这里应该用模板字符串})
      //对象
      this.$router.push({path:'/routerB/' + this.id})
      //按照路由名字跳转，首先路由原本要命名
      this.$router.push({name:'routerB', params:{ id:this.id}})
    }
  }
}
</script>
          `,
          mind:""
        },
        {
          now:"router.replace",
          explain:[
            "跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。"
          ],
          codeBlock:`
<script>
  this.$router.replace('/routerB/' + this.id)
</script>
          `,
          mind:""
        },
        {
          now:"router.go(n)",
          explain:[
            "这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。"
          ],
          codeBlock:`
<script>
  //前进1
  this.$router.go(1)
  //后退1
  this.$router.go(-1)
  //0则刷新
  this.$router.go(0)
</script>
          `,
          mind:"router的操作类似window.history的操作"
        }
      ]
    },
    {
      title:"导航守卫",
      code:[
        {
          now:"全局前置守卫",
          explain:[
            "router.beforeEach，在路由跳转前触发，接收三个参数：to(要跳转的路由)，from(正要离开的路由)，next()一定要调用该方法来 resolve 这个钩子,详情参考promise。"
          ],
          codeBlock:`
<script>
router.beforeEach((to, from, next) => {
  //当进入的是routerA时，跳到routerB，并且传个wife进去。
  if(to.name == 'routerA'){
    next('/routerB/wife')
    // next(false) 不跳转，中断当前的导航
  }
  else{
    //进行管道中的下一个钩子
    next()
  }
})
</script>
          `,
          mind:"router.beforeEach专门用来检测登陆状态,"
        },
        {
          now:"全局后置钩子",
          explain:[
            "router.afterEach,在路由跳转后触发,不接受 next 函数也不会改变导航本身"
          ],
          codeBlock:`
<script>
router.afterEach((to, from) => {
  console.log('路由发生跳转后触发')
})
</script>
          `,
          mind:""
        },
        {
          now:"路由独享守卫",
          explain:[
            "你可以在路由配置上直接定义 beforeEnter 守卫"
          ],
          codeBlock:`
<script>
const routers = [
  {
    path:'/routerA',//跳转路由A
    name:'routerA',
    component:routerA,
    beforeEnter:(to, from,next) => {
      console.log('路由发生跳转后触发')
      next()
    }
  }
]
</script>
          `,
          mind:""
        },
        {
          now:"组件中的守卫",
          explain:[
            "组件内也可以设置路由导航守卫",
            "beforeRouteEnter:组件渲染前调用，所以不能获取实例的this",
            "beforeRouteUpdate:路由发生改变，但组件被复用时，比如'routerA/kita'与'routerA/wife'之间的跳转。这个和",
            "beforeRouteLeave:导航离开该组件的对应路由时调用,通常提醒保存"
          ],
          codeBlock:`
<script>
export default {
  name: 'routerC',
  data(){
    return{
      name:'routerChild',
      test:'test'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm =>{ //这里的vm就是实例
      console.log(vm.name);
    })
  },
  beforeRouteUpdate (to, from, next) {
      console.log(this.test)
      next() //不设置next可以造成router-link的子路由跳转失败
  },
  beforeRouteLeave (to, from, next) {
  const answer = window.confirm('你要走了？')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
}
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"路由元信息",
      code:[
        {
          now:"meta",
          explain:[
            "说的简单点就是为你的路由夹带私货，可在你路由的meta里定义一些数据给页面组件或路由钩子函数使用。"
          ],
          codeBlock:`
<script>
const routes = [
  {
    path:'/routerA',//跳转路由A
    name:'routerA',
    component:routerA,
    meta:{
      title:kita
    }
  },
  router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
  })
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"路由过渡",
      code:[
        {
          now:"路由过渡",
          explain:[
            "为路由跳转设置过渡效果，详情设置与解释参考vue过渡篇章"
          ],
          codeBlock:`
<template>
  <div id="app">
    <router-link to="/routerA">routerA </router-link>
    <router-link :to="'/routerB/' + id" replace>routerB </router-link>
    <router-link :to="'/routerC/' + name">routerC </router-link>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style>
.fade-enter{
  opacity: 0;
}
.fade-leave{
  opacity: 1;
}
.fade-enter-active{
  transition:opacity .5s;
  transition-delay:.5s;
  /* 需要加个延时，不然会出现空白格占用 */
}
.fade-leave-active{
  opacity: 0;
  transition:opacity .5s;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"滚动行为",
      code:[
        {
          now:"scrollBehavior (to, from, savedPosition)",
          explain:[
            "scrollBehavior设置路由切换后，页面所在的滚动位置。它必须在router实例内设置，也可以用meta设置值。返回的return有以下种类：",
            "{ x: number, y: number }",
            "{ selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)"
          ],
          codeBlock:`
<script>
//router配置文件里

//返回顶部,savedPosition是上次的位置用于 后退/前进 按钮
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
</script>
          `,
          mind:"这个功能只在支持 history.pushState 的浏览器中可用。这也可以用于promise异步滚动"
        }
      ]
    }
  ]
}