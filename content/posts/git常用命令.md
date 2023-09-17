+++
title = "Git常用命令"
date = 2022-11-25
tags = ["CSV", "GIT"]
categories = ["CSV", "GIT", "CSV", "GIT"]
draft = false
+++

## Git常用命令 {#git常用命令}


### 新建代码库 {#新建代码库}

-   在当前目录新建一个Git代码库

&gt; git init

-   新建一个目录，将其初始化为Git代码库

&gt; git init [Project_name]

-   下载一个项目和它的整个代码历史

&gt; git clone [url]


### 配置 {#配置}

-   添加指定文件到暂存区

&gt; git add [fileName] ...

-   添加当前目录的所有的文档到暂存区

&gt; git add .

-   删除工作区文件，并且将这次删除放入暂存区

&gt; git rm [fileName] ...

-   停止追踪指定文件，但该文件会保留在工作区
    &gt; git rm --cached [filename]
-   改名文件，并且将这个改名放入暂存区
    &gt; git mv [file-original] [file-renamed]
-   全局配置忽略Linux与Windows回车的类型
    ```shell
    git config --global core.autocrlf true
    ```


### 代码提交 {#代码提交}

-   提交暂存区到仓库区
    &gt; git commit -m [Message]
-   提交暂存区的指定文件到仓库区
    &gt; git commit [file1] [file2] ... -m [message]
-   提交工作区自上次commit之后的变化，直接到仓库区
    &gt; git commit -a
-   提交时显示所有diff信息
    &gt; git commit -v
-   使用一次新的commit, 替代上一次提交，如果代码没有变化，则用来改写上一次commit的提交信息
    &gt; git commit --amend -m [message]
-   重做上一次commit, 并包括指定文件的新变化
    &gt; git commit --amend ...


### 分支 {#分支}

-   列出所有本地分支

&gt; git branch

-   列出所有远程分支
    &gt; git branch -r
-   列出所有本地分支和远程分支
    &gt; git branch -a
-   新建一个分支，但依然停留在当前分支

&gt; git branch [branch_name]

-   新建一个分支，并切换到该分支
    &gt; git checkout -b [branch_name]
-   新建一个分支，指向指定的commit

&gt; git branch [branch_name] [commit_id]

-   新建一个分支，与指定的远程分支建立追踪关系
    &gt; git branch --track [branch_name] [remote_branch]
-   切换到指定分支，并更新工作区

&gt; git checkout [branch_name]

-   建立追踪关系，在现有分支与指定远程分支之间
    &gt; git branch --set-upstream [branch_name] [remote-branch]
-   合并指定分支到当前分支

&gt; git merge [branch_name]

-   选择一个commit,合并到当前分支
    &gt; git cherry-pick [commit]
-   删除分支
    &gt; git branch -d [branch_name]
-   删除远程分支
    &gt; git push origin --delete
    &gt; git branch -dr
-   列出所有tag

&gt; git tag

-   新建一个Tag在当前commit

&gt; git tag [tag_name]

-   查看tag信息

&gt; git show [tag_name]

-   提交指定Tag

&gt; git push [remote] [tag]

-   提交所有Tag
    &gt; git push [remote] --tags
-   新建一个分支，指向某个Tag
    &gt; git checkout -b [branch_name] [tag_name]


### 查看信息 {#查看信息}

-   显示有变更的文件

&gt; git status

-   显示当前分支的版本历史

&gt; git log

-   显示commit历史，以及每次commit发生变更的文件
    &gt; git log --stat
-   显示某个文件的版本历史，包括文件改名
    &gt; git log --follow [file]

&gt; git whatchanged [file]

-   显示指定文件相关的每一次diff
    &gt; git log -p [file]
-   显示指定文件是什么人在什么时候修改过

&gt; git blame [file_name]

-   显示暂存区和工作区的差异

&gt; git diff

-   显示暂存区和上一个commit的差异
    &gt; git diff --cached []
-   显示工作区与当前分支最新commit之间的差异

&gt; git diff HEAD

-   显示两次提交之间的差异

&gt; git diff [first_branch] ... [second_branch]

-   显示某次提交的元数据和内容变化

&gt; git show [commit]

-   显示某次提交发生变化的文件
    &gt; git show --name-only [commit]
-   显示某次提交旱，某个文件的内容

&gt; git show [commit]:[fileName]

