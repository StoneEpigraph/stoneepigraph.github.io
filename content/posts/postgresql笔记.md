+++
title = "postgresql-note"
draft = false
+++
## 安装及配置 {#安装及配置}
### 安装 {#安装}
1.  下载postgresql   <https://www.postgresql.org/download/>
2.  安装 按照官网的说明安装
    ```shell
    su - postgres -c "pg_ctl -D /var/lib/postgres/data -l /var/log/postgresql/postgresql.log start"
    ```
3.  切换到postgres用户修改postgres密码
<!--listend-->
```shell
su - postres
alter user postgres with password 'passwod'
```
## 备份及恢复 {#备份及恢复}
### 备份 {#备份}
```shell
pg_dump dbname > dbname.bak   # 备份单个数据库
pg_dumpall > pd_backup.bak    # 备份所有的数据库
```
备份格式有三种， 可以使用-F指定
1.  \*.bak 压缩二进制文件
2.  \*.sql 明文转储
3.  \*.tar tarball  t
### 恢复 {#恢复}
```shell
psql dbname < dbanme.bak
pg_restore -U postgres -d dbname /tmp/back_filename.tar
```
#### 注意 {#注意}
使用psql恢复数据库需要先创建一个空的对应名称的数据库
## 序列 {#序列}
1.  查询序列的值
    ```sql
    select nextval('sys_menu_menu_id_seq');
    ```
2.  修改序列的值从某个新值开始
    ```sql
    SELECT setval('bi_his_corp_policy_part_id_seq', (SELECT MAX(id) FROM bi_his_corp_policy));
    ```
3.  修改序列
    ```sql
             alter sequence sys_menu_menu_id_seq
    increment by 1
        restart with 2354;
    ```
## 基础 {#基础}
### 函数 {#函数}
#### 创建函数 {#创建函数}
<!--list-separator-->
-  exp insert
    ```sql
    create or replace function fun_date2utc(p_date timestamp) returns bigint
        language pluxsql
    as
    $$
    declare
        utc integer;
    begin
        utc = 86400 * (p_date - to_date('1970/01/01 00:00:00', 'YYYY/MM/DD HH24:MI:SS')) - 8*3600;
        return utc;
    end;
    $$;
    create trigger trg_insert_local_vehicle2_dynamic
        before insert
        on bi_inf_vehicle_local
        for each row
    execute procedure check_insert_dynamic_vehicle();
    ```
<!--list-separator-->
-  exp delete
    ```sql
              create function check_delete_dynamic_vehicle() returns trigger
        language pluxsql
    as
    $$
    begin
        delete from vd_sta_vehicle_local where vehicle_id = old.id;
        return old;
    end;
    $$;
    alter function check_delete_dynamic_vehicle() owner to uxdb;
    create trigger trg_delete_local_vehicle2_dynamic
          before delete
          on bi_inf_vehicle_local
          for each row
      execute procedure check_delete_dynamic_vehicle();
    ```
#### 一些函数 {#一些函数}
<!--list-separator-->
-  生成序列
    -   generate_series()
        -   生成数字序列
            ```nil
            select generate_series(1, 10)
            ```
        -   生成时间序列
        <!--listend-->
        ```sql
        select generate_series(now()::timestamp, now()::timestamp + interval '100 day', interval '1 day')
        ```
