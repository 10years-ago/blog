<template>
  <div class="my">
    <div class="img"><img src="~assets/img/home/main/head.jpg" alt=""></div>
    <div class="my_text">
      <p>kita</p>
      <p>一枚小小的新人前端</p>
      <div class="address">
        <a href="https://space.bilibili.com/12222339"><img id="bili" src="~assets/img/home/main/bili.jpg"></a>
        <a href="https://github.com/10years-ago"><img id="github" src="~assets/img/home/main/github.jpg"></a>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
export default {
  name: 'mainMy',
  components:{},
  props:{},
  data(){
    return {
    }
  },
}
</script>
<style scoped>
.my{
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
}
.img img{
  width: 15em;
  height: 15em;
  border-radius: 50%;
}
.my_text{
  margin-left: 30px;
}
.my_text>p:first-child{
  color: #273849;
  font-size: 4em;
}
.my_text>p:nth-child(2){
  color: #273849;
  font-size: 2em;
}
.address{
  margin-top: 1em;
}
#github,#bili{
  width: 8em;
  height: 3em;
  border-radius: 2em;
}
@media screen and (max-width: 1382px)
{
  .img{
    width: 100%;
  }
  .my_text{
   width: 100%; 
  }
  .my{
    text-align: center;
  }
}
</style>