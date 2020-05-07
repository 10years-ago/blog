let ES6 = {
  name:"ES6",
  method:[{
      title:"let/const",
      code:[
        {
        now:"",
       explain:[
         "let 作用域在所在的代码块内{}，let完全可以替代var，这是官方文档说的",
         "const 申明常量，变量指向的那个内存地址不得改动，但对于对象和数组保存的就是指针，但比如数组，对象，可以修改对象里面下标内的值arr[0],kita.name等"
       ],
       codeBlock:`
<script>
 console.log(a) //可以允许，var允许变量提升
 var a = 1 

 console.log(b) //错误，应先定义再使用
 let b = 1 

 const c = {
   name:kita,
   age:20
 }
 c.name = yui //允许修改对象内的值
 c = {} //错误，因为会指向另一个内存地址，因而会报错
</script>
       `,
       mind:"let和const都不存在变量提升"
     }
     ]
    },
    {
      title:"class",
      code:[
        {
        now:"",
        explain:[
          "类的数据类型就是函数，类本身就指向构造函数,class看作语法糖，ES5原先就可以实现class的功能，只是class的写法使对象原型更清晰",
          "类的方法都定义在prototype上,类的内部所有定义的方法，都是不可枚举的:Object.keys会返回一个空数组"
        ],
        codeBlock:`
<script>
function kita(a, b){
  this.a = a;
  this.b = b
}
kita.prototype.abc = function(){
  return this.a + this.b
}
var asd = new kita(2, 3)
console.log(asd.abc())
//上面是原先ES5写法
//下面是ES6的class写法
class wife{
  constructor(name, age){
    // constructor的this指向实例对象
    this.name = name;
    this.age = age;
  }
  sing(song){
    //方法里面的this就是谁调用就指向谁
    console.log(this.name + ' ' + song)
  }
}
var mywife = new wife('mio', 18)
mywife.sing('No Thank')
</script>
        `,
        mind:""
      },
      {
        now:"静态方法",
        explain:[
          "类相当于实例的原型，在类中定义的方法会给实例继承。如不想被实例继承，可加上static关键字就不会被实例继承，需要直接通过类来调用，这个称为静态方法",
          "父类的静态方法，可以被子类继承。静态方法也是可以从super对象上调用的。"
        ],
        codeBlock:`
<script>
class wife{
  static sing(){
    return 'No Thank'
  }
  static kita(){
    console.log('hello')
  }
  kita(){
    console.log('world')
  }
}
wife.sing() //'No Thank'
var mywife = new wife()
mywife.sing()  //报错，不存在函数sing

</script>
        `,
        mind:""
      },
      {
        now:"Class 表达式",
        explain:[
          "采用 Class 表达式，可以写出立即执行的 Class。"
        ],
        codeBlock:`
<script>
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
</script>
        `,
        mind:""
      },
      {
        now:"new.target 属性",
        explain:[
          "如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined",
          "利用new.target 属性这个特点，可以写出不能独立使用、必须继承后才能使用的类。"
        ],
        codeBlock:`
<script>
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
</script>
        `,
        mind:""
      },
      {
        now:"类的继承",
        explain:[
          "关于类的继承，实例化输出是就近原则，如果子类有该方法就执行该方法"
        ],
        codeBlock:`
<script>
class father{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  sing(song){
    return "father"
  }
}
class son extends father{
  constructor(name, age, color){
    //this.name = name //不可以直接重新构造，this会报错
    //this.age = age
    //this.color = color
    super(name, age) //调用了super方法后就可以在下面使用this了
    this.color = color
  }
  sing(song){
    //super.sing()可以获取父类的返回结果
      console.log(super.sing() + ' ' + this.name +' ' + this.age + ' ' + song + this.color)
    }
}
var Son = new son('yui', 18, 'blue')
Son.sing('ふわふわタイム')

console.log(Son instanceof father) //true
console.log(Son instanceof son)    //true

console.log(Object.getPrototypeOf(son)) //获取父类
</script>
        `,
        mind:""
      },
      {
        now:"super 关键字",
        explain:[
          "ES6 要求，子类的构造函数必须执行一次super函数。super()只能用在子类的构造函数之中，用在其他地方就会报错。",
          "在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例"
        ],
        codeBlock:`
<script>
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
    //这里执行的实际是super.print.call(this)
  }
}

let b = new B();
b.m() // 2

// ---------分割线-----------

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
</script>
        `,
        mind:""
      },
      {
        now:"",
        explain:[
          "如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。"
        ],
        codeBlock:`
<script>
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
</script>
        `,
        mind:""
      },
      {
        now:"类的prototype和__proto__",
        explain:[
          "Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。",
          "子类的__proto__属性，表示构造函数的继承，总是指向父类。子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。"
        ],
        codeBlock:`
<script>
class A {
}

class B extends A {
}

// Object.setPrototypeOf方法的原理
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

//继承的原本实现
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

//因此得出下面
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
</script>
        `,
        mind:"可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。子类的原型的原型就是父类的原型"
      },
      {
        now:"原生构造函数的继承",
        explain:[
          ""
        ],
        codeBlock:`
<script>
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]

</script>
        `,
        mind:""
      },
      {
        now:"Mixin 模式的实现",
        explain:[
          ""
        ],
        codeBlock:`
<script>
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
</script>
        `,
        mind:""
      }
      ]
    },
    {
      title:"Module语法",
      code:[
        {
          now:"export 命令",
          explain:[
            "export导出模块，可在其他文件内使用import导入被导出的模块",
            "下面主要演示export的写法"
          ],
          codeBlock:`
<script>
//A.js
export var Name = 'kita'
export {
  Name
}
export function multiply(x, y) {
  return x * y;
}
function kita(){}

//可在导出时用as重命名
export{
  kita as kita1
}

//为模块指定默认输出
export default function(){
  console.log('wife')
}
//对应上面，在import里：import abc from './A.js' 这样导入可直接为模块指定名字

//模块输出的值是动态的
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
</script>
          `,
          mind:"模块输出的值是动态的。模块在被其他文件导入后，被输出的模块内的内容如果发生改变的话，被导入数据也会发生改变。如果是commonJS模块导入的就不会因源数据发生改变而改变"
        },
        {
          now:"import 命令",
          explain:[
            "使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。",
            "下面主要演示import的写法"
          ],
          codeBlock:`
<script>
//B.js
import {name} from './A.js'

//传入的模块重命名
import {name as test} from './A.js'

// name ={} 这样会报错，不允许改写接口
name.test = 'hello' //合法操作

//加载被导出的所有模块并命名,*会忽略default方法
import * as kita from './A.js';
//加载所有模块后，给kita添加新参数和修改里面的函数都是不允许的

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
</script>
          `,
          mind:"import具有变量提升。CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。"
        },
        {
          now:"import()",
          explain:[
            "import和export命令只能在模块的顶层，不能在代码块之中,所以不能对要加载的内容进行动态选择（比如if条件成立再加载）",
            "ES2020提案 引入import()函数，支持动态加载模块。import()返回一个 Promise 对象"
          ],
          codeBlock:`
<script>
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
})

if (x === 1) {
  import('moduleA').then(...)
} else {
  import('moduleA').then(...)
}

//也允许动态路径
import(f())
.then(...)

//等全部加载完成再执行
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
</script>
          `,
          mind:""
        },
        {
          now:"关于script的一些加载规则",
          explain:[
            "浏览器加载 ES6 模块，也使用<script>标签，但是要加入type='module'属性。",
            "代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。",
            "模块脚本自动采用严格模式，不管有没有声明use strict。",
            "模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。",
            "模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。",
            "同一个模块如果加载多次，将只执行一次。"
          ],
          codeBlock:`
<!--defer,异步加载，整体渲染完再执行脚本，执行顺序随页面出现的顺序-->
<script src="path/to/myModule.js" defer></script>

<!--async,异步加载，文件下载完会中断渲染，执行脚本,执行顺序不一定-->
<script src="path/to/myModule.js" async></script>

<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>

<!--模块中也可以加载其他模块-->
<script type="module">
  import utils from "./utils.js";
</script>

          `,
          mind:""
        }
      ]
    },
    {
      title:"解构赋值",
      code:[
        {
          now:"",
          explain:[
            "ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）,只要等号两边的模式相同，左边的变量就会被赋予对应的值。"
          ],
          codeBlock:`
<script>
let a = 1;
let b = 2;
let c = 3;
// 等价于
// let [a, b, c] = [1, 2, 3];
 
let [ , third] = ["foo", "bar", "baz"];
third // "bar"
 
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
 
let [x, y, ...z] = ['a'];
x // "a"
y // 变量解构不成功，赋值为undefined
z // 数组解构不成功，赋值为[]


let [foo = true] = []; // foo = true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [q = 1, w = 'b'] = ['a', undefined]; // q='a', w='b'
let [e = 1] = [null]; // e = null
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "解构还可以用于对象，与数组不同的是，数组按照下标排序，而对象按照属性名赋值"
          ],
          codeBlock:`
<script>
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
  
let { abc } = { foo: "aaa", bar: "bbb" };
abc // undefined
  
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
  
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "解构赋值用途"
          ],
          codeBlock:`
<script>          
//交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x]; 

//提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number); // 42, "OK", [867, 5309]
 
//遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
 
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
</script>          
          `,
          mind:""
        }
      ]
    },
    {
      title:"字符串新方法",
      code:[
        {
          now:"",
          explain:[
            "传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。",
            "includes()：返回布尔值，表示是否找到了参数字符串。",
            "startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。",
            "endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。",
            "repeat()方法返回一个新字符串，表示将原字符串重复n次。"
          ],
          codeBlock:`
<script>
let a = "kita!!!"
a.includes("kita")  //true
a.startsWith("kit") //true
a.endsWith("!")     //true
a.repeat(3)         //kita!!!kita!!!kita!!!
a.repeat(2.9) //kita!!!kita!!! 取整
a.repeat(-0.1) //" "
a.repeat(0.1) //" "
</script>
          `,
          mind:"repeat()方法,如果参数是 1 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算"
        },
        {
          now:"",
          explain:[
            "ES2017中也新增字符串补全长度的方法,如果某个字符串不够指定长度，会在头部或尾部补全",
            "padStart()用于头部补全",
            "padEnd()用于尾部补全"
          ],
          codeBlock:`
<script>
let b = 'kita'
b.padStart(5,'abc')  //akita
b.padEnd(5,'abc')    //kitaa
b.padStart(5)        // kita 如果省略第二个参数，默认使用空格补全长度。

let c = '15'
c.padStart(10,'yyyy-mm-dd')  //yyyy-mm-15 
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。"
          ],
          codeBlock:`
<script>
const s = '  abc  ';

s.trim()      // "abc"
s.trimStart() // "abc  "
s.trimEnd()   // "  abc"
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"数值的扩展",
      code:[
        {
          now:"",
          explain:["这里记录的是ES6新增的数值运算方法的不完全记录，仅记录可能用到的方法或运算符",],
          codeBlock:``,
          mind:""
        },
        {
          now:"Math对象的扩展",
          explain:[""],
          codeBlock:``,
          mind:""
        },
        {
          now:"Math.trunc()",
          explain:[
            "去除小数部分，返回整数"
          ],
          codeBlock:`
<script>
Math.trunc(5.2) //5
</script>
          `,
          mind:""
        },
        {
          now:"Math.sign()",
          explain:[
            "该方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。它会返回五种值。",
            "正数:+1, 负数:-1, 参数为0:0, 参数为-0:-0, 其他值:NaN"
          ],
          codeBlock:`
<script>          
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
</script>          
          `,
          mind:""
        },
        {
          now:"指数运算符 **",
          explain:[
            ""
          ],
          codeBlock:`
<script>
2 ** 2      // 4
2 ** 3      // 8
2 ** 3 ** 2 // 相当于 2 ** (3 ** 2)
</script>        
          `,
          mind:"这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。"
        }
      ]
    },
    {
      title:"函数的扩展",
      code:[
        {
          now:"",
          explain:[
            "ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。"
          ],
          codeBlock:`
<script>          
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'kita') // Hello kita
log('Hello', '') // Hello

function kita(a = 5){
  //参数变量是默认声明的，不能用let或const再次声明。
  let a = 1             //错误
  const a = 2           //错误
}
</script>          
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。"
          ],
          codeBlock:`
<script>
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
</script>          
          `,
          mind:""
        },
        {
          now:"与解构赋值默认值结合使用",
          explain:[
            ""
          ],
          codeBlock:`
<script>
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // x报错:undefined          
</script>
          `,
          mind:""
        },
        {
          now:"参数默认值的位置",
          explain:[
            "通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。"
          ],
          codeBlock:`
<script>
function f(x, y = 5, z) {
  console.log(x, y, z);
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
f(1, undefined, null) //[1, 5, null]
</script>          
          `,
          mind:"如果传入undefined，将触发该参数等于默认值，null则没有这个效果。"
        },
        {
          now:"函数的length属性",
          explain:[
            "指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。"
          ],
          codeBlock:`
<script>
function (a) {}.length // 1
function (a = 5) {}.length // 0
function (a, b, c = 5) {}.length // 2
function(a, b = 5, c){}.length //1
</script>
          `,
          mind:"如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。"
        },
        {
          now:"rest参数",
          explain:[
            "ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。"
          ],
          codeBlock:`
<script>
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10

// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

---------实例-----------

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  })
  console.log(array)
}

var a = [];
push(a, 1, 2, 3)
</script>
          `,
          mind:"注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。函数的length属性，不包括 rest 参数。"
        },
        {
          now:"name属性",
          explain:[
            "函数的name属性返回该函数的函数名"
          ],
          codeBlock:`
<script>
var f = function () {};

// ES5
console.log(f.name) // ""

// ES6
console.log(f.name) // "f"

---------分割线-----------

const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"函数的作用域",
      code:[
        {
          now:"",
          explain:[
            "一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。"
          ],
          codeBlock:`
<script>          
var x = 1;
//调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。
function f(x, y = x) {
  console.log(y);
}

f(2) // 2

---------分割线-----------
//参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1

---------分割线-----------

//全局变量x不存在，就会报错。
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // ReferenceError: x is not defined 

---------分割线-----------

var x = 1;

function foo(x = x) {
  //参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。
  console.log(x)
}

foo() // ReferenceError: x is not defined

</script>          
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "如果参数的默认值是一个函数，该函数的作用域也遵守这个规则"
          ],
          codeBlock:`
<script>
let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer

---------分割线-----------

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined

---------分割线-----------

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3; //如果此行去掉var为x = 3，则foo()输出的是2
  y();
  console.log(x);
}

foo() // 3
x // 1
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"箭头函数",
      code:[
        {
          now:"基本用法",
          explain:[
            "ES6 允许使用“箭头”（=>）定义函数。"
          ],
          codeBlock:`
<script>
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
</script>
          `,
          mind:""
        },
        {
          now:"使用注意",
          explain:[
            "(1)箭头函数没有自己的this。this对象的指向是可变的，但是在箭头函数中，它是固定的。箭头函数中的this,向外层作用域一层层找最近的this",
            "下面代码中，Timer()内设了两个定时器，箭头函数的this绑定在所用时的作用域(即Timer()内)，普通函数绑的this运行时的作用域(全局对象)。所有3000毫秒后，s1被更新了3次，s2没有被更新"
          ],
          codeBlock:`
<script>
var s2 = 0 //为了后面调用window而定义
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++; //这里指向的是window
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100); // s1: 3
setTimeout(() => console.log('s2: ', timer.s2), 3100); // s2: 0
setTimeout(() => console.log(window.s2), 3000); // s2: 3


</script>
          `,
          mind:"定时器中的this默认指向的是window"
        },
        {
          now:"this指向固化",
          explain:[
            "箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。",
            "下面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。否则，回调函数运行时，this.doSomething这一行会报错，因为此时this指向document对象。"
          ],
          codeBlock:`
<script>
var handler = {
  id: '123456',

  init: function() {
    
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
</script>
          `,
          mind:"上面只是演示，非常不推荐button监听箭头函数，因为会导致this指向全局对象而找不到当前被点击的对象"
        },
          {
          now:"关于this指向的小案例",
          explain:[
            "下面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。"
          ],
          codeBlock:`
<script>
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。"
          ],
          codeBlock:`
<script>
function foo() {
  setTimeout(() => {
    //箭头函数内部的变量arguments，其实是函数foo的arguments变量。
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。"
          ],
          codeBlock:`
<script>
(function() {
  return console.log([
    (() => this.x).bind({ x: 'inner' })()
  ]);
}).call({ x: 'outer' });
// ['outer']
</script>
          `,
          mind:""
        },
        {
          now:"不适用箭头函数的场合",
          explain:[
            "第一个场合是定义对象的方法，且该方法内部包括this",
            "下面代码中,kita.b()是一个错误的箭头函数例子，如果是普通函数，该this会指向kita,但如果是箭头函数会指向全局。因为对象不构成单独的作用域，箭头函数定义的作用域是全局作用域"
          ],
          codeBlock:`
<script>
const kita = {
  a: 9,
  b: () => {
    this.a--;
  }
}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "第二个场合是需要动态this的时候",
            "上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。"
          ],
          codeBlock:`
<script>
var button = document.getElementById('button');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
</script>
`,
          mind:""
        }
      ]
    },
    {
      title:"尾调用",
      code:[
        {
          now:"什么是尾调用?",
          explain:[
            "尾调用（Tail Call）是指某个函数的最后一步是调用另一个函数。",
            "下列都不属于尾调用"
          ],
          codeBlock:`
<script>
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
</script>
          `,
          mind:"尾调用不访问当前栈帧的变量（就是说函数不是一个闭包)"
        },
        {
          now:"",
          explain:[
            "尾调用不一定出现在尾部，只要是最后一步操作即可"
          ],
          codeBlock:`
<script>
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
</script>
          `,
          mind:"上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。"
        },
        {
          now:"尾调用优化",
          explain:[
            "“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。"
          ],
          codeBlock:`
<script>
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "下面的函数不会进行尾调用优化，因为内层函数azu()调用了外层函数kita()的内部变量b"
          ],
          codeBlock:`
<script>
function kita(a){
  var b = 1;
  function azu(c){
    return c + b;
  }
  return azu(a);
}
</script>`,
          mind:""
        },
        {
          now:"一个典型的尾递归优化(斐波那契数列)",
          explain:[
            "递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。"
          ],
          codeBlock:`
<script>
function rabbit (n) {
  if ( n <= 1 ) {return 1};

  return rabbit(n - 1) + rabbit(n - 2);
}

rabbit(10) // 89
rabbit(100) // 网页崩溃

//使用尾递归优化过后
function rabbit1 (n , a = 1 , b = 1) {
  if( n <= 1 ) {return b};
  //可尝试console.log(n,ac1,ac2) 看下列打印结果
  return rabbit1 (n - 1, b, a + b);
}
//b收集器 n执行次数 a和b参与每次计算

//  5 1 1  这里的第一个打印是第一次打印，还没开始相加
//  4 1 2  这里的1是这次要相加的数，2是上次1+1的结果
//  3 2 3
//  2 3 5
rabbit1(5) // 8
rabbit1(100) // 573147844013817200000
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"...扩展符运算符",
      code:[
        {
          now:"含义",
          explain:[
            "扩展运算符（spread）是三个点(...),与rest参数(参考函数的扩展)相反，rest参数是将一个用逗号分隔的数组转化为参数。扩展运算符(...)是将一个数组转为用逗号分隔的参数序列"
          ],
          codeBlock:`
<script>
function add(x, y) {
  console.log(x + y)
}

const numbers = [4, 38];
add(...numbers) // 42

---------分割线-----------

function f(v, w, x, y, z) {
  console.log(v, w, x, y, z)
}
const args = [0, 1];
f(-1, ...args, 2, ...[3]) //-1 0 1 2 3
</script>
          `,
          mind:""
        },
        {
          now:"替代apply方法",
          explain:[
            "由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。"
          ],
          codeBlock:`
<script>
// ES5 的写法
function f(x, y, z) {
  console.log(x, y, z)
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  console.log(x, y, z)
}
let args = [0, 1, 2];
f(...args);
</script>
          `,
          mind:""
        },
        {
          now:"关于push函数要注意的",
          explain:[
              ""
          ],
          codeBlock:`
<script>
//ES5写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2); //[0, 1, 2, 3, 4, 5]

//ES6写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(arr2)  //这个会返回[0, 1, 2, Array(3)]，因为是直接push了一个数组进去。
arr1.push(...arr2) //[0, 1, 2, 3, 4, 5]
console.log(arr1)
</script>
          `,
          mind:""
        },
        {
          now:"扩展运算符的应用",
          explain:[
            ""
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"(1)复制数组",
          explain:[
            "数组是复合的数据类型，直接复制只是复制了指向底层数据结构的指针，而不是克隆一个新数组。",
            "下列代码中，直接复制a1的数组会导致a2数组修改时，a1的数组也发生改变。"
          ],
          codeBlock:`
<script>
//直接复制数组，复制的是a1的指针
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
console.log(a1) // [2, 2]

// ---------分割线-----------

//ES5 只能用变通方法来复制数组。
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

//ES6使用扩展运算符
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
</script>
          `,
          mind:""
        },
        {
          now:"(2)合并数组",
          explain:[
            ""
          ],
          codeBlock:`
<script>
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
</script>
          `,
          mind:"注意，以上都是浅拷贝"
        },
        {
          now:"(3)与解构赋值结合",
          explain:[
            "扩展运算符可以与解构赋值结合起来，用于生成数组。"
          ],
          codeBlock:`
<script>
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
</script>
          `,
          mind:"如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。"
        },
        {
          now:"(5)字符串转换",
          explain:[
            "扩展运算符还可以将字符串转为真正的数组。至于操作四个字节的 Unicode 字符，以后用到再回来补充"
          ],
          codeBlock:`
<script>
[...'kita']
// [ "k", "i", "t", "a"]
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"Array的新方法",
      code:[
        {
          now:"Array.from()",
          explain:[
            "Array.from方法用于将两类对象转为真正的数组"
          ],
          codeBlock:`
<script>
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 4
};
//ES5
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c','empty']

//ES6
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c','undefined']

// NodeList对象
//querySelectorAll方法返回的是一个类似数组的对象，可以将这个对象转为真正的数组，再使用filter方法。
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "扩展运算符（...）也可以将某些数据结构转为数组。"
          ],
          codeBlock:`
<script>
// arguments对象
function foo() {
  const args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]
</script>
          `,
          mind:""
        },
        {
          now:"Array.of()",
          explain:[
            "Array.of方法用于将一组值，转换为数组。这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。"
          ],
          codeBlock:`
<script>
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

Array() // []
Array(3) // [empty × 3]
Array(3, 11, 8) // [3, 11, 8]

//ES5实现
function ArrayOf(){
  return [].slice.call(arguments);
}
</script>
          `,
          mind:"Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。"
        },
        {
          now:"copyWithin()",
          explain:[
            "数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。"
          ],
          codeBlock:`
<script>
Array.prototype.copyWithin(target, start = 0, end = this.length)
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "它接受三个参数。",
            "target（必需）：从该位置开始替换数据。如果为负值，表示倒数。倒数开始替换的话，剩余的未替换的数据不会从数组开头替换",
            "start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。",
            "end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。"
          ],
          codeBlock:`
<script>
[1, 2, 3, 4, 5, 6, 7, 8].copyWithin(0, 3)
//[4, 5, 6, 7, 8, 6, 7, 8]

[1, 2, 3, 4, 5, 6, 7, 8].copyWithin(0, -2)
//[7, 8, 3, 4, 5, 6, 7, 8]

[1, 2, 3, 4, 5, 6, 7, 8].copyWithin(0, 3, 5)
//[4, 5, 3, 4, 5, 6, 7, 8]

[].copyWithin.call({length: 5, 3: 1}, 0, 3)
//上面代码拆分为下面的代码理解
// ({0:undefined, 1:undefined, 2:undefined, 3: 1, 4:undefined, length: 5}).copyWithin(0,3)
//结果为 {0:1,3:1,length:5}
</script>
          `,
          mind:""
        },
        {
          now:"find()和findIndex()",
          explain:[
            "find()方法，它是一个回调函数，用于找出第一个符合条件的数组成员",
            "findIndex()方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。"
          ],
          codeBlock:`
<script>
[1, 4, -5, 10].find((n) => n < 0) // -5

[1, 4, -5, 10].findIndex((n) => n < 0)  //2


//两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
</script>
          `,
          mind:"这两个方法都可以发现NaN，弥补了数组的indexOf方法识别不到NaN的不足。"
        },
        {
          now:"fill()",
          explain:[
            "fill()使用给定值填充数组",
            "fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。"
          ],
          codeBlock:`
<script>
['a', 'b', 'c'].fill(7) //[7, 7, 7]

new Array(3).fill(7)  //[7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']
</script>
          `,
          mind:"注意，如果填充的类型为对象，就是浅拷贝"
        },
        {
          now:"entries()，keys() 和 values()",
          explain:[
            "它们用于遍历数组，都返回一个遍历器对象。唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。"
          ],
          codeBlock:`
          <script>
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

//手动遍历调用遍历器对象的next方法来遍历
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value);// [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
</script>
          `,
          mind:""
        },
        {
          now:"includes()",
          explain:[
            "includes()返回一个布尔值，表示是否包含给定的值，第二个参数作为搜索的起始位置。"
          ],
          codeBlock:`
<script>
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true 如果第二个参数为-4则重置为0
</script>
          `,
          mind:""
        },
        {
          now:"flat(),flatMap()",
          explain:[
            "flat()拉平数组，使数组里的数组变为一维数组，默认拉平一层，可在flat()中设置要拉平的层数,flat(Infinity)可完全拉平",
            "flatMap()方法对原数组的每个成员执行一个函数。相当于map(),然后再执行flat(),但只能拉平一层与只能执行第一层"
          ],
          codeBlock:`
<script>
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

[1, 2, , 4, 5].flat() //如果有空位会跳过
// [1, 2, 4, 5]

[2, 3, 4].flatMap((x) => [ x * 2])
// [4, 6, 8]

[2, [3, 4]].flatMap((x) => [ x * 2])
// [4, NaN]

[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]
</script>
          `,
          mind:""
        },
        {
          now:"关于数组的空位",
          explain:[
            "ES5 对空位的处理，大多数情况下会忽略空位。",
            "ES6 则是明确将空位转为undefined。"
          ],
          codeBlock:``,
          mind:""
        }
      ]
    },
    {
      title:"对象的扩展",
      code:[
        {
          now:"增强写法（属性简写）",
          explain:[
            "ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。"
          ],
          codeBlock:`
<script>
const name='kita';
const age=20;
const wife=gakki;
// ES5写法 
  const obj={
  name:name,
  age:age,
  wife:wife,
  run:function(){
  }
} 
//ES6增强写法
const obj={
  name,
  age,
  wife,
  run(){
  }	
}

//不能用于构造函数
const obj = {
  f() {
    this.foo = 'bar';
  }
};

new obj.f() // 报错
</script>
          `,
          mind:"注意，简写的对象方法不能用作构造函数，会报错。"
        },
        {
          now:"属性名表达式",
          explain:[
            "ES6 允许字面量定义对象时,用表达式作为对象名,即把表达式放在方括号内"
          ],
          codeBlock:`
<script>
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

//表达式定义方法
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi

</script>
          `,
          mind:"注意，属性名表达式与简洁表示法，不能同时使用，会报错。属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]"
        },
        {
          now:"可枚举性",
          explain:[
            "对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。",
            "如果对象中enumerable属性为false。就表示某些操作会忽略当前属性。目前四个操作忽略enumerable为false。",
            "for...in循环：只遍历对象自身的和继承的可枚举的属性。",
            "Object.keys()：返回对象自身的所有可枚举的属性的键名。",
            "JSON.stringify()：只串行化对象自身的可枚举的属性。",
            "Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。",
            "引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉for...in操作"
          ],
          codeBlock:`
<script>
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

//这个就很好解释遍历数组对象时为什么length不被遍历
Object.getOwnPropertyDescriptor([], 'length').enumerable
// false

//class的原型方法也是不可被枚举
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
</script>
          `,
          mind:"操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量在遍历对象时不要用for...in循环，而用Object.keys()代替。"
        },
        {
          now:"属性的遍历",
          explain:[
            "(1)for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。",
            "(2)Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。",
            "(3)Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。",
            "(4)Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。",
            "(5)Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。",
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"super关键字",
          explain:[
            "this总是指向当前对象，super关键字可以让谁调用就指向谁"
          ],
          codeBlock:`
<script>
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

//让obj原型对象指向proto
Object.setPrototypeOf(obj, proto); 
obj.find() // "hello"
</script>
          `,
          mind:""
        },
        {
          now:"小案例说明super执行问题",
          explain:[
            "JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。"
          ],
          codeBlock:`
<script>
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
</script>
          `,
          mind:"上面代码中，在super指向proto的foo的时候，会把当前的this传过去，所以打印出来的是world"
        },
        {
          now:"?.(链判断运算符)",
          explain:[
            "在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。否则将继续往下运算"
          ],
          codeBlock:`
<script>
//旧写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

//使用链判断运算符
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
</script>
          `,
          mind:"注意。这个是ES2020才有的"
        },
        {
          now:"",
          explain:[
            "下面是一些小案例和需要注意的地方"
          ],
          codeBlock:`
<script>
iterator.abc?.()
//terator.abc如果有定义，就会调用该方法，否则直接返回undefined。

if (myForm.checkValidity?.() === false) {
  // 表单校验失败
  return;
}
//对于不支持checkValidity的浏览器会返回undefined。if内的代码就不会执行

a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

a?.[++x]
// 等同于
a == null ? undefined : a[++x] //如果a是null或undefined，x不会递增

delete a?.b
// 等同于
a == null ? undefined : delete a.b //如果a是null或undefined，delete不执行
</script>
          `,
          mind:""
        },
        {
          now:"null判断运算符",
          explain:[
            "判断左侧为null或undefined时，返回右侧的值。常用于判断是否赋值",
            "如与&&、||一起使用，需用括号表示优先级，不然会报错"
          ],
          codeBlock:`
<script>
let a = null
console.log(a ?? 20); //20

// 报错,需要加()表示优先级
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs
</script>
          `,
          mind:"注意。此方法ES2020才引入"
        }
      ]
    },
    {
      title:"对象新增方法",
      code:[
        {
          now:"Object.is()",
          explain:[
            "JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。ES6 提出“Same-value equality”（同值相等）算法,解决 == 会转换数据类型和 === NaN不等于自身的问题",
            "Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。"
          ],
          codeBlock:`
<script>
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

// ES5 可以通过下面的代码，部署Object.is
//Object.defineProperty(obj, prop, descriptor)
//obj:对象,  prop:要定义或修改的属性的名称或 Symbol, descriptor:要定义或修改的属性描述符。 
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});

</script>
          `,
          mind:""
        },
        {
          now:"Object.assign()",
          explain:[
            "Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。",
            "方法第一个是目标对象，后面都是源对象,如有同名属性将会覆盖"
          ],
          codeBlock:`
<script>
const target = { a: 1,b: 123};

const source1 = { b: 2,c: 654 };
const source2 = { c: 3,d: 789 };

Object.assign(target, source1, source2); 
//{a: 1, b: 2, c: 3, d: 789}

//只有一个对象的话返回原参数
const obj = {a: 1};
Object.assign(obj) === obj // true

//如不是对象，会把它转为对象再返回
typeof Object.assign(2) //object

//undefined和null无法转为对象
Object.assign(undefined) // 报错
Object.assign(null) // 报错

//只要undefined和null不出现在第一个参数就可以
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
</script>`,
          mind:"注意，这执行的是浅拷贝。其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。"
        },
        {
          now:"注意点",
          explain:[
            "对于嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。"
          ],
          codeBlock:`
<script>
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "Object.assign可以用来处理数组，但是会把数组视为对象,操作相当于并集,以下标来运算。"
          ],
          codeBlock:`
<script>
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
</script>
          `,
          mind:""
        },
        {
          now:"常见用途",
          explain:[
            "为对象添加属性和方法"
          ],
          codeBlock:`
<script>
class kita {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}

//---------分割线-----------
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
   
  },
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  
};
</script>
          `,
          mind:""
        },
        {
          now:"Object.getOwnPropertyDescriptors()",
          explain:[
            "与ES5的Object.getOwnPropertyDescriptor()不同，新的指令返回指定对象所有自身属性（非继承属性）的描述对象。",
            "Object.getOwnPropertyDescriptor()的括号内必须有第二个参数，即对象内的属性，不然返回undefined",
            "Object.getOwnPropertyDescriptors()括号内仅需要对象参数即可"
          ],
          codeBlock:`
<script>
let obj = { foo: 123 ,abc: 654};
Object.getOwnPropertyDescriptor(obj,'foo')
// value: 123
// writable: true
// enumerable: true
// configurable: true

Object.getOwnPropertyDescriptors(obj)
// {foo: {…}, abc: {…}}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "该方法主要为了解决Object.assign()无法正确拷贝get属性和set属性的问题。Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。"
          ],
          codeBlock:`
<script>
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, 'foo')
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }
//

//Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
</script>
          `,
          mind:""
        },
        {
          now:"__proto__属性",
          explain:[
            "__proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。",
            "__proto__属性本质是一个内部属性，标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的，因此最好不要通过此属性进行操作。"
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"Object.setPrototypeOf()",
          explain:[
            "Object.setPrototypeOf()方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。"
          ],
          codeBlock:`
<script>
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
</script>
          `,
          mind:"如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。"
        },
        {
          now:"Object.getPrototypeOf(),Object.setPrototypeOf",
          explain:[
            "用于读取对象的原型"
          ],
          codeBlock:`
<script>
function Rectangle() {
  
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
</script>
          `,
          mind:""
        },
        {
          now:"Object.keys()，Object.values()，Object.entries()",
          explain:[
            "Object.keys()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。",
            "Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。",
            "Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。"
          ],
          codeBlock:`
<script>
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
Object.values(obj)
// ["bar", 42]
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]

</script>
          `,
          mind:""
        },
        {
          now:"Object.fromEntries()",
          explain:[
            "Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。该方法的主要目的，是将键值对的数据结构还原为对象"
          ],
          codeBlock:`
<script>
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"Symbol",
      code:[
        {
          now:"基本使用",
          explain:[
            "symbol的使用时为了解决使用别的对象时可能会产生的命名冲突。Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。",
            "Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。"
          ],
          codeBlock:`
<script>
let s1 = Symbol('foo');
let s2 = Symbol('bar');

//控制台打印的是其他颜色
s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。",
            "Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。"
          ],
          codeBlock:`
<script>
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "Symbol 值不能与其他类型的值进行运算，会报错。但是，symbol可以显式转为字符串，也可以转化为布尔值，但不能转化为数值"
          ],
          codeBlock:`
<script>
let azu = Symbol('abc');

"my wife" + azu
// Cannot convert a Symbol value to a string

String(azu)
// Symbol(abc)

let kita = Symbol();
Boolean(kita) // true
!kita  // false

Number(kita) // TypeError
kita + 2 // TypeError
</script>
          `,
          mind:""
        },
        {
          now:"Symbol.prototype.description",
          explain:[
            "用来直接返回symbol的描述"
          ],
          codeBlock:`
<script>
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.description // "foo"

</script>
          `,
          mind:"注意，这个ES2019才提供的"
        },
        {
          now:"symbol作为name属性",
          explain:[
            "要注意不能用.点运算符去添加，因为.点运算符会把后面的属性名默认为字符串,同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中"
          ],
          codeBlock:`
<script>
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

  // ---------分割线-----------

const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

  // ---------分割线-----------

let s = Symbol();
let obj = {
  [s]: function (arg) {
    
  }
};

obj[s](123);
</script>
          `,
          mind:""
        },
        {
          now:"消除魔术字符串",
          explain:[
            "魔术字符串：在多个地方出现“kita”这样的重复字符串就叫做魔术字符串",
            "下面代码中，由于shapeType.triangle等于哪个值并不重要，只保证不和shapeType冲突就行。因此，这里适合使用symbol"
          ],
          codeBlock:`
<script>
const shapeType = {
  // triangle: 'kita',
  triangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
getArea(shapeType.triangle, { width: 100, height: 100 })
</script>
          `,
          mind:""
        },
        {
          now:"作为属性名的遍历",
          explain:[
            "Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。",
            "Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。"
          ],
          codeBlock:`
<script>
const obj = {};
const foo = Symbol('foo');

obj[foo] = 'bar';

for (let i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol(foo)]

Reflect.ownKeys(obj)// [Symbol(foo)]

</script>
          `,
          mind:""
        },
        {
          now:"Symbol.for()，Symbol.keyFor()",
          explain:[
            "Symbol.for()注册一个全局symbol值，可以让一个symbol重复使用",
            "Symbol.forKey()返回一个已注册的全局symbol值"
          ],
          codeBlock:`
<script>
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

Symbol.for('foo') ===  Symbol.for('foo') //true

Symbol('foo') === Symbol('foo') //false

// ---------分割线-----------

let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
</script>
          `,
          mind:"Symbol.for()因为是全局的，所以在函数外也可以访问"
        },
        {
          now:"Symbol.hasInstance",
          explain:[
            "对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。"
          ],
          codeBlock:`
<script>
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
</script>
          `,
          mind:""
        },
        {
          now:"Symbol.isConcatSpreadable",
          explain:[
            "Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开,拉平",
            "默认等于undefined，其实和true差不多，都是可展开效果",
            "对于类似数组的对象，需要手动为true才能转开"
          ],
          codeBlock:`
<script>
  //concat用于连接数组   原数组.(要添加的数组,添加数值)
let arr = ['c', 'd'];
arr[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr, 'e') // ["a", "b", Array(2), "e"] 

// ---------分割线-----------

let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
</script>
          `,
          mind:""
        },
        {
          now:"Symbol.match",
          explain:[
            "对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。"
          ],
          codeBlock:`
<script>
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。",
            "Symbol.replace方法会收到两个参数，第一个参数是replace方法正在作用的对象，第二个参数是替换后的值"
          ],
          codeBlock:`
<script>
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)

const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
</script>
          `,
          mind:""
        },
        {
          now:"Symbol.search",
          explain:[
            "search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。",
            "对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。"
          ],
          codeBlock:`
<script>
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
</script>
          `,
          mind:""
        },
        {
          now:"Symbol.split",
          explain:[
            "split()分割字符串"
          ],
          codeBlock:`
<script>
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
// 'foobar'
</script>
          `,
          mind:"Symbol.split方法，重新定义了字符串对象的split方法的行为"
        }
      ]
    },
    {
      title:"set和map",
      code:[
        {
          now:"set基本使用",
          explain:[
            "Set本身是一个构造函数，用来生成 Set 数据结构,特点是不会添加重复值,不会转换类型"
          ],
          codeBlock:`
<script>
const set = new Set([1, 2, 3, 4, 4,"4",]);

[...set] //[1, 2, 3, 4]
set.size //4

// 去除数组的重复成员

//[1, 2, 3, 4, "4"]
[...new Set(set)]

//去除字符串里面的重复字符
[...new Set('ababbc')].join('')
// "abc"
</script>
          `,
          mind:""
        },
        {
          now:"Set 实例的属性和方法",
          explain:[
            "Set.prototype.constructor：构造函数，默认就是Set函数。",
            "Set.prototype.size：返回Set实例的成员总数。",
            "Set.prototype.add(value)：添加某个值，返回 Set 结构本身。",
            "Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。",
            "Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。",
            "Set.prototype.clear()：清除所有成员，没有返回值。"
          ],
          codeBlock:`
<script>
let s = new Set([])
s.add(1).add(2).add(2)

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2); //1
s.has(2) // false

//下面一个去重方法
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
</script>
          `,
          mind:""
        },
        {
          now:"遍历",
          explain:[
            "key()键值,values()键名,entries()键值对,forEach()遍历的方式不变，但由于set结构没有键名，所以key(),values()方法一样"
          ],
          codeBlock:`
<script>
//Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

//所以可以省略values方法，直接遍历
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue

</script
          `,
          mind:""
        },
        {
          now:"遍历的应用",
          explain:[
            "map()和filter(),交集，并集，差集都适用"
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"map基本使用",
          explain:[
            "js中的对象本质是键值对的集合，即字符串-值的结构，但map可以提供值-值的结构，键可以为布尔、undefined、null、数值,解决了键必须为字符串的困扰。",
            "Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键"
          ],
          codeBlock:`
<script>
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
//其实内部执行了下面的操作
// items.forEach(
//   ([key, value]) => map.set(key, value)
// );
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

// ---------分割线-----------

const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
</script>
          `,
          mind:""
        },
        {
          now:"map结构属性和操作方法",
          explain:[
            "size(),has()查找键,delete(),clear()都与set方法的一样",
            "set()设置键名key对应值value,get()读取key对应的值value"
          ],
          codeBlock:`
<script>
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

map.get(3) //c
</script>
          `,
          mind:""
        },
        {
          now:"map结构的遍历",
          explain:[
            "keys(),values(),entries(),forEach,用扩展运算符(...)转换为数组等方法，都与set一样，可参考上文set的遍历方法"
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"数据结构相互转换",
          explain:[
            ""
          ],
          codeBlock:`
<script>
//map转数组
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

//数组转map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

//map转对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

//对象转map
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

//map转json,注意map的键名是否字符串
function strMapToJson(map) {
  //return JSON.stringify([...map]); 假设字符串
  return JSON.stringify(strMapToObj(map));
}

let myMap = new Map().set('yes', true).set('no', false)//.set({foo: 3}, ['abc']) 假设字符串
strMapToJson(myMap)
// '{"yes":true,"no":false}' //次结果是json键名为字符串的情况下

//json转map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"Proxy",
      code:[
        {
          now:"概述",
          explain:[
            "Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming）。可以理解为外界在外界访问该对象时会有一层拦截，可以对访问进行过滤和改写。proxy的原意称为代理",
            "下列代码可以看到，但kita读取name属性时，实际执行的是logHandler.get。kita设置name属性时，实际执行的是logHandler.set"
          ],
          codeBlock:`
<script>
var target = {
    name: 'poetries'
  };
  var logHandler = {
    get: function(target, key) {
      console.log(key + "被读取");
      return target[key];
    },
    set: function(target, key, value) {
      console.log(key + "被设置为" + value);
      target[key] = value;
    }
  }
  var kita = new Proxy(target, logHandler);
  
  kita.name; // name 被读取
  kita.name = 'others'; //name 被设置为 others
  
  console.log(target.name); //others
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "同一拦截器可拦截多个操作"
          ],
          codeBlock:`
<script>
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
</script>
          `,
          mind:""
        },
        {
          now:"Proxy支持拦截的操作",
          explain:[
            "get()拦截属性读取",
            "set()拦截属性设置",
            "has()拦截propKey in proxy，返回布尔",
            "deleteProperty()拦截delete proxy[propKey]，返回布尔",
            "ownKeys()拦截Object.getOwnProperty[Names,Symbols,keys](proxy)三种操作和for...in，返回数组，该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性",
            "getOwnPropertyDescriptor(target, propKey)拦截Object.getOwnPropertyDescriptor(proxy, propKey)返回描述属性",
            "defineProperty()拦截Object.[defineProperty,defineProperty]这两条，返回布尔",
            "preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。",
            "getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。",
            "isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。",
            "setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。",
            "apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。",
            "construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。"
          ],
          codeBlock:``,
          mind:"下面是实例使用方法"
        },
        {
          now:"get()",
          explain:[
            "get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。"
          ],
          codeBlock:`
<script>
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError( propKey + "不在proxy中");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

//用于继承,直接将proxy定义在prototype上
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo


</script>
          `,
          mind:"如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。"
        },
        {
          now:"set()",
          explain:[
            "set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。"
          ],
          codeBlock:`
<script>
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('年龄要为整数');
      }
      if (value > 200) {
        throw new RangeError('现在还没人能活过大于200岁');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);
person.age = 100;

person.age // 100

person.age = 'young' // 年龄要为整数
person.age = 300 // 现在还没人能活过大于200岁
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "属性名用_下划线开头，只要被读写就报错，这就可以达到禁止读写内部的目的"
          ],
          codeBlock:`
<script>
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(key + "此单位不能被读写");
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// 此单位不能被读写
proxy._prop = 'c'
// 此单位不能被读写
</script>
          `,
          mind:"注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。严格模式下，set代理返回false或者undefined，都会报错"
        },
        {
          now:"apply() ",
          explain:[
            "apply方法拦截函数的调用、call和apply操作。apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。"
          ],
          codeBlock:`
<script>
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
</script>
          `,
          mind:""
        },
        {
          now:"has()",
          explain:[
            "has()用来拦截HasProperty操作，判断是否具有某个属性。常用于in运算符。",
            "下面的例子用has隐藏某些元素"
          ],
          codeBlock:`
<script>
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false

'prop' in proxy //true

// ---------分割线-----------
Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p //报错
</script>
          `,
          mind:"虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。"
        },
        {
          now:"construct()",
          explain:[
            "construct方法用于拦截new命令,可接受三个参数target:目标对象,args:构造函数的参数对象,newTarget：创造实例对象时，new命令作用的构造函数",
            "construct方法返回的必须是一个对象，否则会报错。"
          ],
          codeBlock:`
<script>
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args);
    return { value: args[0] * 10 }; //这返回的必须是对象
  }
});
console.log((new p(1,2,5)).value);
// "called: 1"
// 10

</script>
          `,
          mind:""
        },
        {
          now:"deleteProperty()",
          explain:[
            "deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。"
          ],
          codeBlock:`
<script>
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(key + ":这个不能删")
  }
}

var target = { _prop: 'foo', prop:'abc'};
var proxy = new Proxy(target, handler);
delete proxy._prop 
//报错:这不能删
delete proxy.prop

</script>
          `,
          mind:""
        },
        {
          now:"defineProperty()",
          explain:[
            "defineProperty方法拦截了Object.defineProperty操作。",
            "如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。"
          ],
          codeBlock:`
<script>
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
</script>
          `,
          mind:""
        },
        {
          now:"isExtensible() ",
          explain:[
            "isExtensible方法拦截Object.isExtensible操作。这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。",
            "Object.isExtensible：判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。"
          ],
          codeBlock:`
<script>
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true; //当返回的是false时，会报错
    //意思就是返回值必须与目标对象的isExtensible属性一致
  }
});

