+++
title = "Python CookBook"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
categories = ["Python"]
draft = false
+++

## 数据结构与算法 {#数据结构与算法}


### 解压序列赋值给多个变量 {#解压序列赋值给多个变量}

注意_, /, /_, 级别的使用


### 保留最后N个元素 {#保留最后n个元素}

collections deque


### 查找最大或最小的N个元素 {#查找最大或最小的n个元素}

heapq.nlargest(count, list)
heapq.nsmallest(count, list)


### 实现一个优先级队列 {#实现一个优先级队列}

heapq.heappush()
heapq.heappop()


### 字典中的键映射多个值 {#字典中的键映射多个值}

可以将多个值放到另外的容器中。也可以全用collections模块中的defaultdict来构造这样的字典


### 字典排序 {#字典排序}

可以使用collections模块中的OrderedDict类，它会保持元素被插入时的顺序。


### 字典的运算 {#字典的运算}

对字典运算，通常需要使用zip()函数先将键值反转过来。

> zip(dict.values(), dict.keys())

可以使用sorted()对反转后的字典进行排序。因为你在一个字典上执行普通的数字运算，它们仅仅作用于键，而不是值 。


### 查找两个字典的相同点 {#查找两个字典的相同点}

可以简单的在两字典的keys()或者items()方法返回结果上执行集合操作。


### 删除序列相同元素并保持顺序 {#删除序列相同元素并保持顺序}

如果序列上的值都是hashable类型，那么可以简单的利用集合或者生成器来解决问题。


### 命令切片 {#命令切片}

使用s = slice(start, stop, step)避免大量无法理解 的硬编码下标。你还可以使用s.start, s.stop, s.step获取它的属性。


### 序列中出现次数最多的元素 {#序列中出现次数最多的元素}

collections.Counter类

> words = [...]
> from collections import Counter
> word_counts = Counter(words)
> \#出现频率最高的3个单词
> top_three = word_counts.most_common(3)

Counter实例还可以很容易的跟数学运算操作相结合。


### 通过一个关键字排序一个字典列表 {#通过一个关键字排序一个字典列表}

通过全用operator模块的itemgetter函数。

```python
rows = [
{'fname': 'Brian', 'lname': 'Jones', 'uid': 1003},
{'fname': 'David', 'lname': 'Beazley', 'uid': 1002},
{'fname': 'John', 'lname': 'Cleese', 'uid': 1001},
{'fname': 'Big', 'lname': 'Jones', 'uid': 1004}
]
from operator import itemgetter
rows_by_fname = sorted(rows, key=itemgetter('fname'))
rows_by_uid = sorted(rows, key=itemgetter('uid'))
rows_by_lfname = sorted(rows, key=itemgetter('lname', 'fname'))
# itemgetter也可以使用lambda表达式代替
rows_by_fname_lambda = sorted(rows, key=lambda r: r['fname'])
rows_by_lfname_lambda = sorted(rows, key=lambda r: (r['lname'], r['fname']))
```


### 排序不支持原生比较的对象 {#排序不支持原生比较的对象}

```python
class User:
def __init__(self, user_id):
self.user_id = user_id
def __repr__(self):
return 'User({})'.format(self.user_id)
def sort_notcompare():
users = [User(23), User(3), User(99)]
print(users)
print(sorted(users, key=lambda u: u.user_id))
# 或者使用operator
from operator import attrgetter
sorted(users, key=attrgetter('user_id'))
```


### 通过某个字段将记录分组 {#通过某个字段将记录分组}

```python
rows = [
{'address': '5412 N CLARK', 'date': '07/01/2012'},
{'address': '5148 N CLARK', 'date': '07/04/2012'},
{'address': '5800 E 58TH', 'date': '07/02/2012'},
{'address': '2122 N CLARK', 'date': '07/03/2012'},
{'address': '5645 N RAVENSWOOD', 'date': '07/02/2012'},
{'address': '1060 W ADDISON', 'date': '07/02/2012'},
{'address': '4801 N BROADWAY', 'date': '07/01/2012'},
{'address': '1039 W GRANVILLE', 'date': '07/04/2012'},
]
from operator import itemgetter
from itertools import groupby
# Sorted by the desired field first, because groupby only check continuous elements.
rows.sort(key=itemgetter('date'))
# Iterate in groups
for date, items in groupby(rows, key=itemgetter('date')):
    print(date)
    for in in items:
        print(' ', i)
```


### 过滤序列元素 {#过滤序列元素}

最简单的过滤序列元素的方法就是使用列表推导。

> n for n in list if n &gt; 0

但是使用时会占用大量内存。如果你对内存比较敏感，那么你可以使用生成器表达式迭代产生过滤的元素。

> pos = (n for n in list if n &gt; 0)
> for x in pos:
> ​print(x)

有时候过滤规则比较复杂，不能简单的在列表推导 或者生成器表达式中表达出来。这时候你可以将过滤代码放到一个函数中，然后使用内建的filter()函数。

```python
values = ['1', '2', '### 3', '### ', '4', 'N/A', '5']
def is_int(val):
try:
x = int(val)
return True
except ValueError:
return False
ivals = list(filter(is_int, values))
print(ivals)
# Outputs ['1', '2', '### 3', '4', '5']
```

另外一个值得关注的过滤工具就是itertools.compress()，它以一个iterable对象和一个相对应的Boolean选择器序列作为输入参数。然后输出
iterable对象中对应选择器为True的元素。当你需要用另外一个相关联的序列来过滤某个序列的时候，这个函数是非常有用的。

```python
addresses = [
'5412 N CLARK',
'5148 N CLARK',
'5800 E 58TH',
'2122 N CLARK'
'5645 N RAVENSWOOD',
'1060 W ADDISON',
'4801 N BROADWAY',
'1039 W GRANVILLE',
]
counts = [ 0, 3, 10, 4, 1, 7, 6, 1]
from itertools import compress
more5 = [n > 5 for n in counts]
more5
[False, False, True, False, False, True, True, False]
list(compress(addresses, more5))
# output ['5800 E 58TH', '4801 N BROADWAY', '1039 W GRANVILLE']
```


### 从字典中提取子集 {#从字典中提取子集}

最简单的方式是使用字典推导。

```python
prices = {
'ACME': 45.23,
'AAPL': 612.78,
'IBM': 205.55,
'HPQ': 37.20,
'FB': 10.75
}
p1 = {key: value for key, value in prices.items() if value > 200}
```

通过创建一个元组序列然后把它传给dict()函数也能实现

```python
p1 = dict((key, value) for key, value in prices.items() if value > 200)
```


### 映射名称到序列元素 {#映射名称到序列元素}

想通过名称来访问元素，可以使用collections.namedtuple()函数。这个函数实际上是一个返回Python中标准元组类型子类的一个工厂方法。你需要传递一个类型名和你需要的字段给它，然后它就会返回一个类，你可以初始化这个类为你定义的字段传递值等。

```python
from collections import namedtuple
Subscriber = namedtuple('Subscriber', ['addr', 'joined'])
sub = Subscriber('stoneepigraph@163.com', '2018-01-01')
sub.addr
# stoneepigraph@163.com
```

命名元组的 一个主要用途是将你的代码从下标操作中解脱出来。命名元组另一个用途就是作为字典的替代，因为字典存储需要更多的内存空间。但命名空间不能像字典那样可修改。如果你真的需要改变属性，那么你可以使用命名元组实例的_replace()方法。


### 转换并同时计算数据 {#转换并同时计算数据}

你如果需要在数据序列上执行聚集函数（sum(), min(),
max()等），首先你需要先转换或者过滤数据。最好的方法就是使用一个生成器表达式参数。

```python
nums = [1,2,3,4,5]
s = sum(x * x for x in nums)
```


