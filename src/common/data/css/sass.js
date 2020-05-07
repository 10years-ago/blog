export let sass = {
  name:"sass",
  method:[
    {
    title:"变量",
    code:[
      {
        explain:[
          "sass里可以用$来定义一个变量，可以减少重复书写的麻烦，用处多用于定义页面主色调。下面是一些用法"
        ],
        codeBlock:`
<style lang="scss">
$wife-color:#0080FF
nav{
  background:$wife-color
}
.top{
  border:1px solid $wife-color
}
</style>
        `,
        mind:"变量中下划线_和中划线-不会影响编译。sass中会把它看做一样的。"
      },
      {
        now:"关于默认变量!default",
        explain:[
          "这一般用于@import导入别人的sass文件，需要替换当前的变量时使用。可以看做把当前的变量的权重变得最低，只要有新的同名变量都会覆盖当前的变量"
        ]
      }
     ]
    },
    {
      title:"嵌套规则",
      code:[
        {
          explain:[
            "sass里面避免了书写重复的ID或class，在sass规则里面，可以以嵌套的形式去书写css"
          ],
          codeBlock:`
<style lang="scss">
#kita .wife h1{color: white}
#kita .wife p{font-size: 5px}
#kita aside{font-weight: 800}

/*编译后*/

#kita{
  .wife{
    h1{color: white}
    p{font-size: 5px}
  }
  aside{font-weight: 800}
}
</style>
          `
        },
        {
          now:"父标识符&",
          explain:[
            "一般在嵌套里面想使用:hover等伪类时，需要在前面加上个标识符&让当前选中的元素添加伪元素,不然sass对于伪类的操作就会没反应"
          ],
          codeBlock:`
<style lang="scss">
article a {
  color: blue;
  &:hover { color: red }
}
</style>
          `
        },
        {
          now:"同层选择器:>、+、~",
          explain:[
            ">p：选择当前层的所有p元素",
            "#kita + p：选择当前层#kita后的第一个p标签",
            "#kita ~ p：选择当前层#kita后的所有p标签"
          ],
          codeBlock:`
<style lang="scss">
.contatiner{
  >p{color:red}
  #kita + p{color:blue}
  #kita ~ p{color:green}
}
</style>
          `
        },
        {
          now:"嵌套属性",
          explain:[
            "嵌套属性用于border-*等元素，你需要反复的写比如border-style，border-radius等属性"
          ],
          codeBlock:`
<style lang="scss">
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}

/*修改后*/

nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
</style>
          `
        }
      ]
    },
        {
      title:"混合器",
      code:[
        {
          explain:[
            "混合器可以理解为封装一个对象，里面放一些样式，然后可以在别处@include引入对象内的样式"
          ],
          codeBlock:`
<style lang="scss">
@mixin kita {
  border-radius:5px;
  color:blue
}

.wife{
  height:100px;
  @include kita
}
</style>
          `,
          mind:""
        },
        {
          now:"混合器中的css规则",
          codeBlock:`
<style lang="scss">
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
</style>
          `
        },
        {
          now:"混合器传参",
          explain:[
            "类似于function()的用法"
          ],
          codeBlock:`
<style lang="scss">
//可以$hover:$normal给hover设默认值
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
a {
  @include link-colors(blue, red, green);
}

//最终生成的是

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }

</style>
          `
        }
      ]
    },
    {
      title:"继承",
      code:[
        {
          explain:[
            "sass里面可以选择继承一个选择器的样式。下面代码中.wife不仅继承了.kita中的样式，也会继承与.kita相关的样式，比如.kita a的样式也会继承到.wife a当中"
          ],
          codeBlock:`
<style lang="scss">
  .kita {
  border: 1px solid red;
  background-color: #fdd;
}
.wife {
  @extend .kita;
  border-width: 3px;
}
</style>
          `,
          mind:"继承要比混合器的效率高，因为继承仅重复选择器，而不会重复属性。不要用后代选择器去继承比如：.foo .bar { @extend .baz; }"
        }
      ]
    }
  ]
}