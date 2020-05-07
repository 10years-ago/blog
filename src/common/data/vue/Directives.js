export let Directives = {
  name:"v-指令",
  method:[
    {
      title:"v-if/v-show",
      code:[
        {
          now:"",
          explain:[
            "v-if/v-show都可以根据后面的表达式判断是否显示该元素，意思就是可以理解为切换显示效果。",
            "v-if和v-show还是有点小差别，v-if决定是否渲染，为false时会销毁元素。v-show只是切换元素display属性"
          ],
          codeBlock:`
<div v-if=true>
  A
</div>
<div v-else>
  B
</div>

<div v-show="true">
  B
</div>
          `,
          mind:"有时会出现数据未请求结束，页面开始渲染导致找不到数据而报错，这时可以使用v-if使数据加载完再渲染"
        }
      ]
    },
    {
      title:"v-for",
      code:[
        {
          now:"",
          explain:[
            "遍历Array | Object | number | string | Iterable",
            "在for循环中，在插值过后可能造成数据不对或如果遍历过后要排序则很可能会浪费资源(比如A,B,C转化为C,B,A的操作会这样：转化过后的A的位置发现变为C，就会删除原本的A，然后创造一个C，B也是发现自己的位置变成了A，也删除了B，创造一个A。这样反复就会浪费资源)",
            "为了解决上面的问题，在做for循环的时候加入：key,可以让vue能够识别每一组节点,给每个遍历过后的对象加个标记，但是如果用index作为key的值的话，在中间或开头插入数据也会导致数据重新渲染，最好就是在数据中有自己的唯一id"
          ],
          codeBlock:`
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
          `,
          mind:""
        }
      ]
    },
    {
      title:"v-on",
      code:[
        {
          now:"",
          explain:[
            "语法糖@，用于监听事件。事件类型有参数决定，可以是click、keyup、mouseenter、mouseleave之类的参数。用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。",
            ".stop - 调用 event.stopPropagation()。停止冒泡",
            ".prevent - 调用 event.preventDefault()。阻止默认行为,比如取消右键的默认弹出框之类的",
            ".self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。",
            ".native - 监听组件根元素的原生事件。",
            ".once - 只触发一次回调。",
            ".left .right .middle - 只当点击鼠标左/右、中键时触发。"    
          ],
          codeBlock:`
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
          `,
          mind:""
        }
      ]
    },
    {
      title:"v-bind",
      code:[
        {
          now:"",
          explain:[
            "语法糖写作:，动态地绑定一个或多个特性，或一个组件 prop 到表达式。在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。"
          ],
          codeBlock:`
<!-- 绑定一个属性 -->
<img :src="imageSrc">

<!-- class 绑定 -->
<!-- 当isRed为true时，添加.red这个class -->
<div :class="{ red: isRed }"></div>

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>

<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>

<!-- 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>
          `,
          mind:""
        }
      ]
    },
    {
      title:"v-if与v-for",
      code:[
        {
          explain:[
            "官方不推荐v-for里面嵌套v-if，因为v-for 比 v-if 具有更高的优先级，这样会造成v-if在v-for中多次运行。可以把v-if操作给computed去执行即可,下面是一个专门针对transition-group的操作",
          ],
          codeBlock:`
<template>
<div class="sidebarContent">
  <transition-group name="list" tag="ul">
    <li v-for="(now,index) in activeContent" 
      :key="now.title" class="title"
      >
      {{now.title}}
    </li>
</transition-group>
</div>
</template>

<script>
export default{
  data(){
    return {
      actionColor:-1,
      open:false
    }
  },
  computed:{
    activeContent(){
      return this.open ? this.content.method : null
    }
  },
}
</script>
          `,
        }
      ]
    }
  ] //method end
}