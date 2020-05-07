<template>
  <tab-bar-container class="top-nav" :class="{top_nav_close:navBack == false}">
    <div id="top-nav-menu">
      <img src="~assets/img/navbar/topNav/menu.png" @click="Shrink()">
    </div>
    <div style="flex-grow: 1"> </div>
    <tab-bar-item path="/home">
      <img slot="icon" src="~assets/img/navbar/tabBar/1.png">
      <img slot="iconA" src="~assets/img/navbar/tabBar/2.png">
      <div slot="name">Home</div>
    </tab-bar-item>
    <tab-bar-item path="/html">
      <img slot="icon" src="~assets/img/navbar/tabBar/3.png">
      <img slot="iconA" src="~assets/img/navbar/tabBar/4.png">
      <div slot="name">HTML</div>
    </tab-bar-item>
    <tab-bar-item path="/css">
      <img slot="icon" src="~assets/img/navbar/tabBar/5.png">
      <img slot="iconA" src="~assets/img/navbar/tabBar/6.png">
      <div slot="name">CSS</div>
    </tab-bar-item>
    <tab-bar-item path="/JavaScript">
      <img slot="icon" src="~assets/img/navbar/tabBar/7.png">
      <img slot="iconA" src="~assets/img/navbar/tabBar/8.png">
      <div slot="name">JavaScript</div>
    </tab-bar-item>
    <tab-bar-item path="/vue">
      <img slot="icon" src="~assets/img/navbar/tabBar/9.png">
      <img slot="iconA" src="~assets/img/navbar/tabBar/10.png">
      <div slot="name">Vue</div>
    </tab-bar-item>
  </tab-bar-container>
</template>

<script>
import tabBarContainer from 'components/common/tabBar/tabBarContainer';
import tabBarItem from 'components/common/tabBar/tabBarItem';
export default {
  name: '',
  components:{
    tabBarContainer,
    tabBarItem
  },
   methods:{
    Shrink(){
      this.$store.commit('navChange')
      document.getElementById('live2d-widget').classList.add('live2D_left')
      document.getElementById('live2d-widget').classList.remove('live2D_right')
    }
  },
  computed:{
    navBack(){
      return this.$store.state.navShrink
    }
  },
}
</script>

<style lang="scss">
.top-nav{
  z-index: 999;
  transition:all 1s;
  position:fixed;
  top: 0px;
  width: 100%;
  display: flex;
  min-width: 970px;
  justify-content:flex-end;
  background-color: #fff;
  border-bottom: 1.5px solid #373737;
  .icon{
    width: 50px
  }
  .tab-bar-item{
    &:hover{
      .name{
      color: #fff!important
      }
    }
    border:none;
    flex-basis:150px
  }
  .name{
    text-align: center;
    flex: 1;
    line-height: 3em;
    color: #373737;
    font-weight: bold;
  }
} 
.top_nav_close{
  transition:all 1s;
  top: -72px
}

.live2D_right{
  right: 0;
}
.live2D_left{
  left: 0;
}
#top-nav-menu img{
  width: 24px;
  margin-top: 1em;
  margin-left: 1em;
  cursor:pointer
}
</style>