Object.isExtensible(p)
// "called"
// true
</script>
          `,
          mind:""
        },
        {
          now:"ownKeys",
          explain:[
            "ownKeys方法用来拦截对象自身属性的读取操作。具体有：",
            "getOwnPropertyNames()",
            "getOwnPropertySymbols()",
            "keys()",
            "for...in",
            "ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回。如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性"
          ],
          codeBlock:`
<script>
let target = {
  _bar: 'foo',
  prop: 'bar',
  abc: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
Object.keys(proxy)
//["prop", "abc"]

</script>
          `,
          mind:"注意，使用Object.keys方法时有三类方法会被过滤：1.目标对象上不存在的属性。2.属性名为symbol值。3.不可遍历（enumerable）的属性"
        },
        {
          now:"preventExtensions()",
          explain:[
            "Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。",
            "preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。",
            "这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。"
          ],
          codeBlock:`
<script>
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
//报错

//解决方法
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    //直接在proxy里让他变为不可扩展即可
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}
</script>
          `,
          mind:""
        },
        {
          now:"setPrototypeOf()",
          explain:[
            "setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法,在修改target的原型对象时拦截"
          ],
          codeBlock:`
<script>
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('这厮的原型对象不能改，我说的');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// 这厮的原型对象不能改，我说的
</script>
          `,
          mind:""
        },
        {
          now:"Proxy.revocable()",
          explain:[
            "Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。",
            "下面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。"
          ],
          codeBlock:`
          <script>
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // 报错
</script>
          `,
          mind:"Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。"
        },
        {
          now:"关于this可能会有的问题",
          explain:[
            "虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。"
          ],
          codeBlock:`
