var Lifecycle = {
  name:" 生命周期钩子",
  method:[
    {
      title:"beforeCreated",
      code:[{
        now:"",
        explain:["在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。"],
        codeBlock:"",
        mind:""
      }]
    },
    {
      title:"created",
      code:[{
       now:"",
       explain:["在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前尚不可用。"],
       codeBlock:"",
       mind:""
     }]
    },
    {
      title:"beforeMount",
      code:[{
        now:"",
        explain:["在挂载开始之前被调用：相关的 render 函数首次被调用。"],
        mind:"该钩子在服务器端渲染期间不被调用。",
        codeBlock:""
      }]
    },
    {
      title:"mounted",
      code:[{
        now:"",
        explain:[
         "实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个文档内的元素上，当mounted被调用时vm.$el也在文档内。",
         "注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick："
        ],
        codeBlock:`
<Script>
mounted: function () {
this.$nextTick(function () {
})
</Script>
        `,
        mind:"该钩子在服务器端渲染期间不被调用。"
      }]
    },
    {
      title:"beforeUpdate",
      code:[{
        now:"",
       explain:["数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。"],
       codeBlock:"",
       mind:"该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。",
     }]
    },
    {
      title:"updated",
      code:[{
        now:"",
       explain:[
         "虚拟 DOM 重新渲染和打补丁之后执行。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。",
         "注意 updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.$nextTick："
     ],
       codeBlock:`
<Script>
mounted: function () {
this.$nextTick(function () {
})
</Script>
       `,
       mind:"该钩子在服务器端渲染期间不被调用",
     }]
    },
    {
     title:"activated",
     code:[{
      now:"",
       explain:["被 keep-alive 缓存的组件激活时调用。"],
       codeBlock:"",
       mind:"该钩子在服务器端渲染期间不被调用"
     }]
   },
    {
      title:"deactivated",
      code:[{
        now:"",
       explain:["被 keep-alive 缓存的组件停用时调用。"],
       codeBlock:"",
       mind:"该钩子在服务器端渲染期间不被调用"
     }]
    },
    {
      title:"beforeDestroy",
      code:[{
        now:"",
       explain:["实例销毁之前调用。在这一步，实例仍然完全可用。"],
       codeBlock:"",
       mind:"该钩子在服务器端渲染期间不被调用"
     }]
    },
    {
      title:"destroyed",
      code:[{
        now:"",
       explain:["实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。"],
       codeBlock:"",
       mind:"该钩子在服务器端渲染期间不被调用"
     }]
    }
  ]
}

export{
  Lifecycle
}