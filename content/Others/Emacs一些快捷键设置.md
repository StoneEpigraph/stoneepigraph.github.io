+++
title = "Emacs-shortcutKeys"
author = ["WhatsUpeng!!!"]
draft = false
+++

## Emacs shortcutKeys {#emacs-shortcutkeys}


### 基本快捷键（Basic） {#基本快捷键-basic}

-   C-x C-f 查找文件，即在缓冲区打开/新建一个文件
-   C-x C-s 保存文件
-   C-x C-w 使用其他文件名另存为文件
-   C-x C-v 关闭当前缓冲区文件并打开新文件
-   C-x i 在当前光标处插入文件
-   C-x b 新建/切换缓冲区
-   C-x C-b 显示缓冲区列表
-   C-x k 关闭当前缓冲区
-   C-z 挂起Emacs
-   C-x C-c 关闭Emacs


### 光标移动基本快捷键（Basic Movement） {#光标移动基本快捷键-basic-movement}

-   C-f 后一个字符
-   C-b 前一个字符
-   C-p 上一行
-   C-n 下一行
-   M-f 后一个单词
-   M-b 前一个单词
-   C-a 行首
-   C-e 行尾
-   C-v 向下翻一页
-   M-v 向上翻一页
-   M-&lt; 到文件开头
-   M-&gt; 到文件末尾


### 编辑（Editint） {#编辑-editint}

-   M-n 重复执行最后一个命令N次
-   C-u 重复执行后一个命令4次
-   C-u 重复执行后一个命令N次
-   C-d 删除后一个字符
-   Del 删除前一个字符
-   M-Del 删除前一个单词
-   C-k 移除到行尾
-   C-Space 设置开头标记
-   C-@ 设置开头标记，用于C-Space被操作系统拦截的情况
-   C-w 移除标记区域的内容
-   M-w 复制标记区域的内容
-   C-y 粘贴复制或移除的区域/行
-   M-y 粘贴更早的内容
-   C-x C-x 交换光标和标记
-   C-t 交换两个字符的位置
-   C-x C-t 交换两行的位置
-   M-t 交换两个单词的位置
-   M-u 使从光标位置到单词结尾处的字母变成大写
-   M-l 使从光标位置到单词结尾处的字母变成小写
-   M-c 使光标位置开始的单词的首字母变成大写
-   C-x r l 命名剪切板列表
-   C-x r s name 插入命令剪切板


### 重要快捷键 {#重要快捷键}

-   C-g 停止当前运行/输入的命令
-   C-x u 撤消前一个命令
-   M-x revert-buffer RET 撤消上次存盘后所有改动
-   M-x recover-file RET 从自动存盘文件恢复
-   M-x recover-session RET 如果编辑了几个文件，用这个恢复
-   C-c C-e 导出


### 在线帮助（Online-help） {#在线帮助-online-help}

-   C-h c 显示快捷键绑定的命令
-   C-h k 显示快捷键绑定的命令和它的作用
-   C-h l 显示最后100个键入的内容
-   C-h w 显示命令被绑定到哪些快捷键上
-   C-h f 显示函数的功能
-   C-h v 显示变量的含义和值
-   C-h b 显示当前缓冲区所有可用的快捷键
-   C-h t 打开Emacs教程
-   C-h i 打开info阅读器
-   C-h C-f 显示emacs FAQ
-   C-h p 显示本机Elisp包的信息


### 搜索/替换（Search/Replace） {#搜索-替换-search-replace}

-   C-s 向后搜索
-   C-r 向前搜索
-   C-g 回到搜索开始前的位置（如果你仍然在搜索模式中）
-   M-% 询问并替换（query replace）
    -   Space或y 替换当前匹配
    -   Del或n 不要替换当前匹配
    -   . 仅仅替换当前匹配并退出替换
    -   , 替换并暂停（按Space或y继续）
    -   ! 替换以下所有匹配
    -   ^ 回到上一个匹配位置
    -   RET或q 退出替换
-   M-x query-replace-regexp 使用下则表达式搜索并替换


### 窗口命令（Window Commands） {#窗口命令-window-commands}

-   C-x 2 水平分割窗口
-   C-x 3 垂直分割窗口
-   C-x o 切换至其他窗口
-   C-x 0 关闭窗口
-   C-x 1 关闭除了光标所在窗口外的所有窗口
-   C-x ^ 扩大窗口
-   M-x shrink-window 缩小窗口
-   M C-v 滚动其他窗口内容
-   C-x 4 f 在其他窗口中打开文件
-   C-x 4 0 关闭当前缓冲区和窗口
-   C-x 5 2 新建窗口
-   C-x 5 f 在新窗口中打开文件
-   C-x 5 o 切换至其他窗口
-   C-x 5 0 关闭当前窗口


