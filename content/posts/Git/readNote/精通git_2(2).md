+++
title = "精通Git(2)"
author = ["WhatsUpeng!!!"]
date = 2022-11-25
categories = ["GIT"]
draft = false
+++

## 精通Git {#精通git}


### Git基础 {#git基础}


#### 获取Git仓库 {#获取git仓库}

```shell
$ git init
```


#### 记录每次更新到仓库 {#记录每次更新到仓库}

```shell
git add .
git commit -m 'commit mesg'
```


#### 查询提交历史 {#查询提交历史}

\#+END_SRC
git log
\#+END_SRC


#### 撤消操作 {#撤消操作}

```shell
git commit --amend
```

这个命令会将暂存区中的文件提交，如果自上次提交以来你还未做任何修改，那么快照会保持不变，而你所修改的只是提交信息。
e.g.

```shell
git commit -m 'initial commit'
git add ofrgotten_file
git commit --amend
```

最终你只会有一个提交 - 第二冷饮提交将代替第一次提交的结果。

<!--list-separator-->

-  取消暂存的文件

    ```shell
    git reset HEAD
    ```

<!--list-separator-->

-  撤消对文件的修改

    ```shell
    git checkout xxx.file
    ```


#### 远程仓库的使用 {#远程仓库的使用}

<!--list-separator-->

-  查看远程仓库

    ```shell
    get remote -v
    ```

<!--list-separator-->

-  添加远程仓库

    ```shell
    git remote add <shortname> <url>
    ```

<!--list-separator-->

-  从远程仓库中抓取与拉取

    \#+END_SRC
    git fetch [remote-name]
    \#+END_SRC

<!--list-separator-->

-  推送到远程仓库

    \#+END_SRC
    git push origin master
    \#+END_SRC

<!--list-separator-->

-  查看远程仓库

    ```shell
    git remote show origin
    ```

<!--list-separator-->

-  远程仓库的重命名

    ```shell
    git remote rename oldname newname
    ```

<!--list-separator-->

-  远程仓库的移除

    ```shell
    git remote rm remotename
    ```


#### 标签 {#标签}

<!--list-separator-->

-  列出标签

    ```shell
    git tag
    ```

    ```shell
    git tag -l 'XXXX*'
    ```

<!--list-separator-->

-  创建标签

    -   附注标签 -a选项

    <!--listend-->

    ```shell
    git tag -a v1.4 -m 'version 1.4'
    ```

    ```shell
    git show v1.4
    ```

    -   轻量标签

    <!--listend-->

    ```shell
    git tag v1.4-lw
    ```

    -   后期打标签

    <!--listend-->

    ```shell
    git tag -a v1.2 commitId
    ```

<!--list-separator-->

-  共享标签

    ```shell
    git push origin tagname
    ```

    如果想一次性推送很多标签可以使用带有--tags

    ```shell
    git push origin --tags
    ```

<!--list-separator-->

-  检出标签

    ```shell
    git checkout -b [branchname] [tagname]
    ```


#### Git别名 {#git别名}

```shell
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```


### Git分支 {#git分支}


#### 分支简介 {#分支简介}

<!--list-separator-->

-  分支创建

    ```shell
    git branch branchname
    ```

    Git通过一个名为HEAD的特殊指针区分当前是在拿一个分支上。可以将HEAD想像成当前分支的别名。可以使用git log命令查看各个分支当前所指的对象。

    ```shell
    git log --oneline --decorate
    ```

<!--list-separator-->

-  分支切换

    ```shell
    git checkout branchname
    ```

    切换后HEAD就会指向新的branchname
    可以使用git log 查看分叉历史

    ```shell
    git log --oneline --decorate --graph --all
    ```


#### 分支的新建与合并 {#分支的新建与合并}

```shell
git checkout -b branchname
```

这条命令相当于

```shell
git branch branchname
git checkout branchname
```

<!--list-separator-->

-  将新分支合并到主分支上

    ```shell
    git checkout master   *切换回主分支
    git merge branchname   * merge分支到主分支
    ```

<!--list-separator-->

-  删除无用分支

    ```shell
    git branch -d branchname
    ```

<!--list-separator-->

-  遇到冲突时的分支合并

    ```shell
    git mergetool
    ```

    该命令会为你启动一个合适的可视化合并工具然后

    ```shell
    git add .
    git commit -m 'xxxxx'
    ```


#### 分支管理 {#分支管理}

<!--list-separator-->

-  查看分支

    ```shell
    git branch
    ```

    会列出所有的分支，带\*字符的表示当前检出的分支如果想查看每个分支的最后一次提交可以

    ```shell
    git branch -v
    ```

    --merged与--no-merged这两个选项可以过滤这个列表中或沿示合并到当前分支 的分支。

    ```shell
    git branch --merged
    ```

    这个列表中不带\*号的分支表示已经合并到当前分支了，可以安全删除还可以查看尚未合并到当前分支的分支

    ```shell
    git branch --no-merged
    ```

    这里显示的分支使用git branch -d删除会失败。因为会丢失信息。不过可以使用git branch -D强制删除

    ```shell
    git branch -D branchname * 强制删除分支
    ```


#### 分支开发工作流 {#分支开发工作流}