### 合并多个字典或映射 {#合并多个字典或映射}

使用collections模块中的ChainMap类。

```python
from collections import ChainMap
c = ChainMap(a, b)
print(c['key'])
```

一个ChainMap接受多个字典并将它们在逻辑上变为一个字典。如果出现重复键，那么第一次出现的映射会被返回。
p## 字符串和文本


### 使用多个界定符分割字符串 {#使用多个界定符分割字符串}

string的split()方法只适应于非常简单的单分隔符。当你需要更加灵活的切割字符串时最好使用re.split(r'')


### 字符串开头或结尾匹配 {#字符串开头或结尾匹配}

str.startswith()或者是str.endswith()方法如果你想检查多种匹配可能，只需要将所有的匹配项放入到一个元组中去，然后传给startswith或endswith.
也可以使用字符串切片来处理。更可以使用正则表达式实现。


#### 用Shell通配符匹配字符串 {#用shell通配符匹配字符串}

fnmatch模块提供了两个函数：fnmatch()和fnmatchcase()


### 字符串匹配搜索 {#字符串匹配搜索}

使用正则表达式。re.match()， re.findall()


### 字符串搜索和替换 {#字符串搜索和替换}

对于简单的字面模式，直接使用str.replace()方法即可。对于复杂的模式，需要使用re模块中的sub()函数。

```python
import re
re.sub(r'old', r'new', str)
```

```python
import re
# 预编译正则提升性能
datepat = re.compile(r'(\d+)/(\d+)/(\d+)')
datepat.sub(r'\3-\1-\2', str)
```

对于更复杂的替换，可以传递一个替换回调函数来代替

```python
from calendar import month_abbr
def change_date(m):
    mon_name = month_abbr[int(m.group(1))]
    return "{} {} {}".format(m.group(2), mon_name, m.group(3))
datepat.sub(change_date, str)
```

如果替换后的结果外，你还想知道有多少替换发生了，可以使用re.subn()来代替。

```python
newtest, n = datepat.subn(r'\3-\1-\2', str)
# newtest：新字符串，n：替换次数
```


### 字符串忽略大小写的搜索替换 {#字符串忽略大小写的搜索替换}

在使用re模块的时候给这些操作提供re.IGNORECASE标志参数。

```python
re.findall('python', 'java', flags=re.IGNORECASE)
```


### 最短匹配模式 {#最短匹配模式}

在模式中的\*/+操作符后面加上?修饰符。即使匹配变成 非贪婪模式。


### 多行匹配模式 {#多行匹配模式}

re.compile()函数接受一个标志参数叫re.DOTALL,它可以让正则表达式中的(.)匹配包括换行符在内的任意字符。

```python
comment = re.compile(r'/\*(.*?)\*/', re.DOTALL)
comment.findall(str)
```


### 删除字符串中不需要的字符 {#删除字符串中不需要的字符}

strip(['xxx'])
lstrip('')
rstrip('')


### 审查清理文本字符串 {#审查清理文本字符串}

str.translate()


### 字符串对齐 {#字符串对齐}

ljust()
rjust()
center()
format()


### 合并拼接字符串 {#合并拼接字符串}

如果想合并的字符串是在一个序列或者iterable中，那么最快的方式就是使用join()方法。简单的合并几个字符串可以直接使用加号 。


### 字符串中插入变量 {#字符串中插入变量}

可以使用format方法。


### 以指定列宽格式化字符串 {#以指定列宽格式化字符串}

使用textwrap模块来格式化字符串的输出。

> textwrap.fill(str, num)

-   获取终端的大小
    ```python
    import os
    os.get_terminal_size().columns
    ```


### 在字符串中处理html和xml {#在字符串中处理html和xml}

html.escape()可以很容易的将html或xml中的&lt;、&gt;、&amp;做转换成&gt;....


### 字符串令牌解析 {#字符串令牌解析}

使用正则表达式做匹配。


### 实现一个简单递归下降分析器 {#实现一个简单递归下降分析器}

。。。没看懂


### 字节字符串上的字符串操作 {#字节字符串上的字符串操作}


## 数字日期和时间 {#数字日期和时间}


## 数字的四舍五入 {#数字的四舍五入}

对于简单的传入 运算，使用内置的round(value, ndigits)函数即可。对一个值刚好在两个边界的中间的时候，round函数返回离它最近的偶数。


### 执行精确的浮点数运算 {#执行精确的浮点数运算}

使用decimal模块

```python
a = decimal('4.2')
b = decimal('2.1')
a + b
```


### 数字的格式化输出 {#数字的格式化输出}

可以使用内置的format()函数。


### 二八十六进制整数 {#二八十六进制整数}

bin()
oct()
hex()
如果不想显示前缀的话，可以使用format()函数。


### 字节到大整数的打包与解包 {#字节到大整数的打包与解包}

？？？


### 复数的数学运算 {#复数的数学运算}

复数可以使用函数complex(real, imag)或者是带有后缀j的浮点数来指定。

```python
a = complex(2,4)
b = 3 - 5j
```

所有觉的数学运算都可以对复数运算。


### 无穷大与NaN {#无穷大与nan}

可以使用float()来创建。

```python
a = float('inf')
b = float('-inf')
c = float('nan')
```


### 分数运算 {#分数运算}

fractions模块可以被用来执行包含分数的数学运算。

```python
from fractions import Fraction
a = Fraction(5,4)
b = Fraction(7, 16)
a + b
```


### 大型数组运算 {#大型数组运算}

涉及到数组的重量级运算操作，可以使用NumPy库。


### 矩阵与线性代数运算 {#矩阵与线性代数运算}

NumPy


### 随机选择 {#随机选择}

random模块有大量的函数用来产生随机数和随机选择元素。
random.choice(list)随机选择一个
random.sample(list, num)随机选择num个
random.shuffle(list)打乱顺序
random.random()： 生成0-1范围内均匀分布的浮点数。
random.getrandbits(num): 获取N位随机位（二进制）的整数。


### 基本的日期与时间转换 {#基本的日期与时间转换}

为了执行不同的时间单位 的转换和计算，请使用datetime模块。比如，为了表示一个时间段，可以创建一个timedelta实例。对于大多数基本的日期和时间处理问题，datetime模块足够了。如果你需要执行更加复杂的日期的操作，比如处理时区，节假日计算等，可以考虑dateutil模块。


### 字符串转换为日期 {#字符串转换为日期}

datetime.strptime(str, partition)


## 迭代器与生成器 {#迭代器与生成器}


### 手动遍历迭代器 {#手动遍历迭代器}

e.g.

```python
def manual_iter():
    with open('/etc/passwd') as f:
        try:
            while True:
                line = nex(f)
                print(lie, end='')
        except StopIteration:
            pass
```


### 代理迭代 {#代理迭代}

你构建了一个自定义容器对象，里面包含有列表、元组或其他可迭代对象。你想直接在你的这个新容器对象上执行迭代操作。
e.g.

```python
class Node:
    def __init__(self, value):
        self._value = value
        self._children = []

    def __repr__(self):
        return "Node({!r})" .format(self._value)

    def add_child(self, node):
        self._children.append(node)

    def __iter__(self):
        return iter(self._children)
```


### 使用生成器创建新的迭代模式 {#使用生成器创建新的迭代模式}

如果你想实现 一种新的rwwasaa,wget一个生成器函数来定义它。下面是一个生产某个范围内浮点数的生成器：

```python
def frange(start, stop, increment):
    x = start
    while x < stop：
    yield x
    x += increment
```

\*\*一个函数只需要有一个yield语句即可将其转换为一个生成器。跟普通函数不同的是，生成器只能用于迭代操作。


### 反向迭代 {#反向迭代}

