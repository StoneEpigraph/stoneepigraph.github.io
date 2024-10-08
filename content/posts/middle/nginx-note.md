+++
title = "Nginx-note"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
tags = ["中间件", "Nginx"]
categories = ["中间件"]
draft = false
+++

## Nginx基础1 {#Nginx基础}


### Nginx架构 {#nginx架构}


#### nginx事件模型 {#nginx事件模型}

<!--list-separator-->

-  nginx是采用的异步非阻塞。

    拿epoll为例，当事件没准备好时，放到epoll里，事件准备好了，我们就去读写，当读写返回EAGAIN时，我们将它再次加入到epoll里。这样，只要有事件准备好了，我们就去处理它，只有当所有事件都没准备好时，才在epoll里等着。这样我们就可以并发处理大量的并发了，当然，这里的并发请求，是指未处理完的请求，线程只有一个，所以同时能处理的请求当然只有一个，只是在请求间进行不断切换而已，切换也是因为异步事件未准备好，而主动让出的。这里的切换是没有任何代价的，你可以理解为循环处理多个准备好的事件，事实上就是这样的。与多线程相比，这事事件处理方式是有很大的优势的，不需要创建线程，每个请求占用的内存也很少，没有上下文切换，事件处理非常轻量级。并发数再多也不会导致无谓的资源浪费（上下文切换）。更多的并发数，只是会占用更多的内存而已。

<!--list-separator-->

-  Nginx的worker数最好设置为CPU的核数。


#### Nginx基本概念 {#nginx基本概念}

<!--list-separator-->

-  connection

    在Nginx中connection就是对tcp连接的封闭，其中包括连接的socket, 读事件，写事件。利用Nginx封闭的Connection，我们可以很方便的使用Nginx来处理与连接相关的事情，比如，建立连接，发送与接受数据等。而Nginx中的http请求的处理就是建立在Connection之上的，所以Nginx不公可以作为一个web服务器， 也可以作为邮件服务器。当然，利用Nginx提供的Connection,我们可以与任何后端服务打交道。

    <!--list-separator-->

    -  Nginx处理连接的流程

        首先Nginx在启动时，会解析配置文件，得到需要监听的端口与IP地址，然后在Nginx的master进程里面，先初始化好这个监控的socket（创建Socket， 设置Addrreuse等选项，绑定到指定的IP地址端口，再Listen），然后再fork出多个子进程出来，然后子进程会竞争accept新的连接。此时，客户端就可以向Nginx发起连接了。当客户端与服务端通过三次握手建立好一个连接后，Nginx的某一个子进程会Accept成功，得到这个建立好的连接的Socket，然后创建Nginx对连接的封闭，即ngx_connection_t结构体。接着，设置读写事件处理函数并添加读写事件来与客户端进行数据的交换。最后，Nginx或客户端主动关掉连接，到此，一个连接就结束了。
        Nginx在实现时，是通过一个连接池来管理的，这里的连接池里保存的其实不是真实的连接，它只是一个worker_connections(不大于系统对fd的限制)大小的ngx_connection_t结构体的数组。并且，Nginx会通过一个链表free_connections来保存所有的空闲ngx_connection_t，每次获取一个连接时，就从空闲连接链表里获取一个，用完后，再放回空间连接链表里。

<!--list-separator-->

-  request

    在Ningx中request我们指的是http请求，具体到Nginx中的数据结构是ngx_http_request_t。它是对一个Http请求的封装。


### 指令 {#指令}


#### server {#server}

用于定义服务，http中可以有多个server块


#### listen {#listen}

指定服务器侦听请求的IP地址和端口，如果省略地址，服务器将侦听所有地址，如果省略端口，则使用标准端口


#### server_name {#server-name}

服务名称，用于配置域名使用_表示不做域名匹配.


#### location {#location}

用于配置映射路径uri对应的配置，一个server中可以有多个location, location后面跟一个uri,可以是一个正则表达式，/表示匹配任意路径，当客户端访问的路径满足这个uri时就会执行location块里的代码

<!--list-separator-->

-  修饰符

    1.  = 进行普通字符精确匹配。也就是完全匹配
    2.  ^~ 前缀匹配。如果匹配成功，则不再匹配其他location.
    3.  ~ 表示执行一个正则匹配，区分大小写
    4.  ~\* 表示执行一个正则匹配，不区分大小写
    5.  _xxx_ 常规字符串路径匹配
    6.  / 通用匹配， 任何请求都会匹配到

<!--list-separator-->

-  检查顺序

    location = &gt; location 完整路径 &gt; location ^~ &gt; location ~, ~\* &gt; location 部分起始路径 &gt; /
    注意： location的优先级与location配置的位置无关

<!--list-separator-->

-  正则表达式

    1.  .: 匹配除换行符以外的任意字符
    2.  ?: 重复0次或1次
    3.  ?+: 重复1次或更多次
    4.  \* : 重复0次或更多次
    5.  \d: 匹配数字
    6.  ^: 匹配字符串的开始
    7.  $: 匹配字符串的结束
    8.  {n}: 重复n次
    9.  {n,}: 重复n次或更多次
    10. [c]: 匹配单个字符c
    11. [a-z]: 匹配a-z小写字母的任意一个
    12. (a|b|c): 竖线表示匹配任意一种情况，每种情况使用竖线分隔，一般使用小括号括住，匹配符合a字符或b字符或是c字符的字符串小括号()之间匹配的内容，可以在后面通过$1来引用，$2表示的是前面第二个()里的内容。
    13. \\: 用于转义特殊字符