#### 远程分支 {#远程分支}

显示获得远程引用的完整列表

```shell
git ls-remote
```

<!--list-separator-->

-  推送

    ```shell
    git push (remote) (branchname)
    ```

    将branchname推送到remote服务器或

    ```shell
    git push (remote) localbranchname: originbranchname
    ```

<!--list-separator-->

-  拉取

    将远程指定分支合并到当前所在分支

    ```shell
    git merge origin/branchname
    ```

    或建立本地分支跟踪远程分支

    ```shell
    git checkout -b localbranchname origin/remotebranchname
    ```

    或

    ```shell
    git checkout --track origin/remotebranchname
    ```

    设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支，你可以在任意时间使用-u或者--set-upstream-to 选项运行git branch来显示设置

    ```shell
    git branch -u origin/originbranchname
    ```

    如果想要查看设置的所有跟踪分支，可以使用git branch的-vv选项。这会将所有的本地分支列出来并且包含更多的信息，如每一个分支正在跟踪哪个远程分支与本地分支是否领先、落后或是都有。

    ```shell
    git branch -vv
    ```

    <!--list-separator-->

    -  git pull

        git pull = git fetch + get merge

<!--list-separator-->

-  删除远程分支

    ```shell
    git push origin --delete originbranchname
    ```


#### 变基 {#变基}

在Git中整合来自不同分支的修改主要 有两种方式：merge和rebase

<!--list-separator-->

-  rebase

    e.g.

    ```shell
    git checkout experiment
    git rebase master
    ```

    它的原理是首先找到这两个分支（即当前分支experiment,变基操作的目标基底分支master)的最近共同祖先，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件，然后将当前分支指向目标基底，最后以此将之前另存为临时文件的修改依序应用。现在回到master分支，进行一次快进合并
    \#+END_SRC
    git checkout master
    git merge experimet
    \#+END_SRC
     e.g.

    ```shell
    git rebase --onto master server client
    ```

    将client中的修改合并到主分支并发布，但暂时不合并server中的修改

    ```shell
    git rebase master server
    git checkout master
    git merge server
    ```

    将server中的修改变基到master上，server中的代码被“续”到了master后面。


### 服务器上的Git {#服务器上的git}


#### 协议 {#协议}

本地协议，HTTP协议，SSH协议以及Git协议。

<!--list-separator-->

-  本地协议

    本地协议中，无程版本库就是硬盘内的另一个目录，常见于团队每个成员都对一个共享的文件系统拥有访问权。
    e.g.

    ```shell
    git clone /opt/git/project.git
    ```

    或

    ```shell
    git clone file:///opt/git/project.git
    ```

    增加一个本地版本库到现有的Git项目

    ```shell
    git remote add local_proj /opt/git/project.git
    ```

    -   优点
        -   简单
    -   缺点
        -   共享文件系统比较难配置，并且比起基本的网络连接访问，不方便从多个位置访问。

<!--list-separator-->

-  HTTP协议

    <!--list-separator-->

    -  智能（Smart）HTTP协议

    <!--list-separator-->

    -  哑（Dumb）HTTP协议

        -   优点
            -   不同的访问方式只需要一个URL以及服务器只需要授权时提示输入授权信息
            -   HTTP/S协议被广泛使用，一般企业防火墙都会允许这些端口的数据通过。
        -   缺点
            -   在一些服务顺上，架设HTTP/S协议的服务端会比SSH协议的棘手一些。

<!--list-separator-->

-  SSH协议

    ```shell
    git clone ssh://user@server/project.git
    ```

    或 scp式写法
    \#+END_SRCsell
    git clone user@server:project.git
    \#+END_SRC

    -   优点
        -   SSH架设相对简单
        -   SSH访问是安全的
        -   与HTTP/S协议、Git协议及本地协议一样，SSH协议很高效，在传输前也会尽量压缩数据。
    -   缺点
        -   你不能通过他实现匿名访问。

<!--list-separator-->

-  Git协议

    这是包含在Git里的一个特殊的守护进程；它监听在一个特定的端口（9418），类似于SSH服务，但是访问无需任何授权。


#### 在服务器上搭建Git {#在服务器上搭建git}

-   将现有的仓库导出为裸仓库--即一个不包含当前工作目录的仓库

<!--listend-->

```shell
git clone --bare my_project my_project.git
```

现在，你的my_project.git目录中应该有Git目录的副本了。整体上效果大致相当于

```shell
cp -Rf my_project/.git my_project.git
```

-   把裸仓库放到服务器上

假设服务器git.example.com的服务器已经架设好 ，并可以通过SSH连接，你想把所有的Git仓库放在/opt/git目录下，你可以通过以下命令复制你的裸仓库来创建一个新仓库：

```shell
scp -r my_project.git user@git.example.com:/opt/git
```

此时，其他通过SSH连接这台服务器并对/opt/git目录拥有可读权限的使用者，通过运行以下命令就可以克隆你的仓库。

```shell
git clone user@git.example.com:/opt/git/my_project.git
```


#### GitLab {#gitlab}

可以在<http://bitnami.com/stack/gitlab%E4%B8%8A%E8%8E%B7%E5%8F%96%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E5%8C%85>， 同时调整配置使之符合你的特定的环境。
