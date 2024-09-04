+++
title = "Python核心编程（3）"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
categories = ["Python"]
draft = false
+++

## 正则表达式 {#正则表达式}


## 网络编程 {#网络编程}


## 因特网客户端编程 {#因特网客户端编程}


### 因特网客户端简介 {#因特网客户端简介}


### 文件传输 {#文件传输}


#### 文件传输因特协议 {#文件传输因特协议}

在当下，HTTP,FTP,scp/rsync的应用仍然广泛。


#### Python和FTP {#python和ftp}


#### ftplib.FTP类 {#ftplib.ftp类}


#### 客户端FTP程序实例 {#客户端ftp程序实例}

```python
#! /usr/bin/env python
# coding: utf-8
import ftplib
import os
import socket
HOST = 'ftp.mozilla.org'
DIRN = 'pub/mozilla.org/webtools'
FILE = 'bugzilla-LATEST.tar.gz'
def main():
    try:
        f = ftplib.FTP(HOST)
    except (socket.error, socket.gaierror) as e:
        print("ERROR: can't reach '%s' " % HOST)
        return
    print("*** Connected to host '%s'" % HOST)
    try:
        f.login()
    except ftplib.error_perm:
        print("ERROR: can't login anonymously")
        f.quit()
        return
    print("*** Logged in as 'anonymous")
    try:
        f.cwd(DIRN)
    except ftplib.error_perm:
        print("ERROR: can't CD to '%s" % DIRN)
        f.quit()
        return
    print("*** Change to '%s' folder" % DIRN )
    try:
        f.retrbinary("RETR %s" % FILE, open(FILE, 'wb').write())
    except ftplib.error_perm:
        print("ERROR: can't read file '%s'" % FILE)
        os.unlink(FILE)
    else:
        print("*** Download '%s' to CWD" % FILE)
        f.quit()
if __name__ == '__main__':
    main()
```


#### Ftp的其他内容 {#ftp的其他内容}

-   命令行客户端程序
-   GUI客户端程序
-   Web浏览器
-   自定义应用程序


### 网络新闻 {#网络新闻}


#### Usenet与新闻组 {#usenet与新闻组}


#### 网络新闻传输协议 {#网络新闻传输协议}

NNTP


#### Python和NNTP {#python和nntp}

有一个nntplib库和一个需要实例化的nntplib.NNTP类


### 电子邮件 {#电子邮件}


#### 电子邮件系统组件和协议 {#电子邮件系统组件和协议}


#### 发送电子邮件 {#发送电子邮件}

<!--list-separator-->

-  SMTP、ESMTP、LMTP

<!--list-separator-->

-  MTA

    一些实现SMTP的MTA

    -   开源
        -   Sendmail
        -   Postfix
        -   Exim
        -   qmail
    -   商业
        -   Microsoft Exchange
        -   Lotus Notes Domino Mail Server


#### Python和SMTP {#python和smtp}

有一个smtplib模块和一个需要实例化的smtplib.SMTP类


#### smtplib.SMTP类方法 {#smtplib.smtp类方法}


#### 接收电子邮件 {#接收电子邮件}


#### POP和IMAP {#pop和imap}


#### Python和POP3 {#python和pop3}

导入poplib并实例化poplib.POP3


## 多线程编程 {#多线程编程}


### 简介、动机 {#简介动机}


### 线程和进程 {#线程和进程}


### 线程和Python {#线程和python}


#### 全局解释器锁 {#全局解释器锁}

对Pyton虚拟机的访问是由\*全局解释器锁（GIL）\*控制的。在多线程环境中，Python虚拟机将按照正面所述折方式执行

1.  设置GIL
2.  切换进一个线程去运行
3.  执行正面的操作这一
    1.  指定数量的字节码指令
    2.  线程主动让出控制权（可以调用time.sleep(0)来完成）
4.  把线程设置回睡眠状态（切换出线程）
5.  解锁GIL
6.  重复上述步骤

**可查看Python/ceval.c文件**


#### 退出线程 {#退出线程}

当一个线程完成函数的执行时，它就会退出。另外，还可以通过调用诸如thread.exit()之类的退出函数，或者sys.exit()之类的退出Python进程的标准方法，变或者抛出SystemExit异常，来使线程退出。
**不过你不能直接“终止”一个线程。**
主线程应该做一个好的管理者，负责了解每个单独的线程需要执行什么，每个派生的线程需要哪些数据或参数，这些线程执行守后会提供什么结果。这样，主线程就可以收集每个线程的相关介绍，然后汇兑成一个有意义的最终的结果。