-   显示当前分支的最近几次提交

&gt; git reflog

-   查看哪些文件在某个提交commit中有变更
    git whatchanged


### 远程同步 {#远程同步}

-   下载远程仓库的所有变动

&gt; git fetch [remote]

-   显示所有远程仓库
    &gt; git remote -v
-   显示某个远程仓库的信息

&gt; git remote show [remote]

-   增加一个新的远程仓库，并命名

&gt; git remote add [shornamt] [url]

-   取回远程仓库的变化，并与本地分支合并

&gt; git pull [remote] [branch]

-   上传本地指定分支到远程仓库

&gt; git push [remote] [branch]

-   强行推送当前分支到远程仓库，即使有冲突
    &gt; git push [remote] --force
-   推送所有分支到远程仓库
    &gt; git push [remote] --all


### 撤消 {#撤消}

-   恢复暂存区的指定文件到工作区

&gt; git checkout [filename]

-   恢复某个commit的指定文件到工作区

&gt; git checkout [commit] [file]

-   恢复上一个commit的所有文件到工作区

&gt; git checout .

-   重置暂存区的指定文件，与上一次commit保持一致，但工作区不变

&gt; git reset [file]

-   重置暂存区与工作区， 与上一次commit保持一致
    &gt; git reset --hard
-   重置当前分支 的指针 为指定 commit, 同时重置暂存区，但工作区不变

&gt; git reset [commit]

-   重置当前分支 的HEAD为指定commit,同时重置暂存区和工作区，与指定commit一致
    &gt; git reset --hard [commit]
-   重置当前HEAD为指定commit， 但保持 暂存区和工作区不变
    &gt; git reset --keep [commit]
-   新建一个commit，用来撤消指定的commit,后者的所有变化 都将被前者抵消，并且 应用到当前分支

&gt; git revert [commit]


### 其他 {#其他}

-   生成一个可供发布的压缩包
    git archiv
-   备份当前工作区的修改
    git stash
-   备份当前工作区的修改及新增
-   从Git栈中读取最近一次保存的内容，恢复工作区的相关内容
    git stash pop
-   显示Git栈内的所有备份
    git stash list
-   清空Git栈
    git stash clear


### Other {#other}