<script>
const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined
</script>
          `,
          mind:""
        },
        {
          now:"Web 服务的客户端 ",
          explain:[
            "下面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。"
          ],
          codeBlock:`
<script>
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl + '/' + propKey);
    }
  });
}
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"Reflect",
      code:[
        {
          now:"概述",
          explain:[
            "（1）将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上",
            "（2）修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。",
            "（3）（3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。"
          ],
          codeBlock:`
<script>
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}

  // ---------分割线-----------
  
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "（4）Reflect对象的方法与Proxy对象的方法一一对应。只要proxy是对象方法，它内部的reflect对象就能找到当前proxy对象内的方法，"
          ],
          codeBlock:`
<script>
var obj = {
  abc:123
}
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete ' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
})
console.log(delete loggedObj.abc);
//delete abc
//true

  // ---------分割线-----------

// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.get(target, name, receiver)",
          explain:[
            "Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。",
            "如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。"
          ],
          codeBlock:`
<script>
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3


var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8

Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错
</script>
          `,
          mind:"如果第一个参数不是对象，Reflect.get方法会报错。"
        },
        {
          now:"Reflect.set(target, name, value, receiver)",
          explain:[
            "Reflect.set方法设置target对象的name属性等于value。如果name属性设置了赋值函数，则赋值函数的this绑定receiver。"
          ],
          codeBlock:`
<script>
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "如果proxy对象和reflect一起使用，proxy拦截操作，reflect赋值操作，传入了receiver后，那么Reflect.set会触发Proxy.defineProperty拦截。"
          ],
          codeBlock:`
<script>
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
          `,
          mind:"因为proxy.set的receiver指向当前proxy实例,而Reflect.set一旦传入receiver，就会将属性赋值到receiver，导致出发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。"
        },
        {
          now:"Reflect.has(obj, name) ",
          explain:[
            "Reflect.has方法对应name in obj里面的in运算符。"
          ],
          codeBlock:`
<script>
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.deleteProperty(obj, name)",
          explain:[
            "Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。",
            "该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。"
          ],
          codeBlock:`
<script>
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.construct(target, args)",
          explain:[
            "Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。"
          ],
          codeBlock:`
<script>
function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.getPrototypeOf(obj)",
          explain:[
            "Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。"
          ],
          codeBlock:`
<script>
const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.setPrototypeOf(obj, newProto)",
          explain:[
            "Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。"
          ],
          codeBlock:`
<script>
const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);

