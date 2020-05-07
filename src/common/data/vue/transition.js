export let transition = {
  name:"vue的内置过渡",
  method:[
    {
      title:"transition基本使用",
      code:[
        {
        explain:[
          "Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡,当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理：",
          "1.自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。",
          "2.如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。",
          "3.如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。"
        ],
        codeBlock:`
<template>
  <div>
    <button @click="show = !show">show</button>
    <transition name="fade">
    <p v-if="show">{{kita}}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'routerA',
  data(){
    return{
      kita:'kita',
      show:true
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
        `
        },
        {
          now:"过渡的类名",
          explain:[
            "v-enter：定义进入过渡刚开始的状态。过渡开始后移除",
            "v-enter-active：定义元素进入的过程的过渡，可定义过渡的时间，过渡完成后移除",
            "v-enter-to：2.1.8 版及以上可使用，定义进入过渡到结束的状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。和enter-active差不多。",
            "对于进入过渡可以总结为：添加v-enter -> 添加v-enter-active -> 卸载v-enter -> 添加v-ernter-to -> 卸载v-enter-to和v-enter-active"
          ],
          pic:require('../../../assets/img/vue/transition_enter.jpg')
        },
        {
          explain:[
            "v-leave:定义离开过渡刚开始的状态。过渡开始后移除",
            "v-leave-active:定义离开过渡生效时的状态,可定义过渡时间，过渡完成后移除",
            "v-leave-to:2.1.8 版及以上定义离开过渡到结束的状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。",
            "离开过渡的总结和进入过渡一样，下面是官方的事件图"
          ],
          pic:require('../../../assets/img/vue/transition.png'),
          mind:"使用translateX等操作，留意width/height，可能会造在隐藏的时候，被隐藏的数据会占用width/height的情况，直到过渡完毕才恢复正常，这样会影响体验"
        }
      ]
    },
    {
      title:"第三方动画库的使用",
      code:[
        {
          explain:[
            "可以使用animate.css的动画库，或一些第三方的动画库来作为过渡动画，这些第三方动画库的类目的优先级高于普通类名",
            "首先要npm安装animate.css动画库，然后在组件内引用，过渡的写法与普通的差不多，但是这个类名是定义在transition上的，命名与普通的类目差不多，只是v-enter -> enter-class这样的变化",
            ":duration='{enter:5000,leave:10000}'的写法会被第三方动画库覆盖导致不起作用"
          ],
          codeBlock:`
<template>
  <div>
   <button @click="show = !show">show</button>
   <transition 
    name="kita"
    enter-active-class="animated bounceInDown"
    leave-active-class="animated rotateOut">
    <p v-if="show">{{kita}}</p>
   </transition>
  </div>
</template>

<script>
import animate from 'animate.css'
export default {
  name: 'routerA',
  data(){
    return{
      kita:'kita',
      show:true
    }
  }
}
</script>
          `,
          mind:"过渡动画有时候要预留一些空间，不然可能会存在没有效果或显示滚动条等问题"
        }
      ]
    },
    {
      title:"多个元素过渡",
      code:[
        {
          explain:[
            "transition里面只可以放一个标签，因为会使用到v-if，当有相同标签切换时，需要有key设置唯一值，否则 Vue 为了效率只会替换相同标签内部的内容"
          ],
          codeBlock:`
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-if="docState === 'editing'" key="editing">
    Cancel
  </button>
</transition>

//可以写为
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>

<script>
export default{
  //...
  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved': return 'Edit'
        case 'edited': return 'Save'
        case 'editing': return 'Cancel'
      }
    }
}
</script>
          `
        },
        {
          now:"过渡模式",
          explain:[
            "transition默认行为，即enter和leave同时发生，这种多在A标签隐藏(leave)，B标签显示(enter)这种多元素过渡的情况下发生。为例避免这种情况，在transition里提供了过渡模式：",
            "in-out：新元素先进行过渡，完成之后当前元素过渡离开。",
            "out-in：当前元素先进行过渡，完成之后新元素过渡进入。",
          ],
          codeBlock:`
<template>
  <div class="fade">
   <transition name="fade" mode="out-in">
    <button @click="isShow()" :key="abc">
      {{kita}}
    </button>
   </transition>
  </div>
</template>

<script>
export default {
  name: 'routerA',
  data(){
    return{
      abc:'kita',
      show:true
    }
  },
  computed:{
    kita(){
      switch(this.abc){
        case 'kita':return 'on'
        case 'yui':return 'off'
      }
    }
  },
  methods:{
    isShow(){
      this.show = !this.show
      this.show ? this.abc = 'kita':this.abc = 'yui'
    }
  }
}
</script>

<style scoped>
 .fade{
   padding-left: 50px;
 }
 button{
   width: 44px;
   padding: 0;
   margin: 0;
 }
.fade-enter-active, .fade-leave-active{
transition: all .5s;
}
.fade-leave-to{
  transform: translate(-44px);
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
          `
        },
        {
          now:"多个组件的过渡",
          explain:[
            "组件使用动态组件即可，下面代码效果类似于tab栏切换，虽然使用的是单选框。"
          ],
          codeBlock:`
<template>
  <div class="fade">
    <input type="radio" id="one" value="routerB" v-model="view">
    <label for="one">A</label>
    <input type="radio" id="two" value="routerC" v-model="view">
    <label for="two">B</label>
    <transition name="fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>
  </div>
</template>

<script>
import routerB from './routerTest'
import routerC from './routerC'
export default {
  name: 'routerA',
  data(){
    return{
      view: 'routerB'
    }
  },
  components: {
    routerB,
    routerC
  }
}
</script>

<style>
/*与上一个代码的style相同*/
</style>
          `
        }
      ]
    },
    {
      title:"列表过渡",
      code:[
        {
          now:"排序过渡",
          explain:[
            "transition-group主要用于整个列表的过渡，比如重新排序之类的。其中过渡模式将不可用，内部属性需提供一个唯一的key属性，CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。",
            "如果使用css改变元素的宽、高度或定位，这会使你触发了性能低下的重排或重绘计算，在某些情况下甚至可能导致页面闪烁，所以会推荐使用绝对定位让元素改变不影响其他元素，这样可以使过渡看起了比较流畅。那么为啥vue能那么丝滑的进行动画呢？因为vue内部对于过渡使用了一个叫FLIP的技术",
            "FLIP:简单概况一下，就是它会在动画开始是就计算好元素的初始和结束状态，然后使用transform进行过渡。多用于移动端。FLIP 过渡的元素不能设置为 display: inline 。作为替代方案，可以设置为 display: inline-block 或者放置于 flex 中"
          ],
          codeBlock:`
<template>
<div id="list-demo" class="demo">
  <button @click="add">Add</button>
  <button @click="remove">Remove</button>
  <button @click="Shuffle">Shuffle</button>
  <transition-group name="list" tag="div">
    <!-- 可以用tag将所有内容放在一个标签内包起来 -->
    <span v-for="item in items" :key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
</template>

<script>
//安装loadsh这个js库,就可使用shuffle方法
import _ from "lodash"
export default {
  name: 'routerA',
  data(){
    return{
     items: [1,2,3,4,5,6,7,8,9],
     nextNum: 10
    }
  },
  methods: {
    //基于当前items获得一个随机index
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
    Shuffle(){
      this.items = _.shuffle(this.items)
    }
  }
}
</script>

<style scoped>
.list-item {
  transition: all 1s;
  /* 给所有span里面都设置一个过渡时间即可 */
  display: inline-block;
  margin-right: 10px;
}
.list-leave-active {
  /*如果不设置absolute，上一个未完成leave过渡的元素会挡住现在要进行过渡的元素 */
  /*因为在没设置mode的情况下，transition的enter和leave是一起执行的*/
  position: absolute;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
</style>
          `,
          mind:""
        },
        {
          now:"下面是一个多维表格过渡的案例",
          codeBlock:`
<template>
<div id="sudoku-demo" class="demo">
  <button @click="shuffle">Shuffle</button>
  <transition-group name="cell" tag="div" class="container">
    <div v-for="cell in cells" :key="cell.id" class="cell">
      {{ cell.number }}
    </div>
  </transition-group>
</div>
</template>

<script>
import _ from "lodash"
export default {
  name: 'routerA',
  data(){
    return{
      //下面map内的_下划线是私有变量的意思,实际写啥都行
      cells: Array.apply(null, { length: 81 }).map(function(_, index) {
        return {
          id: index,
          number: (index % 9) + 1
        };
      })
    }
  },
  methods: {
    shuffle: function() {
      this.cells = _.shuffle(this.cells);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 238px;
  margin-top: 10px;
}
.cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaa;
  margin-right: -1px;
  margin-bottom: -1px;
}
.cell:nth-child(3n) {
  margin-right: 0;
}
.cell:nth-child(27n) {
  margin-bottom: 0;
}
.cell-move {
  transition: transform 1s;
}
</style>
          `
        }
      ]
    }
  ]//method
}