使用内置的reversed()函数。反向迭代公公当对象的大小可预先确定或者对象实现了_/reversed_/()函数的特殊方法时才能生效。如果两者都不符合，那么你必须先将对象转换成一个列表才行。


### 排列组合的迭代 {#排列组合的迭代}

itertools模块提供了三个函数来解决这个问题。
itertools.permutations(items,
num):它接受一个集合并产生一个元组序列，每个元组由集合中所有元素的一个可能排列组成。items为预集合，num为生成的元组的长度。
itertools.combinations(items, num): 可得到输入集合的所有的组合 。
itertools.combinations.with_replacement(): 允许同一个元素被选择多次。


### 序列上索引值迭代 {#序列上索引值迭代}

内置的enumerate()函数可以很好的解决。

```python
list = ['a', 'b', 'c']
start_num = 0
for idx, val in enumerate(list, start_num):
    print(idx, val)

   ...
0 a
1 b
2 c
```


### 同时迭代多个序列 {#同时迭代多个序列}

使用zip()函数
zip(a, b)会生成一个可返回元组(x, y)的迭代器，其中x来自a，y来自b。


### 不同集合上元素的迭代 {#不同集合上元素的迭代}

如果想对不同容器中的对象执行同样操作。在代码不失可读性的情况下避免写重复的循环。

```python
from itertools import chain
a = [1,2,3,4,5]
b = ['x', 'y', 'z']
for x in chain(a, b):
    print(x)
```


### 创建数据处理管道 {#创建数据处理管道}

？？？


### 展开嵌套的序列 {#展开嵌套的序列}

可以写一个包含yield from 语句的递归生成器业轻松解决。

```python
from collections import Iterable
def flatten(items, ignore_types=(str, bytes)):
    for x in items:
        if isinstance(x, Iterable) and not isinstance(x, ignore_types):
            yield from flatten(x)
        else:
            yield x

items = [1,2,[3,4,[5,6],7],8]
for x in flatten(items):
    print(x)
```


### 顺序迭代合并后的排序迭代对象 {#顺序迭代合并后的排序迭代对象}

heapq.merge()

```python
import heapq
a = [1,2,4,5]
b = [3,6,7,8]
for c in heapq.merge(a,b):
    print(c)
```

强调：heapq.merge()需要所有输入序列那也得是排过序的。


### 迭代器代替while无限循环 {#迭代器代替while无限循环}

```python
import sys
f = open('/etc/passwd')
for chunk in iter(lambda: f.read(10), ''):
    n = sys.stdout.write(chunk)
```


## 文件与IO {#文件与io}


### 读写文本数据 {#读写文本数据}

使用系统自带的open()函数读取文件。

```python
with open('somefile.txt', 'rt') as f:
    data = f.read()

with open('sonefile.txt', 'rt'):
    for line in f:
        print(line)

with open('somefile.txt', 'wt') as f:
    f.write(text1)

```

读取文本文件使用rt模式，写入文件使用wt模式，追加文件使用at


### 打印输出至文件中 {#打印输出至文件中}

在print()函数中指定file关键字参数，可以输出到文件。

```python
with open('/usr/local/temp.txt', 'wt') as f:
    print('Hello World!', file=f, sep=',', end='\n')
```


### 读写字节数据 {#读写字节数据}

使用模式为rb或wb的open()函数可以来读取或写入二进制数据。

```python
with open('somefile.bin', 'rb') as f:
    data = f.read(16)
    text = data.decode('utf-8')

with open('somefile.bin', 'wb') as f:
    text = 'Hello World'
    f.write(text.encode('utf-8'))
```

二进制I/O有一个特性就是数组和C结构体类型能直接被写入，而不需要中间转换为自己的对象。

```python
import array
nums = array.array('i', [1,2,3,4])
with open('data.bin', 'wb') as f:
    f.write(nums)
a = array.array('i', [0,0,0,0,0,0,0])
with open('data.bin', 'rb') as f:
    f.readinto(a)
```


### 文件不存在时才能写入 {#文件不存在时才能写入}

可以在open()函数中使用x模式来代替w模式的方法来解决。


### 字符串的I/O操作 {#字符串的io操作}

使用io.StringIO()和io.BytesIO()类来创建类文件对象操作字符串数据。


### 读写压缩文件 {#读写压缩文件}

可以使用gzip和bz2模块处理这些文件

```python
import gzip
import bz2
with gzip.open('somefile.gz', 'rt') as f:
    text = f.read()

with bz2.open('somefile.bz2', 'rt') as f:
    text = f.read()

with gzip.open('somefile.gz'. 'wt') as f:
    f.write(text)

with bz2.open('somefile.bz2', 'wt') as f:
    f.write(text)
```

gzip和bz2的open函数跟内置的函数一样包括encoding, errors,
newline等可选参数。


### 固定大小记录的文件迭代 {#固定大小记录的文件迭代}

```python
from functools import partial
RECORD_SIZE = 32
with open('somefile.data', 'rb') as f:
    records = iter(partial(f.read, RECORD_SIZE), b'')
    for r in record:
        ...
```


### 读取二进制数据到可变缓冲区 {#读取二进制数据到可变缓冲区}

```python
import os.path
def read_into_buffer(filename):
    buf = bytearray(os.path.getsize(filename))
    with open(filename, 'rb') as f:
        f.readinto(buf)
    return buf
```


### 内存映射的二进制文件 {#内存映射的二进制文件}

使用mmap模块


### 文件路径名的操作 {#文件路径名的操作}

使用os.path模块中的函数来操作路径名。


### 测试文件是否存在等 {#测试文件是否存在等}

```python
# 测试文件是否存在
os.path.exists(filename)
# 测试文件是否是一个文件
os.path.isfile(filename)
# 测试文件是否是一个目录
os.path.isdir(filename)
# 测试文件是否是一个链接文件
os.apth.islink(filename)
# 获取文件的大小
os.path.getsize(filename)
# 获取文件的修改时间
os.path.getmtime(filename)
```

使用os.path需要考虑文件的权限问题


### 获取文件夹中的文件列表 {#获取文件夹中的文件列表}

使用os.listdir()函数来获取某个目录中的文件列表

```python
import os
names = os.listdir(dirname)
# 获取所有的py文件
pyfiles = [name for name in os.listdir(dirname)
            if name.endswith('.py')]
# 使用glob或fnmatch模块获取所有py文件
import glob
pyfiles = glob.glob('dirname/*.py')
from fnmatch import fnmatch
pyfile = [name for name in os.listdir(dirname)
            if fnmatch(name, '*.py')]
```


### 忽略文件名编码 {#忽略文件名编码}

默认情况下，所有的文件名都会根据sys.getfilesystemencoding()返回的文本编码来编码或解码。如果因为某种原因你想忽略这种编码，可以使用一个原始字节字符串来指定一个文件名即可。


### 打印不合法文件名 {#打印不合法文件名}

```python
def bad_filename(filename):
    return repr(filename)[1:-1]
try:
    print(filename)
except UnicodeEncodeError:
    print(bad_filename(filename))
```


### 增加或改变已打开文件的编码 {#增加或改变已打开文件的编码}

如果你想修改一个已经打开的文本模式的文件的编码方式，可以先使用detch()方法移除掉已存在的文本的编码层，并使用新的编码方式代替

```python
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='latin-1')
```

I/O系统以层级结构的形式萏而成。文本文件是通过在一个拥有缓冲的二进制模式文件上增加一个Unicode编码/解码层来创建。Buffer属性指向对应的底层文件。如果你直接访问它的话会绕过文本编码/解码层。


### 将文件描述 符包装成文件对象 {#将文件描述-符包装成文件对象}

一个文件描述符和一个打开的普通文件是不一样的。文件描述符仅仅是一个由操作系统指定的整数，用来指代某个系统的I/O通道。如果你碰巧有这么一个文件描述符，你可以通过使用open()函数来将其包装为一个Python的文件对象。
e.g.

