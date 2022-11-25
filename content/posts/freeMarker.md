+++
title = "FreeMarker入门"
date = 2022-11-25
categories = ["Freemarker", "template", "HTML"]
draft = false
+++

## 入门 {#入门}


### 模板 + 数据模型 = 输出 {#模板-plus-数据模型-输出}


### 数据模型 {#数据模型}

-   数据模型的基本结构是树状的.
-   标量用于存储单一的值.这种类型的值可以是字符串,数字,日期/时间或者布尔值
-   哈希表是一种存储变量及其相关且有唯一标识名称的容器
-   序列是存储有序变量的容器.存储的变量可以通过数字索引来检索,索引通常从0开始.


#### 值域 {#值域}

-   start..end: 包含结尾的值域
-   start..&lt;end或者start..!end: 不包含结尾的值域
-   start..\*length: 限定长度的值域.
-   start..: 无右边界值域.

<!--list-separator-->

-  注意

    1.  值域表达式本身没有方括号
    2.  可以在..的两侧编写自述表达式而不需要圆括号
    3.  .., ..&lt;, ..!, ..\*是去处符,所以它们中间不能有空格.
    4.  无右边界值域的定义大小是2147483647
    5.  值域并不存储它们包含的数字.


#### 哈希表 {#哈希表}

-   像连接字符串那样,也可以使用加号的方式来连接哈希表.如果两个哈希表含有键相同的项,那么在加号右侧的哈希表中的项优先.


### 模板 {#模板}

-   插值: ${paramsName}
-   FTL标签
    FTL标签与HTML标签有一些相似之处,这些标签的名称以#开头, 用户自定义的FTL标签则需要使用@来代替#.
-   注释注释使用&lt;#-- and --&gt; 来标识
-   其它任何不是FTL标签,插值或注释的内容被视为静态文本,这些东西不会被FreeMarker所解析, 会被按照原样输出来.


#### 基本指令 {#基本指令}

-   IF指令
    ```FreeMarker
    <#if condition> </#if>
    <#if condition>
      if statement
    <#elseif condition>
      elseif statement
    <#else>
      else statement
    </#if>
    ```
-   list指令展示列表内容
    1.  基本
        ```FreeMarker
        <ul>
        <#list listObj as obj>
        <li>${ojb}
        </#list>
        </ul>
        ```
    2.  如果列表为空的话,整个列表都不展示
        ```freeMarker
        <#list listObj>
          <ul>
            <#items as obj>
              <li>${obj}
          </ul>
        </#list>
        ```
    3.  如果列表为空的话展示一些其它信息
        ```freeMarker
        <#list listObj>
          <p> ListDesc:
          <ul>
            <#items as obj>
              <li>${obj}<#sep>septarator</#sep>
            </#items>
          </ul>
        <#else>
          <p> list is empty.
        </#list>
        ```
-   include指令使用include指令, 我们可以在模板中插入其他文件的内容. 比如: 版权信息.
    ```freemarker
    <#include "filePath">
    ```


#### 联合使用指令 {#联合使用指令}

在页面中,指令间可以很容易地相互嵌套.


#### 内建函数 {#内建函数}

内建函数可以链式操作.

-   user?html 给出user的HTML转义版本
-   user?upper_case: 给出user值的大写版本
-   user?cap_first: 给出user的首字母大写版本
-   user?length: 给出user值中字符的数量
-   user?size: 给出user序列中项目的企业
-   如果在&lt;#list animals as animal&gt;和对应的&lt;/#list&gt;标签中
    -   animal?index: 给出了在animals中基于0开始的animal的索引值
    -   animal?counter: 也像index, 但是给出的是基于1的索引值
    -   animal?item_parity: 基于当前计数的奇偶性,给出字符串"odd"或"even"
-   一些内奸函数需要参数来指定行为
    -   animal.protected?string("Y", "N"): 基于animal.protected的布尔值来返回字符串"Y"或者"N"
    -   animal?item_cycle('lightRow', 'darkRow'): 是之前item_parity更为常用的变形形式
    -   animals.join(", "): 通过连接所有项, 将列表转换为字符串,在每个项目之间插入参数分隔符.
    -   user?starts_with("J"): 根据user的首字母是否是"J"返回布尔值true或false


#### 处理不存在的变量 {#处理不存在的变量}

-   通过在变量名后面跟着一个叹号和默认值, 例
    ```nil
    <h1> Welcome ${user!"visitor"}<h1>
    ```
-   通过在变量名后面放置??来询问一个变量是否存在.将它和if指定合并,那么如果user变量不存在的话将会忽略整个问题语句, 例:
    ```freemarker
    <#if user??><h1>Welcome ${user}</h1></#if>
    ```


## 其它 {#其它}


### 自定义指令 {#自定义指令}