#### 在Python中使用线程 {#在python中使用线程}

Python虽然支持多线程编程，但是还需要取决于它所运行的操作系统。


#### 不使用线程的情况 {#不使用线程的情况}

？？？


#### Python的threading模块 {#python的threading模块}

**避免使用thread**

-   theading模块更加先进，有更好的线程支持
-   并且thead模块中的一些属性会和threading模块有冲突。
-   低级别的thread模块拥有的同步原语很少（实际上只有一个），而threading模块有很多。
-   thread对于进程何时退出没有控制。当主线程结束时，所有其他线程也都强制结束，不会发出警告或者进行适当的清理。
-   thread不支持守护线程。


### thread模块 {#thread模块}

thread模块除了提供派生线程外，还提供了基本的同步数据结构，称为锁对象（lock
object, 也叫原语锁、简单锁、互斥锁、互斥和二进制信号量）核心函数： **start_new_thread()**
它的参数包括函数（对象）、函数的参数以及可选的关键参数。
e.g.

```python
#! /usr/bin/env python
import thread
from time import sleep, ctime
def loop0():
    print('start loop 0 at : ', ctime())
    sleep(4)
    print('loop 0 done at: ', ctime())

def loop1()：
    print('start loop 1 at: ', ctime())
    sleep(2)
    print('loop 1 end at : ', ctime())

def main():
    print('starting at: ', ctime())
    thread.start_new_thread(loop0, ())
    thread.start_new_thread(loop1, ())
    sleep(6)
    print('all DONE at: ', ctime())

if __name__ == '__main__':
    main()
```

**start_new_thread()必须包含开始的两个参数， 即使要执行的函数不需要参数，也需要传递一个空元组。**
sleep(6)的作用是防止主线程执行完成后导致两个子线程异常终止。可是这样肯定不是最好的办法，我们不能确定子函数需要多长时间执行。所以需要引入锁。
e.g.

```python
#！/usr/bin/env python3
# coding: utf-8
import thread
from time import sleep, ctime
loops = [4, 2]
def loop(nloop, nsec, lock):
    print('start loop', nloop, ' at: ', ctime())
    sleep(nsec)
    print('loop ', nloop, 'done at: ', ctime())
    lock.release()

def main():
    print('start at: ', ctime())
    locks = []
    nloops = range(len(loops))

    for i in nloops:
        lock = thread.allocate_lock()
        lock.acquire()
        locks.append(lock)

    for i in nloops:
        thread.start_new_thread(loop, (i, loops[i], locks[i]))

    for i in nloops:
        while locks[i].locked():pass

    print 'all DONE at: ', citme()

if __name__ == '__main__':
    main()
```


### theading 模块 {#theading-模块}

threading模块中所有可用对象的列表

| 对象             | 描述                                       |
|----------------|------------------------------------------|
| Thread           | 表示一个执行线程的对象                     |
| Lock             | 锁原语对旬（和thread模块中的锁一样)        |
| RLock            | 可重入锁对象，使单一线程可以（再次）获得已持有的锁（递归锁） |
| Condition        | 条件变量对象，使得一个线程等待另一个线程满足特定的“条件”，比如改变状态或某个数据值 |
| Event            | 条件变量的通用版本，任意数量的线程等待某个事件的发生，在该事件发生后所有线程将被激活 |
| Semaphore        | 为线程间共享的有限资源提供了一个“计数器”，如果没有可用资源时会被阻塞 |
| BoundedSemaphore | 与Semaphore相似，不过它不允许超过初始值    |
| Timer            | 与Thread相似，不过它要在运行前等待一段时间 |
| Barrier          | 创建一个“障碍”，必须达到指定数量的线程后才可以继续 |

<!--list-separator-->

-  守护线程

    避免使用thread模块的另一个原因是该模块不支持守护线程。
    threading模块支持守护线程，其工作方式是：守护线程一般是一个等待客户端请求服务的服务器，如果没有客户端请求，守护线程就是空闲的。如果把一个线程设置成守护线程，就表示这个线程是不重要的，进程退出时不需要等待这个线程执行完成。要将一个线程设置为守护 线程，需要 在启动线程之前执行如下赋值语句：

    > thread.daemon = True

    同样，要检查线程的守护状态，也只需要检查这个值即可。


