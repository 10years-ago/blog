<template>
  <tab-bar-container>
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
  props:{},
  data(){
    return {
    }
  },
}
</script>
<style scoped>
</style>