myObj.length // 0
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.apply(func, thisArg, args)",
          explain:[
            "Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。"
          ],
          codeBlock:`
<script>
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.defineProperty(target, propertyKey, attributes)",
          explain:[
            "Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。"
          ],
          codeBlock:`
<script>
function MyDate() {
  /*…*/
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});
</script>
          `,
          mind:"听作者说Object.defineProperty会被逐渐废除，希望世界不再存在IE"
        },
        {
          now:"Reflect.getOwnPropertyDescriptor(target, propertyKey) ",
          explain:[
            "Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor"
          ],
          codeBlock:`
<script>
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
</script>
          `,
          mind:""
        },
        {
          now:"Reflect.isExtensible (target)",
          explain:[
            "Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。"
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"Reflect.preventExtensions(target)",
          explain:[
            "Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。"
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"Reflect.ownKeys (target)",
          explain:[
            "Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。"
          ],
          codeBlock:`
          <script>
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"Promise",
      code:[
        {
          now:"概述",
          explain:[
            "Promise理论来说就是代表一个异步操作,避免异步操作的多重嵌套，写出让人能看得懂的代码，有三种状态pending（进行中）、fulfilled（已成功,与resolved相同）和rejected（已失败）。在异步操作的结果决定当前是哪种状态。",
            "Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种状态发生，状态就凝固，不会再改变，这时就称为 resolved（已定型）。如果改变发生了，再对Promise添加回调函数也会立即得到这个结果。",
            "Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。"
          ],
          codeBlock:``,
          mind:""
        },
        {
          now:"基本使用",
          explain:[
            "Promise新建后会立即执行，可以用then方法指定resolved状态和rejected状态的回调函数。then里面第一个返回的回调函数为resolved调用，第二个是状态为rejected调用，其中第二个是可选的。"
          ],
          codeBlock:`
<script>
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
</script>
          `,
          mind:"上面代码，then指定的回调函数会在当前脚本所有同步任务执行完才执行，所以resolved最后输出"
        },
        {
          now:"",
          explain:[
            "下面是一个用promise实现的ajax操作的例子"
          ],
          codeBlock:`
<script>
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;//当文档载入状态改变时调用handler
    client.responseType = "json"; //返回的数据类型
    client.setRequestHeader("Accept", "application/json");//设定请求头
    client.send();//发送 HTTP 请求,上面的都是发送请求后要做的事情

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
</script>
          `,
          mind:""
        },
        {
          now:"关于嵌套promise的问题",
          explain:[
            "下面代码中，由于p2返回的是另一个promise，导致p2自己的状态无效了，由p1决定p2状态，所以then语句变成针对p1了。两秒后，p1状态变为rejected，触发了catch方法指定的回调函数。"
          ],
          codeBlock:`
<script>
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "注意，调用resolve或reject并不会终结 Promise 的其他参数函数的执行。"
          ],
          codeBlock:`
<script>
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
</script>
          `,
          mind:"记住resolved总是在本轮事件的最后执行，除非是return输出resolved事件就会跳出本轮事件"
        },
        {
          now:"Promise.prototype.then()",
          explain:[
            "Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数"
          ],
          codeBlock:`
<script>
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
</script>
          `,
          mind:"getJSON的定义参考上面ajax操作例子"
        },
        {
          now:"Promise.prototype.catch()",
          explain:[
            "Promise.prototype.catch方法是专门接收rejected状态的回调函数"
          ],
          codeBlock:`
<script>
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
</script>
          `,
          mind:"then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。一般不要定义then的第二个参数，就是reject的回调函数，使用catch更好。"
        },
        {
          now:"",
          explain:[
            "下面代码中，Promise 指定在下一轮“事件循环”再抛出错误。到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。"
          ],
          codeBlock:`
    <script>
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 1000)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法或借catch方法捕捉上一个catch方面内的错误。"
          ],
          codeBlock:`
<script>
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 如果这的x是有定义，则不会报错
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log(error);
  y + 2 //如果这样定义的话，在catch内也可以报错
})
.catch(function(error){
  console.log(error);
})
.then(function(s) {
  console.log('carry on');
});
// x is not defined
// y is not defined
// carry on
</script>
          `,
          mind:""
        },
        {
          now:"Promise.prototype.finally()",
          explain:[
            "finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。",
            "finally方法实际上就是一个then方法，总是会返回原来的值"
          ],
          codeBlock:`
<script>
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});

// ---------分割线-----------

promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
</script>
          `,
          mind:""
        },
        {
          now:"Promise.all()",
          explain:[
            "Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。参考下面的例子：",
            "（1）只有p1、p2、p3的状态都变成resolve，p的状态才会变成resolve，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。",
            "（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。"
          ],
          codeBlock:`
<script>
const p = Promise.all([p1, p2, p3]);
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。"
          ],
          codeBlock:`
<script>
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));//这并不会触发
// ["hello", Error: 报错了]
</script>
          `,
          mind:"如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。"
        },
        {
          now:"Promise.race()",
          explain:[
            "Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。"
          ],
          codeBlock:`
