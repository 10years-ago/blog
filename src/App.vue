<template>
  <div id="app">
    <nav-bar/>
    <div :class="[navBack ? 'view_close' : 'view_open']">
      <!-- <div style="height:72px"> -->
        <top-nav/>
      <!-- </div> -->
      <keep-alive>
        <transition name="router"
          :duration="300"
          mode="out-in"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">
          <router-view/>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import navBar from 'components/content/navBar/navBar'
import topNav from 'components/content/topNav/topNav'
import animate from 'animate.css'
export default {
  name: 'App',
  components: {
  navBar,
  topNav
  },
  computed:{
    model(){
      return this.$store.state.model
    },
    navBack(){
      return this.$store.state.navShrink
    }
  },
mounted() {
  window.L2Dwidget.init({
      pluginRootPath: 'live2dw/',
      pluginJsPath: 'lib/',
      pluginModelPath: this.model.substring(0,this.model.indexOf('/') + 1),
      tagMode: false,
      debug: true,
      model: { jsonPath: 'live2dw/' + this.model },
      display: { position: 'letf', width: 300, height: 300 },
      mobile: { show: true },
      //是否看屏幕
      log: true
      })
  }
}
</script>

<style lang="scss">
@import "assets/css/base.css";
.view{
  transition:all 1s;
  overflow-y:hidden;
  overflow-x:hidden;
}
.view_open{
  @extend .view;
  width: 85%;
  margin-left: 15%
}
.view_close{
  @extend .view;
  width: 100%;
  padding-top: 72px;
  .sidebar, .rightContent{
    height:calc(100vh - 72px)!important
  }
}
@media screen and (max-width: 1666px)
{
  .view_open
  {
    width: calc(100% - 250px);
    margin-left: 250px;
  } 
}
</style>
