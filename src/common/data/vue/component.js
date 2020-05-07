export let component = {
  name:"组件",
  method:[
    {
      title:"基本使用",
      code:[
        {
          now:"",
          explain:[
            "这里是展示组件最基本的使用方法"
          ],
          codeBlock:`
<div id="app">
  <kita></kita> //123
</div>
<script type="text/javascript">
//1.创建组件
const kita =Vue.extend({
  data(){
    return{
      test:123
    }
  },
  template:'
  <div>{{test}}</div>
  '
})
// Vue.component('kitaG',kita)这样可以注册全局组件
const app = new Vue({
  el:"#app",
//2.注册局部组件，这里的vue实例相当于父组件
  components:{
    'kita':kita
  }
})
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "一般组件都会有有个独立的文件，所以可以写的简单点，也有ES6的增强写法。下面代码都是单文件组件.vue下进行"
          ],
          codeBlock:`
<!-- child.vue 子组件文件-->
<template>
  <div>{{test}}</div>
</template>

<script>
export default {
  data(){
    return {
      test:123
    }
  }
}
</script>

<!-- parents.vue 父组件文件-->
<template>
  <div>
    <child />
    <!-- 123 -->
  </div>
</template>

<script>
import child from './child.vue'
export default{
  components{
    child
  }
}
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"父传子",
      code:[
        {
          now:"",
          explain:[
            "父组件向子组件传递信息,在子组件中prop接收"
          ],
          codeBlock:`
<!-- child.vue 子组件文件-->
<template>
  <div>{{wife}}</div>
  <!-- Hirasawa Yui -->
</template>

<script>
export default {
  name: 'child',
  props:{
    wife:{
      type:String
    }
  }
}
</script>

<!-- parents.vue 父组件文件-->
<template>
  <div>
    <child :wife='wife'/>
  </div>
</template>

<script>
import child from './child.vue'
export default{
  components{
    child
  },
  data(){
    return{
      wife:'Hirasawa Yui'
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
      title:"子传父",
      code:[
        {
          now:"",
          explain:[
            "子组件可以用直接访问父组件中的数据",
            "子组件不可以直接修改props中的数据，因为prop是单向数据流，就是子组件内理论不能修改父组件传入的数据。虽然是可以修改，但是会报错：官方不推荐这样做。"
          ],
          codeBlock:`
<!-- child.vue 子组件文件-->
<template>
  <div id="child">
  <!-- 子传父发送事件 -->
    <div id="wife">
      {{wife}}
      <!-- Hirasawa Yui -->
      <button @click='wifeChange()'>wifeChange</button>
      <!-- 点击修改后:Akiyama Mio -->
    </div>

  <!-- 子访问父数据 -->
    <div>
      {{son}}
      <!-- test -->
      <button @click='sonChange()'>sonChange</button>
      <!-- 点击修改后:kita -->
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'child',
  props:{
    wife:{
      type:String
    }
  },
  data(){
    return{
      son:'test'
    }
  },
  methods:{
    wifeChange(){
      //这里第一个参数是要接收的函数名，第二个是接收的参数
      this.$emit('wife-change','Akiyama Mio')
    },
    sonChange(){//这可以直接访问父组件中的数据
      this.son = this.$parent.son
    }
  }
}
</script>

<!-- parents.vue 父组件文件-->
<template>
  <div id="app">
    <child :wife='wife' @wife-change = 'wifeChange'/>
    <!-- 接收子组件传递的事件 -->
  </div>
</template>

<script>
import child from './components/child.vue'

export default {
  name: 'App',
  components: {
    child
  },
  data(){
    return{
      wife:'Hirasawa Yui',
      son:'kita'
    }
  },
  methods:{
    wifeChange(value){
      this.wife = value
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
      title:".sync的使用",
      code:[
        {
          now:"",
          explain:[
            "可以让数据双向绑定,不会造成修改prop报错的现象"
          ],
          codeBlock:`
<!-- child.vue 子组件文件-->
<template>
  <div id="child">
      {{wife}}
      <!-- Hirasawa Yui -->
      <button @click='wifeChange()'>wifeChange</button>
      <!-- 修改后:Akiyama Mio -->
  </div>
</template>

<script>
export default {
  name: 'child',
  props:{
    wife:{
      type:String
    }
  },
  methods:{
    wifeChange(){
      this.$emit('update:wife','Akiyama Mio')
    }
  }
}
</script>
       
<!-- parents.vue 父组件文件-->
<template>
  <div id="app">
    <child :wife.sync='wife'/>
    <!-- 接收子组件传递的事件 -->
    
  </div>
</template>

<script>
import child from './components/child.vue'

export default {
  name: 'App',
  components: {
    child
  }
}
</script>
          `,
          mind:""
        }
      ]
    }
  ]
}