<script>
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
</script>
          `,
          mind:""
        },
        {
          now:"Promise.allSettled() ",
          explain:[
            "只有等到所有这些参数实例都返回结果，不管是resolve还是rejected，包装实例才会结束。该方法总是返回的promise实例的状态一直是resolve。该方法由 ES2020 引入。"
          ],
          codeBlock:`
<script>
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "下面是返回值用法的例子。"
          ],
          codeBlock:`
<script>
const promises = [ fetch('index.html'), fetch('kita.html') ];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
</script>
          `,
          mind:""
        },
        {
          now:"Promise.any() ",
          explain:[
            "只要参数实例有一个变成resolved状态,实例就是resolved状态，要全部参数实例变成rejected状态，实例才变成rejected状态"
          ],
          codeBlock:`
<script>
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
</script>
          `,
          mind:""
        },
        {
          now:"Promise.resolve()",
          explain:[
            "将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。该方法的参数分为四种情况",
            "（1）如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。",
            "（2）参数是一个thenable对象。thenable对象指的是具有then方法的对象",
            "（3）参数不是具有then方法的对象，或根本就不是对象,则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。",
            "（4）不带有任何参数,直接返回一个resolved状态的 Promise 对象。"
          ],
          codeBlock:`
<script>
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
</script>
          `,
          mind:""
        },
        {
          now:"Promise.reject()",
          explain:[
            "Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。"
          ],
          codeBlock:`
<script>
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
</script>
          `,
          mind:""
        },
        {
          now:"Promise.try()",
          explain:[
            "避免如果promise的then执行的是同步函数，就在事件最后执行的问题。"
          ],
          codeBlock:`
          <script>
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now

Promise.try(f);
console.log('next');
// now
// next

// ---------分割线-----------
function getUsername(userId) {
  return database.users.get({id: userId})
  .then(function(user) {
    return user.name;
  });
}

//这样可能会获取不到其他的同步错误，比如数据库连接错误之类的
database.users.get({id: userId})
.then(...)
.catch(...)

//为了避免以上问题，用try...catch去捕获
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}

//这样是最好的写法
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
</script>
          `,
          mind:"Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。"
        }
      ]
    },
    {
      title:"Iterator和for...for循环",
      code:[
        {
          now:"Iterator（遍历器）的概念",
          explain:[
            "Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。",
            "Iterator遍历过程：创建一个指针对象，指向当前数据结构的起始位置，第一次调用next方法就指向数据结构的第一个成员，然后再每次调用next方法就将指针指向下一个成员，直到指向结束位置。",
            "next方法返回一个对象，表示当前数据成员的信息。每次调用next方法，都会返回数据结构的当前成员信息。具体就是返回一个包含value(当前成员的值)和done(布尔，表示遍历是否结束)"
          ],
          codeBlock:`
<script>
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} : //这可以省略done:false
        {value: undefined, done: true}; //这可以省略value:undefined
    }
  };
}
</script>
          `,
          mind:""
        },
        {
          now:"默认 Iterator 接口 ",
          explain:[
            "Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。只要使用了for...of循环遍历某种数据结构时，该 循环就会自动去找Iterator接口。",
            "一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。有些数据结构原本就具备Iterator接口：Array,Map,Set,String,TypedArray,函数的arguments对象,NodeList对象"
          ],
          codeBlock:`
<script>
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
obj[Symbol.iterator]().next() //{value: 1, done: true}


let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
</script>
          `,
          mind:"对象（Object）之所以没有默认部署 Iterator 接口，是因为对象不确定遍历的顺序。"
        },
        {
          now:"",
          explain:[
            "下面是一个类部署Iterator 接口的写法"
          ],
          codeBlock:`
<script>
 class kita{
   constructor(a, b){
     this.a = a
     this.b = b
   }
   [Symbol.iterator](){return this}
   next(){
     var a = this.a
     if(a < this.b){
       this.a++
       return {done: false, value: a}
     }
     return {done: true}
   }
 }

 function wife(a, b){
   return new kita(a, b)
 }

 for(let value of wife(0, 3)){
   console.log(value)
 }
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "下面是一个类似数组的对象部署的例子"
          ],
          codeBlock:`
<script>
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
</script>
          `,
          mind:"此方法对普通对象无效"
        },
        {
          now:"使用Iterator接口的场合",
          explain:[
            "（1）解构赋值：对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。",
            "（2）扩展运算符：扩展运算符（...）也会调用默认的 Iterator 接口。",
            "（3）yield*(用于委托给另一个generator 或可迭代对象)：yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。",
            "（4）其他场合：for...of,Array.from(),Promise.all(),Promise.race(),Map(),Set(),WeakMap(),WeakSet()",
          ],
          codeBlock:`
<script>
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
// x='a'; y='b'
let [first, ...rest] = set;
// first='a'; rest=['b','c'];

let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
</script>
          `,
          mind:""
        },
        {
          now:"字符串的 Iterator 接口",
          explain:[
            "下面还演示了修改遍历器的行为"
          ],
          codeBlock:`
<script>
var str = new String("hi");

[...str] // ["h", "i"]

str[Symbol.iterator] = function() {
  return {
    next: function() {
      
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // ["bye"]
str // "hi"
</script>
          `,
          mind:""
        },
        {
          now:"遍历器对象的 return()，throw()",
          explain:[
            "return()用在for...of要提前退出时(比如break，return)，就会触发return方法"
          ],
          codeBlock:`
<script>
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
  //或者 throw new Error();
}
</script>
          `,
          mind:""
        },
        {
          now:"for...of 循环中的数组",
          explain:[
            "下面的两种方法执行结果是一样，还能代替数组的forEach方法"
          ],
          codeBlock:`
<script>
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for(let v of obj) {
  console.log(v); // red green blue
}

arr.forEach(function (element, index) {
  console.log(element); // red green blue
  console.log(index);   // 0 1 2
});
</script>
          `,
          mind:"JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。"
        },
        {
          now:"对于对象的for...of的问题",
          explain:[
            "对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。"
          ],
          codeBlock:`
<script>
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
}
for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a iterable

//可以解决for...of循环问题
for (var key of Object.keys(es6)) {
  console.log(key + ': ' + es6[key]);
}
</script>
          `,
          mind:""
        },
        {
          now:"与其他遍历语法的比较",
          explain:[
            "原始for循环书写麻烦",
            "forEach循环无法中途跳出，break命令或return命令都不能奏效。",
            "for...in遍历键名，1.缺点是键名只为数字时，则键名会变成字符串。2.还会遍历原型的其他键,比如length。3.某些情况下，会以任意顺序遍历键名",
            "for...of啥都能做，楼上的缺点都没"
          ],
          codeBlock:``,
          mind:""
        }
      ]
    },
    {
      title:"Generator语法",
      code:[
        {
          now:"基本概念",
          explain:[
            "Generator语法函数有两个特征。一是function关键字和函数名之间有个*星号；二是，函数体内部用yield表达式定义内部状态。",
            "Generato函数被调用时不会执行，返回的是一个指向内部状态yield的指针对象，和iterator对象相似(返回值也一样)，也是用next方法使指针指向下一个状态，直到遇到return为止"
          ],
          codeBlock:`
<script>
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

var hw = helloWorldGenerator();
hw.next() //{value: "hello", done: false}
hw.next() //{value: "world", done: false}
hw.next() //{value: "ending", done: true}
hw.next() //{value: undefined, done: true}

</script>
          `,
          mind:"function关键字与函数名之间的星号，写在哪个位置都没问题"
        },
        {
          now:"yield 表达式",
          explain:[
            "next方法遇到yield表达式就会停止后面的操作，将该yield后面的值作为返回对象的value值。因此等于提供了惰性求职的语法功能(即未调用到当前yield，yield后面的表达式就不会执行)",
            "yield不能被普通函数使用。另外，yield在表达式中需要放在()小括号里面"
          ],
          codeBlock:`
<script>
var arr = [1, [[2, 3], 4], [5, 6]];

//错误示范，因为普通函数内不能用yield
var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};

//以下是正确使用
var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)){
  console.log(f);
}
 // ---------分割线-----------
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
</script>
          `,
          mind:""
        },
        {
          now:"与 Iterator 接口的关系",
          explain:[
            "由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。"
          ],
          codeBlock:`
<script>
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

</script>
          `,
          mind:""
        },
        {
          now:"next 方法的参数",
          explain:[
            "yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。"
          ],
          codeBlock:`
<script>
function* f() {
  for(var i = 0; ; i++) {
    var yui = yield i
    console.log(yui) //查看传进来的true
    if(yui) { i = -1; }
    console.log(i)
    //这里可以看出true是在上轮的next过后传入的
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }

</script>
          `,
          mind:"从这个功能可以知道，Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。可以通过next方法继续注入值，也就是说，Generator不同阶段都可以接收外部的值"
        },
        {
          now:"下面是一个传入参数的例子",
          explain:[
            "在a的运算中，由于第二次运行next不带参数，导致y的值等于2 * undefined(即NaN)，除于3后还是NaN，所以后面的返回值都是NaN",
            "在b运算中第一次next返回x+1值为6，第二次next将上一次的yield设置为12，因此y = 2 * 12，第二个next也因24 / 3 返回8。第三次因传入13，所以上轮yield过后z的值为13，因此得出x + y + z = 5 + 24 + 13，最后return的值为42"
          ],
          codeBlock:`
<script>
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "向 Generator 函数内部输入值的例子"
          ],
          codeBlock:`
<script>
function* dataConsumer() {
  console.log('Star');
  console.log('kita');
  console.log('1.' + (yield));
  console.log('2.' + (yield));
  return console.log('result')
  
}

let genObj = dataConsumer();
genObj.next();
// Started
// kita
genObj.next('a')
// 1. a
genObj.next('b')
genObj.next()
// 2. b

</script>
          `,
          mind:""
        },
        {
          now:"for...of 循环",
          explain:[
            "for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。"
          ],
          codeBlock:`
<script>
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

//兔子数列
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "因为普通函数没有Iterator接口，所以无法使用for...of循环。通过Generator可以给它加上接口。"
          ],
          codeBlock:`
<script>
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(key +' '+ value);
}
// first: Jane
// last: Doe

