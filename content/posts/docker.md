+++
title = "Docker笔记"
date = 2022-11-25
categories = ["Docker", "Container"]
draft = false
+++

## 入门 {#入门}


### 什么是Docker {#什么是docker}

docker是一个容器技术。


### Docker的优势 {#docker的优势}

1.  一致的运行环境， 更轻松的迁移。
2.  对进程进行封装隔离，容器与容器之间互不影响，更高效的利用系统资源。
3.  通过镜像复制多个环境一致的容器。


### Docker与虚拟机的对比 {#docker与虚拟机的对比}

1.  Docker占用磁盘少
2.  Docker的引擎比虚拟机系统占用CPU资源低
3.  Docker启动速度快
4.  Docker安装管理方便
5.  Docker从第二次部署开始轻松简捷
6.  Docker可以每个应用使用一个服务，服务隔离
7.  Docker推荐使用Linux，不推荐使用Windows


### 安装及配置 {#安装及配置}

1.  下载安装
2.  配置
    1.  启动Docker
        ```shell
        sudo systemctl enable docker
        sudo systemctl start docker
        ```
    2.  创建Docker用户组
        ```shell
        sudo groupadd docker
        ```
    3.  将当前用户添加到docker组
        ```shell
        sudo usermod -aG docker $USER
        ```
    4.  测试Docker是否安装正确
    5.  重启Docker
        ```shell
        sudo systemctl restart docker
        ```


### Docker核心概念 {#docker核心概念}


#### 整体架构图 {#整体架构图}

{{< figure src="/ox-hugo/2021-01-10_17-34-07_screenshot.png" >}}


#### 仓库 Repository {#仓库-repository}

-   定义： 用来存储Docker中的镜像。
-   分类：
    -   远程仓库
    -   本地仓库： 当前自己机器中下载镜像存储位置。


#### 镜像 Image {#镜像-image}

-   定义： 一个镜像代表一个软件安装包。
-   特点： 只读


#### 容器 Container {#容器-container}

-   定义： 基于某个镜像启动的实例，称之为一个服务。
-   特定： 可读可写


### 常用命令 {#常用命令}


#### 引擎， 以及镜像相关的操作 {#引擎-以及镜像相关的操作}

1.  docker info
2.  docker --help || docker 查看docker所有帮助命令
3.  docker version
4.  docker 执行命令格式： docker [options] command


#### 操作镜像images的相关命令 {#操作镜像images的相关命令}

1.  查看本地的镜像
    docker images
2.  下载新的镜像
    docker pull dockerImageName:dockerVersion
    docker pull dockerImageName:@digest(摘要)
3.  搜索镜像
    docker search dockerImageName
4.  删除镜像
    docker image rm dockerImageName:dockerVersion
    docker image rm dockerImageId
    docker rmi ...


#### 容器相关 Container {#容器相关-container}

1.  运行容器
    docker run dockerImageName:tag | 镜像ID
    1.  映射端口
        docker run -p 宿主机端口:容器内服务端口 dockerImageName
    2.  后台运行
        -d
    3.  给容器命名，唯一
        --name containerName
    4.  -it
2.  导入容器
    docker load -i dockerTag.tar
3.  查看当前运行的容器
    docker ps
    -   查看所有的容器，包括已停止的
        docker ps -a
    -   返回正在运行的容器ID
        docker ps -q
4.  重启，停止容器
    docker start dockerContainerId | dockerName
    docker restart dockerContainerid | dockerName
    docker stop dockerCOntainerid | dockerName
5.  删除容器
    docker rm dockerContainerId | dockerName
    1.  强制删除， 包括正在运行的容器
        docker rm -f dockerContainerid | dockerName
6.  查看容器内运行日志
    docker log dockerContainerid | dockerName
    1.  实时查看日志
        -f
    2.  加入时间戳实时展示日志
        -t
    3.  显示指定行数的日志
        --tail Number
7.  查看容器内的进程
    docker top dockerContainerid | dockerName
8.  与容器内部进行交互
    docker exec -it dockerCOntainerid | dockerName Command [args]
9.  宿主与容器的传输文件
    1.  从容器到操作系统
        docker cp dockerContainerid | dockerName :/path/file ./file
    2.  从宿主到容器
        docker cp 文件 | 目录 dockerContainerid | dockerName: 容器内目录
10. 查看容器内部细节
    docker inspect dockerContainerid | dockerName
11. 数据卷 Volume
    1.  使用： 实现襥机系统与容器之间的文件共享
    2.  特点：
        1.  数据卷可以在容器之间共享和重用。
        2.  对数据卷的修改会立即影响到对应容器。
        3.  对数据卷的更新修改，不会影响镜像。
        4.  数据卷默认会一直存在， 即使容器被删除。
    3.  使用
        1.  自定义数据卷
            docker run -v 宿主机目录:容器目录:ro dockerImageId
        2.  自动创建数据卷
            docker run -v 卷名:容器内路径 dockerImageId
    4.  查看卷
        docker volume inspect volumeName
        docker volume ls
12. 将正在运行的容器打包成镜像
    docker commit -m '' -a '' dockerContainerid dockerImageName:dockerTag
13. 将镜像备份
    docker save 镜像名称:tag -o dockerBak-tag.tar


#### 网络配置 {#网络配置}

1.  docker容器与操作系统通信机制默认使用网桥
2.  docker网络使用注意: 一般在使用docker网桥实现容器与容器通信时，都是站在一个应用角度进行容器通信。

    1.  查看默认网桥配置
        docker network ls
    2.  创建自定义网桥
        docker network create brightName
    3.  删除网桥
        docker network rm brightName
    4.  查看网桥信息
        docker inspect brightName
    5.  删除无用的网络

    docker network prune

    1.  给一个窗口添加一个网络

    docker network connect bridge_name container_name

    1.  给一个容器删除一个网络

    docker network disconnect bridge_name container_name