#### Thread类 {#thread类}

Thread对象的属性

| 属性   | 描述               |
|------|------------------|
| name   | 线程名             |
| ident  | 线程的标识符       |
| daemon | 布尔标志，表示这个线程是否是守护线程 |

Thread对象的方法

| 方法                                                                                        | 描述                                                                                                                      |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| \*init\*(group=None, target=None, name=None, args=(), kwargs={}, verbose=None, daemon=None) | 实例化一个线程对象，需要有一个可调用的target，以及其参数args或kwargs.还可以传递name或group参数，不过后者还未实现。此外，verbose标志也是可以接受的。而daemon的值将会设定thread.daemon属性标志。 |
| start()                                                                                     | 开始执行该线程                                                                                                            |
| run()                                                                                       | 定义线程功能的方法（通常在子类中被应用开发者重写）                                                                        |
| join(timeout=None)                                                                          | 直至启动的线程终止之前一直挂起；除非给出了timeout(秒),否则会一直阻塞                                                      |
| is_alive()                                                                                  | 布尔标志，表示这个线程是否还存活                                                                                          |

<!--list-separator-->

-  创建线程的方法

    -   创建 Thread的实例 ，传给它一个函数
    -   创建Thread的实例，传给它一个可调用的类实例
    -   派生Thread的子类，并创建子类的实例

    <!--list-separator-->

    -  **创建Thread的实例，传给它一个函数**

        ```python
        #! /usr/bin/env python
        import threading
        from time import sleep, ctime
        loops = [4, 2]
        def loop(nloop, nsec):
            print('start loop', nloop, ' at:', ctime())
            sleep(nsec)
            print('loop ', nloop, 'done at:', ctime())

        def main():
            print('start at；', ctime())
            threads = []
            nloops = range(len(loops))

            for i in nloops:
                t = threading.Thread(target=loop, args=(i, loops[i]))
                threads.append(t)

            for i in nloops:
                threads[i].start()

            for i in nloops:
                threads[i].join()

            print('all DONE at:', ctime())

        if __name__ == '__main__':
            main()
        ```

    <!--list-separator-->

    -  创建Thread的实例，传给它一个可调用的类实例

        ```python
        #! /usr/bin/env python
        import threading
        from time import sleep, ctime
        loops = [4, 2]
        class ThreadFunc():
            def __init__(self, func, args, name=''):
                self.name = name
                self.func = func
                self.args = args

            def __call__(self):
                self.func(*self.args)
        def loop(nloop, nsec):
            print('start loop', nloop, ' at:', ctime())
            sleep(nsec)
            print('loop ', nloop, 'done at:', ctime())

        def main():
            print('start at；', ctime())
            threads = []
            nloops = range(len(loops))

            for i in nloops:
                t = threading.Thread(target=ThreadFunc(loop, (i, loops[i]), loop.__name__))
                threads.append(t)

            for i in nloops:
                threads[i].start()

            for i in nloops:
                threads[i].join()

            print('all DONE at:', ctime())

        if __name__ == '__main__':
            main()
        ```

    <!--list-separator-->

    -  派生Thread的子类，并创建子类的实例

        ```python
        #! /usr/bin/env python
        import threading
        from time import sleep, ctime
        loops = [4, 2]
        class MyThread(threading.Thread):
            def __init__(self, func, args, name=''):
                threading.Thread.__init__(self)
                self.name = name
                self.func = func
                self.args = args

            def run(self):
                self.func(*self.args)
        def loop(nloop, nsec):
            print('start loop', nloop, ' at:', ctime())
            sleep(nsec)
            print('loop ', nloop, 'done at:', ctime())

        def main():
            print('start at；', ctime())
            threads = []
            nloops = range(len(loops))

            for i in nloops:
                t = MyThread(loop, (i, loops[i]), loop.__name__)
                threads.append(t)

            for i in nloops:
                threads[i].start()

            for i in nloops:
                threads[i].join()

            print('all DONE at:', ctime())

        if __name__ == '__main__':
            main()
        ```


#### threading 模块的其他函数 {#threading-模块的其他函数}

