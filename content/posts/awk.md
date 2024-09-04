+++
title = "Awk入门"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
categories = ["Linux"]
draft = false
+++

## AWK语言 {#awk语言}


## 变量 {#变量}

1.  NF： awk计算当前行的字段数量
2.  NR： awk计算到目前为止，读取到的行的数量
3.  $0: 整行内容
4.  $1: 第一个字段
5.  $N: 第N个字段
6.  \#: 注释
7.  逻辑
    1.  &amp;&amp;
    2.  ||
    3.  !
8.  模式
    1.  BEGIN
        在第一个输入文件的第一行之前被匹配
    2.  END
        在最后一个输入文件的最后一行被处理之后匹配例：
            awk -F ':' 'BEGIN {print "id    name    shell"; print ""}
            {emp = emp + 1; print NF, $1, $NF}
            END {print "total rows: ", emp}' /etc/passwd
    3.  expression { statements}
        每碰到一个使expression为真的输入行，statements就执行， expression为真指的是其值非零或非空
    4.  _regular expression_ {statements}
        当碰到这样一个输入行时， statements就执行： 输入行含有一段字符串，而该字符串可以被regular expression匹配
    5.  compound parttern {statements}
        一个复合模式将表达式用 &amp;&amp;(AND), ||(OR), !(NOT), 以及括号组合起来；当compound parttern为真时， statements执行。
    6.  pattern1, pattern2 { statemtnts }
        一个范围模式匹配多个输入行，这些输入行从匹配pattern1的行开始，到匹配pattern2的行结束（包括这两行）， 对这其中的每一行执行statements.

9.  流程控制
    1.  if
        if (condition)
           statement
        else
           other statement
    2.  while
        while (condition) {
            statement
        }
    3.  for
        for (i = 1; i &lt;= x; i = i + 1) {
            statement
        }
10. 数组


## 函数 {#函数}

1.  print
    print("total pay %.2f for $s"', $1, $3)
2.  length
    length($1)
