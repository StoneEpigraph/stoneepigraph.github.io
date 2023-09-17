+++
title = "Gitignore"
date = 2022-11-25
categories = ["CSV", "GIT"]
draft = false
+++

## 规则 {#规则}

-   _mtk_ 过滤整个文件夹
-   \*.zip 过滤所有.zip文件
-   /mtk/do.c 过滤某个具体文件
-   !\*.zip 反忽略
-   !/mtk/one.txt反忽略
-   \*.a       # 忽略所有 .a 结尾的文件
-   !lib.a    # 但 lib.a 除外
-   /TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
-   build/    # 忽略 build/ 目录下的所有文件
-   doc/\*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
