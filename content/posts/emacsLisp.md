+++
title = "Emacs Lisp"
date = 2023-09-17
tags = ["Emacs Lisp", "Emacs"]
categories = ["Emacs Lisp", "Emacs"]
draft = false
+++

## ELisp {#elisp}


### 快捷键 {#快捷键}


#### 格式化区域代码： C - M - \\ {#格式化区域代码-c-m}


#### 执行代码： C - x C - e {#执行代码-c-x-c-e}

相当于 eval-last-sexp


#### 执行代码并将执行结果放到光标处： C - u C - x C - e {#执行代码并将执行结果放到光标处-c-u-c-x-c-e}


#### 查找更多信息 {#查找更多信息}

<!--list-separator-->

-  查询函数信息： C - h f

<!--list-separator-->

-  查询变量信息： C - h v

<!--list-separator-->

-  查询快捷键信息： C - h k

<!--list-separator-->

-  使用正则表达式查询函数名： M - x apropos


### 数据类型 {#数据类型}


#### 内建 {#内建}

内建的Emacs数据类型称为primitive types, 包括整数、浮点数、cons、符号（symbol)、字符串、向量(vector)、散列表(hash-table)、subr(内建函数， 比如cons, if, and)、byte-code function, 和其它特殊类型， 例如缓冲区(buffer)


#### 数字 {#数字}

Emacs的数字分为整数和浮点数。1.属于整数

<!--list-separator-->

-  整数

    一般来说最小范围是在-2\*\*28 ~ 2\*\*28-1.

    ```emacs
    (message "%s" most-positive-fixnum)   ;"2305843009213693951"
    (message "%s" most-negative-fixnum)   ;"-2305843009213693952"
    ```

<!--list-separator-->

-  测试函数

    ```emacs
    (integerp 1.)   ; t
    (integerp 1.0)   ;nil
    (floatp 1.)     ;nil
    (floatp -0.0e+NaN)   ;t
    (numberp 1)     ;t
    ```

<!--list-separator-->

-  娄的比较

    ```Emacs
    (= 1.0 1)   ;t
    (eql 1.0 1) ;nil
    ```

<!--list-separator-->

-  数的转换

    -   truncate 转换面靠近0的整数
    -   floor 转换成最接近的不比本身大的整数
    -   celling 转换成最接近的不比本身小的整数
    -   round 四舍五入的整数，换句话说和它的差绝对值最小的整数

<!--list-separator-->

-  数的运算

    作为除法时，两个操作数都是整数，结果就是整数，如果其中有浮点数，结果就自动转换成浮点数。

    -   +
    -   -
    -   \*
    -   /

<!--list-separator-->

-  常用函数

    -   abs
    -   sqrt
    -   exp
    -   expt
    -   log

    <!--list-separator-->

    -  三角函数

        -   sin
        -   cos
        -   tan
        -   asin
        -   acos
        -   atan


#### 字符和 字符串 {#字符和-字符串}

-   在emacs里字符串是有序的字符数组，和C语言的字符串数组不同，Emacs的字符串可以容纳任何字符，包括\\0。
-   构成字符串的字符其实就是一个整数。一个字符‘A’就是一个整数65。可以使用?A获取字符对应的数字。
-   对于标点来说，也可以用同样的语法，但最好在前面加上转义符\\。
-   对于控制 字符 可以用多种表示方式比如C-i

<!--listend-->

```Emacs
?\^I ?\^i ?\C-I ?\C-i
```

-   对于修饰字符meta键可以使用\M-

<!--listend-->

```Emacs
?\M-A
```

<!--list-separator-->

-  测试函数

    对于字符串测试使用stringp，没有charp，因为字符就是整数。

    ```Emacs
    ;; string-or-null-p当对象是一个字符串或nil时返回t
    (string-or-null-p nil)  ; t
    (string-or-null-p "null")  ; t
    ```

<!--list-separator-->

-  字符串比较

    ```Emacs
    ;; char-equal是比较两个字符是否相等，它在case-fold-search变量是t时是忽略大小写的。
    (char-equal ?A ?a)  ; t
    ;; 字符串比较使用string=或string-equal
    (string= "A" "a")
    ;; 按字典顺序比较两个字符串
    (string< "a" "A") ;; nil  它是string-less的别名
    ```

<!--list-separator-->

-  转换函数

    -   char-to-string
    -   string-to-char
    -   number-to-string  只能转换10进制的数字。如果需要输出八进制或者十六进制，可以使用format函数。
    -   string-to-number  可以设置字符串的进制，可以从2到16
    -   concat 可以把一个字符构成的列表或者微量转换成字符串。
    -   vconcat 可以把一个字符串转换成一个向量
    -   append 可以把一个字符串转换成一个列表。
    -   downcase
    -   upcase
    -   capitalize 可以使字符串中单词的第一个字符大写。
    -   upcase-initials 只使第一个单词的第一个字符大写。

<!--list-separator-->

-  格式化字符串

    -   format

<!--list-separator-->

-  查找和替换

    -   string-match 从指定的位置对字符串进行正则表达式匹配，如果匹配成功返回匹配的起点. 注意第一个参数是正则表达式。如果想处理非正则，可以使用regexp-quote函数预处理一下。
        ```Emacs
        (string-match "12" "3412")   ; 2
        (string-match "12" "134")    ; nil
        (string-match "2*" "123232*123")   ; 0
        (string-match (regexp-quote "2*") "123232*123")  ; 5
        ```
    -   replace-match
        ```Emacs
        (let ((str "01234567890123456789"))
          (string-match "34" str)
          (princ (replace-match "x" nil nil str 0))
          (princ "\n")
          (princ str))
        ```

<!--list-separator-->

-  把字符串按分隔符分解

    可以使用split-string

    ```Emacs
    (split-string "key = val" "\\s-*=\\s-*")  ; ("key" = "val")
    ```


#### Cons Cell 和列表 {#cons-cell-和列表}

<!--list-separator-->

-  测试函数

    ```Emacs
    (consp '(1 2))   ;t
    (consp '(1 . (2 . nil)))  ;t
    (consp nil)   ;nil
    (listp '(1 . 2))   ;t
    (listp '(1 . (2 . nil)))  ;t
    (listp nil)  ;t
    (null '())    ;t
    ```