```python
import os
fd = os.open('somefile.txt', os.O_WRONLY | os.O_CREATE)
f = open(fd, 'wt')
f.write('hello world')
f.close()
```

当高层的文件对象被关闭或者破坏的时候，底层的文件描述符也会被关闭。


### 创建临时文件和文件夹 {#创建临时文件和文件夹}

tempfile模块中有很多的函数可以完成这个任务

```python
from tempfile import TemporaryFile
with TemporaryFile('w+t') as f:
    ...
```

TemporaryFile另外还支持跟内置的open()函数一样的参数。在大多数Unix系统上。通过TemporaryFile()创建的文件都是匿名的。文件关闭的时候就会自动删除文件。
tempfile.TemporaryDirectory()可以创建临时目录


### 与串行端口的数据通信 {#与串行端口的数据通信}

典型的场景就是和一些硬件设备打交道。尽管可以使用Python内置的I/O模块来完成。但对于串行通信最好的选择是使用pySerial包。

```python
import serial
ser = serial.Serial('/dev/tty.usbmodem641',
                   baudrate=9600,
                   bytesize=8,
                   parity='N',
                   stopbits=1)
```

一旦端口打开，就可以使用read(), readline()，write()函数读写数据了。


### 序列化Python对象 {#序列化python对象}

对于序列化最普遍做法就是使用pickle模块。

```python
import pickle
data = ..
f = open('somefile', 'wb')
pickle.dump(data, f)
```

为了将一个对象转储为字符串，可以使用pickle.dumps()
为了从字节流中恢复一个对象，使用pickle.load()或pickle.loads()函数。


## 数据编码和处理 {#数据编码和处理}


### 读写CSV文件 {#读写csv文件}

```python
import csv
with open('csv.csv') as f:
    f_csv = csv.read(f)
    # 读取头
    headers = nex(f_csv)
    for row in f_csv:
        # TODO Parse
```

```python
import csv
headers = [...]
rows = [(...),(...)]
with open('csv.csv', 'w') as f:
    f_csv = csv.writer(f)
    f_csv.writerow(headers)
    f_csv.writerows(rows)
```


### 读写JSON数据 {#读写json数据}

json模块的json.dumps和json.loads方法。可以使用pprint模块的pprint()函数来代替普通的print函数打印json.


### 解析简单的XML数据 {#解析简单的xml数据}

可以使用xml.etree.ElementTree模块从简单的XML文档中提取数据。

```python
from xml.etree.ElementTree import parse
```

xml.etree.ElementTree.parse()函数解析整个XML文档并将其转换成一个文档对象。然后就可以使用find(),
iterfind()和findtext()等方法来搜索特定的XML元素。而且ElementTree模块中的每个元素有一些重要的属性和方法。


### 增量式解析大型XML文件 {#增量式解析大型xml文件}

e.g.

```python
from xml.etree.ElementTree import iterparse
def parse_and_remove(filename, path):
    path_parts = path.split('/')
    doc = iterparse(filename, ('start', 'end'))
    # Skip the root element
    next(doc)

    tag_stack = []
    elem_stack = []
    for event, elem in doc:
        if event == 'start':
            tag_stack.append(elem.tag)
            elem_stack.append(elem)
        elif event == 'end':
            if tag_stack == path_parts:
                yield elem
                elem_stack[-2].remove(elem)
            try:
                tag_stack.pop()
                elem_stack.pop()
            except IndexError:
                pass


from collections import Counter
potholes_by_zip = Counter()
data = parse_and_remove('potholes.xml', 'row/row')
for pothole in data:
    potholes_by_zip[pothole.findtext('zip')] += 1
for zipcode, num in potholes_by_zip.most_common():
    print(zipcode, num)

```


### 将字典转换成XML {#将字典转换成xml}

```python
from xml.etree.ElementTree import Element
def dict_to_xml(tag, d):
    elem = Element(tag)
    for key , val in d.items():
        child = Element(key)
        child.next = str(val)
        elem.append(child)
    return elem
```

如果你想给某个元素添加属性值，可以使用set()方法。如果值的字符串中含有特殊字符，可以使用xml.sax.saxutils中的escape()和unescape()函数。


### 解析和修改XML {#解析和修改xml}

使用xml.etree.ElementTree import parse,Element


### 利用命名空间解析 XML文档 {#利用命名空间解析-xml文档}

。。。


### 与关系型数据库的交互 {#与关系型数据库的交互}

。。。


### 编码和解码十六进制数 {#编码和解码十六进制数}

可以使用binascii.b2a_hex(str)或者base64.b16encode(s)


### 编码解码Base64数据 {#编码解码base64数据}

使用base64模块中的两个函数b64encode() 和 b64decode()。
Base64编码仅仅用于面向字节的数据比如字节字符串和字节数组。此外，编码处理的输出结果总是一个字节字符串。如果你想混合使用Base64编码的数据和Unicode文本，你必须添加一个额外的解码步骤。

```python
a = base64.b64encode(str).decode('ascii')
```

当解码Base64的时候，字节字符串和Unicode文本都可以作为参数。但Unicode字符串只能包含ASCII字符。


### 读写二进制数组数据 {#读写二进制数组数据}

可以使用struct模块处理二进制数据。。。。


### 读取嵌套和可变长二进制数据 {#读取嵌套和可变长二进制数据}

。。。


### 数据的累加与统计操作 {#数据的累加与统计操作}

对于任何涉及到统计，时间序列以及其他相关技术的数据分析问题，都可以考虑使用Pandas库。


## 函数 {#函数}


### 可接受任意数量参数的函数 {#可接受任意数量参数的函数}

e.g.

```python
def avg(first, *other)：
    pass
def kwargs(first, second, **kwargs):
    pass
```


### 只接受关键字参数的函数 {#只接受关键字参数的函数}

将强制关键字参数放到某个/参数或者单个/后面就可以

```python
def recv(maxsize, *, block):
    pass
```


### 给函数参数增加元信息 {#给函数参数增加元信息}

```python
def add(x:int, y:int) -> int:
    return x + y
```


### 返回多个值的函数 {#返回多个值的函数}

```python
def myfun():
    return 1,2,3
```

实际上是返回了一个元组。


### 定义有默认参数的函数 {#定义有默认参数的函数}

```python
def spam(a, b = 42):
    pass
```

首先，默认参数的值仅仅在函数定义的时候赋值一次。其次，默认参数的值应该是不可变的对象。


### 定义匿名或内联函数 {#定义匿名或内联函数}

使用lambda表达式来替代。


### 匿名函数捕获变量值 {#匿名函数捕获变量值}

lambda表达式中的变量是一个自由变量，在运行时绑定值，而不是定义时绑定。


### 减少可调用对象 的参数个数 {#减少可调用对象-的参数个数}

使用functools.partial()将参数固定并返回一个新的可调用 函数

```python
def spam(a,b,c,d)：
    print(a,b,c,d)

from functools import partial
s1 = partial(spam,1)
s1(2,3,4)
> 1,2,3,4
```


### 将单方法类转换为函数 {#将单方法类转换为函数}

```python
def urltemplate(template):
    def opener(**kwargs):
        return urlopen(template.format_map(kwargs))
    return opener
```


### 带额外状态信息的回调函数 {#带额外状态信息的回调函数}

pass


### 内联回调函数 {#内联回调函数}

pass


### 访问闭包中的变量 {#访问闭包中的变量}

pass


## 类与对象 {#类与对象}


### 改变对象的字符串显示 {#改变对象的字符串显示}

要改变一个实例的字符串表示，可重新定义 它的\__str__() 和\__repr__()方法