//一下是将Generator 函数加到对象的Symbol.iterator属性上面的写法
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(key +' '+ value);
}
// first: Jane
// last: Doe
</script>
          `,
          mind:"除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这以为他们可以将Generator返回的yield作为参数"
        },
        {
          now:"Generator.prototype.throw()",
          explain:[
            "Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。每个catch只捕捉一个错误，因为catch语句执行了过后就不会再捕捉错误了",
            "throw方法可以接受一个参数，该参数会被catch语句接收,建议抛出Error对象的实例"
          ],
          codeBlock:`
<script>
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
//想要错误被捕获，至少得执行一次next方法
i.next();

try {
  //throw new Error('a'); //这样的话就是全局命令，只会被外部捕捉。
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
</script>
          `,
          mind:"如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。如果Generator 函数内部外部都没try...catch代码块，那将会报错"
        },
        {
          now:"",
          explain:[
            "throw方法被捕获后，会顺便执行一次next命令"
          ],
          codeBlock:`
<script>
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
</script>
          `,
          mind:"throw命令与g.throw方法是无关的，两者互不影响。"
        },
        {
          now:"",
          explain:[
            "一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。"
          ],
          codeBlock:`
<script>
function* g() {
  yield 1;
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(gen) {
  var v;
  console.log('starting generator');
  try {
    v = gen.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = gen.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = gen.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
</script>
          `,
          mind:""
        },
        {
          now:"Generator.prototype.return()",
          explain:[
            "Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。"
          ],
          codeBlock:`
<script>
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true } //如果return()内没参数，则value为undefined
g.next()        // { value: undefined, done: true }
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "如有try...finally代码块，且正在执行try代码块时用return方法会立即进入finally代码块。"
          ],
          codeBlock:`
<script>
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
    yield 323;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(70) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 70, done: true }
//最后的这个获取的是return传入的值，如果return()内没参数，则value为undefined
</script>
          `,
          mind:""
        },
        {
          now:"yield* 表达式",
          explain:[
            "yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数"
          ],
          codeBlock:`
<script>
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "任何数据结构只要有 Iterator 接口，就可以被yield*遍历。"
          ],
          codeBlock:`
<script>
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"
read.next().value // "e"

</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。"
          ],
          codeBlock:`
<script>
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  //被代理的Generator函数如有return，需这么写来获取return的值
  console.log("v: " + v);
  yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "yield*命令可以很方便地取出嵌套数组的所有成员。"
          ],
          codeBlock:`
<script>
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e
</script>
          `,
          mind:""
        },
        {
          now:"Generator 函数的this",
          explain:[
            "Generator 函数总是返回遍历器对象，而不是this对象，Generator 函数也不能和new命令一起使用"
          ],
          codeBlock:`
<script>
function* g() {
  this.a = 11;
}

let obj = g();

obj.next();
obj.a // undefined

 // ---------分割线-----------

 function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
</script>
          `,
          mind:""
        },
        {
          now:"异步操作的同步化表达",
          explain:[
            "Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。"
          ],
          codeBlock:`
<script>
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()

//下面是Ajax操作
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();
</script>
          `,
          mind:""
        },
        {
          now:"控制流管理",
          explain:[
            ""
          ],
          codeBlock:`
<script>
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});

