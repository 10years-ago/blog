<template>
  <div class="sidebar">
    <h2>{{nowRoute}}</h2>
    <ul>
      <li v-for="(item,index) in data" :key="item.index" @click="nowName(index)">
        <sidebarContent :content="item" @nowMethod="nowMethod" :titleName="titleName"/>
      </li>
    </ul>
  </div>
</template>

<script>
import * as list from 'common/data'
import sidebarContent from './sidebarContent';
export default {
  name: 'sidebar',
  components:{
    sidebarContent
  },
  props:{
    nowRoute:String,
    data:{
      type:Array
    }
  },
  data(){
    return {
      titleName:this.data[0].name,
    }
  },
  methods:{
    nowName(index){
      this.$emit('nowName',index)
    },
    nowMethod(index,name){
      this.titleName = name
      this.$emit('nowMethod',index)
    }
  },
}
</script>
<style scoped>
.sidebar{
  width: 260px;
  overflow-y: auto;
  overflow: auto;
  height: 100vh;/* 需要有高度 */
}
h2{
  text-align: center;
}
</style>