| 函数               | 描述                             |
|------------------|--------------------------------|
| active_acount()    | 当前活动的Thread对象的个数       |
| current_thread()   | 返回当前的Thread对象             |
| enumerate()        | 返回当前活动的Thread对象列表     |
| settrace(func)     | 为所有线程设置一个trace函数      |
| setprofile(func)   | 为所有线程设置一个profile函数    |
| stack_size(size=0) | 返回新创建线程的栈大小；或为后续创建的线程设定栈的大小为size |


### 单线程和多线程执行对比 {#单线程和多线程执行对比}


### 多线程实践 {#多线程实践}


#### 引入线程 {#引入线程}


#### 同步原语 {#同步原语}

锁/互斥信号量


#### 锁示例 {#锁示例}

锁有两种状态：

-   锁定
-   未锁定

两个函数：

-   获得锁: lock.acquire()
-   释放锁: lock.release()

**使用上下文管理**
2.5以后可以使用with语句，而不再调用锁的acquire()和release()而进一步简化代码。


#### 信号量 {#信号量}

信号量是一个计数器，当资源消耗时递减，当资源释放时递增。你可以认为信号量代表它们的资源可用或不可用。
e.g.

```python
#! /usr/bin/env python
# coding: utf-8
from atexit import register
from random import randrange
from threading import BoundedSemaphore, Lock, Thread
from time import sleep, ctime
lock = Lock()
MAX = 5
candytray = BoundedSemaphore(MAX)
def refill():
    lock.acquire()
    print('Refilling candy...',)
    try:
        candytray.release()
    expect ValueError:
        print('full, skipping')
    else:
        print('OK')
    lock.release()

def by():
    lock.acquire()
    print('Buying candy...')
    if candytray.acquire(False):
        print('OK')
    else:
        print('empty, skipping')
    lock.release()

def producer(loops):
    for i in xrange(loops):
        refill()
        sleep(randrange(3))

def consumer(loops):
    for i in xrange(loops):
        buy()
        sleep(randrange(3))

def _main():
    print('starting at: ', ctime())
    nloops = randrange(2, 6)
    print('The Candy Machine (full with %d bars)!' % MAX)
    Thread(target=consumer, args=(randrange(
        nloops, nlops+MAX+2),)).start()
    Thread(target=producer, args=(nloops,)).start()

@register
def _atexit():
    print('all DONE at:', ctime())

if __name__ == '__main__':
    _main()
```


### 生产者-消费者问题和Queue/queue模块 {#生产者-消费者问题和queuequeue模块}

常用属性

| 属性                     | 描述                                   |
|------------------------|--------------------------------------|
| queue(amxsize=0)         | 创建一个先入先出队列。如果给定最大值，则在队列没有空间时阻塞，否则为无限队列 |
| lifoQueue(maxsize=0)     | 创建一个后入先出队列。如果给定最大值，则在队列没有空间时阻塞，否则为无限队列 |
| priorityQueue(maxsize=0) | 创建一个优先级队列。如果给定最大值，则在队列没有空间时阻塞，否则为无限队列 |

常用异常

| 属性  | 描述                    |
|-----|-----------------------|
| Empty | 当对空队列调用get\*()方法时抛出异常 |
| Full  | 当对已满的队列调用put\*()方法时抛出异常 |

常用方法

| 属性                                | 描述                                                                                               |
|-----------------------------------|--------------------------------------------------------------------------------------------------|
| qsize()                             | 返回队列的大小（由于返回时队列的大小可能被其他线程修改，所以返回的是近似值）                       |
| empty()                             | 如果队列为空则返回True                                                                             |
| full()                              | 如果队列已满则返回True                                                                             |
| put(item, block=True, timeout=None) | 将item放入队列，如果block为True且timeout为None，则在有可用空间之前阻塞；如果timeout为正值，则最多阻塞timeout秒；如果block为False，则抛出Full异常 |
| put_nowait(item)                    | 和put(item, False)相同                                                                             |
| get(block=True, timeout=None)       | 从队列中取得元素。如果给定了lock(非0)，则一直阻塞到有可用的元素为止                                |
| get_nowait()                        | 和get(False)相同                                                                                   |
| task_done()                         | 用于表示队列中的某个元素已执行完成，该方法会被正面的join()使用                                     |
| join()                              | 在队列中所有元素执行完毕并调用上面的task_done()信号之前，保持阻塞。                                |


### 线程的替代方案 {#线程的替代方案}


#### subprocess 模块 {#subprocess-模块}

这是派生进程的主要替代方案，可以单纯地执行任务，或者通过标准文件（stdin,
stdout, stderr)进行进程间通信。


