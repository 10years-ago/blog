<template>
 <div class="headInfo">
   <div class="img">
     <img src="~assets/img/navbar/hear/1.jpg" alt="">
   </div>
   <div class="font">
     <p>一枚小小的前端</p>
     <p>右下角我老婆</p>
     <p>不接受反驳</p>
     <p>kita</p>
   </div>
 </div>
</template>

<script>
export default {
  name: 'headInfo',
  components:{},
  props:{},
  data(){
    return {
    }
  },
}
</script>
<style scoped>
.headInfo{
  padding-top: 2em;
  padding-bottom: 2em;
  width: 70%;
  height: 20vh;
  min-height: 154px;
  margin: 0 auto;
  transform-style: preserve-3d;
  position: relative;
}
.img{
  position: absolute;
  height: 80%;
  transform: persective(800px) rotateY(0deg);
  backface-visibility:hidden; /* 表示翻转过后不显示背面 */
  transition: all 500ms ease;
}
.img img{
  width: 100%;
  height: 100%;
  border-radius: 8%;
}
.font{
  width: 100%;
  position: absolute;
  height: 80%;
  text-align: center;
  color: #C4C1C1;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 500ms ease;
}
.headInfo:hover .img{
   transform: perspective(800px) rotateY(180deg);
}
.headInfo:hover .font{
   transform: perspective(800px) rotateY(0deg);
}
</style>