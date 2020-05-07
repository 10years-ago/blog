import {Lifecycle} from './vue/Lifecycle';
import {watch} from './vue/watch';
import {Directives} from './vue/Directives'
import {DataDom} from './vue/DataDom';
import {component} from './vue/component';
import {router} from './vue/router.js';
import {Vuex} from './vue/Vuex.js';
import {transition} from './vue/transition.js';


let vue = [
  {
   name:"前言",
   method:[
     {
       title:"关于vue栏目",
       code:[
         {
        explain:["这个栏目里面的内容都不会完全记录，只会记录一些不常用或曾经踩过坑的内容。还有就是看我心情！！！"],
        codeBlock:"",
        mind:""
      }
    ]
  }
]
 },
  Directives,
  Lifecycle,
  watch,
  DataDom,
  component,
  router,
  Vuex,
  transition
]
export{
  vue
}