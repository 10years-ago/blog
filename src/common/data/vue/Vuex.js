export let Vuex = {
  name:"Vuex",
  method:[
    {
      title:"概念和基本使用",
      code:[
        {
        now:"为什么用Vuex",
        explain:[
          "Vuex的作用就是为vue提供一个共享状态管理。假设多层组件嵌套（父组件->子组件->子组件），这样虽然可以使用prop进行数据通讯，但在修改的时候就会非常头疼，所以，这时Vuex可以把这些数据放在一个地方来统一管理",
          "state：驱动应用的数据源；view：以声明方式将 state 映射到视图；actions：响应在 view 上的用户输入导致的状态变化，比如点击事件之类的。",
          "原本单数据流的通讯是这样的：state->view->actions。"
        ],
        pic:require('../../../assets/img/vue/oneDataFlow.png')
      },
      {
        explain:[
          "但是，当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：",
          "1.多个视图依赖于同一状态：嵌套组件传参会非常繁琐，比如爷组件传孙组件（比喻恰当），这中间还需要在子组件中间传递一次",
          "2.来自不同视图的行为需要变更同一状态：可以通过采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝来解决，但也会非常繁琐。"
        ]
      },
      {
        now:"关于多界面状态管理",
        explain:[
          "Vuex有自己的规定进行访问和修改，Vuex官方不建议直接从组件修改state的数据，因为有个在mutations有个Devtools的vue官方浏览器插件可以监听是哪个组件修改了state，这样可以方便debug，下面就是官方推荐的修改流程",
          "这里可以跳过Actions直接到Mutations，Actions的作用是专门用来做异步操作，Mutations里有异步操作的话Devtools会跟踪不到，因为Devtools只监听同步操作"
        ],
        pic:require('../../../assets/img/vue/VuexState.png')
      },
      {
        now:"基本使用",
        codeBlock:`
<script>
//入口文件main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

//vuex配置文件index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count:'kita!!!'
  },
  mutations: {  
  },
  actions: {
  },
  modules: {
  }
}) 

export default store
</script>
        `,
      }
      ]
    },
    {
      title:"State",
      code:[
        {
          now:"单一状态树",
          explain:[
            "vuex使用单一状态树，意思就是推荐把所有信息记录在一个store里，而不是有store1 = new Vuex.Store({})这样其他的实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照"
          ]
        },
        {
          now:"组件中获取状态",
          codeBlock:`
<script>
//vuex配置文件index.js
const store = new Vuex.Store({
  state: {
    count:'kita!!!'
  },
  mutations: {  
  },
  actions: {
  },
  modules: {
  }
})
</script>


//组件中获取数据
<template>
  <div>
   {{count}}
  </div>
</template>

<script>
export default {
  name: 'routerA',
  data(){
    return{
      //这样数据无法响应式，不能定义在data里面
      wife:this.$store.state.count
    }
  },
  computed:{
    count(){
      return this.$store.state.count
    }
  }
}
</script>
          `,
          mind:"不能直接在data中定义state的数据，因为data的内容只会在created钩子触发前初始化一次。而给data设置state中的值就是纯属给data复制state值的字面量，之后state中的值如何变化，data中的值也不会受到影响，这就没有了Vuex响应式的效果了。"
        },
        {
          now:"mapState 辅助函数",
          explain:[
            "为了使获取数据更方便，我们可以使用 mapState 辅助函数帮助我们生成计算属性，增加键盘寿命"
          ],
          codeBlock:`
<script>
//首先要导入这个模块
import { mapState } from 'vuex'
export default {
  name: 'routerA',
  data(){
    return{
      wife:'yui'
    }
  },
  computed:mapState({
    //可以使用箭头函数
    count: state => state.count,

    //可传递字符串参数,yui 等同于 state => state.yui
    kita:'yui',

    //为了能够使用 this 获取局部状态，必须使用常规函数
    test(state){
      return state.count + this.wife
    }
  }),
  //当属性名与state的子节点名相同，可以写成下面那样，记住mapState里面是个数组
  computed:mapState([
    'count'
  ])
}
</script>
          `
        },
        {
          now:"对象展开符...",
          explain:[
            "可以使用对象展开符将vuex的数据混入computed中。意思就是把computed中原本的数据与vuex中的数据分开计算，然后把vuex中的数据混入computed中。"
          ],
          codeBlock:`
<script>
import { mapState } from 'vuex'
export default{
  computed:{
    other(){//这是原本computed中的数据
      return {...}
    },
    ...mapState([
      'count',
      'yui'
    ])
  }
}
</script>
          `
        }
      ]
    },
    {
      title:"Getter",
      code:[
        {
          explain:[
            "Getter类似于computed。主要用于有时需要获取state中筛选之后的数据，如果在组件内操作的话，则需要在每个组件中都进行一次操作，在Getter中可以直接定义这些操作然后直接在组件中使用",
            "可以通过让 getter 返回一个函数，来实现给 getter 传参"
          ],
          codeBlock:`
<script>
//vuex配置文件
const store = new Vuex.Store({
  state: {
    yui:10
  },
  getters:{
    count:state => state.yui * state.yui,
    getID:state => id => id * 3
    // getID(state){
    //   return function(id){
    //     return id * 3
    //   }
    // }
  }
}) 
</script>

//组件内
<script>
import { mapGetters  } from 'vuex'
export default {
  name: 'routerA',
computed:{
  count(){
    return this.$store.getters.count
  },
  getID(){
    return this.$store.getters.getID(3)
  },
  //mapGetters 辅助函数
  ...mapGetters([
    'count'
  ])
}
}
</script>
          `,
          mind:"Getter也有自己的mapGetters 辅助函数"
        }
      ]
    },
    {
      title:"Mutation",
      code:[
        {
          explain:[
            "Mutation类似于事件menthod，每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler),这是官方推荐对state唯一的更新方式",
            "不可以直接调用Mutation里面的事件，需要通过commit来唤醒该事件。commit可接受两个参数（'要唤醒的事件'，'传入的参数，可以是对象，这也称为payload：负载'）"
          ],
          codeBlock:`
<script>
//vuex配置文件
const store = new Vuex.Store({
  state: {
    yui:10
  },
  mutations: { 
    add(state,payload){
      state.yui += payload
    }
  }
}) 
</script>

//组件内
<script>
export default {
  name: 'routerA',
  computed:{
    yui(){
      return this.$store.state.yui
    }
  },
  methods:{
    add(){
       this.$store.commit('add',5)
      //或者写成以下对象形式，里面的id是对象！！
      // this.$store.commit({
      //   type:'add',
      //   id:10
      // })
    }
  }
}
</script>
          `,
          mind:""
        },
        {
          now:"关于Vuex响应式规则",
          explain:[
            "以下面代码中info对象为例，info里面的属性在一开始就加入到了响应式系统中，而响应式系统会监听属性的变化，当属性发生变化时，会通知所有界面使用到该属性的地方。所以，就必须遵循一些Vuex对应的规则。",
            "1.你的所有属性需要在store中提前初始化好。意思是假设下面代码中info:{name:kita}中，里面的name属性是一开就定义好的。",
            "2.你要使用Vue.set()来给对象添加新属性"
          ],
          codeBlock:`
<script>
const store = new Vuex.Store({
  state: {
    yui:10,
    info:{
      name:'kita'
    }
  },
  mutations: { 
    add(state){
      //下面这两个写法都不是响应式的
      // state.info.age = 15
      //delete state.info.name

      //下面的方法是响应式的
      //set(修改的对象，key:String|Number，Value)
      Vue.set(state.info,'age',18)
      Vue.delete(state.info,'name')
    }
  }
}) 
</script>
          `
        },
        {
          explain:[
            "当然，也可以使用...mapMutations将methods映射为commit。"
          ],
          codeBlock:`
<script>
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将this.increment()映射为this.$store.commit('increment')

      //mapMutations 也支持载荷：
      //这里的参数是<button @click='incrementBy(amount)'></button>
      'incrementBy' // 将 this.incrementBy(amount)映射为 this.$store.commit('incrementBy', amount)
    ]),
    ...mapMutations({
      add: 'increment' // 将 this.add()映射为 this.$store.commit('increment')
    })
  }
}
</script>
          `
        }
      ]
    },
    {
      title:"Action",
      code:[
        {
          explain:[
            "Action的用法类似于mutation，Action的原理就是提交一个mutation，但Action可以进行异步操作，而mutation只能进行同步操作，当然action可以返回一个promise对象。Action 通过 store.dispatch 方法触发",
            "Action函数接受一个类似于store实例的的对象：context对象，context又称为上下文。可以通过context.commit提交一个mutation，或context.state和context.getters来获取state和getters"
          ],
          codeBlock:`
<script>
//vuex配置文件
const store = new Vuex.Store({
  state: {
    yui:10,
    info:{
      name:'kita'
    }
  },
  mutations: { 
    add(state){
      state.info.name = 'yui'
    }
  },
  actions: {
    add(context){
      setTimeout(() =>{
      context.commit('add')
      },1000)
    }
  },
}) 
</script>

//组件内
<script>
export default {
  name: 'routerA',
  methods:{
    add(){
      this.$store.dispatch('add')

      //当然也可以采取载荷和对象方式传参
      this.$store.dispatch('add','这是payload')
      this.$store.dispatch({
        type:'add',
        payload:'这是payload'})
    }
  }
}
</script>
          `,
          mind:""
        },
        {
          now:"关于Action的解构写法",
          explain:[
            "为什么能这么写呢？因为action总是接受context作为第一参数，第二未payload。在context中存在若干API（在下面代码的上面）",
            ""
          ],
          codeBlock:`
<script>
<script>
context 对象包含以下属性：
{
  state,      // 等同于 store.state，若在模块中则为局部状态
  rootState,  // 等同于 store.state，只存在于模块中
  commit,     // 等同于 store.commit
  dispatch,   // 等同于 store.dispatch
  getters,    // 等同于 store.getters
  rootGetters // 等同于 store.getters，只存在于模块中
}
const store = new Vuex.Store({
//所以
actions: {
  increment (context) {
    context.commit('increment')
  }
},
//等于
actions:{
  increment ({ commit: context.commit }) {
    context.commit('increment');
  }
},
//相当于
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}  
})
</script>

<script>
const store = new Vuex.Store({
  actions:{
    //原本写法
    add(context){
      setTimeout(() =>{
      context.commit('add')
      },1000)
    },

    //解构写法
    add({commit}){
      setTimeout(() =>{
      commit('add')
      },1000)
    }
  }
})
</script>
          `
        },
        {
          now:"mapActions的使用",
          explain:[
            "和mutation使用方法一样"
          ]
        }
      ]
    },
    {
      title:"Module",
      code:[
        {
          explain:[
            "由于是单一状态树的原因，store里面可能会有非常多的数据与状态，这会显得store非常臃肿。这时就可以使用Module将store分割多个模块，每个模块有自己的state、mutation、action、getter、继续嵌套的module",
            "module原理就是state的一个对象，对于在组件内访问模块内的数据也有一定的规则：",
            "访问模块内的state -> this.$store.state.a，因为模块被命名为a",
            "访问模块内的getters -> this.$store.getters，建议不要与原本store内的getter命名相同，不然会直接执行原本store内的getter",
            "访问模块内的mutations -> this.$store.commit,同上",
            "访问模块内的actions -> this.$store.dispatch,同上"
          ],
          codeBlock:`
<script>
//store配置
const ModuleA = {
  state:{
    kita:20
  },
  getters:{
    //这个getters必须要设置在这才能读取到rootState
    getAdd:(state,getters,rootState) => state.kita + rootState.yui
  },
  mutations:{
    add(state,payload){
      state.kita += payload
    }
  },
  actions:{
    asyncAdd({state, commit, rootState},payload){
        setTimeout(() => {
          commit('add',payload)
        }, 1000);
    }
  }
}
const store = new Vuex.Store({
  state: {
    yui:10,
  },
  modules: {
    a:ModuleA
  }
}) 
</script>


<template>
  <div>
   <button @click="add()">add</button>
   <button @click="asyncAdd()">asyncAdd</button>
   {{kita}}
   {{getAdd}}
  </div>
</template>

<script>
//组件内的配置
export default {
  name: 'routerA',
  computed:{
    kita(){
      return this.$store.state.a.kita
    },
    getAdd(){
      return this.$store.getters.getAdd
    }
  },
  methods:{
    add(){
      this.$store.commit('add',5)
    },
    asyncAdd(){
      this.$store.dispatch('asyncAdd',50)
    }
  }
}
</script>
          `,
          mind:""
        },
        {
          now:"命名空间",
          explain:[
            "上面代码中有可能出现模块名字冲突，而且对于commit、dispatch和getter获取子模块内容的方法不人道，按道理应该要按照对应模块查找对应内容，这才符合一般的写法，命名空间则很好解决了这个问题。",
            "下面代码中，对于getter、commit、dispatch获取的方法前面都申明了对应的模块"
          ],
          codeBlock:`
<script>
//store配置
const ModuleA = {
//ModuleA代码与上面代码一样，只是多了下面一行
namespaced:true,
}
const store = new Vuex.Store({
  state: {
    yui:10,
  },
  modules: {
    a:ModuleA
  }
}) 
</script>

<script>
//组件内的配置
export default {
  name: 'routerA',
  computed:{
    kita(){
      return this.$store.state.a.kita
    },
    getAdd(){
      return this.$store.getters['a/getAdd']
    }
  },
  methods:{
    add(){
      this.$store.commit('a/add',5)
    },
    asyncAdd(){
      this.$store.dispatch('a/asyncAdd',50)
    }
  }
}
</script>
          `
        },
        {
          now:"带命名空间的绑定函数",
          explain:[
            "当使用 mapState, mapGetters, mapActions 和 mapMutations 这些辅助函数来绑定带命名空间的模块时，因为可能存在嵌套模块的原因，模块的路径可能会很长，写起来可能比较繁琐。",
            "对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给辅助函数，这样所有绑定都会自动将该模块作为上下文。"
          ],
          codeBlock:`
<script>
//修改前
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'routerA',
  computed:{
    ...mapState({
      kita:state => state.a.kita
    }),
    ...mapGetters({
      getAdd:'a/getAdd'
    })
  },
  methods:{
    ...mapMutations({
      //这个传递的payload在模板中调用函数时传入
      add:'a/add'
    }),
    ...mapActions({
      //这个传递的payload在模板中调用函数时传入
      asyncAdd:'a/asyncAdd'
    }),
  }
}
</script>

<script>
//修改后
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'routerA',
  computed:{
    ...mapState('a',[
      'kita'
    ]),
    ...mapGetters('a',[
      'getAdd'
    ])
  },
  methods:{
    ...mapMutations('a',[
      //这个传递的payload在模板中调用函数时传入
      'add'
    ]),
    ...mapActions('a',[
      //这个传递的payload在模板中调用函数时传入
      'asyncAdd'
    ]),
  }
}
</script>
          `
        },
        {
          now:"createNamespacedHelpers默认路径",
          explain:[
            "createNamespacedHelpers创建基于某个命名空间辅助函数，意思就是辅助函数会有个默认的模块路径"
          ],
          codeBlock:`
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('a')
export default {
  name: 'routerA',
  computed:{
    ...mapState([
      'kita'
    ]),
    ...mapGetters([
      'getAdd'
    ])
  },
  methods:{
    ...mapMutations([
      'add'
    ]),
    ...mapActions([
      'asyncAdd'
    ]),
  }
}
</script>
          `
        }
      ]
    }
  ]//method
}
