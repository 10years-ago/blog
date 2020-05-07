<template>
<div class="sidebarContent">
  <h3 class="name" @click.stop="close">{{content.name}}</h3>
  <transition-group name="list" tag="ul">
    <li v-for="(now,index) in activeContent" 
      :key="now.title" class="title" @click="nowMethod(index)"
      :class="{action:index==actionColor}"
      >
      {{now.title}}
    </li>
</transition-group>
</div>
</template>

<script>
export default {
  name: 'sidebarContent',
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
  watch:{ //GTMDwatch,记住这个坑
    titleName(val){
      if(this.content.name != val)
      this.actionColor = -1
    }
  },
  methods:{
    nowMethod(index){
      this.actionColor = index
      this.$emit('nowMethod',index,this.content.name)
    },
    close(){
      this.open = !this.open
    }
  }
}
</script>
<style scoped>
.title{
  text-indent: 2em;
  margin-top: 8px;
  cursor: pointer;
  transition: all 1s;
}
.sidebarContent{
   overflow: hidden;
}
.title:hover,.action{
  color: #3EAF7C;
}
.name{
  text-indent: 1em;
  cursor:pointer;
}
.list-enter{
  opacity: 0;
}
.list-enter-to{
  opacity: 1;
}
.list-leave-active {
  opacity: 0;
  transform: translateX(5px);
}
</style>