### 自定义字符串的格式化 {#自定义字符串的格式化}

为了自定义字符串的格式化，我们需要在类上面定义一个_/format_/()方法。

```python
clsas Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    def __format__(self, code):
        if code == '':
            code = 'ymd'
        fmt = _formats[code]
        return fmt.format(d = self)
```


### 让对象支持上下文协议 {#让对象支持上下文协议}

使用with语句为了让一个对象兼容with语句，你需要实现\__enter__()和\__exit__()方法。


### 创建大量对象时节省内存方法 {#创建大量对象时节省内存方法}

可以通过给类添加\__slots__属性来减少实例所占的内存。Python就会为实例使用一种更加紧凑的内部表示。通过一个很小的固定大小的数组来构建，而不是为每个实例定义一个字典。


### 在类中封装属性名 {#在类中封装属性名}

Python程序员不去依赖语言特性去封装数据，而是通过遵循一定的属性和方法命名规约来达到这个效果。

1.  任何以单下划线开头的名字都应该是内部实现。
2.  使用双下划线开始会导致访问名称变成其他形式。这种属性通过继承是无法被覆盖的。


### 创建可管理的属性 {#创建可管理的属性}

自定义某个属性的一种简单方法是将它定义为一个property.
e.g.

```python
class Person:
    def __init__(self, first_name):
        self.first_name = first_name

    @property
    def first_name(self):
        return self.first_name

    @first_name.setter
    def first_name(self, value):
        if not isinstance(value, str):
            raise TypeError('Expected a string')
        self._first_name = value

    @first_name.deleter
    def first_name(self):
        raise AttributeError("Can't delete attribute" )
```

property的一个关键特征是它看上去跟普通的attribute没什么两样，但是访问它的时候会自动触发getter，setter和deleter方法。


### 调用父类方法 {#调用父类方法}

为了调用父类的一个方法，可以使用super()函数。


### 子类中扩展property {#子类中扩展property}

因为一个property是getter，setter和deleter方法的集合，而不是单个方法。因此，扩展一个property的时候，你需要先确定你是否要重新定义所有的方法还是说只修改其中的某一个。


### 创建亲的类或实例属性 {#创建亲的类或实例属性}

可以通过一个描述器类的形式来定义 它的功能 。一个描述器就是一个实现了三个核心属性访问操作（get, set, delete)的类。分别为\__get__(),
__set__(), __delete__().
。。。


### 使用延迟计算属性 {#使用延迟计算属性}

。。。


### 简化数据结构的初始化 {#简化数据结构的初始化}

。。。


### 定义接口或者抽象基类 {#定义接口或者抽象基类}

使用abc模块可以很轻松的定义抽象基类抽象类的一个特点是它不能直接被实例化，得让别的类继承并实现特定的抽象方法。主要用途是在代码中检查类是否为特定类型。


### 实现数据模型的类型约束 {#实现数据模型的类型约束}

。。。


### 实现自定义容器 {#实现自定义容器}

collections定义了很多抽象类。比如你想让你的类支持迭代，那就让你的类继承collections.Iterable即可。


### 属性的代理访问 {#属性的代理访问}

。。。


### 在类中定义多个构造器 {#在类中定义多个构造器}

你想实现一个类，除了使用\__init__()方法外，还有其他方式可以初始化它。你需要使用到类方法。


### 创建不调用init方法的补全 {#创建不调用init方法的补全}

可以通过\__new__()方法创建一个未初始化的实例。


### 利用Mixins扩展类功能 {#利用mixins扩展类功能}

。。。


### 实现状态对象 或者状态机 {#实现状态对象-或者状态机}

将每个状态抽取出来定义成一个类。


### 通过字符串调用对象方法 {#通过字符串调用对象方法}

使用operator.methodcaller。


### 实现访问者模式 {#实现访问者模式}

。。。


### 不使用递归实现访问者模式 {#不使用递归实现访问者模式}

。。。


### 循环引用数据结构的内存管理 {#循环引用数据结构的内存管理}

可以考虑使用weakref库中的弱引用


### 让类支持比较操作 {#让类支持比较操作}

Python类对每个比较操作都需要实现一个特殊方法来支持，例如为了支持&gt;=操作符，你需要定义一个\__ge__()方法。装饰器functools.total_ordering可以简化这个处理。使用它来装饰一个类，你只需要定义一个\__eq__()方法，外加其他方法（lt,
le, gt, or ge）中的一个即可。然后装饰器会自动为你填充其它比较方法。


### 创建缓存实例 {#创建缓存实例}

通常是因为你希望相同参数创建的对象时是单例的。为了达到这样的效果，你需要使用一个和类本身分开的工厂函数。
e.g.

```python
class Spam:
    def __init__(self, name):
        self.name = name

import weakref
_spam_cache = weakref.WeakValueDictionary()
def get_spam(name):
    if name not in _spam_cache:
        s = Spam(name)
        _spam_cache[name] = s
    else:
        s = _spam_cache[name]
    return s
```


## 元编程 {#元编程}


### 在函数上添加包装器 {#在函数上添加包装器}

如果你想使用额外的代码包装一个函数，可以定义一个装饰器函数。
e.g.

```python
import time
from functools import wraps
def timethis(func):
    '''
    Decorator that reports the execution time.
    '''
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(func.__name__, end-start)
        return result
    return wrapper
```

```python
@timethis
def countdown(n):
    '''
    Counts down
    '''
    while n > 0:
        n -= 1

```

一个装饰器就是一个函数，它接受一个函数作为参数并返回一个新的函数。


### 创建装饰器时保留函数元信息 {#创建装饰器时保留函数元信息}

任何时间你定义装饰器的时候，都应该使用functools的@wraps装饰器来注解底层包装函数。


### 解除一个装饰器 {#解除一个装饰器}

假设装饰器是通过@wraps来实现的，那么你可以通过访问\__wrapped__属性来访问原始函数。


### 定义一个带参数的装饰器 {#定义一个带参数的装饰器}

e.g.

```python
from functools import wraps
import logging
def logged(level, name=None, message=None):
    '''
    Add logging to a function. level is the logging level,
    name is the logger name, and message is the log message.
    If name and message aren't specified, they default to the
    function's module and name
    '''
    def decorate(func):
        logname = name if name else func.__module__
        log = logging.getLogger(logname)
        logmsg = message if message else func.__name__

        @wraps(func)
        def wrapper(*args, **kwargs):
            log.log(level, logmsg)
            return func(*args, **kwargs)
        return wrapper
    return decorate
@logged(logging.DEBUG)
def add(x,y):
    return x + y
@logged(loogging.CRITICSL, 'example')
def spam():
    print('Spam!!!')
```


### 自定义属性的装饰器 {#自定义属性的装饰器}

。。。


### 利用装饰器强制函数上的类型检查 {#利用装饰器强制函数上的类型检查}

e.g. 作为编程规约，你想在对函数参数进行强制类型检查

```python
@typeassert(int, int)
def add(x, y):
    return x + y
```

```python
from inspect import signature
from funtools import wraps
def typeassert(*ty_args, **ty_kwargs):
    def decorate(func):
        # If in optimized mode, disable type checking
        if not __debug__:
            return func

        # Map function argument names to supplied types 它运行你提取一个可调用对象的参数签名信息。
        sig =signature(func)
        bound_types = sig.bind_partial(*ty_args, **ty_kwargs).arguments

        @wraps(func)
        def wrapper(*args, **wargs):
            bound_values = sig.bind(*args, **kwargs)
            # Enforce type assertions across supplied arguments
            for name, value in bound_values.arguments.items():
                if name in bound_types:
                    if not isinstance(value, bound_types[name]):
                        raise TypeError(
                        'Argument {} must be {}'.format(name, bound_types[name])
                        )

            return func(*args, **kwargs)
        return wrapper
    return decorate
```