<!--list-separator-->

-  构造函数

    ```Emacs
    (cons 1 2)
    (cons 1 '())
    ```

<!--list-separator-->

-  相关函数

    注意, 以n打头的函数都要慎用

    ```Emacs
    (setq foo '(a b))
    (cons 'x foo)
    (print foo)  ; (a b)
    (push 'x foo)
    (print foo)   ; (x a b)
    ```

    <!--list-separator-->

    -  生成列表

        -   list
            ```Emacs
            (list 1 2 3)
            ```
            list与‘(quote)的葂是，quote是把参数直接返回而不进行求值，而list和cons是对参数求值后再生成一个列表或者cons cell。

    <!--list-separator-->

    -  添加元素

        1.  在列表前边新增元素
            ```Emacs
            (cons 'a '(b c))   ;(a b c)
            ```
        2.  在列表后边添加元素， 一般来说append的参数都要是列表，但是最后一个参数可以不是列表，但是这样得到的结果就不再是一个真列表了。如果再进行append操作就会产生一个错误。
            ```Emacs
            (append '(a b) 'c)  ;(a b . c) 不是真列表
            (append '(a b) '(c))   ;(a b c)
            ```
            append的参数不限于列表，还可以是字符串或者向量。相当于把一个字符串转换成一个字符列表，向量转换成一个列表。
            ```Emacs
            (append [a b] "cd" nil)  ; (a b 99 100)
            (append [a b] "cd")   ;(a b . "cd")
            ```

    <!--list-separator-->

    -  获取列表索引为N的元素

        ```Emacs
        (nth 3 '(0 1 2 3 4 5 6 7 8 9))  ; 3
        ```

    <!--list-separator-->

    -  获取列表索引为N后的列表

        ```Emacs
        (nthcdr 2 '(0 1 2 3 4 5 6 7 8))   ;(2 3 4 5 6 7 8)
        ```

    <!--list-separator-->

    -  获取列表倒数n个长度的列表

        ```Emacs
        (last '(1 2 3 4 5 6 7) 3) ;;(5 6 7)
        ```

    <!--list-separator-->

    -  获取除了倒数n个元素的列表

        ```Emacs
        (butlast '(1 2 3 4 5 6 7 8) 4)  ;(1 2 3 4)
        ```

    <!--list-separator-->

    -  改变头元素或改变后续元素

        ```Emacs
        (setq foo '(a b c))
        (setcar foo 'x)
        (print foo)
        (setcdr foo '(y z))
        (print foo)
        ```

    <!--list-separator-->

    -  移除列表的头元素并返回

        ```Emacs
        (setq foo '(a b))
        (pop foo)   ;(a)
        (print foo)  ;(b)
        ```

    <!--list-separator-->

    -  重排列表

        ```Emacs
        (setq foo '(a b c d))
        (reverse foo)  ;(d c b a)
        (nreverse foo)
        (foo)  ;(a)
        ```

    <!--list-separator-->

    -  排序列表

        ```Emacs
        (setq foo '(3 2 541  5 2 34 2 34  34))
        (sort foo '<)   ;; (2 2 2 3 5 34 34 34 541)
        ```

    <!--list-separator-->

    -  把列表当集合用

    <!--list-separator-->

    -  把列表当关联表

        列表实现的关联表有一个专门的名字叫association list.
        在Emacs Lisp里是有hashtable的,可是hashtable没有列表丰富的函数,只有一个maphash函数可以遍历列表.
        在Emacs Lisp的association list中关键字是放在元素的car部分,与它对应的数据放在这个元素的cdr部分.根据比较方法的不同有assq和assoc两个函数,它们分别 对应查找使用eq和equal两种方法.

        ```Emacs
        (assoc "a" '(("a" 97) ("b" 98)))        ; => ("a" 97)
        (assq 'a '((a . 97) (b . 98)))          ; => (a . 97)
        ;; 通常我们只需要查找对应的数据，所以一般来说都要用 cdr 来得到对应的数据：
        (cdr (assoc "a" '(("a" 97) ("b" 98))))  ; => (97)
        (cdr (assq 'a '((a . 97) (b . 98))))    ; => 97
        ;; assoc-default 可以进一步完成这样的操作
        (assoc-default "a" '(("a" 97) ("b" 98)))          ; => (97)
        ```

        如果查找用的键值（key）对应的数据也可以作为一个键值的话，还可以用 rassoc 和 rassq来根据数据查找键值：

        ```Emacs
        (rassoc '(97) '(("a" 97) ("b" 98)))     ; => ("a" 97)
        (rassq '97 '((a . 97) (b . 98)))        ; => (a . 97)
        ```

    <!--list-separator-->

    -  把列表当树

    <!--list-separator-->

    -  遍历列表

        -   遍历列表最常用的函数就是 mapc 和 mapcar 了。它们的第一个参数都是一个函数，这个函数只接受一个参数，每次处理一个列表里的元素。这两个函数唯一的差别是前者返回的还是输入的列表，而 mapcar 返回的函数返回值构成的列表：

        <!--listend-->

        ```Emacs
        (mapc '1+ '(1 2 3))                     ; => (1 2 3)
        (mapcar '1+ '(1 2 3))                   ; => (2 3 4)
        ```

        -   dolist
            ```Emacs
            (dolist (var list [result]) body...)
            ```

    <!--list-separator-->

    - <span class="org-todo todo TODO">TODO</span>  将列表按指定分隔符合并成一个字符串

        可以使用mapconcat,

        ```Emacs
        (mapconcat 'identity '("a" "b" "c") "\t")   ;"a	b	c"
        ;; identity是一个特殊的函数,它会直接返回参数.
        ```


#### 数组和序列 {#数组和序列}

序列是列表和数组的统称,也就是说列表和数组都是序列.它们的共性是内部的元素都是有序的.elisp里的数组包括字符串、向量、char-table和布尔向量。它们关系如下所示：

-   sequence
    -   list
    -   Array
        -   Vector
        -   String
        -   char-table
        -   Bool-vector

<!--list-separator-->

