<template>
  <div class="home_main">
    <card-container/>
    <h2>欢迎来到kita的小屋</h2>
    <div class="content">
      <main-my />
    </div>
  </div>
</template>

<script>
import mainMy from './mainMy'
import CardContainer from 'components/common/3dCard/CardContainer'
export default {
  name: 'homeMain',
  components:{
    mainMy,
    CardContainer
  },

}
</script>
<style scoped>
.home_main{
 padding-top: 26vh;
 width: 100%;
}
.home_main>h2{
  color: white;
  text-align: center;
}
.content{
  background: url('~assets/img/home/main/main_bg.png');
}

</style>