<!--list-separator-->

-  网络相关

    <!--list-separator-->

    -  网络模式， 使用--network指定

        1.  bridge
            默认配置，隔离的网络配置
        2.  host
            与宿主机使用同一个网络环境， 不需要做网络转发，不过会占用宿主机的资源，比如端口。
            --network host
        3.  none
            无网络配置
        4.  container
            与指定容器使用同一个网络环境，但是文件系统还是隔离的。不过目前docker文档里没有对应的配置，有可能会在以后的更新中取消。
            --network container:container_name


### Dockerfile {#dockerfile}


#### 定义 {#定义}

用来帮助我们自己构建一个自定义镜像， Dockerfile成为镜像构建文件


#### 核心作用 {#核心作用}

用户可以将自己应用打包成镜像，这样就可以让我们应用进行容器运行。


#### 原理 {#原理}

-   Tips
    -   第一行Dockerfile都会构建成一个镜像，可以使用--no-cache禁用缓存。
    -   dockerfile所在的目录为docker的上下文目录，可以添加.dockerignore文件忽略文件


#### Dockerfile的相关命令 {#dockerfile的相关命令}

官方文档： <https://docs.docker.com/engine/reference/builder/>

<!--list-separator-->

-  FROME

    指当前镜像是基于的哪个镜像， 必须为Dockerfile的第行。

<!--list-separator-->

-  RUN

    构建镜像时需要运行的指令

    ```dockerfile
    RUN yum install -y vim
    RUN ["yum", "install", "-y", "vim"]
    ```

<!--list-separator-->

-  EXPOSE

    当前容器对外暴露的端口号只要暴露了端口才可能在运行时使用-p命令映射。

<!--list-separator-->

-  WORKDIR

    指定在创建容器后， 终端默认登录进来的工作目录可以是绝对目录也可是相对目录，如果指定的目录不存在，那么会自动创建。

<!--list-separator-->

-  ENV

    用来在构建镜像过程中设置环境变量,

<!--list-separator-->

-  ADD

    将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar包

<!--list-separator-->

-  COPY

    类似于ADD， 拷贝文件和目录到镜像中

<!--list-separator-->

-  VOLUME

    容器数据卷， 用于数据保存和持久化工作

<!--list-separator-->

-  CMD

    指定一个容器启动时要运行的命令， Dockerfile中可以有多个CMD命令，但只有最后一个生效，CMD会被docker run之后的参数替换

<!--list-separator-->

-  ENTRYPOINT

    指定一个容器启动时要运行的命令， ENTRYPOINT的目的和CMD一样，都是在指定容器启动程序及参数。如果想覆盖ENTRYPOINT，必须显示指定--entrypoint=Command


## Docker-Compose {#docker-compose}


### 常用命令 {#常用命令}


#### version {#version}

版本


#### networks (top Level) {#networks--top-level}

<!--list-separator-->

-  eg.

    ```yml
    networks:
      bjvm2_nacos:
        driver: bridge
        ipam:
          driver: default
          config:
    	- subnet: 172.25.0.0/16
    ```

<!--list-separator-->

-  参数说明

    -   bjvm2_nacos
        网络名称
    -   driver
        连接方式


#### services {#services}

服务列表


#### image {#image}

使用哪个镜像的镜像名称, imageName:tag


#### container_name {#container-name}

容器名称，相当于docker run 的--name


#### ports {#ports}

用来完成host与容器的端口映射关系数组。


#### volumes {#volumes}

用来指定宿主机与容器的目录数据的共享， 只能使用绝对路径或者自定义卷。相当于docker run的 -v
自定义卷使用前必须定义.

```yml
version:
services:
  serviceName:
    volumes:
      volumesName:/容器内路径
    networks:
      -- networkName

  ...
volumes:
  -- volumesName:
newwork:
  - networkName
```


#### networks {#networks}

代表当前服务使用哪个网络桥。使用前必须定义

```yml
version:
services:
  serviceName:
    networks:   # 相当于 docker run --network networkName
      -- networkName
  ...

newwork:
  - networkName
```


#### cmd {#cmd}

用来覆盖容器的默认启动命令。


#### environment {#environment}

用来指定容器启动时环境参数数组。


#### env_file {#env-file}

用来将environment的环境变量放入文件中， 使用相对路径。文件中使用key=value的形式，支持#开头的注释内容。


#### depends_on {#depends-on}

指定容器的启动依赖，为容器ID的数组。代表为指定容器启动后才会启动。


#### build {#build}

用来指定Dockerfile所在目录，先根据build中的dockerfile自动构建镜像，自动运行容器。


### 命令行命令 {#命令行命令}


#### up {#up}

docker-compose up [options] [service...]
用来启动所有docker-compose服务。默认前台启动，通过Ctrl-c会停止容器，

-   -d选项


#### down {#down}

用来关闭所有docker-compose服务


#### exec {#exec}

进入容器
docker-compose exec docker-compose.yml中声明服务的ID   /bash(命令)


#### ps {#ps}

用来展示当前docker-compose运行的所有容器


#### restart {#restart}

用来重启项目服务中的某个容器
docker-compose restart [options] [service ...]


#### rm {#rm}

删除容器


#### start {#start}

启动服务
docker-compose start 服务ID


#### stop {#stop}

关闭服务


#### top {#top}

展示容器内部的进程


#### unpause {#unpause}


#### pause {#pause}
