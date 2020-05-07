<template>
  <!-- 记住这个神奇的操作，解决渲染问题,数据还未请求结束，页面已经开始渲染了 -->
  <!-- Error in render: "TypeError: Cannot read property xxx of undefined" -->
  <!-- v-if使数据加载完再渲染，完美解决问题 -->
  <div class="rightContent" v-if="data!=null"> 
    <div class="box">
      <h3 class="title">{{data.title}}</h3>
      <div v-for="code in data.code" :key="code.id">
        <h3 class="now" v-if="code.now" >{{code.now}}</h3>
        <p class="explain" v-for="p in code.explain" :key="p">{{p}}</p>
        <div v-if="code.pic" class="pic">
          <img :src="code.pic">
        </div>
        <codemirror v-if="code.codeBlock" 
                    class="codemirror"
                    :options="cmOptions"
                    v-model="code.codeBlock"
                    >
        </codemirror>
        <p class="mind" v-if="code.mind" >{{code.mind}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  // base style
  import 'codemirror/lib/codemirror.css'
  // theme css
  // import 'codemirror/theme/base16-dark.css'
  import 'codemirror/theme/monokai.css'
  // language
  import 'codemirror/mode/vue/vue.js'
  // active-line.js
  import 'codemirror/addon/selection/active-line.js'
  // styleSelectedText
  import 'codemirror/addon/selection/mark-selection.js'
  import 'codemirror/addon/search/searchcursor.js'
  // keyMap
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/addon/edit/matchbrackets.js'
  import 'codemirror/addon/comment/comment.js'
  import 'codemirror/addon/dialog/dialog.js'
  import 'codemirror/addon/dialog/dialog.css'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/search.js'
  import 'codemirror/keymap/sublime.js'

export default {
  name: 'rightContent',
  components:{
    codemirror
  },
  props:{
    data:{
      type:Object
    }
  },
  data(){
    return {
      cmOptions:{ //codemirror
          tabSize: 4,
          foldGutter: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          lineWrapping:true,
          readOnly:false,//设置只读
          keyMap: "sublime",
          mode: 'text/x-vue',
          theme: 'monokai'
      }
    }
  },
}
</script>
<style scoped>
.rightContent{
  width:100%;
  overflow-y: auto;
  overflow: auto;
  height: 100vh;/* 需要有高度 */
}
.box{
  width: 65%;
  margin: 0 auto;
}
.codemirror{
   margin: 1.2em 0;
}
.title{
  font-size: 1.17em;
  color: #273849;
}
.explain{
  line-height: 1.6em;
  margin-top: 1.2em;
}
.mind{
  margin: 1.2em 0;
  font-weight: 600;
}
.now{
  margin-top: 1.2em;
}
.pic{
  text-align: center;
}
.pic img{
  width: 100%;
}
</style>