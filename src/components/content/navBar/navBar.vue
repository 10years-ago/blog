<template>
  <div :class="[navBack ? 'navbar_close' : 'navbar_open']">
    <img src="~assets/img/navbar/hear/reply.png" id="navbar_back" @click="Shrink()">
    <head-info />
    <tab-bar/>
  </div>
</template>

<script>
import headInfo from './head/head';
import tabBar from './tabBar/tabBar';
export default {
  name: 'navBar',
  components:{
    headInfo,
    tabBar
  },
  computed:{
    // navbar状态是否展开
    navBack(){
      return this.$store.state.navShrink
    }
  },
  methods:{
    Shrink(){
      this.$store.commit('navChange')
      document.getElementById('live2d-widget').classList.add('live2D_right')
      document.getElementById('live2d-widget').classList.remove('live2D_left')
    }
  }
}
</script>
<style scoped lang="scss">
.navbar{
  background-color: #202020;
  width: 15%;
  min-width: 250px;
  height: 100vh;
  position:fixed;
  top: 0;
  bottom: 0;
  transition:all 1s;
}
.navbar_open{
  @extend .navbar;
  left:0;
}
.navbar_close{
  @extend .navbar;
  left:-15%;
}
#navbar_back{
  position:absolute;
  top: 0;
  right: 0;
  width: 3em;
  cursor:pointer
}
@media screen and (max-width: 1666px)
{
.navbar_close{
  left:-250px;
}
}
</style>