#### root {#root}

root指令用于设置请求的根目录，从而允许Nginx将传入的请求映射到文件系统上。

```nginx
server {
             listen 80;
             server_name stonemind.cn;
             root /var/www/html;
}
```


#### index {#index}

设置首页， 当只访问server_name时后面不跟任何路径是不走直接走index指令的。如果访问路径中没有指定具体的文件，则返回index设置的资源。


#### set {#set}

自定义变量

```nginx
set $doc_root /usr/local/var/www;
```


#### proxy_pass {#proxy-pass}

<!--list-separator-->

-  反向代理（Reverse Proxy)

    反向代理方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。反向代理使用proxy_pass指令来实现。

    ```nginx
    server {
                  listen 80;
                  server_name localhost;

                  location / {
                      proxy_pass http://localhost:8081;
                      proxy_set_header Host $host:$server_port;
                      # 设置用户IP地址
                      proxy_set_header X-Forwarded-For $remote_addr;
                  }
    }
    ```


#### upstream {#upstream}

<!--list-separator-->

-  负载均衡策略

    1.  PR(round robin: 轮询默认)
        ```nginx
        upstream web_servers {
           server localhost:8081;
           server localhost:8082;
        }

        server {
            listen       80;
            server_name  localhost;
            #access_log  logs/host.access.log  main;


            location / {
                proxy_pass http://web_servers;
                # 必须指定Header Host
                proxy_set_header Host $host:$server_port;
            }
         }
        ```
    2.  权重
        ```nginx
        # 4次请求只有一次被分配到8081上，其他3次分配到8082上。backup是指热备，只有当8081和8082都宕机的情况下才走8083
        upstream test {
            server localhost:8081 weight=1;
            server localhost:8082 weight=3;
            server localhost:8083 weight=4 backup;
        }
        ```
    3.  ip_hash
        上面的2种方式都有一个问题，那就是下一个请求来的时候请求可能分发到另外一台服务器，当我们的程序不是无状态的时候，这时候就有一个很大的问题了，比如把登记信息保存到了session中，那么中转到另外一台服务器的时候就需要重新登录了，所以很多时候我们需要一个客户只访问一个服务器， 那么就需要用ip_hash了，ip_hash的每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
        ```nginx
        upstream test {
            ip_hash;
            server localhost:8080;
            server localhost:8081;
        }
        ```
    4.  fair(第三方)
        按后端服务器的响应时间来分配请求，响应时间短的优先分配。
        ```nginx
        upstream backend {
            fair;
            server localhost:8080;
            server localhost:8081;
        }
        ```
    5.  url_hash(第三方)
        按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用的hash算法
        ```nginx
        upstream backend {
            hash $request_uri;
            hash_method crc32;
            server localhost:8080;
            server localhost:8081;
        }
        ```


#### return {#return}

返回http状态码和可选的每二个参数（可重定向的URL）

```nginx
location /permantly/moved/url {
    return 301 http://wwww.example.com/moved/here;
}
```


#### rewrite {#rewrite}

重写URI请求 rewrite，通过使用rewrite指令在请求处理期间多次修改请求URI，该指令具有一个可选参数和两个必需参数。第一个(必需)参数是请求URI必须匹配的正则表达式。第二个参数是用于替换匹配URI的URI。可选的第三个参数是可以停止进一步重写指令的处理或发送重定向(代码301或302)的标志

```nginx
location /users/ {
    rewrite ^/users/(.*)$ /show?user=$1 break;
}
```


#### error_page {#error-page}

使用error_page指令，您可以配置NGINX返回自定义页面以及错误代码，替换响应中的其他错误代码，或将浏览器重定向到其他URI。在以下示例中，error_page指令指定要返回404页面错误代码的页面(/404.html)。

```nginx
error_page 404 /404.html;
```


#### 日志 {#日志}

访问日志：需要开启压缩 gzip on; 否则不生成日志文件，打开log_format、access_log注释

```nginx
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
access_log  /usr/local/etc/nginx/logs/host.access.log  main;
gzip  on;
```


#### deny {#deny}

```nginx
# 禁止访问某个目录
location ~* \.(txt|doc)${
  root $doc_root;
  deny all;
}
```


### 内置变量 {#内置变量}

nginx的配置文件中可以使用的内置变量以美元符$开始，也有人叫全局变量。其中，部分预定义的变量的值是可以改变的。另外，关注Java知音公众号，回复“后端面试”，送你一份面试题宝典！
$args ：#这个变量等于请求行中的参数，同$query_string
$content_length ：请求头中的Content-length字段。
$content_type ：请求头中的Content-Type字段。
$document_root ：当前请求在root指令中指定的值。
$host ：请求主机头字段，否则为服务器名称。
$http_user_agent ：客户端agent信息
$http_cookie ：客户端cookie信息
$limit_rate ：这个变量可以限制连接速率。
$request_method ：客户端请求的动作，通常为GET或POST。
$remote_addr ：客户端的IP地址。
$remote_port ：客户端的端口。
$remote_user ：已经经过Auth Basic Module验证的用户名。
$request_filename ：当前请求的文件路径，由root或alias指令与URI请求生成。
$scheme ：HTTP方法（如http，https）。
$server_protocol ：请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
$server_addr ：服务器地址，在完成一次系统调用后可以确定这个值。
$server_name ：服务器名称。
$server_port ：请求到达服务器的端口号。
$request_uri ：包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
$uri ：不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
$document_uri ：与$uri相同