git init                                                  # 初始化本地git仓库（创建新仓库）
git config --global user.name "xxx"                       # 配置用户名
git config --global user.email "xxx@xxx.com"              # 配置邮件
git config --global color.ui true                         # git status等命令自动着色
git config --global color.status auto
git config --global color.diff auto
git config --global color.branch auto
git config --global color.interactive auto
git clone git+ssh://git@192.168.53.168/VT.git             # clone远程仓库
git status                                                # 查看当前版本状态（是否修改）
git add xyz                                               # 添加xyz文件至index
git add .                                                 # 增加当前子目录下所有更改过的文件至index
git commit -m 'xxx'                                       # 提交
git commit --amend -m 'xxx'                               # 合并上一次提交（用于反复修改）
git commit -am 'xxx'                                      # 将add和commit合为一步
git rm xxx                                                # 删除index中的文件
git rm -r \*                                               # 递归删除
git log                                                   # 显示提交日志
git log -1                                                # 显示1行日志 -n为n行
git log -5
git log --stat                                            # 显示提交日志及相关变动文件
git log -p -m
git log --online --since="2022-01-01" --until="2022-12-01" --author="WhatsUpeng" # 查看WhatsUpeng在2022-01-02至2022-12-01的所有的提交纪录。
git show dfb02e6e4f2f7b573337763e5c0013802e392818         # 显示某个提交的详细内容
git show dfb02                                            # 可只用commitid的前几位
git show HEAD                                             # 显示HEAD提交日志
git show HEAD^                                            # 显示HEAD的父（上一个版本）的提交日志 ^^为上两个版本 ^5为上5个版本
git tag                                                   # 显示已存在的tag
git tag -a v2.0 -m 'xxx'                                  # 增加v2.0的tag
git show v2.0                                             # 显示v2.0的日志及详细内容
git log v2.0                                              # 显示v2.0的日志
git diff                                                  # 显示所有未添加至index的变更
git diff --cached                                         # 显示所有已添加index但还未commit的变更
git diff HEAD^                                            # 比较与上一个版本的差异
git diff HEAD -- ./lib                                    # 比较与HEAD版本lib目录的差异
git diff origin/master..master                            # 比较远程分支master上有本地分支master上没有的
git diff origin/master..master --stat                     # 只显示差异的文件，不显示具体内容
git remote add origin git+ssh://git@192.168.53.168/VT.git # 增加远程定义（用于push/pull/fetch）
git branch                                                # 显示本地分支
git branch --contains 50089                               # 显示包含提交50089的分支
git branch -a                                             # 显示所有分支
git branch -r                                             # 显示所有原创分支
git branch --merged                                       # 显示所有已合并到当前分支的分支
git branch --no-merged                                    # 显示所有未合并到当前分支的分支
git branch -m master master_copy                          # 本地分支改名
git checkout -b master_copy                               # 从当前分支创建新分支master_copy并检出
git checkout -b master master_copy                        # 上面的完整版
git checkout features/performance                         # 检出已存在的features/performance分支
git checkout --track hotfixes/BJVEP933                    # 检出远程分支hotfixes/BJVEP933并创建本地跟踪分支
git checkout v2.0                                         # 检出版本v2.0
git checkout -b devel origin/develop                      # 从远程分支develop创建新本地分支devel并检出
git checkout -- README                                    # 检出head版本的README文件（可用于修改错误回退）
git merge origin/master                                   # 合并远程master分支至当前分支
git cherry-pick ff44785404a8e                             # 合并提交ff44785404a8e的修改
git push origin master                                    # 将当前分支push到远程master分支
git push origin :hotfixes/BJVEP933                        # 删除远程仓库的hotfixes/BJVEP933分支
git push --tags                                           # 把所有tag推送到远程仓库
git fetch                                                 # 获取所有远程分支（不更新本地分支，另需merge）
git fetch --prune                                         # 获取所有原创分支并清除服务器上已删掉的分支
git pull origin master                                    # 获取远程分支master并merge到当前分支
git mv README README2                                     # 重命名文件README为README2
git reset --hard HEAD                                     # 将当前版本重置为HEAD（通常用于merge失败回退）
git rebase
git branch -d hotfixes/BJVEP933                           # 删除分支hotfixes/BJVEP933（本分支修改已合并到其他分支）
git rebase -i HEAD~n                                      # 合并前n次提交为一次提交
git branch -D hotfixes/BJVEP933                           # 强制删除分支hotfixes/BJVEP933
git ls-files                                              # 列出git index包含的文件
git show-branch                                           # 图示当前分支历史
git show-branch --all                                     # 图示所有分支历史
git whatchanged                                           # 显示提交历史对应的文件修改
git revert dfb02e6e4f2f7b573337763e5c0013802e392818       # 撤销提交dfb02e6e4f2f7b573337763e5c0013802e392818
git ls-tree HEAD                                          # 内部命令：显示某个git对象
git rev-parse v2.0                                        # 内部命令：显示某个ref对于的SHA1 HASH
git reflog                                                # 显示所有提交，包括孤立节点
git show HEAD@{5}
git show master@{yesterday}                               # 显示master分支昨天的状态
git log --pretty=format:'%h %s' --graph                   # 图示提交日志
git show HEAD~3
git show -s --pretty=raw 2be7fcb476
git stash                                                 # 暂存当前修改，将所有至为HEAD状态
git stash list                                            # 查看所有暂存
git stash show -p stash@{0}                               # 参考第一次暂存
git stash apply stash@{0}                                 # 应用第一次暂存
git grep "delete from"                                    # 文件中搜索文本“delete from”
git grep -e '#define' --and -e SORT_DIRENT
git gc
git fsck
git config --global core.autocrlf input			  # 在LInux下忽略Winodws与Linux的换行符的不同


## Tips {#tips}


### 忽略文件Mode的配置 {#忽略文件mode的配置}

```shell
git config --add core.filemode false
```


## 常用问题处理 {#常用问题处理}


### push相关 {#push相关}


#### ! [remote rejected] master -&gt; master (shallow update not allowed) {#remote-rejected-master-master--shallow-update-not-allowed}

<!--list-separator-->

-  原因

    -   因为使用git clone时使用了--depth &lt;number&gt;复制本地版本。这样的克隆将限制你不能将它捈新的存储库。

<!--list-separator-->

-  解决

    -   如果想把它推入到新的存储库，需要从旧存储库中拉取所有深度
        ```shell
        git fetch --unshallow oldOrigin
        ```
