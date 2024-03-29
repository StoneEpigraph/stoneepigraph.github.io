+++
title = "JVM简述"
date = 2023-09-17
tags = ["JAVA", "JVM"]
categories = ["JAVA", "JVM"]
draft = false
+++

## 类的加载,连接与初始化 {#类的加载-连接与初始化}


### 加载 {#加载}

指的是将类的.class文件中的二进制数据读入到内存当中,将其放在运行时数据区的方法区内,然后在内存中创建一个java.lang.Class对象.


#### 类的加载方式 {#类的加载方式}

1.  从本地系统中直接加载
2.  从网络下载.class
3.  从zip, jar等归档中加载.class文件
4.  从专有数据库中提取.class文件
5.  将Java源文件动态的编译为.class文件


### 连接 {#连接}

1.  验证确保被加载的类的正确性
2.  准备为类的静态变量分配内存,并将其初始化为默认值
3.  解析把类中的符号引用转换为直接引用


### 类的使用 {#类的使用}

1.  主动使用
    -   创建类的实例
    -   访问某个类或接口的静态变量或对静态变量赋值
    -   访问类的静态方法
    -   反射
    -   初始化一个类的子类
    -   Java虚拟机启动时被标明为启动类的类
    -   JDK1.7开始提供的动态语言支持：java.lang.invoke.MethodHandler实例的解析结果REF_getStatic, REF_PUTsTATIC, REF_invokeStatic句柄对应的类没有初始化，则初始化。
2.  被动使用


### 初始化 {#初始化}

所有的Java虚拟机实现必须在每个类或接口被Java程序"首次主动使用"时才进行初始化.


#### 注意 {#注意}

1.  当一个常量的值并非编译期间可以确定的,那么其值就不会被放到调用类的常量池中,这时在程序运行时,会导致主动使用这个常量所在的类,显然会导致这个类被初始化.


#### 主动使用的方式 {#主动使用的方式}

1.  创建类的实例
2.  访问某个类或接口的静态变量,或者对该静态变量赋值
3.  调用类的静态方法
4.  反射如Class.forName("com.path.ClassName")
5.  初始化一个类的子类
6.  Java虚拟机启动时被标明为启动类的类
7.  JDK1.7开始提供的动态语言支持.


## 虚拟机参数 {#虚拟机参数}


### Tips {#tips}


### 说明 {#说明}

1.  -XX:+&lt;option&gt;, 表示开启option选项
2.  -XX:-&lt;option&gt;, 表示关闭option选项
3.  -XX:&lt;option&gt;=&lt;value&gt;, 表示将option选项的值设置为value


### 参数 {#参数}

1.  --XX:+TraceClassLoading: 用于追踪类的加载信息并打印出来.
2.  -Xss1M: 设置最大调用深度，防止栈举出。StackOverflowError。
3.  -XX:MaxTenuringThreshold: 指定新征伐对象经过多少次回收后进入老年代，默认为15次。
4.  -XX:PretenureSizeThreshold: 指定对象的大小超过在指定的大小之后，直接晋升老年代。
5.  TLAB
    1.  -XX:+UseTLBA: 使用TLAB, 默认开启。
    2.  -XX:+TLABSize: 设置TLAB大小
    3.  -XX:TLABRefillWasteFraction：设置维护进入TLAB空间的单个对象大小，他是一个比例值，默认为64,即如果对象大于整个空间的1/64,则在堆创建对象。
    4.  -XX:+printTLAB：查看TLAB。
    5.  -XX:ResizeTLAB: 自调整TLABRefillWasteFraction阀值。
6.  垃圾收集器
    1.  -XX：UseSerialGC： 使用串行垃圾回收器。
    2.  -XX:+useParNewGC: 新生代使用ParNew回收器。老年代使用串行回收器。
        1.  -XX:parallelGCThreads： 指定Parnew收集器的线程数。
    3.  ParallelGC
        1.  -XX:MaxGCPauseMills: 设置最大垃圾收集停顿时间。
        2.  -XX：GCTimeRatio： 设置吞量大小，它是一个0到100之间的整数，默认为100。
        3.  -XX:UseAdaptiveSizePolicy: 打开自适应模式。
    4.  CMS
        1.  -XX:+UseConcMarkSweepGC
        2.  -XX:ConcGCThreads:设置并发线程数量。


### 虚拟机调优策略 {#虚拟机调优策略}

JVM参数调优主要设置堆内存，主要让GC不要去频繁回收垃圾，减少对老年代的回收。配置时让-Xms与-Xmx一致。

