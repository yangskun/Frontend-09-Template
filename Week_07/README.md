# 运算符和表达式

## 语法

### 语法树和优先级

抽象语法树的结构和运算符的优先级相关，优先级较高的会优先构成一个子树

Member运算符的优先级最高，它的代表是用于访问对象中的某个属性的点运算符(也包括其他同级的运算，比如new Foo())，它比New表达式的优先级更高

```
# 优先级从高到低
Member:
- a.b
- a[b]
- foo`string`
- new.target
- super.b
- super[b]
- new Foo()
New:
- new Foo
Call:
- foo()
- super()
- foo()['b']
- foo().b
- foo()`abc`
Left Handside(这行之前的运算符) && Right Handside(这行之后的运算符)
Update:
- a++
- a--
- --a
- ++a
Unary(单目运算符):
- delete a.b
- void foo()
- typeof a
- +a
- -a
- ~a(将整数按位取反)
- !a
- await a
Exponental(幂运算，唯一一个右结合运算)
- a**b
Multiplicative:
- * / %
Additive:
- + -
Shift:
- << >> >>>
Relationship:
- < > <= >= instanceof in
Equality:
- == (会进行隐式类型转换，不推荐用)
- !=
- ===
- !==
Bitwise:
- & ^ |
Logical(存在短路现象):
- &&
- ||
Conditional(三目运算符，存在短路现象):
- ?:
```

由于JavaScript中函数允许不带括号，所以带括号的new函数和不带括号的new函数要设置不同优先级，这样才能处理 `new new a()`这种情况

左手运算可以位于等号的左边，右手运算位于等号的右边，JavaScript中左手运算一定也是右手运算

## 运行时

### Reference(引用类型)

当访问对象的某个属性时，得到的数据类型不是成员的数据类型，而是Reference类型，Reference类型包含了Object和Key两个字段，可以记录访问了哪个对象的哪个属性，其中Key可以是String也可以是Symbol

Reference是存在于JavaScript标准中的类型，但不在7个基础数据类型中

delete和赋值运算会用到Reference类型，它们删除或者赋值某个对象的某个属性时需要通过引用类型来确定

### 类型转换

#### 拆箱转换

Object类型的数据在参与运算(比如加法运算)时，会先进行拆箱转换(ToPrimitive)，实际上就是调用Object的Symbol.toPrimitive、toString或valueOf方法，其中Symbol.toPrimitive的优先级最高，但它定义时会忽略toString和valueOf方法；在加法运算中，会优先调用valueOf方法；在作为属性名(属性名是String或Symbol)时，会优先调用toString方法

#### 装箱转换

String、Number、Boolean和Symbol都可以通过new运算符去进行装箱转换。其中Symbol类型比较特殊，它不能直接跟在new后面，但是可以通过 new Object(Symbol("a"))来进行装箱转换

这些基础类型通过点运算符去访问对应的对象的方法时，实际上进行了隐式的装箱转换

# 语句

## 语法

### 简单语句和复合语句

简单语句:

- 表达式语句(JavaScript中主要处理计算的部分)
- 空语句
- 调试语句
- Throw语句(Throw及以下三个语句是JavaScript中处理流程控制的部分)
- Continue语句
- Break语句
- Return语句 复合语句(复合语句内可以包含多行简单语句):
- BlockStatement(用花括号包裹的多行语句)
- IfStatement
- SwitchStatement(相比if语句没有性能提升，还因为fallthrough特性容易出错，不建议使用)
- IterationStatement(包括for、while等各种循环语句)
- WithStatement
- LabelledStatement
- TryStatement(Try语句中的finally块中的语句总是会执行，不受try块中的return语句打断，也就是try语句中的return不具备穿透作用)

### 声明语句

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement
- ClassDeclaration
- LexicalDeclaration

Function和Var声明只能识别函数作用域

Const,Let和Class声明可以识别块级作用域和函数作用域

所有的声明语句都会进行预处理，即使得变量变为作用域内的局部变量

旧的Function和Var声明会提升(Hoisting)到函数体的头部，Var声明只把声明部分提升，但是赋值部分不会提升

在函数或块级作用域内，如果在Const,Let和Class声明之前使用声明的变量，则会抛错，不管这个变量是否在父级作用域中已经声明

## 运行时

### Completion Record 执行记录

执行记录是语句的执行完成状态的记录，主要包含三个字段:

- [[type]] normal,return,continue,break,throw
- [[value]] 表达式或return语句等返回的值
- [[target]] 语句的标签，通常是continue语句或者break语句可能会以标签开头

### Lexical Environment 词法环境(作用域)

# 宏任务和微任务

可视化理解宏任务和微任务，https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

# 函数调用

JavaScript中函数调用所需要的所有信息都存在 ExecutionContext(执行上下文)中，函数的嵌套调用或者递归都会同时产生多个执行上下文，这些执行上下文保存在一个ExecutionContextStack(执行上下文栈)的数据结构中，用于控制函数的执行顺序，栈顶的执行上下文是RuningExecutionContext，即正在跑的函数

ExecutionContext中包含7个部分:

- code evaluation state(用于Generator中判断执行到哪条语句)
- Function(由Function来初始化的执行上下文才有)
- Script or Module
- Generator(只有Generator函数有)
- Reaml(包含可以访问到的基础设施对象)
- LexicalEnvironment(函数、模块所依赖的词法环境)
- VariableEnvironment(兼容旧的Var声明语句)

## 闭包

每个函数都会产生一个闭包，闭包由函数的代码和函数所依赖的词法环境(旧标准中的说法是作用域链)构成

## Realm

在JS中，函数表达式和对象直接量均会创建对象，使用.做隐式转换时也会创建对象，这些对象也是有原型的，如果我们没有Realm，就不知道它们的原型是什么

在JavaScript引擎实例中，所有的内置对象会被放进一个Realm中