### 将装饰器定义为类的一部分 {#将装饰器定义为类的一部分}

你想在类中定义装饰器，并将其作用在其他函数或方法上


### 将装饰器定义为类 {#将装饰器定义为类}

为了将装饰器定义成一个实例，你需要确保它实现了\__call\__（）和\__get\__（）方法。
e.g.

```python
import types
from tunctools import wraps
class Profiled:
    def __init__(self, func):
        wraps(func)(self)
        self.ncalls = 0

    def __call__(self, *args, **kwargs):
        self.ncalls += 1
        return self.__wrapped__(*args, **kwargs)

    def __get__(self, instance, cls):
        if instance is None:
            return self
        else:
            return types.MethodType(self, instance)
```

。。。


### 为类和静态方法提供装饰器 {#为类和静态方法提供装饰器}

给类或静态方法提供装饰器是很简单的，不过要确保装饰器在@classmethod或?? (????)。


### 装饰器为被包装函数增加参数 {#装饰器为被包装函数增加参数}

。。。


### 使用装饰器扩充类的功能 {#使用装饰器扩充类的功能}

。。。


### 使用元类控制实例的创建 {#使用元类控制实例的创建}

。。。


### 捕获类的属性定义顺序 {#捕获类的属性定义顺序}

。。。


### 定义有可选参数的元类 {#定义有可选参数的元类}

。。。


### \*args和\*\*kwargs的强制参数签名 {#args和kwargs的强制参数签名}

对任何涉及到操作函数调用签名的问题，你都应该使用inspect模块中的签名特性。我们最主要关注两个类：Signature和Parameter.


### 在类上强制使用编程规约 {#在类上强制使用编程规约}

如果你想监控类的定义，通常可以通过定义一个元类，一个基本元类通常是继承自type并重定义它的\__new__()方法或是\__init__()方法。为了使用这个元类，你通常要将它放到一个顶级父类定义中，然后其他的类继承这个顶级父类。


### 以编程方式定义类 {#以编程方式定义类}

。。。


### 在定义的时候初始化类的成员 {#在定义的时候初始化类的成员}

。。。


### 利用函数注解实现方法重载 {#利用函数注解实现方法重载}

。。。


### 避免重复的属性方法 {#避免重复的属性方法}

。。。


### 定义上下文管理器的简单方法 {#定义上下文管理器的简单方法}

实现一个新的上下文管理器的最简单的方法就是使用contextlib模块中的@contextmanager装饰器。。。。


### 在局部变量域中执行代码 {#在局部变量域中执行代码}

。。。


### 解析与分析Python源码 {#解析与分析python源码}

。。。


### 拆解Python字节码 {#拆解python字节码}

dis模块可以被用来输出任何Python函数反编译结果。如果你想自己解释dis出的代码，你需要使用一些在opcode模块中定义 的常量。。。。


## 模块与包 {#模块与包}


### 构建一个模块的层级包 {#构建一个模块的层级包}

在文件系统上组织你的代码，并确保每个目录都定义了一个\__init__.py文件。


### 控制模块被全部导入的内容 {#控制模块被全部导入的内容}

在模块或包中添加： <span class="underline"><span class="underline">all</span></span> =
[''，''，''...]，在使用import\*时只会导入列表里的列举的内容。如果\__all__包含未定义的名字，在导入时将引起AttributeError.


### 使用相对路径 名导入包中子模块 {#使用相对路径-名导入包中子模块}

e.g.

```python
from . import source
from ..B import source
```


### 将模块分割成多个文件 {#将模块分割成多个文件}

原: mymodule.py文件

```python
class A:
    def spam(self):
        print("A spam")
class B(A):
    def bar(self):
        print('B spam')

```

假设你想mymodule.py分为两个文件，每个文件定义一个类。你需要用mymodule目录来替换文件mymodule.py。在这个目录下创建\__init\__。py,
a.py和b.py三个文件。在a.py中插入a类的代码，在b.py中插入b类的代码。然后在\__init__.py中插入如下代码

```python
from .a import A
from .b import B
```

对于一个很大的模块，还需要做延迟导入。那么\__init__.py将做如下修改

```python
def A():
    from .a import A
    return A()
def B():
    from .b import B
    return B()
```

延迟加载的主要缺点是继承和类型检查可能会中断。


### 利用命名空间导入目录分散的代码 {#利用命名空间导入目录分散的代码}

。。。


### 重新加载模块 {#重新加载模块}

使用imp.reload(模块名)来重新加载先前加载的模块。


### 运行目录或压缩文件 {#运行目录或压缩文件}

您有一个涉及多个文件的应用程序。你想有一些简单的方法让用户运行程序。你可以把你的应用程序放进它自己的目录并添加一个\__main__.py文件。
e.g.

```sh
myapplication/
    spam.py
    bar.py
    grok.py
    __main__.py
```

如果\__main__.py存在，你可以简单地在顶级目录运行Python解释器

```sh
bash $ python myapplication
```

解释器将执行\__main__.py文件作为主程序。如果你将你的代码打包成zip文件，这种技术同样也适用。


### 读取位于包中的数据文件 {#读取位于包中的数据文件}

```sh
mypackage/
    __init__.py
    somedata.dat
    spam.py
```

假设spam.py文件需要读取somedata.dat文件中的内容。

```python
import pkgutil
data = pkgutil.get_data(__package__, 'somedata.dat')
```

由此产生的变量是包含请该文件的原始内容的字节字符串。


### 将文件夹加入到sys.path {#将文件夹加入到sys.path}

写代码手动调节sys.path的值

```python
import sys
from os.path import abspath, join, dirname
sys.path.insert(0, abspath(dirname('__file__'), 'src'))
```


### 通过字符串名导入模块 {#通过字符串名导入模块}

使用importlib.import_module()函数

```python
import import lib
math = importlib.import_module('math')
math.sin(2)
```


### 通过钩子远程加载模块 {#通过钩子远程加载模块}

。。。


### 导入模块的同时修改模块 {#导入模块的同时修改模块}

。。。


### 安装私有的包 {#安装私有的包}

```sh
python setup.py install --user
or
pip install --user packagename
```


### 创建新的Python环境 {#创建新的python环境}

可以使用pyvenv...


### 分发包 {#分发包}

第一件是就是给它一个唯一的名字，并且清理它的目录结构。一个典型的函数库包会类似下面这样：

```sh
projectname/
    README.txt
    Doc/
        documentation.txt
    projectname/
        __init__.py
        foo.py
        bar.py
        utils/
            __init__.py
            spam.py
            grok.py
    examples/
        helloword.py
        ...

```

要让你的包可以发布出去，首先你要编写一个setup.py。如：

```python
from distutils.core import setup
setup(name='projectname',
     version='1.0',
     author='your name',
     author_email='your email',
     url='your url',
     packages=['projectname', 'projectname.utils'],
)
```

下一步，就是创建一个MANIFEST.in文件，列出所有在你包中需要包含进来的非源码文件。

```sh
include *.txt
recursive-include examples *
recursive-include Doc *
```

确保setup.py和MAINIFEST.in文件放在你的包的最顶级目录中。一旦你已经做了这此地，你就可以像下面这样执行命令来创建一个源码分发包了：

```sh
bash $ python setup.py sdist
```

它会创建一个文件比如“projectname-1.0.zip”或“projectname-1.0.tar.gz”.


## 网络与WEB编程 {#网络与web编程}


### 作为客户端与HTTP服务交互 {#作为客户端与http服务交互}

对于简单的事情来说，通常使用urllib.request模块就够了。
e.g.

```python
from urllib import request, parse
url = 'https://www.baidu.com'
params = {
    "search": "123"
}
querystring = parse.urlencode(params)
u = request.urlopen(url + "?" + querystring)
resp = u.read()
```

