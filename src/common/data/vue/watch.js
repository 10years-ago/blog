export let watch = {
  name:"监听器",
  method:[
    {
      title:"watch",
      code:[{
        now:"",
        explain:["watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。"],
        codeBlock:`
<Script>
 export default{
   props:{
     content:{
       type:Object,
       default(){
         return{}
         }
       },
       titleName:{
         type:String
       }
   },
   watch:{ //监听发送过来的数据变化
     titleName(val){
       if(this.content.name != val)
       this.actionColor = -1
     }
   },
   data(){
     return {
       actionColor:-1,
       open:false
     }
   },
 }
</Script>`,
        mind:"",
      }]
    }
  ]
}