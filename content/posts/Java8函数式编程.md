+++
title = "Java8函数式编程"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
tags = ["Java", "函数式"]
categories = ["Java", "函数式", "lambda", "Java"]
draft = false
+++

## 函数式编程 {#函数式编程}

函数式编程中没有赋值语句,因此变量一旦有了值,就不会再改变了.更通俗地说,函数式编程完全没有副作用.


## Lambda表达式 {#lambda表达式}


### 格式 {#格式}

```java
() -> {}
```

1.  参数：
    -   (): 表式没有参数
    -   单个参数可不加括号
    -   参数可以不加类型，由编译器去推断类型，也可以加上类型。加类型的话需要使用小括号包起来。
    -   参数引用的值而不是变量。但不必须写final变量。
2.  主体：
    -   可以是一个表达式，也可以是一段代码块，如果是一段代码块需要使用大括号包起来。


### 函数式接口 {#函数式接口}

-   Java里函数式接口的主要类型

    | 接口                    | 参数 | 返回类型 | 示例 |
    |-----------------------|----|------|----|
    | -----------------       | ---- | -------- | ---- |
    | Predicate&lt;T&gt;      | T    | boolean  |      |
    | Consumer&lt;T&gt;       | T    | void     |      |
    | Function&lt;T, R&gt;    | T    | R        |      |
    | Supplier&lt;T&gt;       | None | T        |      |
    | UnaryOperator&lt;T&gt;  | T    | T        |      |
    | BinaryOperator&lt;T&gt; | T, T | T        |      |


## 流（Stream） {#流-stream}

Stream是用函数式编程方式 在集合类上进行复杂操作的工具。


### 特点： {#特点}

-   惰性求值。看返回值是Stream就是惰性求值。如果返回值是另一个值 或空，那么就是及早求值。
-   可链式操作。
-   和Iterator类似，Stream是一种内部迭代试。内部迭代将更多的控制权交给了集合类。


### 常用流操作 {#常用流操作}

-   collect(toList())
    生成一个列表，及早求值操作。
-   map
    将一个流中的值转换成一个新的流。参数是一个只接受一个String类型参数并返回一个新的String的Lambda（Function）。
-   filter
    过滤流中的数据。参数是一个Predicate式的Lambda表达式。
-   flatMap
    可用Stream替换值，然后并多个Stream连接成一个Stream。参数 是一个Function接口的Lambda表达式。
    ```java
    multiList.stream()
      .flatmap(item -> item.getSubList())
            .filter(obj -> obj.getLength() > 100)
            .map(obj -> obj.getName())
            .collect(Collections.toList());
    ```
-   max和min
    参数是一个Comparator对象。
-   reduce
    实现从一组值中生成一个值。参数是BinaryOperator式的Lambda表达式。


## 类库 {#类库}


### 基本类型 {#基本类型}

Stream类的某些方法对基本类型和装箱类型做了区分。
&gt; e.g. ToLongFunction(), LongFunction()


### 重载解析 {#重载解析}

Lambda表达式作为参数时，其类型由它的目标类型推导得出，推导过程遵循如下规则：

1.  如果只有一个可能的目标类型，由相应函数接口里的参数类型推导得出。
2.  如果有多个可能的目标类型，由最具体的类型推导得出。
3.  如果有多个可能的目标类型且最具体的类型不明确，则需人为指定类型。


### @FunctionInterface {#functioninterface}

用作函数接口的接口都应该添加这个注解。


### 接口默认方法， 多重继承 {#接口默认方法-多重继承}

新增default关键字，修饰默认方法。默认方法工作原理：

1.  类胜于接口。
2.  子类胜于父类。
3.  如果上面两条规则不适用，子类要么需要实现该方法，要么将该方法声明为抽象方法。


#### 接口多重继承 {#接口多重继承}

接口多重量继承时，有可能碰到两个接口包含签名相同的默认方法的情况。Javac并不明确应该继承哪个接口中的方法，因为如果子类没有实现这个默认方法，编译器会报错。

<!--list-separator-->

-  super

    在Java8以前可以使用super指向父类，现在使用类似InterfaceName.super这样的语法指定具体的父类。


### 接口的静态方法 {#接口的静态方法}


### Optional {#optional}

Optinal是为核心类库新设计 的一个数据类型，用来替换null值。使用Optional对象的方式之一是在调用get()方法前， 先使用isPresent检查Optional对象是否有值。


## 高级集合类和收集器 {#高级集合类和收集器}