## 索引 {#索引}
### postgresql使用什么数据结构保存索引的: B-tree {#postgresql使用什么数据结构保存索引的-b-tree}
## 分区表 {#分区表}
### 创建分区表 {#创建分区表}
创建分区表需要在表结构结束添加 partition by partition_type(partition_key);
-   partition_type: 类型， 可以有range和list
-   partition_key: 分区字段，分区字段必须是主键或者是主键的一部分。
<!--listend-->
```sql
          create table sa_sts_vehicle_day
(
    vehicle_id                   bigint                              not null,
    sts_time                     timestamp                           not null,
    days_online                  integer   default 0                 not null,
    constraint sa_sts_vehicle_day_new_pkey
        primary key (vehicle_id, sts_time)
)
    partition by RANGE (sts_time);
```
### 添加新的分区 {#添加新的分区}
#### 按时间生成分区表SQL {#按时间生成分区表sql}
```sql
      select 'create table vd_his_alarm_attachment_' || to_char(gen_date, 'yyyyMMdd') ||
   ' partition of vd_his_alarm_attachment_part for values from (''' || to_char(gen_date, 'yyyy-MM-dd HH24:mi:ss') ||
   ''') to (''' || to_char(gen_date + interval '1 day', 'yyyy-MM-dd HH24:mi:ss') || ''');' from (
select generate_series('2022-09-28'::date, '2023-12-31'::date, interval '1 day') gen_date) s
```
#### 添加新分区 {#添加新分区}
```sql
create table sa_sts_vehicle_day_20231129 partition of sa_sts_vehicle_day for values from ('2023-11-29 00:00:00') to ('2023-11-30 00:00:00');
```
## 查询 {#查询}
### 慢SQL {#慢sql}
```sql
    -- 查看数据库执行的语句
    select pid, query_stay 执行时长s, REPLACE ( query, chr( 10 ), ' ' ) AS sql语句,
    datname 数据库, usename 用户, client_addr IP, application_name 应用,
    STATE 状态, backend_start 后台开始时间, xact_start 激活时间, xact_stay 激活时长s, query_start 开始执行时间
FROM (
         SELECT
             pgsa.pid AS pid, pgsa.datname AS datname, pgsa.usename AS usename, pgsa.client_addr client_addr,
             pgsa.application_name AS application_name, pgsa.STATE AS STATE, pgsa.backend_start AS backend_start,
             pgsa.xact_start AS xact_start, EXTRACT ( epoch FROM ( now( ) - pgsa.xact_start ) ) AS xact_stay,
             pgsa.query_start AS query_start, EXTRACT ( epoch FROM ( now( ) - pgsa.query_start ) ) AS query_stay,
             pgsa.query AS query
         FROM pg_stat_activity AS pgsa
         WHERE 1=1
           AND pgsa.STATE != 'idle'
           AND pgsa.STATE != 'idle in transaction'
           AND pgsa.STATE != 'idle in transaction (aborted)'
         --and (pgsa.query like 'drop %' or pgsa.query like 'DROP %')
     ) idleconnections
ORDER BY query_stay DESC;
      -- 删除进程
      SELECT pg_terminate_backend(7532);
```
### 查看锁 {#查看锁}
```sql
          select w1.pid as 等待进程,
       w1.mode as 等待锁模式,
       w2.usename as 等待用户,
       w2.query as 等待会话,
       b1.pid as 锁的进程,
       b1.mode 锁的锁模式,
       b2.usename as 锁的用户,
       b2.query as 锁的会话,
       b2.application_name 锁的应用,
       b2.client_addr 锁的IP地址,
       b2.query_start 锁的语句执行时间
from pg_locks w1
         join pg_stat_activity w2 on w1.pid=w2.pid
         join pg_locks b1 on w1.transactionid=b1.transactionid and w1.pid!=b1.pid
         join pg_stat_activity b2 on b1.pid=b2.pid
where not w1.granted;
```
### 查询表结构 {#查询表结构}
```sql
select a.attnum AS "序号",
       c.relname AS "表名",
       cast(obj_description(relfilenode,'pg_class') as varchar) AS "表名描述",
       a.attname AS "列名",
       concat_ws('',t.typname,SUBSTRING(format_type(a.atttypid,a.atttypmod) from '\(.*\)')) as "字段类型",
       d.description AS "备注",
       a.attnotnull,
       a.atthasdef
from pg_class c, pg_attribute a , pg_type t, pg_description d
where  c.relname = 'bi_inf_vehicle_local'
  and a.attnum>0
  and a.attrelid = c.oid
  and a.atttypid = t.oid
  and  d.objoid=a.attrelid
  and d.objsubid=a.attnum
ORDER BY c.relname DESC,a.attnum ASC ;
```