#### multiprocessing模块 {#multiprocessing模块}

2.6引入，允许为多核或多CPU派生进程，其接口与threading模块相似。该模块同样也包括在共享任务的进程间传输数据的多种方式。


#### concurrent.futures模块 {#concurrent.futures模块}

e.g.

```python
concurrent.futures import ThreadPoolExecutor
def __main():
    print('At ', ctime(), ' on Amazon...')
    with ThreadPoolExecutor(3) as executor:
        for isbn in ISBs:
            executor.submit(_showRanking, isbn)
    print('all DONE at:', ctime())
```

e.g. 高级任务管理

```python
#! /usr/bin/env python
from concurrent.futures improt ThreadPoolExecutor
from re import compile
from time improt ctime
from urllib.request import urlopen as uopen
REGEX = compile(b'#([\d,]+) in Books ')
AMZN = 'http://amazon.com/dp/'
ISBNs = {
    '0135648956': 'Core Python Programming',
    '0135648956': 'Core Python Programming',
    '0135648956': 'Core Python Programming',
}
def getRanking(isbn):
    with uopen('{0}{1}' .format(AMZN, isbn)) as page:
        return str(REGEX.findall(page.read())[0], 'utf-8')

def _main():
    print('At', ctime(), ' on Amazon...')
    with ThreadPoolExecutor(3) as executor:
        for isbn, ranking in zip(
                ISBNs, executor.map(getRanking, ISBNs)):
            print('- %r ranked &s' % (ISBNs[isbn], ranking))
        print('all DONE at: ', ctime())

        )
```


## GUI编程 {#gui编程}


## 数据库编程 {#数据库编程}


### 简介 {#简介}


#### 持久化存储 {#持久化存储}

存储机制：文件，数据库系统，混合类型。


#### 数据库基本操作和SQL {#数据库基本操作和sql}

-   底层存储数据库通常使用文件系统作为基本的持久化存储。
-   用户接口
    SQL
-   数据库一个关系 数据库管理系统通常可以管理多个数据库
-   组件数据库存储可以抽象为一张表
-   SQL
    数据库命令和查询操作是通过SQL语句提交给数据库的。


#### 数据库和Python {#数据库和python}


### Python的DB-API {#python的db-api}


#### 模块属性 {#模块属性}

DB-API标准要求必须提供下文列出的功能和属性

| 属性         | 描述                                                     |
|------------|--------------------------------------------------------|
| apilevel     | 需要适配器兼容的DB-API版本，默认为‘1.0'                  |
| threadsafety | 本模块的线程安全级别。0：不支持线程安全，1：最小化线程安全支持，2：适度的线程安全支持，3：完整的线程安全支持 |
| paramstyle   | 本模块的SQL语句参数风格                                  |
| connect()    | Connect()函数                                            |
| （多种异常） |                                                          |

-   数据库参数风格：

    | 参数风格 | 描述                 | 示例                  |
    |------|--------------------|---------------------|
    | numeric  | 数值位置风格         | where name = :1       |
    | named    | 命名风格             | where name = :name    |
    | pyformat | Python字典printf()格式转换 | where name = %(name)s |
    | qmark    | 问号风格             | where name = ?        |
    | format   | ANSIC的printf()格式转换 | where name = %s       |
-   connect()
    connect()函数通过Connection对象访问数据库。兼容模块必须实现
    connect()函数，该函数创建并返回一个Connection对象。
    connect()函数属性：

    | 参数     | 描述 |
    |--------|----|
    | user     | 用户名 |
    | password | 密码 |
    | host     | 主机名 |
    | database | 数据库名 |
    | dsn      | 数据源名 |


#### Connection对象 {#connection对象}

Connection对象方法：

| 方法名                                 | 描述                     |
|-------------------------------------|------------------------|
| close()                                | 关闭数据库连接           |
| commit()                               | 提交当前事务             |
| rollback()                             | 取消当前事务             |
| cursor()                               | 使用该 连接创建（并返回）一个游标或类游标的对象 |
| errorhandler(cxn, cur, errcls, errval) | 作为给定连接的游标处理程序 |


#### Cursor对象 {#cursor对象}

游标可以让用户提交数据库命令，并获得查询的结果行。
Cursor对象属性

