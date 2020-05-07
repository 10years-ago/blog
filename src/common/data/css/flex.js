export let flex = {
  name:"flex",
  method:[
    {
      title:"flex-direction",
      code:[
        {
          now:"",
          explain:[
            "flex-direction属性决定主轴的方向（即项目的排列方向）,有四个值。",
            "row（默认值）：主轴为水平方向，起点在左端。",
            "row-reverse：主轴为水平方向，起点在右端。",
            "column：主轴为垂直方向，起点在上沿。",
            "column-reverse：主轴为垂直方向，起点在下沿。"
          ],
          codeBlock:`
<style>
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"flex-wrap",
      code:[
        {
          now:"",
          explain:[
            "flex-wrap属性定义，如果一条轴线排不下，如何换行。",
            "nowrap（默认）：不换行。",
            "wrap：换行，第一行在上方。",
            "wrap-reverse：换行，第一行在下方。"
          ],
          codeBlock:`
<style>
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"justify-content",
      code:[
        {
          now:"",
          explain:[
            "justify-content定义了在X轴上的对齐方式",
            "flex-start（默认值）：左对齐",
            "flex-end：右对齐",
            "center： 居中",
            "space-between：两端对齐，项目之间的间隔都相等。给前后定固定宽度，可使中间的内容居中",
            "space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。"
          ],
          codeBlock:`
<style>
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"align-items",
      code:[
        {
          now:"",
          explain:[
            "align-items定义了在Y轴上的对齐方式",
            "flex-start：顶部对齐。",
            "flex-end：底部对齐。",
            "center：居中对齐。",
            "baseline: 项目的第一行文字的基线对齐。",
            "stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。"
          ],
          codeBlock:`
<style>
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"align-content",
      code:[
        {
          now:"",
          explain:[
            "align-content可以理解为定义了整体的Y轴对齐方式",
            "flex-start：顶部对齐。",
            "flex-end：底部对齐。",
            "center：居中对齐。",
            "space-between：与顶部底部两端对齐，每行间隔平均分布。",
            "space-between：每行两端间隔相等，间隔不会相交，所以两行之间的间隔会有两倍",
            "stretch（默认值）"
          ],
          codeBlock:`
<style>
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
</style>
          `,
          mind:"参考https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=stretch"
        }
      ]
    },
    {
      title:"order",
      code:[
        {
          now:"",
          explain:[
            "order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。"
          ],
          codeBlock:`
<style>
.item {
  order: 要排列的数字;
}
</style>
          `,
          mind:"未定义数值的其他项目默认为0"
        }
      ]
    },
    {
      title:"flex-grow",
      code:[
        {
          now:"",
          explain:[
            "flex-grow定义项目的放大比例，默认为0",
            "如果所有项目属性都为1，则等比例放大。如果其中一个为2，则按照属性为1的两倍放大，3的话就是3倍，以此类推"
          ],
          codeBlock:`
<style>
.item {
  flex-grow: 放大的比例数字;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"flex-shrink",
      code:[
        {
          now:"",
          explain:[
            "flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。",
            "具体与flex-grow的定义是一样的，只不过是缩小而已"
          ],
          codeBlock:`
<style>
.item {
  flex-shrink: 缩小的比例数字;
}
</style>
          `,
          mind:"如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。"
        }
      ]
    },
    {
      title:"flex-basis",
      code:[
        {
          now:"",
          explain:[
            "flex-basis可以将一个项目强行定义一个自己的width,这个的定义会添加在进行了flex-grow之类的运算过后的值上",
          ],
          codeBlock:`
<style>
.item {
  flex-basis: 宽度;
}
</style>
          `,
          mind:""
        }
      ]
    },
    {
      title:"align-self",
      code:[
        {
          now:"",
          explain:[
            "align-self用在使某个项目不想受align-items约束时使用，属性与align-items一致",
          ],
          codeBlock:`
<style>
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
</style>
          `,
          mind:""
        }
      ]
    }
  ]
}