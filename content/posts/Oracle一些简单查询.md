+++
title = "Oracle一些简单查询"
draft = false
+++

## Oracle一些基本查询 {#oracle一些基本查询}


#### 字符集相关 {#字符集相关}

-   查询数据库字符集
    ```sql
    select userenv('language') from dual;
    ```


#### 实例相关 {#实例相关}

-   查询实例名
    ```sql
    select instance_name from v$instance;
    ```


#### 锁相关 {#锁相关}

-   查看被锁的表
    ```sql
    select b.username,b.sid,b.serial#,logon_time from v$locked_object a,v$session b where a.session_id = b.sid order by b.logon_time;
    ```
-   杀死锁进程
    ```sql
    alter system kill session 'id,serial*';
    ```


#### 查询表之前的状态 {#查询表之前的状态}

```sql
select * from tablename AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '50' MINUTE)
```


#### 用户 {#用户}

1.  查询当前用户的缺省表空间
    ```sql
    select username,default_tablespace from user_users;
    ```
2.  查询当前用户的角色
    ```sql
    select * from user_role_privs;
    ```
3.  查看当前用户的系统权限和表级权限
    ```sql
    select * from user_sys_privs;
    select * from user_tab_privs;
    ```
4.  查询用户下的所有的表
    ```sql
    select * from user_tables;
    ```


#### 表 {#表}

1.  查看用户下所有的表
    ```sql
    select * from user_tables;
    ```
2.  查看名称包含log字符的表
    ```sql
    select object_name,object_id from user_objects where instr(object_name,'LOG')>0;
    ```
3.  查询表的创建时间
    ```sql
    select object_name,created from user_objects where object_name=upper('&table_name');
    ```
4.  查询表的大小
    ```sql
    select sum(bytes)/(1024*1024) as "size(M)" from user_segments where segment_name=upper('&table_name');
    ```
5.  查看放在Oracle的内存区里的表
    ```sql
    select table_name,cache from user_tables where instr(cache,'Y')>0;
    ```
6.  查询表的DDL语句
    ```sql
    select dbms_metadata.get_ddl('TABLE',upper('tr_rpt_repair_record'),upper('bjvmmis')) from dual;
    ```


#### 索引 {#索引}

1.  查看索引个数和类别
    ```sql
    select index_name,index_type,table_name from user_indexes order by table_name;
    ```
2.  查看索引被索引的字段
    ```sql
    select * from user_ind_columns where index_name=upper('&index_name');
    ```
3.  查看索引的大小
    ```sql
    select sum(bytes)/(1024*1024) as "size(M)" from user_segments
    where segment_name=upper('&index_name');
    ```


#### 序列号 {#序列号}

<!--list-separator-->

-  查看序列号，last_number是当前值

    ```sql
    select * from user_sequences;
    ```

<!--list-separator-->

-  修改序列的值

    ```sql
    alter sequence STM_AUTH_USER increment by 50 nocache;
    select stm_auth_user.nextval from dual;
    alter sequence STM_AUTH_USER increment by 1 cache 20;
    select stm_auth_user.nextval from dual;
    ```


#### 视图 {#视图}

1.  查看视图的名称
    ```sql
    select view_name from user_views;
    ```
2.  查看创建视图的select语句
    ```sql
    set long 2000;
    select text from user_views where view_name=upper('&view_name');
    ```


#### 同义词 {#同义词}

1.  查看同义词的名称
    ```sql
    select * from user_synonyms;
    ```


#### 约束条件 {#约束条件}

1.  查看某表的约束条件
    \#+BEGIN_SRC sql
    select constraint_name, constraint_type,search_condition, r_constraint_name
    from user_constraints where table_name = upper('&amp;table_name');

    select c.constraint_name,c.constraint_type,cc.column_name
    from user_constraints c,user_cons_columns cc　　where c.owner =
    upper('&amp;table_owner') and c.table_name = upper('&amp;table_name')
    　and c.owner = cc.owner and c.constraint_name =
    cc.constraint_name　　order by cc.position; #+END_SRC


#### 存储过程和函数 {#存储过程和函数}

1.  查看函数和过程的状态
    ```sql
    select object_name,status from user_objects where object_type='FUNCTION';
    select object_name,status from user_objects where object_type='PROCEDURE';
    ```