如果你需要使用POST方法在请求主体中发送查询参数，可以将参数编码后作为可选参数提供给urlopen()函数。

```python
from urllib import request, parse
url = 'http://httpbin.org/post'
params = {
    'name1': 'value1',
    'name2': 'value2'
}
querystring = parse.urlencode(params)
u = request.urlopen(url, querystring.encode('ascii'))
resp = u.read()
```

如果你需要在以出的请求中提供一些自定义的HTTP头，可以创建一个包含字段值的字典，并创建一个Request实例然后将其传给urlopen()。例：

```python
from urllib import request, parse
url = ""
headers = {
    'User-agent': 'none/ofyourbusiness',
    'Spam': 'Eggs'
}
params = {}
querystring = parse.urlencode(params)
req = request.Request(url, querystring.encode('ascii'), headers=headers)
u = request.urlopen(req)
resp = u.read()
```

如果需要更复杂的请求，那么可以使用request库


### 创建TCP服务器 {#创建tcp服务器}

创建一个TCP服务器的一个简单方法是使用socketserver库。
e.g.

```python
from socketserver import BaseRequestHandler, TCPServer
class EchoHandler(BaseRequestHandler):
    def handle(self):
        print('Got connection from ', self.client_address)
        while True:
            msg = self.request.recv(8192)
            if not msg:
                break
            self.request.send(msg)
if __name__ == '__main__':
    serv = TCPServer(('', 20000), EchoHandler)
    serv.serve_forever()
```

socketserver可以让我们很容易的创建简单的TCP服务器。但是，它默认是单线程的，如果你想处理多个客户端，可以初始化一个ForkingTCPServer或是ThreadTCPServer对象.如：

```python
from socketserver import ThreadingTCPServer
if __name__ == '__main__':
    serv = ThreadingTCPServer(('', 20000), EchoHandler)
    serv.serve_forever()
```

但是fork或线程服务器有个潜在问题就是它会为每个客户端连接创建一个新的进程或线程。由于客户端连接数是没有限制的，如果担心可以创建一个预先分配大小的工作线程池或进程池。例：

```python
if __name__ == '__main__':
    from threading import Thread
    NWORKERS = 16
    serv = TCPServer(('', 20000), EchoHandler)
    for n in range(NWORKERS):
        t = Thread(target=serv.serv_forever)
        t.daemon = True
        t.start()
    serv.serve_forever()
```


### 创建UDP服务器 {#创建udp服务器}

跟TCP一样，UDP服务器也可以通过使用socketserver库。


### 通过CIDR地址生成对应的IP地址集 {#通过cidr地址生成对应的ip地址集}

例CIDR网络地址： 123.45.67.64/27
转换成:123.45.67.64, 123.45.67.65....
可以使用ipaddress模块

```python
import ipaddress
net = ipaddress.ip_network('123.45.67.64/27')
for a in net:
    print(a)
```


### 创建一个简单的REST接口 {#创建一个简单的rest接口}

构建一个REST风格的接口最简单的方法是创建一个基于WSGI标准的很小的库。
e.g.

```python
import cgi
def notfound_404(environ, start_response):
    start_response('404 Not Found', [('Content-type', 'text/plain')])
    return [b'NotFound']
class PathDispatcher:
    def __init__(self):
        self.pathmap = {}

    def __call__(self, environ, start_response):
        path = environ['PATH_INFO']
        params = cgi.FieldStorage(environ['wsgi.input'],
                                 environ=environ)
        method = environ['REQUEST_METHOD'].lower()
        environ['params'] = {key: params.getvalue(key) for key in params}
        handler = self.pathmap.get((method, path), notfound_404)
        return handler(environ, start_response)

    def register(self, method, path, function):
        self.pathmap[method.lower(), path] = function
        return function
```


### 通过XML-RPC实现简单的远程调用 {#通过xml-rpc实现简单的远程调用}

。。。


### 在不同的Python解释器之间交互 {#在不同的python解释器之间交互}

通过使用multiprocessing.connection模块可以很容易的实现解释器之间的通信。


### 实现远程方法调用 {#实现远程方法调用}

将函数请求，参数和返回值使用pickle编码后，在不同的解释器直接传送pickle字节字符串，可以很容易的实现RPC.


### 简单的客户端认证 {#简单的客户端认证}

使用hmac模块。。。


### 在网络服务中加入SSL {#在网络服务中加入ssl}

ssl模块为底层socket连接添加SSL的支持。ssl.wrap.socket()函数接收一个已经存在的socket作为参数并使用SSL层来包装它。


### 进程间传递Socket文件描述符 {#进程间传递socket文件描述符}

。。。


### 理解事件驱动的IO {#理解事件驱动的io}

。。。


### 发送与接收大型数组 {#发送与接收大型数组}

。。。


## 并发编程 {#并发编程}


### 启动与停止线程 {#启动与停止线程}

```python
import time
def countdown(n):
    while n > 0:
        print('T-mins ', n)
        n -= 1
        time.sleep(5)
from threading import Thread
t = Thread(target = countdown, argn(10,))
t.start()
```

你可以查询一个线程对象的状态，看它是否还在执行

```python
if t.is_al1ive():
    print('Still running')
else:
    print('completed')
```

你也可以将一个线程加入到当前线程，并等待它终止

```python
t.join
```

对于需要长时间运行的线程或者需要一直运行的后台任务，你应当考虑使用后台线程。

```python
t = Thread(target=countdown, args=(10,), daemon=True)
t.start()
```

由于全局解释锁（GIL）的原因，Python的线程被限制到同一时刻只允许一个线程执行这样一个执行模型。所以，Python的线程更适合用物处理I/O和其他需要并发执行的阻塞操作（比如等待I/O、等待从数据库获取数据等等），而不是需要多处理器并行的计算密集型任务。


### 判断线程是否已经启动 {#判断线程是否已经启动}

我们需要使用threading库中的Event对象。Event对象包含一个可由线程设置的信号标志，它允许线程等待某些事件的发生。。。。


### 线程间通信 {#线程间通信}

从一个线程向另一个线程发送数据最安全的方式可能就是使用queue库中的队列了。创建一个被多个线程共享的Queue对象，这些线程通过使用put()和get()操作来向队列中添加或删除元素。
Queue对象已经包含了必要的锁，所以可以通过它在多个线程间安全地共享数据。


### 给关键部分加锁 {#给关键部分加锁}

需要使用threading库中的Lock对象。
e.g.

```python
import threading
class SharedCounter:
    def __init__(self, initial_value = 0):
        self._value = initial_value
        self._value_lock = threading.Lock()

    def incr(self, delta=1):
        with self._value_lock:
            self._value += delta

    def decr(self, delta=1):
        with self._value_lock:
            self._value -= delta
```


### 防止死锁的加锁机制 {#防止死锁的加锁机制}

可以为每个锁创建一个ID，然后只允许使用升序方式获取锁。可以利用上下文管理器实现。


### 保存线程的状态信息 {#保存线程的状态信息}

可以使用thread.local()创建一个本地线程存储对象。对这个对象的属性的保存读取操作都只会对执行线程可见，而其他线程并不可见。


### 创建一个线程池 {#创建一个线程池}

concurrent.futures函数库有一个ThreadPoolExecutor类可以被用来处理。

```python
from socket import AF_INET, SOCK_STREAM, socket
from concurrent.futures import ThreadPoolExecutor
def echo_client(sock, client_addr):
    print('Got connection from', client_addr)
    while True:
        msg = sock.recv(65536)
        if not msg:
            break
        sock.sendall(msg)
    print('Client closed connection')
    sock.close()

def echo_server(addr)：
    pool = ThreadPoolExecutor(128)
    sock = socket(AF_INET, SOCK_STREAM)
    sock.bind(addr)
    sock.listen(5)
    while True:
        client_sock, client_addr = sock.accept()
        pool.submit(echo_client, client_sock, client_addr)
echo_server(('', 15000))
```