-  数组

    <!--list-separator-->

    -  数组的特性

        1.  数组内的元素都对应一个下标，第一个元素的下标是0.数组内的元素可以在常数时间内访问。
        2.  数组在创建之后就无法改变它的长度。
        3.  数组是自求值的。
        4.  数组里的元素都可以用aref来访问，用aset设置。

    <!--list-separator-->

    -  数组的相关函数

        1.  fillarray： 填充数组使用filearray可以把整个数组用某个元素填充
            ```Emacs
            (fillarray (make-vector 3 'a) 6) ;[6 6 6]
            ```
        2.  aref: 访问数组
        3.  aset：修改数组

    <!--list-separator-->

    -  向量

        向量可以看成是一种通用的数组，它的元素可以是任意的对象。

        <!--list-separator-->

        -  创建向量

            1.  vector
                ```Emacs
                (vector 'foo 23 [bar baz] "react")  ;[foo 23 [bar baz] "react"]
                ```
            2.  make-vector
                使用make-vector可以生成元素相同的向量
                ```Emacs
                (make-vector 9 'a) ;[a a a a a a a a a]
                ```
            3.  vconcat: 可以把多个序列连接成一个微量。但是这个序列必须是真列表。这也是把列表转换成向量的方法。
                ```Emacs
                (vconcat [A B C] "aa" '(foo (6 7)))     ; => [A B C 97 97 foo (6 7)]
                ```

        <!--list-separator-->

        -  字符串

            字符串是一种特殊的数组，它的元素只能是字符。

<!--list-separator-->

-  测试函数

    1.  测试一个对象是否是一个序列。
        ```Emacs
        (sequencep '())   ;t
        ```
    2.  测试一个对象是否是数组
        ```Emacs
        (arrayp '())   ;nil
        (arrayp '[])   ;t
        ```
    3.  vectorp、char-table-p和bool-vector-p分别测试对象是否是向量、char-table、bool-vector。

<!--list-separator-->

-  通用函数

    <!--list-separator-->

    -  获取序列的长度

        length可以得到序列的长度，但这个函数只对真列表有效。对于一个点列表和环形列表这个函数就不适用了。点列表会两难参数类型不对的错误，而环形列表就会陷入死循环。

        ```Emacs
        (length '(1 2 3))   ;3
        (safe-length '(a . b))  ;1
        ```

    <!--list-separator-->

    -  复制

        1.  copy-sequence： 复制序列


#### 真与假 {#真与假}

非nil和() 即为真


#### 符号 {#符号}

符号是有名字的对象。


### 函数 {#函数}


#### 基本函数： {#基本函数}

1.  car： 取列表的第一个元素，非破坏性。
2.  cdr：取列表中除第一个元素个的剩下的元素，非破坏性。
3.  cons：将一个新元素插入到一个列表的开始处，第一个参数为一个元素，第二个元素为一个列表。
4.  consp: 判断参数是不是一个列表, 空列表返回nil
5.  listp: 判断参数是不是一个列表, 空列表返回t
6.  null: 判断参数是不是nil, 空列表返回t
7.  atom: 判断参数是不是一个原子, 空列表也是原子
8.  append: takes any number of lists and makes a new list by concatenating the top-level elements of all the lists.
    将任意数量的列表中的顶级子元素连接成一个新的列表
9.  reverse: takes a list and makes a new list by reversing its top-level elements.
    通过颠倒参数列表的顶级元素来生成一个新的元素.
10. nreverse: 破坏性的reverse
11. length：取一个列表的长度
12. nthcdr: 重复的取列表的cdr，非破坏性， 第一个参数为次数，第二个参数为一个列表。
13. nth: 返回列表的第几个元素.   (nth n var)
14. assoc:
15. setcar: 将一个列表的car设置成为一个新值，破坏性
16. setcdr：将一个列表的cdr设置为一个新值， 破坏性
17. progn: 使其每一个参量被逐一求值并返回最后一个参量的值。
18. prog1: 与progn类似。不同之处在于prog1函数依次对它的参量求值并将其第一个参量的值作为整个表达式的值返回。
19. concat: 将新文本的字符串连接到老文件之前。
20. substring: 将第一个参数（字符串）截取按第二个和第三个字符串之间的内容。
21. message： 给用户发送消息。
22. if: 对函数的第一个参量求值，如果这个值是“真”，则对第二个参量求什；否则，如果有第三个参量的话就对第三个参量求值。
23. equal，eq: 测试两个对象是否相同。如果两个对象有相似的结构和内容，equal则返回“真”，如果两个参量确实是完全相同的对象，则另一个函数eq返回“真”。
24. buffer-name: 它将缓冲区的名字以一个字符串的形式返回。
25. buffer-file-name: 它返回缓冲区正在访问的文件的名字。
26. current-buffer: 返回Emacs中当前缓冲区的名字。
27. other-buffer: 返回最近选择过的缓冲区。
28. set-buffer: 将Emacs的注意力切换到另外一个运行程序的缓冲区。不改变当前窗口正在显示的内容。
29. buffer-size: 返回当前缓冲区中的字符数。
30. point: 返回当前光标位置对应的值。
31. point-min: 返回当前缓冲区中位点的最小可能值。
32. point-max: 返回当前缓冲区中位点的最大可能值。
33. eobp: End of buffer P，当位点处于这个缓冲区末尾时，这个函数返回“真”。
34. looking-at: 当紧跟在位点之后的文本与传递给looking-at函数作为其参量的正则表达式匹配时，函数返回“真”。
35. or: 逐一对每一个参量求值，并返回第一个非空值。如果所有参量的值都是nil就返回nil。
36. and: 逐一对每一个参量求值，如果有一个参量的值是nil, 则返回nil。
37. not: 取反。
38. &amp;optional: 在函数定义中用于指出一个参量是可选参量。
39. &amp;rest: 聚合剩下的所有参数成一个集合到当前参数.必须为参数列表的最后一个参数
    collect up any remaining arguments into a list and assign it to the last parameter
40. forward-line: 将光标移动到下一行的行首，如果其参量大于1,则移动多行。
41. erase-buffer: 删除当前缓冲区的全部内容。
42. bufferp: 如果其参量是一个缓冲区则返回“真”，否则返回“假”。
43. pp: 格式化输出内容。


#### 破坏性函数 {#破坏性函数}