2.  查看函数和过程 的源代码
    ```sql
    select text from all_source where owner=user and name=upper('&plsql_name');
    ```
3.  违反完整性约束,已找到子纪录解决办法
    ```sql
    select a.constraint_name, a.table_name, b.constraint_name
      from user_constraints a, user_constraints b
      where a.constraint_type = 'R'
        and b.constraint_type = 'P'
        and a.r_constraint_name = b.constraint_name
        and a.constraint_name = 'reference_key_name';
    ```


## Oracle的一些数据字典 {#oracle的一些数据字典}


### 常用数据字典 {#常用数据字典}

1.  USER\_
    记录用户对象的信息，如user_tables包含用户创建的所有表； user_views,user_constraints等;
2.  ALL\_
    记录用户对象的信息及被授权访问的对象信息；
3.  DBA\_
    记录数据库实例的所有对象的信息，如DBA_USERS包含数据库实例中
    所有用户的信息，DBA的信息包含user和all的信息；
4.  V$
    当前实例的动态视图，包含系统管理和优化使用的视图；
5.  GV\_
    分布环境下所有实例的动态视图，包含系统管理和优化使用的视图， 这里的GV表示 Global v$的意思；


### 基本数据字典 {#基本数据字典}

DBA_TABLES 所有用户的所有表的信息；
DBA_TAB_COLUMNS 所有用户的表的列(字段)信息；
DBA_VIEWS 所有用户的所有视图信息；
DBA_SYNONYMS 所有用户同义词信息；
DBA_SEQUENCES 所有用户序列信息；
DBA_CONSTRAINTS 所有用户的表约束信息；
DBA_INDEXES 所有用户索引的简要信息；
DBA_IND_COLUMNS 所有用户索引的列信息；
DBA_TRIGGERS 所有用户触发器信息 ；
DBA_SOURCE所有用户存储过程源代码信息；
DBA_PROCEDUS 所有用户存储过程；
DBA_SEGMENTS 所有用户段（表，索引，Cluster）使用空间信息；
DBA_EXTENTS 所有用户段的扩展段信息；
DBA_OBJECTS 所有用户对象的基本信息（包括素引，表，视图，序列等）；
CAT 当前用户可以访问的所有的基表 ；
TAB 当前用户创建的所有基表，视图，同义词等；
DICT 构成数据字典的所有表的信息；


### 与数据库组件相关的数据字典 {#与数据库组件相关的数据字典}

1.  数据库
    &lt;\![CDATA[ V$DATABASE 同义词 V_$DATABASE,记录系统的运行情况；]]&gt;
2.  表空间
    DBA_TABLESPACES 记录系统表空间的基本信息；
    DBA_DATA_FILES 记录系统数据文件及表空间的基本信息；
    DBA_FREE_SPACE 记录系统表空间的剩余空间的信息；
3.  控制文件
    &lt;\![CDATA[V$CONTROLFILE 记录系统控制文件的路径信息；]]&gt;
    &lt;\![CDATA[V$PARAMETER 记录系统各参数的基本信息；]]&gt;
    &lt;\![CDATA[v$CONTROLFILE_RECORD_SECTION 记录系统控制运行的基本信息；]]&gt;
4.  数据文件：
    DBA_DATA_FILES 记录系统数据文件及表空间的基本信息；
    &lt;\![CDATA[v$DATAFILE 记录来自控制文件的数据文件信息；]]&gt;
    &lt;\![CDATA[v$FILESTAT 记录数据文件读写的基本信息 ；]]&gt;