如果你想手动创建自己的线程池，通常可以使用一个Queue。


### 简单的并行编程 {#简单的并行编程}

concurrent.futures库提供一个ProcessPoolExecutor类，可被用在一个单独的Python解释器中捃密集型函数。


### Python的全局锁问题 {#python的全局锁问题}

GIL
。。。


### 定义一个Actor任务 {#定义一个actor任务}

。。。


### 实现消息发布/订阅模型 {#实现消息发布订阅模型}

。。。


### 使用生成器代替线程 {#使用生成器代替线程}

产生要对生成器函数和yield语句有深刻理解。。。。


### 多个线程队列轮询 {#多个线程队列轮询}

。。。


### 在Unix系统上面启动守护进程 {#在unix系统上面启动守护进程}

e.g.

```python
#！/usr/bin/env python3
import os
import sys
import atexit
import signal
def daemonize(pidfile, *, stdin='/dev/null', stdout='/dev/null', stderr='/dev/null'):
    if os.path.exists(pidfile):
        raise RuntimeError('Already running')
    try:
        if os.fork() > 0:
            raise SystemExit(0)
    except OSError as e:
        raise RuntimeError('fork #1 failed.')
    os.chdir('/')
    os.umask(0)
    os.setsid()
    try:
        if os.fork() > 0:
            raise SystemExit(0)
    except OSError as e:
        raise RuntimeError('fork #2 failed')
    sys.stdout.flush()
    sys.stderr.flush()
    with open(stdin, 'rb', 0) as f:
        os.dup2(f.fileno(), sys.stdin.fileno())
    with open(stdout, 'ab', 0) as f:
        os.dup2(f.fileno(), sys.stdout.fileno())
    with open(stderr, 'ab', 0) as f:
        os.dup2(f.fileno(), sys.stderr.fileno())
    with open(pidfile, 'w') as f:
        print(os.getpid(), file=f)
    atexit.register(lambda: os.remove(pidfile))
    def sigterm_hadnler(signo, frame):
        raise SystemExit()
    signal.signal(signal.SIGTERM, sigterm_hadnler)
def main():
    import time
    sys.stdout.write('Daemon started with pid {}\n'.format(os.getpid()))
    while True:
        sys.stdout.write('Daemon Alive {}\n'.format(time.ctime()))
            time.sleep(10)
if __name__ == '__main__':
    PIDFILE = '/tmp/daemon.pid'
    if len(sys.argv) != 2：
        print('Usage: {} [start | stop]'.format(sys.argv[0]), file=ssy.stderr)
        raise SystemError(1)
    if sys.argv[1] == 'start':
        try:
            daemonize(PIDFILE, stdout='/tmp/daemon.log',
                stderr='/tmp/daemon.log')
        except RuntimeError as e:
            print(e, file=sys.stderr)
            raise SystemExit(1)
        main()
    elif sys.argv[1] == 'stop':
        if os.path.exists(PIDFILE):
            with open(PIDFILE) as f:
                os.kill(int(f.read()), signal.SIGTERM)
        else:
            print('Not running', file=sys.stderr)
            raise SystemExit(1)
    else:
        print('Unknown command {!r}'.format(sys.argv[1]), file=sys.stderr)
        raise SystemExit(1)
```

要启动这个守护进程，用户需要使用如下命令：

```sh
daemon.py start
cat /tmp/daemon.pid
tail -f /tmp/daemon.log
```


## 脚本编程与系统管理 {#脚本编程与系统管理}


### 通过重定向、管道、文件接受输入 {#通过重定向管道文件接受输入}

Python内置的fileinput模块。
e.g.

```python
import fileinput
with fileinput.input() as f_input：
    for line in f_input:
        print(line, end='')
```

```shell
ls | ./fileinput.py
./fileinput.py /etc/passwd
./fileinput.py < /etc/passwd
```

如上方式都可以接收到输入 。


### 终止程序并给出错误信息 {#终止程序并给出错误信息}

```python
raise SystemExit('error Message')
```


### 解析命令行选项 {#解析命令行选项}

命令行选项位于sys.argv中
argparse模块可被用来解析命令行选项。为了解析命令行选项，你首先要创建一个ArgumentParser补全，并使用add_argument()方法声明你想要支持的选项。


### 运行时弹出密码输入提示 {#运行时弹出密码输入提示}

getpass模块。


### 获取终端的大小 {#获取终端的大小}

使用os.get_terminal_size()函数。


### 执行外部命令并获取它的输出 {#执行外部命令并获取它的输出}

使用subprocess.check_output()函数。


### 复制或者移动文件和目录 {#复制或者移动文件和目录}

shutil模块


### 创建和解压归档文件 {#创建和解压归档文件}

shutil.archive()和unpack.archive()


### 通过文件名查找文件 {#通过文件名查找文件}

os.walk()遍历目录。每次进入一个目录，它会返回一个三元组，包含相对于查找目录的相对路径，一个该目录下的目录列表，以及那个目录正面的文件名列表。


### 读取配置文件 {#读取配置文件}

configparser模块读取.ini文件。


### 给简单脚本增加日志功能 {#给简单脚本增加日志功能}

使用logging模块。


### 给函数库增加日志功能 {#给函数库增加日志功能}

如果你想给某个函数库增加日志功能，但是又不能影响到那些不使用日志功能的程序。你应该创建一个专属的logger对象，并且像下面这样初始化配置

```python
import logging
log = logging.getLogger(__name__)
log.addHandler(logging.NullHandler())
```


### 实现一个计时器 {#实现一个计时器}

使用time模块


### 限制内存和CPU的使用量 {#限制内存和cpu的使用量}

在Unix系统上可以使用resource模块


### 启动一个WEB浏览器 {#启动一个web浏览器}

webbrowser模块能被用来启动一个浏览器，并且与平台无关。


## 测试、调试和异常 {#测试调试和异常}


### 测试stdout输出 {#测试stdout输出}

。。。


### 在单元测试中给对象打补丁 {#在单元测试中给对象打补丁}

。。。


### 在单元测试中测试异常情况 {#在单元测试中测试异常情况}

。。。


### 将测试输出用日志记录到文件中 {#将测试输出用日志记录到文件中}

重定向sys.stderr


### 忽略或期望测试失败 {#忽略或期望测试失败}

。。。


### 处理多个异常 {#处理多个异常}

将多个异常放入一个元组中。


### 捕获所有异常 {#捕获所有异常}

直接捕获Exception即可。


### 创建自定义异常 {#创建自定义异常}

创建一个新的类，让它继承Exception或者是任何一个已存在 的异常类型。


### 捕获异常后抛出另外的异常 {#捕获异常后抛出另外的异常}

使用raise from 语句来代替简单的raise.它可以让你同时保留两个异常的信息。


### 重新招聘被捕获的异常 {#重新招聘被捕获的异常}

简单的一个单独的raise语句即可。


### 输出警告信息 {#输出警告信息}

可使用warning.warn()函数。


### 调试基本的程序 崩溃错误 {#调试基本的程序-崩溃错误}

运行python -i somefile.py可执行简单的调试。


### 给你的程序 做性能测试 {#给你的程序-做性能测试}

如果只是简单的想测试下你的程序整体花费的时间，通常使用Unix时间函数就行

```base
time python stonefile.py
```

如果你还需要一个程序 各个细节的详细报告可以使用cProfile模块。

```sh
python -m cProfile stonefile.py
```


## C语言扩展 {#c语言扩展}

。。。


###  {#section}