### 方法引用： ClassName::MethodName; {#方法引用-classname-methodname}

注意：

1.  在方法名后边不加括号。
2.  凡是使用Lambda表达式的地方，就可以使用方法引用。


### 集合顺序问题。 {#集合顺序问题}


### 使用收集器 {#使用收集器}

-   转换成其他集合使用toList()或者toSet()时，Stream会自动为你指定一种类型的集合。如果不想使用自动指定的类型，可以使用toCollection(),它接受一个函数做参数。
    e.g.
    \`\`\`java
    Stream.collect(toCollection(HashSet::new))
    \`\`\`
-   转换成值
-   数据分块
    partitioningBy，它接受一个流，使用Predicate对象判断一个元素应该属于哪个部分，并根据布尔值将原流分为两个部分。
-   数据分组
    groupingBy，接受一个分类函数，用来对数据分组。
-   字符串使用Collectors.joining。
-   组合收集器
    mapping允许在收集器的窗口上执行类似的map的操作。但是需要指明使用什么样的集合类存储结果， 比如toList.
-   重构和定制收集器
    1.  先实现Collector接口， 由于Collector接口支持泛型， 因为先得确定一些具体的类型
        1.  第一个是待收集元素的类型
        2.  第二个是累加器的类型
        3.  第三个是最终结果的类型
    2.  实现Collector
        1.  第一个是实现Supplier工厂方法。有来创建容器
        2.  accumulator： 它结合之前操作的结果和当前值。
        3.  combine： 如果有两个窗口，我们需要将其合并。
        4.  finisher: 将容器转变成最终我们想要的结果。


## 数据并行化 {#数据并行化}


### 并行和并发 {#并行和并发}

  并发是两个任务共享时间段,并行则是两个任务在同一时间发生,比如运行在多核CPU上.
 并行化操作只需改变一个方法的调用 。如果已经有一个Stream对象，调用 它的parallel方法。如果想从一个集合 类创建一个流调用 parallelStream就能获得拥有并行能力的流。还可以使用sequential方法使用并行流转变成串行流。


### 性能 {#性能}

影响性能的因素：

1.  数据大小
2.  源数据结构
    1.  性能好：ArrayList，数组，IntStream.range等
    2.  性能一般：HashSet，TreeSet等
    3.  性能差： LinkedList等对半分解难的结构。
3.  装箱
4.  核的数量
5.  单元处理开销


### 并行化数组操作 {#并行化数组操作}

| 方法名         | 操作                           |
|-------------|------------------------------|
| -------------- | ------------------------------ |
| parallelPrefix | 任意给定一个函数，计算数组的和 |
| parallelSetAll | 使用Lambda表达式更新数组元素   |
| parallelSort   | 并行化对数组元素进行排序       |


## 测试、调试和重构 {#测试-调试和重构}

流中的peek方法


## 设计和架构的原则 {#设计和架构的原则}


### Lambda表达式改变了设计模式 {#lambda表达式改变了设计模式}

设计模式是人们熟悉的一种设计思想, 它是软件架构中解决通用问题的模板.如果碰到一个问题,并且恰好熟悉一个与之适应的模式,就能直接应用该模式来解决问题.从某种程度上说,设计模式将解决特定问题的最佳实践途径固定了下来.

-   命令模式
-   策略模式
-   观察者模式


### 使用Lambda表达式的领域专用语言 {#使用lambda表达式的领域专用语言}

领域专用语言（DSL）是针对软件系统中某特定部分的编程语言。

-   内部：类库，提供API方便用例。
-   外部：CSS，正则等


### 使用Lambda表达式的SOLID原则 {#使用lambda表达式的solid原则}

-   单一功能原则  Single responsibility
    程序中的类或方法只能有一个改变的理由。这是强内聚性设计的一部分.说一个类是内聚的,是批它的方法和属性需要统一对待,因为它们紧密相关.
-   开闭原则  Open/Closed
    软件应该对扩展开放，对修改闭合。
-   依赖反转原则  Liskov substitution
    抽象不应依赖细节，细节应该依赖抽象。信赖反转原则的目的是让程序员脱离底层粘合代码, 编写上层业务逻辑代码.这就让上层代码信赖于底层细节的抽象,从而可以重用上层代码.这种模块化和重用方式是双向的:既可以替换不同的细节重用上层代码,也可以替换不同的业务逻辑重用细节的实现.
-   Interface segregation
-   dependency inversion


## 使用Lambda表达式编写并发程序 {#使用lambda表达式编写并发程序}