5.  vga
    show sga;
    &lt;\![CDATA[SELECT \* FROM V$SGASTAT;]]&gt;
    1.  动态性能视图
    2.  系统统计信息
        &lt;\![CDATA[ select \* from sysstat]]&gt;\\
    3.  用户会话信息
        V$sesstat
    4.  显示内存使用统计信息
        V$pgastat
    5.  SQL游标所用工作区的信息
        V$sql_workarea
    6.  当前系统工作区的信息
        V$ sql_workarea_active
    7.  查询到每个Oracle进程的PGA分配的内存和已使用的内存情况
        ```sql
        select pid,pga_used_mem,pga_alloc_mem,pga_max_mem from v$process;
        -- 其中PGA_used_mem表示已使用的，pag_alloc_mem表示已分配的，pga_max_men表示PGA的最大值。
        ```
    8.  查看后台进程：
        ```sql
        SELECT * FROM v$bgprocess WHERE paddr <> '00';
        ```
    9.  查看 所有的表空间
        ```sql
        select tablespace_name from dba_data_files order by tablespace_name;
        ```
    10. 查看表空间的名字及大小:
        ```sql
        select t.tablespace_name, round(sum(bytes/(1024*1024)),0) ts_size  from dba_tablespaces t, dba_data_files d where t.tablespace_name = d.tablespace_name group by t.tablespace_name;
        ```
    11. 创建表空间
        ```sql
        CREATE TABLESPACE tablespacename
        DATAFILE 'filename' [SIZE integer [K|M]]
        [AUTOEXTEND [OFF|ON]];
        ```
    12. 创建有多个数据文件的表空间
        ```sql
        create tablespace SALES
        datafile 'd:/sales/SALES_DATA01.dbf' size 10m autoextend on next 10m maxsize 100m,
        'd:/sales/SALES_DATA02.dbf' size 10m autoextend on next 10m maxsize
        unlimited,'d:/sales/SALES_DATA03.dbf' size 10m;
        ```
    13. 查看表空间大小
        ```sql
        SELECT TABLESPACE_NAME,SUM(BYTES)/1024/1024 MB FROM DBA_FREE_SPACE GROUP BY TABLESPACE_NAME;
        ```
    14. 查看表空间中数据文件存放的路径：
        ```sql
        SELECT TABLESPACE_NAME, BYTES/1024/1024 FILE_SIZE_MB, FILE_NAME FROM DBA_DATA_FILES;
        ```
    15. 删除表空间
        ```sql
        drop tablespace worktbs including contents;
        ```
    16. 为表空间增加数据文件
        ```sql
         alter tablespace sales add datafile 'd:/oracle/oradata/test/testtablespace/
        sales_data04.dbf' size 10m autoextend on next 10m maxsize 100m,
        'c:/oracle/oradata/test/testtablespace/sales_data05.dbf' size 10m autoextend on next 10m maxsize unlimited, 'c:/oracle/oradata/test/testtablespace/sales_data06.dbf' size 10m;
        ```
    17. 修改数据文件的大小
        ```sql
        alter database datafile 'c:/oracle/oradata/test/testtablespace/SALES_DATA04.dbf' resize 30m;
        ```
    18. 关闭数据文件的自动扩展属性
        ```sql
        alter database
        datafile 'c:/SALES_DATA04.dbf' ,
        'c:/SALES_DATA05.dbf',
        'c:/SALES_DATA06.dbf'
        autoextend off;
        ```
    19. 打开表空间数据文件的自动扩展属性
        ```sql
        alter database
         datafile 'c:/SALES_DATA04.dbf' ,
         'c:/SALES_DATA05.dbf',
         'c:/SALES_DATA06.dbf'
         autoextend on;
        ```
    20. 修改表空间属性(离线)
        ```sql
        alter tablespace sales offline;
        ```
    21. 修改表空间属性（在线）
        ```sql
        alter tablespace sales online;
        ```
    22. 修改表空间属性(只读)
        ```sql
        alter tablespace sales read only;
        -- 如下系统表空间不得设置为 offline 或者 read only
        -- system ， temp，undo ，undotbs
        ```
    23. 修改表空间属性（读写）
        ```sql
        alter tablepsace sales read write;
        ```
    24. 创建用户，指定默认表空间，磁盘配额
        ```sql
        create user rose identified by rose default
        o tablespace sales quota 10m on sales;
        ```
    25. 给用户授权
        ```sql
        grant connect,resource,dba to rose;
        ```
    26. 删除表空间同时删除文件
        ```sql
        drop tablespace sales including contents and datafiles;
        ```
    27. 查看当前用户每个表空间占有的空间大小
        ```sql
        select segment_name,sum(bytes)/1024/1024 from user_extents group by segment_name
        ```
    28. 查看每个表空间占有用空间的大小
        ```sql
        select tablespace_name,sum(bytes)/1024/1024 from dba_segments group by tablespace_name
        ```