### 书签命令（Bookmark commands） {#书签命令-bookmark-commands}

-   C-x r m 在光标当前位置创建书签
-   C-x r b 转到书签
-   M-x bookmark-rename 重命名书签
-   M-x bookmark-delete 删除书签
-   M-x bookmark-save 保存书签
-   C-x r l 列出书签清单
    -   d 标记等待删除
    -   Del 取消删除标记
    -   x 删除被标记的书签
    -   r 重命名书签
    -   s 保存列表内所有书签
    -   f 转到当前书签指向的位置
    -   m 标记在多窗口中打开
    -   v 显示被标记的书签（或者光标当前位置的书签）
    -   t 切换是否显示路径列表
    -   w 显示当前文件路径
    -   q 退出书签列表
    -   M-x bookmark-write 将所有书签导出至指定文件
    -   M-x bookmark-load 从指定文件导入书签


### Shell {#shell}

-   M-x shell 打开shell模式
-   C-c C-c 类似Unix里的C-c
-   C-d 删除光标后一个字符
-   C-c C-d 发送EOF
-   C-c C-z 挂起程序
-   M-p 显示前一条命令
-   M-n 显示后一条命令
-   C-u M-! shell Command 插入shell命令结果到当前窗口


### Directory Editor(dired) {#directory-editor--dired}

-   C-x d 打开dired
-   C（大写c）复制
-   d 标记等待删除
-   D 立即删除
-   e或f 打开文件或目录
-   g 刷新当前目录
-   G改变文件所属组（chgrp）
-   k 从屏幕上的列表里删除一行（不是真的删除）
-   m 用\*标记
-   n 光标移动到下一行
-   o 在另一个空格打开文件并移动光标
-   C-o 在另一个窗口打开文件但不移动光标
-   P 打印文件
-   q 退出dired
-   Q 在标记的文件中替换
-   R 重命名文件
-   u 移除标记
-   v 显示文件内容
-   x 删除有D标记的文件
-   ^ 返回上一级目录
-   Z 压缩/解压缩文件
-   M-Del 移除标记（默认为所有类型的标记）
-   ~ 标记备份文件（文件名有~的文件）等待删除
-   \# 标记自动保存文件（文件名形如#name#）等待删除
-   \*/ 用\*标记所有文件夹（用C-u \*/n移除标记）
-   = 将当前文件和标记文件（使用C-@标记而不是dired的m标记）比较
-   M-= 将当前文件和它的备份比较
-   ! 对当前文件应用shell命令
-   M-} 移动光标至下一个用\*或D标记的文件
-   M-{ 移动光标至上一个用\*或D标记的文件
-   % d 使用正则表达式标记文件等待删除
-   % m 使用正帽表达式标记文件为\*
-   + 新建文件夹
-   &gt; 移动光标至后一个文件夹
-   &lt; 移动光标至前一个文件夹
-   s 切换排序模式（按文件名/日期）
-   M-x speedbar 打开一个独立的窗口显示目录


### Telnet {#telnet}

-   M-x telnet 打开telnet模式
-   C-d 删除后一个字符或发送EOF
-   C-c C-c 停止正在运行的程序
-   C-c C-d 发送EOF
-   C-c C-o 清除最后一个命令的输出
-   C-c C-z 挂起正在运行的命令
-   C-c C-u 移除前一行
-   M-p 显示前一条命令


### Text {#text}

如下命令只能在Text模式里使用

-   M-s 使当前行居中
-   M-S 使当前段落居中
-   M-x center-region 使被选中的区域居中


### 宏命令（Macro-commands） {#宏命令-macro-commands}

-   C-x ( 开始定义宏
-   C-x ) 结束定义宏
-   C-x e 运行最近定义的宏
-   M-n C-x e 运行最近定义的宏N次
-   M-x name-last-kbd-macro 给最近定义的宏命名（用来保存）
-   M-x insert-kbd-macro 将已命名的宏保存到文件
-   M-x load-file 载入宏


### 编程（programming） {#编程-programming}

-   M C-/ 自动缩进光标和标记间的区域
-   M-m 移动光标到行首第一个（非空格）字符
-   M-^ 将当前行接到上一行末尾处
-   M-; 添加缩进并格式化的注释
-   C, C++和Java模式
    -   M-a 移动光标到声明的开始处
    -   M-e 移动光标到声明的结尾处
    -   M C-a 移动光标到函数的开始处
    -   M C-e 移动光标到函数的结尾处
    -   C-c RET 将光标移动到函数的开始处并标记到结尾处
    -   C-c C-q 根据缩进风格缩进整个函数
    -   C-c C-a 切换自动换行功能
    -   C-c C-d 一次性删除光标后的一串空格(greedy delete)


### Org-mode {#org-mode}
