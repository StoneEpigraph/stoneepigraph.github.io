+++
title = "SVN常用命令"
date = 2022-11-25
categories = ["CSV", "SVN"]
draft = false
+++

## 常用SVN命令 {#常用svn命令}

1.  svn checkout 签出,创建新的工作拷贝.
2.  svn info 搞清楚工作拷贝从哪里来的.
3.  svn update 从项目仓库中更新目录中的所有文件
4.  svn add 添加文件的目录到项目仓库中
5.  svn propset 设置文件的属性
6.  svn add 添加文件
7.  svn delete 删除文件
8.  svn move src.file dist.file 移动文件
9.  svn commit -m '提交信息'
10. svn log filename 查看指定文件的历史
11. svn diff 展示文件版本之间的差异.
    1.  在版本之间找差异
        svn diff -r19:21 filename
        使用-r选项来指定一个版本范围
12. svn revert 删掉本地改动并使用项目仓库中的文件版本
13. svn resolved 修正冲突后执行
14. svn blame 显示每个文件的每一行最后的版本, 以及做出这个改动的人
15. svn update 获取最新的代码
16. svn merge -r 27:26 filename 移除file中版本27的改动
17. svn lock filename 给文件加锁
