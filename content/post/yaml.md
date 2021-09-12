---
title: "YAML"
date: 2021-09-11T19:32:14+08:00
draft: false
---
# YAML
*YAML Ain't Markup Language*
和GNU一样，YAML是一个递归着说“不”的名字。不同的是，GNU对UNIX说不，YAML说不的对象是XML。因为：
- YAML的可读性好
- YAML和脚本语言的交互性好
- YAML使用实现语言的数据类型
- YAML有一个一致信息模型
- YAML易于实现
同时YAML也有XML的以下优点：
- YAML可以基于流来处理
- YAML表达能力强，扩展性好
相对于JSON：
​	YAML是JSON的一个严格的超集。
## 语法
- Structure通过空格来展示。Sequence里的项用"-"来代表，Map里的键值对用":"分隔.
- 大小写敏感
- 使用缩进表示层关系，并且缩进不允许使用Tab键。而且缩进的空格数目都不重要，只要相同层级的元素左对齐即可。
## 快速入门
YAML中允许表示三种格式，分别是**常量值，对象和数组**
### 基本格式要求
- YAML大小写敏感
- 使用缩进代表层级关系
- 缩进只能使用空格，不能使用TABLE，不要求空格个数，只需要相同层级左对齐（一般2个或4个空格）
#### 对象
使用冒号代表，格式为key: value。**冒号后边要加一个空格。**
```yaml
key: value
```
可以使用缩进表示层级关系
```yaml
key:
	child-key1: value1
	child-key2: value2
```
YAML中还支持流式（flow）语法表示对象
```yaml
key: {child-key1: value1, child-key2: value2}
```
较为复杂的对象格式， 可以使用问号加一个空格代表一个复杂的Key，再配合一个冒号加一个空格代表一个value
```yaml
?
	- complexkey1
	- complexkey2
:
	- complexvalue1
	- complexvalue2
```
意思是对象的属性是一个数组[complexkey1, complexkey2]， 对应的值也是一个数组[complexvalue1, complexvalue2]。
#### 数组
使用一个短横线加一个空格代表一个数组项
```yaml
hobby:
	- Java
	- Python
```
一个相对复杂的例子
```yaml
textEditor:
	-
		id: 1
		name: Emacs
	-
		id: 2
		name: vim
```
使用流式表示就是
```yaml
textEditor: [{id: 1, name: Emacs}, {id: 2, name: vim}]
```
#### 常量
YAML中提供了多种常量结构，包括：整数，浮点数，字符串，NULL，日期，布尔，时间。
```yaml
boolean: 
	- TRUE
	- FALSE
float:
	- 3.14
	- 5.234234e+5   #可以使用科学计数法
int:
	- 123
	- 0b1010_0111_0100_1010_1110    # 可以使用二进制表示
null:
	nodeName: 'node'
	parent: ~	# 使用~表示null
string:
	- 哈哈
	- 'Hello world'		# 可以使用双引号或者单引号包裹特殊字符
	- newline
	  newline2		# 字符串可以拆成多行，每一换行会被转化成一个空格
date:
	- 2018-01-01	# 日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime:
	- 2018-01-01T15:01:01+08:00		# 时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```
#### 一些特殊符号
YAML中提供了很多特殊符号
##### ---
YAML可以在同一个文件中表示多个文档，使用三减号（---）表示一个文档的开始。
e.g.
```yaml
server:
	address: 192.168.1.125
---
spring:
	profiles: development
	server:
		address: 127.0.0.1
---
spring:
	profiles: production
	server:
		address: 192.168.100.1
```
此文件代表定义了两个profile, 一个是development, 一个是production。 
##### ...和---
...和---配合使用，在一个配置文件中代表一个文件的结束
```yaml
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
...
---
time: 20:03:47
player: Sammy Sosa
action: grand slam
...
```
##### !!
!!在YAML用作强制类型转换
```yaml
string:
	- !!str 12345
	- !!str true
```
或
```yaml
--- !!set
- Mark McGwire: 65
- Sammy Sosa: 63
- Sammy Sosa: 63
- Ken Griffy: 58
```
##### > 和 |
在字符串中折叠换行，| 保留换行符，这两个符号是YAML中字符串经常使用的符号，比如
```yaml
accomplishment: >
 Mark set a major league
 home run record in 1998.
stats: |
 65 Home Runs
 0.278 Batting Average
```
的输出结果是
```yaml
accomplishment=Mark set a major league home run record in 1998.
```
```yaml
stats=65 Home Runs
 0.278 Batting Average,
```
##### 引用
重复的内容在YAML中可以使用&来完成锚点定义，使用*来完成锚点引用。
```yaml
hr:
- Mark McGwire
- &SS Sammy Sosa
rbi:
- *SS 
- Ken Griffey
```
或者
```yaml
SS: &SS Sammy Sosa
hr:
 - Mark McGwire
 - *SS
rbi:
 - *SS 
 - Ken Griffey
```
或者
```yaml
default: &default
    - Mark McGwire
    - Sammy Sosa
hr: *default	# 引用一个数组
```
##### 合并内容
```yaml
merge:
  - &CENTER { x: 1, y: 2 }
  - &LEFT { x: 0, y: 2 }
  - &BIG { r: 10 }
  - &SMALL { r: 1 }
  
sample1: 
    <<: *CENTER
    r: 10
    
sample2:
    << : [ *CENTER, *BIG ]
    other: haha
    
sample3:
    << : [ *CENTER, *BIG ]
    r: 100
```
## YAML的适用范围
**适用于脚本语言**：由于实现简单，解析成本很低，YAML特别适合在脚本语言中使用。如：Ruby，Java，Perl，Python， PHP， OCaml， JavaScript。
**序列化**： YAML比较适合做序列化。因为它是宿主语言数据类型直转的。
**配置文件**：YAML做配置文件也不错。比如Ruby on Rails的配置文件。SpringBoot的配置文件。
## YAML的不足
YAML没有自己的数据类型定义。
所以，**由于兼容性问题，不同语言间的数据流转建议现在不要使用YAML。**
### 注释
YAML中只有行注释，使用#号作为注释标志。
参考：
- YAML快速入门
  https://www.jianshu.com/p/97222440cd08
- 在线验证Yaml格式
  http://nodeca.github.io/js-yaml/
- IBM Developer YAML简介
  https://www.ibm.com/developerworks/cn/xml/x-cn-yamlintro/index.html
- YAML语言教程
  http://www.ruanyifeng.com/blog/2016/07/yaml.html
