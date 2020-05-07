<template>
  <div class="container">
    <card :data-image="card1">
      <h1 slot="header">个人信息</h1>
      <p slot="content">吴伟耀</p>
      <p slot="content">唯物主义/一个坚定的以事实为依据切充满理想的年轻人</p>
    </card>
    <card :data-image="card2">
      <h1 slot="header">教育经历</h1>
      <p slot="content">毕业于东莞职业技术学院</p>
      <p slot="content">计算机应用专业</p>
    </card>
  </div>
</template>

<script>
import card from 'components/common/3dCard/card';
export default {
  name: 'CardContainer',
  components:{
    card
  },
  computed:{
    card1(){
      return require('assets/img/home/3dcard_1.jpg')
    },
    card2(){
      return require('assets/img/home/3dcard_2.jpg')
    }
  }
}
</script>
<style scoped>
.container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>