1.  nconc:


#### 定义函数 {#定义函数}

<!--list-separator-->

-  定义函数的模板

    ```elisp
    (defun function-name (arguments...)
      "optional-documentation..."
      (interactive argument-passing-info)  ; optional
      body..)
    ```

    <!--list-separator-->

    -  参数

        <!--list-separator-->

        -  可选参量

            如果一个参量跟在&amp;optional这个关键词后面，则当调用这个函数时就不一定传送一个值给这个参量。

    <!--list-separator-->

    -  interactive

        使函数成为交互式函数

        <!--list-separator-->

        -  argument-passing-info

            -   "p" : 表示要传送一个前缀参量给这个函数，并将它的值用于函数参量
            -   "r" : 表示将位点所在区域的开始值和结束值做为函数的两个参量
            -   "B" : 表示用缓冲区的名称作为函数的参量， 允许使用不存在的缓冲区
            -   "b" : 表示用缓冲区的名称作为函数的参量， 如果缓冲区不存在，你将收到一条错误消息
            -   "f" : 一个已经存在的文件的名字
            -   "\*" : 用于缓冲区是一个只读缓冲区的情况， 指如果函数被一个只读缓冲区调用，一条消息将打印在回显区，终端将发出蜂鸣或者闪亮一下。

        <!--list-separator-->

        -  使用两个以上的参量

            两个部分之间使用\n分隔开

            ```elips
            (defun name-of-function (buffer start end)
              "documentation"
              (interactive "BAppend to buffer: \nr")
              body-of-function)
            ```

<!--list-separator-->

-  永久安装代码

    可以将定义的函数放到.emacs或.emacs.d/init.el， 也可以放到load函数的目录

<!--list-separator-->

-  特殊表

    <!--list-separator-->

    -  常用特殊表

        1.  set: 将第二参数赋值给第一个参数。
        2.  setq: 将第二个参数赋值给第一个参数，与set的区别是，第一个参数不需要加单引号。
        3.  defvar: 给一个变量赋值，与setq函数相似，但它只对无值的变量赋值。另外,使用defvar可以为变量提供文档字符串,当 变量是在文中定义的话, C-h v后能给出变量定义的位置.
        4.  defun: 定义函数。最多可以有五个部分： 函数名，传送给函数的参量的模板，文档，一个可选的交互函数声明以及函数体。例：
            ```elisp
            (defun back-to-indentation ()
                 "Point to first visible character on line."
                 (interactive)
                 (beginning-of-line 1)
                 (skip-chars-forward " \t")
             )
            ```
        5.  interactive:
            向Lisp解释器声明这个函数可以被交互地使用。这个特殊表可以用一个字符串，分成一个部分或几个部分，依次传送信息到这个函数的参数。这些部分也可以告诉Lisp解释器提示这些信息。字符串的每一个部分用换行符（\n）分开。其中常用到的控制字符是：
            -   b: 一个已经存在的缓冲区的名字。
            -   f: 一个已经存在的文件的名称。
            -   p: 数字前缀参量。
            -   r: 位点和标记，作为两个数字参量，小的在前面。
        6.  let: 声明在let表达式主体中使用的变量列表并给它们赋初始值，初始值要么是nil,要么是一个指定的值。然后对let表达式主体的其他表达式求值并返回最后一个表达式的值。在let表达式主体中，Lisp解释器看一到被绑定在let表达式之外的同名变量的值。
        7.  let\*: 与let类似，let\*表达式中，变量列表中后面的变量可以使用前面变量已经由Emacs设置的值。
        8.  while:while循环将包含三个部分：
            1.  一个真假测试表达式。
            2.  一个求值表达式。
            3.  一个表达式。
        9.  递归：一个递归函数通常包含一个条件表达式，这个条件表达式有三个部分：

            1.  一个真假测试
            2.  函数名
            3.  一个表达式。

            模板：
            ```elisp
            (defun name-of-recursive-function (argument-list)
            "documentation..."
            body...
            (if do-again-test
            (name-of-recursive-function
            next-step-expression))
            )
            ```

    <!--list-separator-->

    -  let

        创建函数内的局部变量例：

        ```elisp
        (let ((variable1 value)
              (variable2 value)
              ...)
              body...)
        ```

    <!--list-separator-->

    -  let\*

        与let类似.let\*表达式中，变量列表中后面的变量可以使用前面变量已经由emacs设置的值。

    <!--list-separator-->

    -  if

        ```elisp
        (if (true-or-false-test)
            (action-to-carry-out-if-test-is-true))
        ```

        ```elisp
        (if (true-or-false-test)
            (action-to-carry-out-if-the-test-returns-true)
            (action-to-carry-out-if-the-test-returns-false))
        ```

    <!--list-separator-->

    -  cond

        if为cond的特殊形式

        ```elisp
        (cond
          (first-true-or-false-test first-consequent)
          (second-true-or-false-test second-consequent)
          (third-true-or-false-test third-consequent)
          ...)
        ```

        当Lisp解释器对cond表达式求值时，它先计算cond表达式主体当中的一系列表达式中的第一个表达式的第一个元素，如果这个真假测试表达式返回nil，则这个表达式的其余部分就被忽略，而下一个表达式中的真假测试被求值，如果有一个表达式的真假测试结果不是nil,则那个表达式的后续部分就被求值。后续部分可以是一个表达式也可以是多个表达式。如果后续表达式是多个表达式组成的，则这些表达式被依次求值，并且最后一个表达式的值被返回。如果这 个表达式只有真假测试表达式而没有后续表达式，真假测试表达式的值就作为结果返回。

    <!--list-separator-->

    -  save-excursion

        这个函数将当前的位点和标记保存起来，执行函数体，然后，如果位点和标记发生改变就将位点和标记恢复成原来的值。这个特殊表的主要目的是使用户避免位点和标记的不必要移动。

        <!--list-separator-->

        -  代码模板

            ```elisp
            (save-excursion
              body...)
            ```

    <!--list-separator-->

    -  save-restriction

        跟踪变窄开启的部分

        <!--list-separator-->

        -  如果同时使用save-secursion和save-restriction时（并且是一个紧接着另一个使用时），应当在外层使用save-excursion.如果采用了相反的次序，就会在调用save-excursion之后无法记录缓冲区中变窄开启的标记。

            ```elisp
            (save-excursion
              (save-restriction
                body...))
            ```

    <!--list-separator-->

    -  save-match-data

        保存之前的搜索结果,不想因为我们的函数修改了全局的匹配数据.

    <!--list-separator-->

    -  defvar

        给一个变量赋值， 与setq类似。

        ```elsip
        (defvar var value "Documentation ")
        ```

        不同之处：

        1.  它只对无值的变量赋值
        2.  它有一个文档字符串


