+++
title = "VIM"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
tags = ["Linux", "VIM", "编辑器"]
categories = ["Linux"]
draft = false
+++

## 移动光标 {#移动光标}

1.  h j k l
2.  { 移动到上一段
3.  }: 移动到下一段


## 搜索 {#搜索}

1.  f加上你想在本行光标往后搜索的字母
2.  在想要搜索的word上按\*
3.  /


## 移动页面 {#移动页面}

1.  zz将光标所在行移动到屏幕中间
2.  zt： 将光标所在行移动到行首
3.  ab: 将光标所在行移动到行尾


## 选择 {#选择}

1.  v: 进入visual 模式
2.  V: 进入visual line模式


## 操作 {#操作}

1.  y: 复制选中的内容
2.  yy: 复制一整行
3.  p： 在光标后边粘贴
4.  P: 在光标前边粘贴
5.  u: 撤消上一步操作
6.  U：撤消光标落在此行后的所有修改
7.  .：重做上一步，
8.  c - r : 重作上一步, 重做上一步撤消的内容
9.  n. 重做N次上一步
10. "ay: 将内容放到a暂存区
11. "ap: 将a暂存区的内容粘贴到当前
12. d： 删除选中的内容
13. D：删除光标到行尾的内容

11.dd: 删除当前行内容

1.  c: 删除选中内容后进入插入模式
2.  C：删除光标到行尾的内容并进入插入模式
3.  r：替换光标的内容为下一次输入的内容
4.  &gt;&gt;: 将当前行向右缩排 shiftwidth 个字符
5.  &lt;&lt;: 将当前行向左缩排 shiftwidth 个字符
6.  =： 将选中的代码做自动缩排


## 多视窗 {#多视窗}

1.  使用:e filename 打开一个新的文件
2.  :tabe filename 新开一个tab
3.  gt: 移动到下一个tab
4.  gT: 移动到上一个tab
5.  :new 开一个新的水平视窗
6.  c - w w： 移动到下一个视窗
7.  :vnew: 开一个垂直视窗
8.  vim -p: 以tabe方式打开多个文件
9.  vim -o 以水平分隔方式打开多个文件
10. vim -O 以垂直方式打开多个文件
11. :ls： 查看当前开了哪些文件
12. :bN: 切换到第N个buffer
13. c - 6: 切换到上一个buffer
14. :bn 切换到下一个buffer
15. :b filename 切换到指定的buffer
16. :bd: 关闭当前buffer
17. :tabe ba：将所有的文件以tab形式打开
18. C - v 进入 visual block模式
19. viw: 选中当前光标所在的单词
20. vaw： 选中当前光标所在的单词（大）
21. vit: 选择tag内的内容
22. vat: 选择当前tag整个内容
23. v}： 选中当前到段尾
24. vi": 选中双引号之间的内容
25. vi": 选择双引号连还双引号的内容
26. di": 删除双引号之间的内容,其中双引号可以替换成单引号，括号等
27. vip: 选中当前段落
28. yip: 复制当前段落
29. dip: 删除当前段落
30. vNw: 选中之后的N个单词
31. ^: 移动光标到行首，去除空格
32. 0： 移动光标到行乎，含空格
33. :h key-notation: 查看key的的一些说明
34.


## 常用设置 {#常用设置}

1.  set nu
2.  set cursorline
3.  set noswapfile
4.  set hlsearch
5.  set ignorecase
6.  set incsearch
7.  set softtabstop=2
8.  set shiftwidth=2
9.  set expandtab

9 set showtabline=2

1.  set splitbelow
2.  set splitright
3.  syntax on
4.  colorscheme darkblue
5.  filetype on
6.  filetype indent on
7.  filetype plugin on
8.  :h vimfiles 查看vim的配置文件帮助


## 常用参数 {#常用参数}


### -d 以diff方式打开vim {#d-以diff方式打开vim}
