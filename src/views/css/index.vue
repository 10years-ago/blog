<template>
  <div class="css">
    <sidebar :data="data" :nowRoute="nowRoute" @nowMethod="nowMethod" @nowName="nowName"/>
    <rightContent :data="data[nowTitle].method[nowCurrent]"/>
  </div>
</template>

<script>
import sidebar from 'components/content/sidebar/sidebar'
import rightContent from 'components/content/rightContent/rightContent'
import {NowRoute,rightJump} from 'common/mixin'
export default {
  name: 'css',
  components:{
    sidebar,
    rightContent
  },
  props:{},
  data(){
    return {
    }
  },
  mixins:[NowRoute,rightJump],//混入,当前路由对应栏目选项，，右边页面跳转
}
</script>
<style scoped>
.css{
  display: flex;
}
</style>