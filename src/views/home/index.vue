<template>
  <div class="home">
    <div :class="[navBack ? 'bg_close' : 'bg_open']"></div>
    <home-main/>
  </div>
</template>

<script>
import homeMain from './childComps/homeMain'
export default {
  name: '',
  components:{
    homeMain
  },
  computed:{
    navBack(){
      return this.$store.state.navShrink
    }
  }
}
</script>
<style scoped lang="scss">
.bg{
  position: fixed;
  background-image:url('~assets/img/home/bg/1.jpg');
  background-size: 100% 100%;
  height: 100vh;
  z-index: -1;
  min-width: 800px;
  transition:all 1s;
}
.bg_open{
 @extend .bg;
 width: 85%;
}
.bg_close{
  @extend .bg;
  width: 100%;
}
</style>