1.  初始内存和最大内存越大，吞量就大，初始内存与最大内一致。
2.  并行回收比串行回收吞量要大，多核多线程吞吐。
3.  垃圾回收机制次数越少，说明性能越高。


## 垃圾回收算法 {#垃圾回收算法}


### Q {#q}

1.  为什么新生代和老年代使用不一样的压缩算法。


### 主要回收算法 {#主要回收算法}


#### 引用计数算法 {#引用计数算法}

问题

1.  无法处理交叉引用的情况


#### 复制算法 {#复制算法}

一般在新生代使用


#### 标记清除算法 {#标记清除算法}

一般老年代才会使用问题：

1.  内存碎片问题。


#### 标记压缩算法 {#标记压缩算法}

一般在老年代使用， 是标记清除算法的升级。


#### 分代算法 {#分代算法}

根据对象的特点把内存分成N块，而后根据每个内存的特点使用不同的算法。对于新生代和老年代来说，新生代回收频率很高，但是每次回收消耗时间很短，而对老年代回收频率较低，但每次消耗时间较长，所以应当尽量减少老年代的回收。


#### 分区算法 {#分区算法}

JDK1.7新增的算法。主要是将整个内存分为N个独立空间，每个小空间都可以独立使用，这样细粒度的控制一次回收多少个小空间，而不是对整个内存空间进行GC，从而提升性能，并减少GC的停顿时间。


## 内存分区 {#内存分区}

1.  程序计数器指向当前线程正在执行的字节码指令的地址
2.  栈/虚拟机栈存储当前线程运行方法所需要的数据、指令、返回地址。以栈帧（局部变量表，操作数栈，动态链接，出口。。。）为单位。
3.  本地方法栈
4.  方法区类信息，常量，静态变量，JIT
    JDK1.8以前还有永久代。
5.  堆堆分为新生代和老年代。新生代分为eden区，s0区，s1区（hotSpot比例为8：1：1）。新生区与老年区的大小一般比例是1比2或者1比3
    TLAB
        Thread Local Allocation Buffer 即线程本地分配缓存，线程专用的个内存分配区域，是为了加速对象分配而生的。每一个线程都会产生一个TLAB，该线程独享的工作区域。


## 对象创建 {#对象创建}


#### 对象创建流程 {#对象创建流程}

1.  尝试栈上分配。
2.  尝试TLAB区
3.  是否满足进入老年代
4.  eden分配。


## 垃圾收集器 {#垃圾收集器}


### 分类 {#分类}

1.  串行回收器
2.  并行回收器
3.  CMS
    Concurrent Mark Sweep 并发标记清除回收器。
    -XX：CMSInitiatingOccupancyFraction默认为68,即当老年代的空间使用率达到68%的时候，会执行CMS回收。
4.  G1


## 助记符 {#助记符}

1.  ldc
    表示将int, float或是String类型的常量值从常量池中推送到栈顶.
2.  bipush
    表示将单字节(-128~127)的常量推送至栈顶.
3.  sipush
    表示将一个短整型常量值(-32768~32767)推送至栈顶.
4.  iconst_1
    表示将一个int类型1推送至栈顶. (iconst_m1   ~  iconst_5)
5.  anewarray
    表示创建一个引用类型的(如类,接口,数组)数组,并将其引用值压入栈顶.
6.  newarray
    表示创建一个指定的原始类型(如float, int, char等)数组,并将其引用值压入栈顶


## JVM监控工具 {#jvm监控工具}


### jps {#jps}

查询java进程的一些基本信息，比如PID


### jvisualvm {#jvisualvm}


### jconsole {#jconsole}


### jcmd {#jcmd}


### jmc {#jmc}

一个界面的大成功能


### jhat {#jhat}

分析堆转储文件


### jmap {#jmap}


#### 使用jmap命令生成dump文件 {#使用jmap命令生成dump文件}

```shell
java -dump:live, format=b,file=filepath\filename.hprof pid
```


## 问题 {#问题}


### 内存溢出与内存泄露 {#内存溢出与内存泄露}

内存泄露：对象已经没有被应用程序使用，但是垃圾回收器没办法移除它们，因为还在被引用着。内存溢出：需要的内存比支持的内存要多。


### 垃圾回收线程频繁使用的缺点 {#垃圾回收线程频繁使用的缺点}

垃圾回收执行时所有的其他线程都会暂停，会影响程序效率。