//采用promise
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();

  //Generator 函数
  function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

//用for...of循环
let jobs = [job1, job2, job3];

function* iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}

for (var step of iterateJobs(jobs)){
  console.log(step.id);
}
</script>
          `,
          mind:""
        },
        {
          now:"部署 Iterator 接口",
          explain:[
            ""
          ],
          codeBlock:`
<script>
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7

// ---------分割线-----------
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"Generator异步操作",
      code:[
        {
          now:"异步任务的封装",
          explain:[
            "整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。"
          ],
          codeBlock:`
<script>
var fetch = require('node-fetch');
//require会报错，因为require需要在webpack坏境下才能使用，这只是演示。
function* gen(){
  var url = 'https://github.com/10years-ago';
  var result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
</script>
          `,
          mind:""
        },
        {
          now:"Thunk 函数",
          explain:[
            "编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。"
          ],
          codeBlock:`
<script>
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
</script>
          `,
          mind:""
        },
        {
          now:"JavaScript 语言的 Thunk 函数",
          explain:[
            ""
          ],
          codeBlock:`
<script>
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
</script>
          `,
          mind:" Thunk 函数单独用是没啥用处，但于Generator函数一起就可以用于Generator函数的自动流程管理"
        },
        {
          now:"Generator 函数的流程管理",
          explain:[
            ""
          ],
          codeBlock:`
<script>
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};

var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
</script>
          `,
          mind:"仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性"
        },
        {
          now:"Thunk 函数的自动流程管理",
          explain:[
            "Thunk 函数真正的威力，可以让 Generator 函数自己动。"
          ],
          codeBlock:`
<script>
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

var g = function* (){
  var f1 = yield readFileThunk('fileA');
  var f2 = yield readFileThunk('fileB');
  // ...
  var fn = yield readFileThunk('fileN');
};

run(g);
</script>
          `,
          mind:""
        },
        {
          now:"async和异步generator的一个小实例",
          explain:[
            "与async一起用的话，Generator内部可以使用yield命令。",
          ],
          codeBlock:`
<script>
function fetchRandom() {
  const abc = 'wife'
  return abc;
}

async function* asyncGenerator() {
  console.log('Start');
  const result = await fetchRandom(); // (A)
  console.log(result);
  
  yield 'Result: ' + await result; // (B)
  console.log('Done');
}

const ag = asyncGenerator();
ag.next().then(({value, done}) => {
  console.log(value);
})
</script>
          `,
          mind:""
        }
      ]
    },
    {
      title:"async函数",
      code:[
        {
          now:"含义",
          explain:[
            "async函数就是Generator 函数的语法糖,将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。"
          ],
          codeBlock:`
<script>
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

//用async代替
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

</script>
          `,
          mind:""
        },
        {
          now:"async函数对 Generator 函数的改进，主要一下四点",
          explain:[
            "（1）内置执行器：Generator 函数的执行必须靠执行器。async自带执行器，也就是如上面的代码那样asyncReadFile()即可执行。不需要调用next方法",
            "（2）更好的语义：async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。",
            "（3）更广的适用性：co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。",
            "（4）返回值是 Promise：这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。"
          ],
          codeBlock:``,
          mind:"async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。"
        },
        {
          now:"用法",
          explain:[
            "async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。"
          ],
          codeBlock:`
<script>
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
    console.log('kita')
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
  return value
}

asyncPrint('hello world', 1000).then(
  (value) => console.log('这是等asyncPrint执行完过后的回调函数的参数:' + value),
  (err) => console.log('报错')
  )

</script>
          `,
          mind:"async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。"
        },
        {
          now:"await",
          explain:[
            "正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。下面是一个实现指定停顿时间的用法"
          ],
          codeBlock:`
<script>
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();

// ---------分割线-----------

async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
</script>
          `,
          mind:"任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。"
        },
        {
          now:"错误处理",
          explain:[
            "如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject,则整个函数就会终止，如果放在try...catch代码块之中，则不会出现这种状况"
          ],
          codeBlock:`
<script>
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
</script>
          `,
          mind:"建议这样去写，因为await返回的可能的rejected，所以最好写在try...catch代码块中比较合理"
        },
        {
          now:"注意点",
          explain:[
            "多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。"
          ],
          codeBlock:`
<script>
async function myFunction() {
  try {
    // let foo = await getFoo();
    // let bar = await getBar();

    //写成下面的写法以至同时执行
    //写法1
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    //写法2
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
  } catch (err) {
    console.log(err);
  }
}
</script>
          `,
          mind:""
        },
        {
          now:"",
          explain:[
            "await命令只能用在async函数之中，如果用在普通函数，就会报错"
          ],
          codeBlock:`
<script>
let db = [1,2,3]
async function dbFuc(db) {
  let docs = [];

  // 报错
  // db.forEach(function (a) {
  //   await db.push(a);
  // });

  //用for循环可以执行
  for(let a of db){
    await docs.push(a);
  }
  console.log(docs);
}

dbFuc(db)
</script>
          `,
          mind:""
        },
        {
          now:"async 函数的实现原理",
          explain:[
            "async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。"
          ],
          codeBlock:`
<script>
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
</script>
          `,
          mind:""
        },
      ]
    }
  ]
}

export{
  ES6
}