+++
title = "用Python写网络爬虫"
author = ["WhatsUpeng!!!"]
draft = false
+++

## 网络爬虫简介 {#网络爬虫简介}


### 识别网站所用技术------builtwith模块 {#识别网站所用技术builtwith模块}

> pip install builtwith

```python
import builtwith
builtwith.parse("sample.website.com")
```


### 寻找网站的所有者 {#寻找网站的所有者}

> pip install python-whois

```python
import whois
print(whois.whois('sample.website.com'))
```


### 编写第一个网络爬虫 {#编写第一个网络爬虫}

**_3种爬取网站的常见方法：_** - 爬取网站地图 - 遍历每个网页的数据库ID -
跟踪网页链接


#### 下载网页 {#下载网页}

```python
import urllib2
def download(url):
    print('Downloading。。。', url)
    try:
        html = urllib2.urlopen(url).read()
    except urllib2.URLError e:
        print("Download error:", e.reason)
        html = None
    return html
```

-   下载内容时可能会遇到一些无法控制的错误，如果请求的页面可能不存在。因此需要捕获异常。

-   而有些时间的错误可能是临时性的，比如503，对于此类错误，我们可以尝试重新下载。重试N次后还失败，再返回错误。

-   因为Python默认的请求头通常会被网站封禁，所以我们需要添加请求代理。
    ```python
    def download(url, user_agent="wswp", num_retries=5):
      print("download...: ', url)
      headers = {'User-agent': user_agent}
      request = urllibs.Request(url, headers=hearders)
      try:
          html - urllib2.urlopen(request).read()
      except urllib2.URLError as e:
          print('Download error: ', e.reason)
          html = None
      return html
    ```
    **\*** 网站地图爬虫

    :CUSTOM_ID: 网站地图爬虫


## 数据抓取 {#数据抓取}


## 下载缓存 {#下载缓存}


## 并发下载 {#并发下载}


## 动态内容 {#动态内容}


## 表单交互 {#表单交互}


## 验证码处理 {#验证码处理}


## Scrapy {#scrapy}


## 总结 {#总结}
