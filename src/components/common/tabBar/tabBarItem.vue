<template>
  <a class="tab-bar-item" :class="{action:isActive == true}"
     @click="routeChange()" @mouseenter="moveIn()"
      @mouseleave="moveOut()">
    <div v-if="move == true" class="icon"><slot name="icon"></slot></div>
    <div v-else class="icon"><slot name="iconA"></slot></div>
    <div class="name" :class="{name_color:isActive == true}"><slot name="name"></slot></div>
  </a>
</template>
<script>
export default {
  name: 'tabBarItem',
  components:{},
  props:{
    path:String,
  },
  data(){
    return {
      move:false
    }
  },
  computed:{
    isActive:{
      get(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      set(){}
    }
  },
  watch:{
    isActive(val){
      if(val == false){
        this.move = false
      }
    }
  },
  beforeUpdate(){
    if(this.isActive == true){
      this.move = true
    }
  },
  methods:{
    moveIn(){
      this.move = true
    },
    moveOut(){
       if(this.$route.path.indexOf(this.path) !== -1) return
       this.move = false
    },
    routeChange(){
      if(this.$router.currentRoute.path != this.path){
      this.$router.push(this.path)
      }
    }
  }
}
</script>
<style scoped>
.tab-bar-item{
  padding: .5em 1em;
  color: white;
  border-bottom: 1px solid #373737;
  text-decoration: none;
  display: flex;
  justify-content:flex-start;
}
.icon{
  width: 12%;
}
.tab-bar-item img{
 width: 100%;
}
.name{
  line-height: 2em;
  margin-left: .5em;
}
.name_color{
  color: white!important
}
.action{
  background-color: #373737;
}
.tab-bar-item:hover{
  background-color: #373737;
  cursor:pointer;
}
</style>