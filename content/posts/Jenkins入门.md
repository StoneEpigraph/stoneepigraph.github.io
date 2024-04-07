+++
title = "Jenkins入门"
draft = false
+++

## gitlab配置 {#gitlab配置}

1.  wget --content-disposition <https://packages.gitlab.com/gitlab/gitlab-ce/packages/el/7/gitlab-ce-13.2.4-ce.0.el7.x86_64.rpm/download.rpm>
2.  安装信赖
    1.  yum install curl openssh-server postfix cronie
    2.  yum -y install policycoreutils-python
3.  rpm -ivh gitlab-ce
4.  config gitlab
    1.  vi /etc/gitlab/gitlab.rb
        external_url:
        nginx['listen_port']
    2.  gitlab-ctl reconfigure
    3.  gitlab-ctl restart
5.  配置防火墙
6.  配置gitlab组及用户


## jenkins安装 {#jenkins安装}

1.  安装Jenkins跳过插件安装
2.  jenkins插件安装


## tips {#tips}


### 三台服务器,一台gitlab, 一台Jenkins, 一台测试服务器 {#三台服务器-一台gitlab-一台jenkins-一台测试服务器}
