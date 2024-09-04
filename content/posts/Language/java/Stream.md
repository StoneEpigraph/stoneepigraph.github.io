+++
title = "Java Stream简单了解"
author = ["WhatsUpeng!!!"]
date = 2024-09-03
tags = ["Java", "函数式", "stream"]
categories = ["Java"]
draft = false
+++

## Stream {#stream}


### Stream的创建方式 {#stream的创建方式}

1.  通过Collection系列集合提供
    ```java
    List<String> list = new ArrayList<>();
    Stream<String> stream1 = list.stream();
    ```
2.  通过Arrays中的静态方法获取数组流
    ```java
    String[] emps = new String[10];
    Stream<String> stream2 = Arrays.stream(emps);
    ```
3.  通过Stream类中的静态方法of()
    ```java
    Stream<String> stream3 = Stream.of("aa", "bb", "cc");
    ```
4.  创建无限流
    1.  迭代
        ```java
        Stream<Integer> stream4 = Stream.iterate(0, x -> x + 2);
        ```
    2.  生成
        ```java
        Stream.generate(() -> Math.random())
        ```


### 中间操作 {#中间操作}

1.  筛选与切片
    1.  filter
        ```java
        stream.filter(Predicate)
        ```
    2.  limit
        ```java
        stream.filter(long)
        ```
    3.  skip
        ```java
        stream.skip(long)
        ```
    4.  distinct
        通过hashcode(),equals()进行去重
        ```java
        stream.distinct()
        ```
2.  映射
    1.  map
        将元素转换成其他形式或提取信息。map中的Function本身也会返回一个流。
        ```java
        map(Function)
        ```
    2.  flatMap
        会整合Function本身返回的流。
        ```java
        flatMap(Function)
        ```
3.  排序
    1.  sorted()
        自然排序
        ```java
        stream.sorted()
        ```
    2.  sorted(Comparator)
        定制排序，指定Comparator
        ```java
        stream.sorted(Comparator)
        ```


### 终止操作 {#终止操作}

1.  查找与匹配
2.  allMatch
    检查是否匹配所有元素

<!--listend-->

```java
stream.allMatch()
```

-   anyMatch
    检查是否至少匹配一个元素
-   nonMatch
    检查是否没有匹配所有元素
-   findFisrt()
    返回第一个元素
-   findAny
    返回当前流中的任意元素
-   count
    返回流中的元素的个数
-   max(Comparator)
    返回流中的最大值
-   min(Comparator)
    返回流中的最小值
-   归约
    -   reduce(T, BinaryOperator)
        将流中的元素反复结合起来，得到一个新值。
        ```java
        Stream.of(1,2,3,4,5).reduce(0, (x, y) -> x + y)
        ```
-   收集
    -   collect(Collector)
        将流转换为其他形式,包括转换，分组，分区等
        ```java
        Stream.of("11", "aa", "bb").collect(Collectors.toSet());
        Stream.of("11", "aa", "bb").collect(Collectors.coutning());
        ...
        ```


### 并行流与串行流 {#并行流与串行流}

了解使用Fork/Join框架
Stream可以使用parallel()与sequential()切换并行流与顺序流。


### 特点 {#特点}

-   惰性求值
-   内部迭代
