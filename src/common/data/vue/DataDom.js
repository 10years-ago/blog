export let DataDom = {
  name:"数据选项",
  method:[
    {
      title:"data",
      code:[
        {
          now:"",
          explain:[
            "Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化，对象必须是纯粹的对象 (含有零个或多个的 key/value 对)。",
            "在组件内的data要写为函数形式,用return返回数据,假设data不是函数的话,大家用的都是data是同一个内存地址,修改会造成同步修改"
          ],
          codeBlock:`
<script>
const vm = new Vue({
  data:{
    kita:123
  }
})

//组件内
export default{
  data(){
    return{
      kita:123
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
      title:"props",
      code:[
        // {
        //   now:"关于prop",
        //   explain:[
        //     "prop用作接收来自父组件传递的数据。prop使用的是单向数据流，意思就是父子prop形成单向下行绑定：父组件的更新会影响子组件绑定prop的更新，但子组件中对于prop的修改不会改变父组件的数据。",

        //   ],
        //   codeBlock:`
          
        //   `,
        //   mind:""
        // }, 写于组件
        {
          now:"props的使用",
          explain:[
            "props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。",
            "对象内可使用的选项：",
            "type:可以是下列原生构造函数中的一种：String、Number、Boolean、Array、Object、Date、Function、Symbol、任何自定义构造函数、或上述内容组成的数组。也可以检查prop是非是给定的类型，否则报错",
            "default: any,默认值，对象或数组的默认值要从工厂函数返回",
            "required: Boolean,是否必须有数据",
            "validator:function(),一个自定义验证函数,验证失败会报错"
          ],
          codeBlock:`
<script>          
export default{
  props:{
    kita:{
      type:Number,
      default:0,
      required:true,
      validator(value){
        // return ['yui','azu','mio'].includes(value) == true 是否匹配所有字符串中其中一个
        return value >= 0 //是否>=0
      }
    },
    wife:{
      type:Array,
      default(){
        retrun {}
      }
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
      title:"computed",
      code:[
        {
          now:"",
          explain:[
            "在模板中放入太多的逻辑会让模板过重且难以维护，对于任何复杂逻辑，你都应当使用计算属性",
            "因为计算属性把函数当做值看待，所以在使用时不需要加(),如果加了(),效果就和methods一样重新渲染了",
            "computed和methods(方法)有相同的运行结果。不同的是计算属性具有缓存，意思是在computed内的函数要操作的值未改变，当重新渲染时，就不会再次执行这个函数，但是如是在methods(方法)中的函数，将会再重新渲染时，再次执行函数，不管里面的数据是否发生变化。"
          ],
          codeBlock:`
<div id="app">
<!--不应该在模板中做这些运算-->
<!-- {{ message.split('').reverse().join('') }} -->
{{message}}
{{reversedMessage}}
</div>

<script>
const app = new Vue({
  el:"#app",
  data:{
    message:'kita'
  },
  computed:{
    reversedMessage() {
      return this.message.split('').reverse().join('')
    }
  }
})
</script>

          `,
          mind:"如计算属性中直接给函数定义为箭头函数，则this不会指向这个组件的实例，因为箭头函数指定的是父作用域的上下文。"
        }
      ]
    },
    {
      title:"methods",
      code:[
        {
          now:"",
          explain:[
            "methods里面定义方法与computed使用方法和返回结果相同，不同地方在computed有记录"
          ],
          codeBlock:`
<script>
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus() {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
</script>
          `,
          mind:"methods里也不能用箭头函数来定义函数，里面的this的值将会是undefined"
        }
      ]
    }
  ]//method
}