| 对象属性                            | 描述                                                                                                          |
|---------------------------------|-------------------------------------------------------------------------------------------------------------|
| arraysize                           | 使用fetchmany方法时，一次取出的结果行数，默认为1                                                              |
| connection                          | 创建此游标的连接（可选）                                                                                      |
| description                         | 返回游标活动状态（7项无组）：(name, type_code, display_size, internal_size, precision, scale, null_ok)，只有name和type_code是必需的 |
| lastrowid                           | 上次修改行的行ID                                                                                              |
| callproc(func [, args])             | 调用存储过程                                                                                                  |
| close()                             | 关闭游标                                                                                                      |
| execute(op [, args])                | 执行数据库查询命令                                                                                            |
| executemany(op, args)               | 类似execute()和map()的结合 ，为给定的所有参数准备并执行数据库查询或命令                                       |
| fetchone()                          | 获取查询结果的下一行                                                                                          |
| fetchmany([size=cursor, arraysize]) | 获取查询结果的下面size行                                                                                      |
| fetchall()                          | 获取查询结果的所有行                                                                                          |
| \*iter\*()                          | 为游标创建迭代器对象                                                                                          |
| messages                            | 游标执行后从数据库中获得的消息列表（元组集合，可选）                                                          |
| next()                              | 被迭代器用于获取查询结果的下一行                                                                              |
| nextset()                           | 移动到下一个结果集                                                                                            |
| rownumber                           | 当前结果集中游标 的索引                                                                                       |
| setinputsize(size)                  | 设置允许的最大输入 大小                                                                                       |
| setoutputsize(size )                | 设置大列获取的最大缓冲区大小                                                                                  |
| rowcount                            | 上次execute\*()方法处理或影响的行数                                                                           |


### ORM {#orm}

考虑对象而不是SQL
目前最知名的Python ORM是SQLAlchemy和SQLObject。


#### SQLAlchemy常用方法： {#sqlalchemy常用方法}

-   filter_by():将指定列的什作为关键字参数以获取查询结果。
-   filter()：与fliter_by()类似，不过更加灵活，还可以使用表达式。比如：query.filter_by(userid=1)与query.filter(User.userid
    ==1)相同
-   order_by()
-   limit()
-   offset()
-   all()
-   one()
-   first()
-   join()
-   update()
-   delete()


### 非关系数据库 {#非关系数据库}


## Web客户端和服务器 {#web客户端和服务器}


### Python Web客户端工具 {#python-web客户端工具}


#### urllib模块/包 {#urllib模块包}

-   urllib.request.urlopen()
    打开一个给定的URL字符串表示的Web连接

    > urlopen (urlstr, postQueryData=None)

    一旦连接成功，urlopen将会返回一个文件类型对象。
    urlopen()文件类型对象的方法：

| 方法            | 描述             |
|---------------|----------------|
| f.read([bytes]) | 从f中读出所有或bytes个字节 |
| f.readline()    | 从f中读取一行    |
| f.readlines()   | 从f中读出所有行，作为列表返回 |
| f.close()       | 关闭f的URL连接   |
| f.fileno()      | 返回f的文件句柄  |
| f.info()        | 获得f的MIME头文件 |
| f.geturl()      | 返回f的真正      |

-   urllib.request.urlretrieve()
    用于下载完整的HTML，或对象文件。

    > urlretrieve(url, filename=None, reporthook=None, data=None)
-   quote()
-   unquote()
-   urlencode()
-   ...


## Web编程：CGI和WSGI {#web编程cgi和wsgi}

CGI：Common Gateway Interface 通用网关掊
WSGI：Web Server Gateway Interface Web服务器网关接口


## Web框架：Django {#web框架django}

-   安装

    > pip install django
-   创建项目

    > django-admin.exe startproject project_name
-   创建应用

    > python ./manage.py startapp app_name
-   创建POJO对象
-   创建表

    > python ./manage.py migrate


### python 应用shell {#python-应用shell}


#### 在Django中使用Python shell {#在django中使用python-shell}

> python ./manage.py shell


#### 安装应用 {#安装应用}

在settings.py的INSTALLED_APPS中添加app_name


## Python2与Python3的区别 {#python2与python3的区别}

-   print
    -   在python2中它是一条语句 print ...
    -   在python3中它成为了一个内置函数：print('...')
-   input
    -   python2中使用raw_input()
    -   python3中使用input()
-   exception
    -   python2:except Exception, instance
    -   python3:except Exception as instance