#### 常用函数 {#常用函数}

<!--list-separator-->

-  将人能读懂的代码转换成字节编码： byte-compile-file

<!--list-separator-->

-  将两个或更多的字符串连接： (concat "one str " "two str")

<!--list-separator-->

-  截取字符串 (substring "str" startNum endNum)3

<!--list-separator-->

-  在回显区打印消息   (message "This is a message in buffer  %s" (buffer-name) )

<!--list-separator-->

-  给一个变量赋值

    <!--list-separator-->

    -  (set 'oneList '(this is a list))

    <!--list-separator-->

    -  (setq oneList '(this is a list)

        twoList '(this another list))

<!--list-separator-->

-  判断相等，判断两个对象有相似的结构和内容： (equals var1 var2)

<!--list-separator-->

-  判断相等，判断两个对象完全相同的对象： (eq obj1 obj2)

<!--list-separator-->

-  设置标记： C - SPC   set-mark-command

<!--list-separator-->

-  将光标移动到位点处： C - x C - x   exchange-point-and-mark

<!--list-separator-->

-  移动光标的函数

    <!--list-separator-->

    -  将光标移动到缓冲区的开始位置： beginning-of-buffer M - &lt;

<!--list-separator-->

-  逻辑函数

    and和or具有短路性质.

    <!--list-separator-->

    -  or

        很多人喜欢在表达式短时,用or代替unless
        or经常用于设置函数的缺省值

        ```Emacs
        (or name (setq name "Emacser"))
        ```

    <!--list-separator-->

    -  not

    <!--list-separator-->

    -  and

        很多人喜欢在表达式短时,用and代替when
        and经常用于用于参数检查

        ```Emacs
        (and (>= n 0) (= (/ n (sqrt n)) (sqrt n)))
        ```

<!--list-separator-->

-  将一个由(interactive "p")产生的未加工的前缀参量转换成一个数值： (prefix-numeric-value arg)

<!--list-separator-->

-  打印字符串： (print msg)

<!--list-separator-->

-  在位点处插入字符串: (insert "message")

<!--list-separator-->

-  将文件名转换成文件的绝对的长路径形式： (expand-file-name file-name)

<!--list-separator-->

-  对列表进行排序： (sort list-variable ‘&lt;)

<!--list-separator-->

-  构建文件列表： (directory-files "." t "\\\\.el$")

    -   第一个参数是要遍历的目录
    -   第二个参数如果非空则返回目录中文件的绝对路径
    -   第三个参量是一个可选项， 如果它包含一个颪表达式，则只能路径名与颪表达式匹配的文件被返回

<!--list-separator-->

-  将第一个参量应用到苦命参量上： (apply 'funcName params)

<!--list-separator-->

-  mapcar

    它依次使用第二个参量中的每一个元素调用第一个参量，第二个参量必须是一个列表。

    ```elisp
    (mapcar '1+ '(1 2 3))
    (2 3 4)
    ```

<!--list-separator-->

-  查找与指定内容相关的内容： M - x appropos RET document RET

<!--list-separator-->

-  向前过滤指定字符移动光标: (skip-chars-forward "")

<!--list-separator-->

-  向后过滤指定字符移动光标: (skip-chars-backed "")

<!--list-separator-->

-  return a character's syntax code as another character: (char-syntax ?\n)

<!--list-separator-->

-  将字符转字符串: (char-to-string "c")

<!--list-separator-->

-  判断cursor是否在当前Buffer的开始: (bobp)


#### lambda {#lambda}

```elisp
((lambda (arg) (/ arg 50)) 100)
```

其中后边的100是传递给lambda的参量arg的实际值


#### defadvice {#defadvice}

creates a new piece of advice, its first argument is the (unquoted) name of the existing function being advised.Next comes a specially formatted list.

<!--list-separator-->

-  progn

    每一个参量被逐一求值并反回最后一个参量的值。因为if后只能求一条语句的值,可以使用progn把所有想要执行的语句包起来成一条语句.


### 变量 {#变量}


#### let {#let}

当同一个变量名既是全局变量也是局部变量，或者用let多层绑定，只有最里层的那个变量是有效的，用setq改变的也只是了里层的变量，而不影响外层的变量。另外需要注意一点的是局部变量的绑定不能超过一定的层数，也就是说，你不能把foo用let绑定最多max-specpdl-size层。

```Emacs
(message "%d" max-specpdl-size)
```


### 循环和递归 {#循环和递归}


#### while {#while}

对第一个参量求值，并测试这个返回值，如果第一个参量的求值结果是“假”，则Lisp解释器跳过这个表达式的其余部分，如果第一个参量的求值结果是“真”，则Lisp解释器就继续对这个表达式的主体求值，然后再次测试while的第一个参量。

```elisp
(while true-or-false-test
  body...)
```

<!--list-separator-->

-  常用循环方式

    1.  使用空列表做结束
    2.  使用固定次数做循环
    3.  使用减量计数器做循环


#### 递归 {#递归}

递归函数就是自己调用自己的函数。一个递归函数通常包含一个条件表达式，这个条件表达式有三个部分：

1.  一个真假测试， 它决定函数是否继续调用自身
2.  函数名
3.  一个表达式，它在函数被重复求值正确的次数之后使条件表达式返回“假”值


### 正则 {#正则}


#### 相关规则 {#相关规则}

1.  .: matches any single character except newline.
2.  Backslash: followed by a magic character, matches that character literally.
3.  []: A set of characters inside square brackets matches any one of the enclosed characters.
    the syntax of square brackets in regular expressions has its own "subsyntax" as follows:
    1.  a range of consecutive characters, such as abcd, can be abbreviated a-d. Any number of such ranges can be included.
    2.  if the first character is a caret(^), then the expression matches any character not appearing inside the square brackets.
    3.  To include a right-square-bracket, it must be the first character in the set.
    4.  to include a hyphen: it must appear where it can't be interpreted as part of a range.So [a-e-z] matches a, b,c,d,e,-, or z.
    5.  to include a caret(^): it must appear someplace other than as the first character in the set.
    6.  Other characters that are normally "magic" in  regexps, such as "\*" and "." are not magic inside square brackets.
        在正则表达式中通常具有魔术的字符,比如\*和.在[]里不具备魔术.
4.  a regexp x may have one of the following suffixes:
    1.  \*: zero or more
    2.  +: one or more
    3.  ?: zero or one
5.  ^x: matches x is beginning of a line.
6.  x$: matches x is end of a line.
7.  two regualr expressions x and y separated by \I : match whatever x matches or whatever y matches.
    so hello\Igoodbye matches hello or goodbye.
8.  a regular expression x enclosed in escaped parentheses: \\(and\\): matches whatever x matches.
    This can be used for grouping complicated expressions.
    So \\(ab\\)+matches ab, abab, ababab, and son on. Also \\(ab\Icd\\)ef matches abef or cdef.
    As a side effect, any text matched by a parenthesized subexpression is called a submatch and is memorzized in a numbered register.Submatches are numbered from 1 through 9 by counting occurrences of \\( in a regexp from left to right.
9.  Backslash followed by a digit n matches the same text matched by the nth parenthesized subexpression from earlier in the same regexp.
    So the expression \\(a+b\\)\\1 matches abab, aabaab, and aaabaaab, but not abaab.
10. The empty string can be matched in a wide variety of ways.
    1.  \\': matches the empty string that's at the beginning of the buffer.
    2.  \\ ': matches the empty string that's at the end of the buffer.
    3.  '=: matches the empty string that's at the current location of point.
    4.  \b: matches the empty string that's at the beginning or end of a word.
    5.  \B: matches the empty string that's anywhere but at the beginning or end of a word.
    6.  \\&lt;: matches the empty string at the beginning of a word only.
    7.  \\&gt;: matches the empty string at the end of a word only.


#### 相关函数 {#相关函数}

<!--list-separator-->

-  regexp-quote

    which understands regexp syntax and can turn a possibly-magic string into the corresponding non-magic one.
    它个函数可以将一个包含魔术字符的字符串转为没有魔术字符的字符串.

<!--list-separator-->

-  re-search-forward

    查询一个正则表达式，如果查询成功，它就紧接在最后的目标字符后面设置位点。如果查询是朝向进行的，就在第一个目标字符之前设置位点。

    ```elsip
    (re-search-forward "regular-expression"    ;;第一参量是正则表达式
       limit-of-search                         ;; 第二个参量是可选的， 它限制函数查询的范围；它是在缓冲区中指定一个位置的约束值
       what-to-do-if-search-fails              ;; 第三个参量是可选的， 它告诉函数如果对查询失败做出响应： 如果第三个参量是nil， 函数在查询失败时产生一个错误消息；如果第三个参量是其他值，函数在查询失败时返回nil， 查询成功时返回t
       repeat-count)                           ;; 第四个参量也是可选的，它是一个重复计数。一个负的重复计数使re-search-forward函数向后查询。
    ```

<!--list-separator-->

-  replace-match

    ```emacs
    (replace-match
      new-string    ;; new string to insert
      preserve-case  ;; preserve alphabetic case in new-string
      literal       ;; set t means 'treat new-string literally.' if it's nil, then replacematch interprets new-string according to some special syntax rules.
      base-string    ;; nil means 'Modify the current buffer', If this were a string, then replace-match would perform the replacement in the string instead of in a buffer.
      subexpression  ;; is a digit means "Rplace submatch n"
    )
    ```

<!--list-separator-->

-  forward-paragraph

    函数将位点朝前移动到段落末尾。它一般绑定到M - }上。


### 缓冲区 {#缓冲区}


#### 缓冲区名称： (buffer-name) {#缓冲区名称--buffer-name}


#### 缓冲区所属文件名称： (buffer-file-name) {#缓冲区所属文件名称--buffer-file-name}


#### 获取缓冲区本身： (current-buffer) {#获取缓冲区本身--current-buffer}


#### 返回最近使用过的缓冲区： (other-buffer) {#返回最近使用过的缓冲区--other-buffer}


#### 切换缓冲区： (switch-to-buffer (other-buffer)) {#切换缓冲区--switch-to-buffer-other-buffer}


#### 将计算机的注意力切换到另一个不同的缓冲区： (set-buffer (other-buffer)) {#将计算机的注意力切换到另一个不同的缓冲区--set-buffer-other-buffer}


#### 获取当前缓冲区的大小： (buffer-size) {#获取当前缓冲区的大小--buffer-size}


#### 光标在这个缓冲区中当前点位的字符计数： (point) {#光标在这个缓冲区中当前点位的字符计数--point}


#### 当前缓冲区中位点的最小可能值： (point-min) {#当前缓冲区中位点的最小可能值--point-min}


#### 当前缓冲区中位点的最大可能值： (point-max) {#当前缓冲区中位点的最大可能值--point-max}


#### 在光标当前位置设置一个标记： (push-mark) {#在光标当前位置设置一个标记--push-mark}


#### 将光标放到某处： (goto-char (point-min)): 将光标放到缓冲区的开始处 {#将光标放到某处--goto-char-point-min---将光标放到缓冲区的开始处}


#### 全选当前缓冲区： (mark-whole-buffer)  C -x h {#全选当前缓冲区--mark-whole-buffer--c-x-h}


#### 从当前缓冲区中拷贝一个域到一个指定缓冲区： (append-to-buffer buffer start end) {#从当前缓冲区中拷贝一个域到一个指定缓冲区--append-to-buffer-buffer-start-end}


#### 从一个缓冲区提取一个部分作为一个字符串： (insert-buffer-substring buffer start end) {#从一个缓冲区提取一个部分作为一个字符串--insert-buffer-substring-buffer-start-end}


#### 找到存放某个函数或者变量的源代码的文件，并切换到这个缓冲区， 将位点置于相应函数或者变量的开始处： (find-tag) M - . {#找到存放某个函数或者变量的源代码的文件-并切换到这个缓冲区-将位点置于相应函数或者变量的开始处--find-tag--m-dot}


#### 将另外一个缓冲区的内容拷贝到当前缓冲区： (insert-buffer) {#将另外一个缓冲区的内容拷贝到当前缓冲区--insert-buffer}


#### 判断参量是一个缓冲区还是一个缓冲区的名称： (bufferp buffer) {#判断参量是一个缓冲区还是一个缓冲区的名称--bufferp-buffer}


#### 将光标移动到缓冲区的十分之几： (beginning-of-buffer)  C - u {1 - 10} M - &lt; {#将光标移动到缓冲区的十分之几--beginning-of-buffer--c-u-1-10-m}


#### 光标移动到下一行的行首： (forward-line) {#光标移动到下一行的行首--forward-line}


#### 删除当前缓冲区的全部内容： (erase-buffer) {#删除当前缓冲区的全部内容--erase-buffer}


#### 显示光标所在的行： (what-line) {#显示光标所在的行--what-line}


#### 将光标当前位置与出现特定字符的下一个位置之间的这一区域中的文本剪切掉放到Kill环： zap-to-char   M - z {#将光标当前位置与出现特定字符的下一个位置之间的这一区域中的文本剪切掉放到kill环-zap-to-char-m-z}


#### 删除文档的一部分, 并放到Kill环中： (kill-region beg end) {#删除文档的一部分-并放到kill环中--kill-region-beg-end}


#### 将区域中的文本复制一份到kill环中： (copy-region-as-kill beg end $optional REGION) {#将区域中的文本复制一份到kill环中--copy-region-as-kill-beg-end-optional-region}


#### 删除一个区域的内容： (delete-region start end) {#删除一个区域的内容--delete-region-start-end}


### 变窄与增宽 {#变窄与增宽}


### 剪切和存储文本 {#剪切和存储文本}

C -y 可以从Kill环中取出第一个元素插入到当前的缓冲区中如果C - y命令后紧跟一个M - y命令，则不是第一个元素而是第二个元素被插入到当前缓冲区中。连续的M - y命令则使第三个元素或第四个元素等代替第二个元素而被插入到当前缓冲区中。


#### Kill环 {#kill环}

Kill环是文本字符串的一个列表。

<!--list-separator-->

-  kill-ring

    指向Kill环

<!--list-separator-->

-  kill-ring-yank-pointer

    指向Kill环的第二个字符串

<!--list-separator-->

-  kill-ring-max

    kill环的最大容量


### DEFUN {#defun}


#### 参数 {#参数}

1.  第一部分是Lisp中的函数名
2.  第二部分是C语言中的函数名
3.  第三部分是C常数结构名
4.  第四部分和第五部分指定了函数中允许的参量数目的最小值与最大值
5.  第六部分类似Lisp函数中interactive说明之后的参量。
6.  第七部分是文档字符串


#### defsubst {#defsubst}

when function definitions are very short, it's usually a goods idea to turn them into inlinefunctions using defsubst instead of defun.

<!--list-separator-->

-  drawbacks

    1.  that the inline function is duplicated everywhere it's used, which can increase memory requirements.
    2.  If the inline function definition changes, the old definition will still be "frozen" into compiled files that use it .


### Lisp File {#lisp-file}


#### Loading the Files {#loading-the-files}

<!--list-separator-->

-  Finding Lisp Files

    <!--list-separator-->

    -  Emacs can load files based on full path names: Emacs可以基于全路径加载文件.

    <!--list-separator-->

    -  Emacs can load files based on a files's base name, Emacs find it among the directories in the loadpath: Emacs可以基于一个基础文件名去加载文件,Emacs会去loadpath指定的目录去找这个文件.

<!--list-separator-->

-  Interactive Loading 交互式加载

    <!--list-separator-->

    -  load-file

        does not search load-path
        uses the normal filename-prompting mechanisms. 会有正常的文件名提示.

    <!--list-separator-->

    -  load-library

        can find library in the load-path
        It does not use filename-prompting and completion.

    <!--list-separator-->

    -  Programmatic Loading 编程式加载

        <!--list-separator-->

        -  Explicit loading 显示式载

            ```emacs
            (load "filename or absolute file")
            ```

        <!--list-separator-->

        -  Conditional loading

            <!--list-separator-->

            -  require and provide

                give a way to make sure it only gets loaded once instead of n times.

                ```emacs
                (provide 'lib-name)
                (require 'lib-name)
                (require 'lib-name "lib-name") ;; means if the lib-name feature is not yet present , load lib-name(use load, which searches load-path)
                ;; if the filename is the "string equivalent" of the feature name, then the filename can be omitted and will be inferred from the feature name.
                ;; so can use (require 'lib-name) instead of (require 'lib-name "lib-name")
                ```

        <!--list-separator-->

        -  autoloading

            with autoloading, you can arrange to defer loading a file until it's needed that is , until you call one of its functions.
            使用autoload, 你可以在使用动指定模块的指定函数时才会自动加载这个模块.

            ```Emacs
            (autoload 'insert-date  "timestamp" "docstring")
            ;; insert-date : 函数名
            ;; timestamp: 模块名
            ;; docstring: 函数说明.
            ```

    <!--list-separator-->

    -  compiling the File

        There are serveral ways to byte-compile files. The most straightforward ways are

        1.  From within Emacs: Execute M-x byte-compile-file RET filename.el RET
        2.  From the Unix shell: Run Emacs -batch -f batch-byte-compilefile.el

        <!--list-separator-->

        -  eval-after-load

            If you'd like to defer the execution of some code until a particular file has been loaded, eval-after-load is the way to do it.
            So

            ```Emacs
            (eval-after-load
              "dired"
              (defun dired-sort-toggle ()))
            ```


### Emacs {#emacs}


#### 一些函数 {#一些函数}

<!--list-separator-->

-  (seq-default key value)

    在缓冲区中设置值，而不是为变量设置它自己的局部值。

<!--list-separator-->

-  (global-set-key "\C -c w" 'funcname)

    设置全局性的绑定键

<!--list-separator-->

-  (global-unset-key (kbd "C - c"))

    取消全局绑定键

<!--list-separator-->

-  (setq load-path (cons "~/.emacs/config" load-path))

    将~/.emacs/config目录添加到加载目录列表中。

<!--list-separator-->

-  (setq debug-on-error t)

    这个表达式使Emacs在它下一次遇到一个错误的时候进入调试器。

<!--list-separator-->

-  M - x debug-on-entry RET triangle-bugged RET

    当你调用一个函数的时候进入调度器， 按d前进， 按q退出

<!--list-separator-->

-  M - x cancel-debug-on-entry RET triangle-deubgged RET

    退出Debug调试器

<!--list-separator-->

-  (debug)

    当代码运行到这一行的时候进入调试器

<!--list-separator-->

-  (next-error): 下一个错误  C - x \`

<!--list-separator-->

-  (transpose-chars ARG): 切换两个字 C - t

<!--list-separator-->

-  (org-transpose-words): 切换两个单词 M - t

<!--list-separator-->

-  (transpose-lines ARG): 切换两行 C - x C - t

<!--list-separator-->

-  (transpose-sentences): 切换两个句子的位置

<!--list-separator-->

-  (transpose-paragraphs): 切换两个段落的位置。

<!--list-separator-->

-  切换单词的大小写

    <!--list-separator-->

    -  (capitalize-word): 把单词的首字母改为大写： ESC c

    <!--list-separator-->

    -  (upcase-word): 把单词的字母全部改为大写： ESC u

    <!--list-separator-->

    -  (downcase-word): 把单词的字母全部改为小写： ESC l

<!--list-separator-->

-  中止与撤消

    <!--list-separator-->

    -  (keyboard-quit): 放弃当前命令： C - g

    <!--list-separator-->

    -  (advertised-undo): 撤消上一次编辑（可重复使用）: C - x u

    <!--list-separator-->

    -  (undo): 撤消上一次编辑： C - _ 或 C - /

    <!--list-separator-->

    -  (revert-buffer): 把缓冲区恢复到上𥪐对文件进行存盘时的状态。


#### Major Mode {#major-mode}

<!--list-separator-->

-  Major mode Skeleton

    1.  Choose a name .The name for our mode is quip
    2.  create a file called name.el to contain the code for the mode.
    3.  Define a variable called name-mode-hook. This will contain the user's hook functions to execute when entering the mode.
        ```emacs
        (defvar quip-mode-hook nil
          "*List of functions to call when entering Quip mode.*")
        ```
    4.  If appropriate,  define a mode-specific keymap . Put it in a variable called name-mode-up. Create a mode's keymap like this:
        ```emacs
        (defvar name-mode-map nil
          "Keymap for name major mode.")
          (if name-mode-map
              nil
            (setq name-mode-map (make-keymap))
            (define-key name-mode-map keysequence command)
          ...)
        ```
        instead of make-keymap, youi could use make-sparse-keymap, which is better suited to keymaps that contain only a few keybindings.
    5.  If appropriate, define a mode-specific syntax table. Put it in a variable named name-mode-syntax-table.
    6.  If appropriate, define a mode-specific abbrev table. Put it in a variable named name-mode-abbrev-table.
    7.  Define a command named name-mode. This is the major mode command, and it tabkes no arguments(unlike a minor mode command, which takes one optional argument). When executed, it should cause the current buffer to enter name-mode by performing the following steps:
        1.  It must call kill-all-local-variables, which removes the definitions for all buffer-local variables. This effectively turns off whatever modes, major and minor, were previously active.
            ```emacs
            (kill-all-local-variables)
            ```
        2.  It must set the variable marjor-mode to name-mode.
            ```emacs
            (setq major-mode 'quip-mode)
            ```
        3.  It must set the variable mode-name to a shor string describing the mode, to be used in the buffer's mode line
            (setq mode-name "Quip")
        4.  It must install the mode-specific keymap, if any, by calling use-local-map  on name-mode-map.
        5.  It must run the user's hook functions by calling run-hooks on namemode-hook.
            ```emacs
            (run-hooks 'quip-mode-hook)
            ```
    8.  It must "provide" the feature implemented by this mode by calling provide on name.
        ```emacs
        (provide 'quip)  ; allows users to (require 'quip)
        ```

<!--list-separator-->

-  define-derived-mode

    从一个模式推导一个新模式。

    ```Emacs
    (define-derived-mode new-mode old-mode mode-line-string
      docstring
      body1
      body2
      ...)
    ```


### 宏 {#宏}


#### 相关函数 {#相关函数}

<!--list-separator-->

-  macroexpand

    宏展开


#### Tips {#tips}

<!--list-separator-->

-  宏与函数的区别

    函数不会修改外部变量的值，而宏会把传进去的参数做一个宏展开，会修改外部变量。

<!--list-separator-->

-  \` Backquote

    \`引用的S表达式里如果使用了,符号会展开,符号关联的S表达式。

<!--list-separator-->

-  ,@varname: 将参数中的最外层括号去掉。将参数拼接到代码中

    ```emacs
    (defmacro limited-save-excursion (&rest subexprs)
      "Like save-excursion, but only restores point. "
      '(let ((roig-point (point)))
      ,@subexprs
      (goto-char orig-point))
    )
    ```

<!--list-separator-->

-  make-symbol

    创建符号，

<!--list-separator-->

-  unwind-protect

    它可以在出现错误或使用throw时进行一些清理操作

    ```emacs
    (defmacro limited-save-excusion (&rest subexprs)
      "Like save-excursion, but only restores point."
      (let ((orig-point-symbol (make-symbol "orig-point")))
        '(let ((,orig-point-symbol (point)))
          (unwind-protect
              (progn ,@subexprs)
            (goto-char ,orig-point-symbol)))))
    ```


### 库 {#库}


#### use-package {#use-package}

<!--list-separator-->

-  :init

    会在require之前执行

<!--list-separator-->

-  :config

    会在require之后执行， 里边如果有多条语句，可以使用(progn)包起来。

<!--list-separator-->

-  :commands

    当我们调用一个命令的时候才加载对应的包

<!--list-separator-->

-  :bind

    修改按键绑定
