import * as list from 'common/data'
export const NowRoute ={  //当前路由对应栏目选项
  data(){
    return {
      nowRoute:this.$route.path.substr(1),
      data:[]
    }
  },
  created(){
    for(let i in list){
      if (i == this.nowRoute){
      Object.assign(this.data,list[i])
      break
      }
    }
  }
}

export const rightJump= {//右边内容的跳转
  data(){
    return {
      nowTitle:0, //栏目选项
      nowCurrent:0, //内容选项
      
    }
  },
  methods:{
    nowMethod(index){
      this.nowCurrent = index  //现在的内容选项
    },
    nowName(index){
      this.nowTitle = index //现在的栏目选项
    }
  }
}