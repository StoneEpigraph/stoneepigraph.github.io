+++
title = "MyBatis基础"
author = ["WhatsUpeng!!!"]
draft = false
+++

## 入门 {#入门}


### 安装 {#安装}

-   Jar包安装
-   Maven导入
-   Gradle导入


### 从XML中构建SqlSessionFactory {#从xml中构建sqlsessionfactory}

```java
String resource = "org/mybatis/example/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

XML配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
</configuration>
```


### 不使用XML构建SqlSessionFactory {#不使用xml构建sqlsessionfactory}

```java
DataSource dataSource = BlogDataSourceFactory.getBlogDataSource();
TransactionFactory transactionFactory = new JdbcTransactionFactory();
Environment environment = new Environment("development", transactionFactory, dataSource);
Configuration configuration = new Configuration(environment);
configuration.addMapper(BlogMapper.class);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
```


### 从SqlSessionFactory中获取SqlSession {#从sqlsessionfactory中获取sqlsession}

```java
SqlSession session = SqlSessionFactory.openSession();
try {
    //Blog blog = (Blog) session.selectOne("*.*.BlogMapper.seelctBlog", 1);
    BlogMapper mapper = session.getMapper(BlogMapper.class);
    Blog blog = mapper.selectBlog(1);
} finally {
    session.close();
}
```


### Mapper的配置 {#mapper的配置}

-   XML的配置
    ```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE mapper
      PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
      "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    <mapper namespace="org.mybatis.example.BlogMapper">
      <select id="selectBlog" resultType="Blog">
        select * from Blog where id = #{id}
      </select>
    </mapper>
    ```

-   注解配置
    ```java
    package org.mybatis.example;
    public interface BlogMapper {
      @Select("SELECT * FROM blog WHERE id = #{id}")
      Blog selectBlog(int id);
    }
    ```


#### 对命名空间的作用 {#对命名空间的作用}

1.  利用更长的完全限定名将不同的语句隔离开来。
2.  使用代码变得更加整洁，也更方便管理。


### 作用域（Scope）和生命周期 {#作用域scope和生命周期}

-   SqlSessionFactoryBuilder

    一旦创建了SqlSessionFactory，就不再需要它了。

-   SqlSessionFactory

    一旦创建就应该在应用的运行期间一直存在。

-   SqlSession

    每个线程都应该有它自己的SqlSession实例。

    SqlSession的实例不是线程安全的，因此是不能被共享的。


## XML配置 {#xml配置}


### 属性 {#属性}

如果属性在不只一个地方进行了配置，那么 MyBatis 将按照下面的顺序来加载：

-   在properties元素体内指定的属性首先被读取
-   然后根据properties元素的resource属性读取类路径下属性文件或根据url属性指定的路读取属性文件，并覆盖已读取的同名属性。
-   最后读取作为方法参数传递的属性，并覆盖已读取的同名属性。


### 设置 {#设置}

| 设置名                           | 描述                                                                                                                                                            | 有效值                                 | 默认值                                                |           |             |                 |                |            |   |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|----------------------------------------------------|-----------|-------------|-----------------|----------------|------------|---|
| cacheEnabled                     | 全局地开启或关闭配置文件中的所有映射器已经配置的任何缓存。                                                                                                      | true                                   | false                                                 | true      |             |                 |                |            |   |
| lazyLoadingEnabled               | 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。特定关联                                                                                                | true                                   | false                                                 | false     |             |                 |                |            |   |
| aggressiveLazyLoading            | 当开启时，任何方法的调用都会加载该对象的所有属性。否则，每个属性会按需加载                                                                                      | true                                   | false                                                 | false     |             |                 |                |            |   |
| multipleResultSetsEnabled        | 是否允许单一语句返回多结果集（需要驱动支持）                                                                                                                    | true                                   | false                                                 | true      |             |                 |                |            |   |
| useColumnLabel                   | 使用列标签代替列名。不同的驱动在这方面会有不同的表现。                                                                                                          | true                                   | false                                                 | true      |             |                 |                |            |   |
| useGenerateKeys                  | 允许JDBC支持自动生成主键，需要驱动支持。                                                                                                                        | true                                   | false                                                 | false     |             |                 |                |            |   |
| autoMappingBehavior              | 指定MyBatis应如何自动映射列字段或属性。NONE：取消自动映射，PARTIAL：只会自动映射没有定义嵌套结果集映射的结果集，FULL：会自动映射任意复杂的结果集（无论是否嵌套）。 | NONE，PARTIAL,FULL                     | PARTIAL                                               |           |             |                 |                |            |   |
| autoMappingUnknownColumnBehavior | 指定发现自动映射目标未知列（或者未知属性类型）的行为。NONE：不做任何反应，WARNING:输出提醒日志，FAILING：映射失败。                                             | NONE，WARNING， FAILING                | NONE                                                  |           |             |                 |                |            |   |
| defaultExecutorType              | 配置默认的执行器。SIMPLE就是普通的执行器；REUSE：执行器会重用预处理语句；BATCH：执行器将重用语句并执行批量更新                                                  | SIMPLE，REUSE， BATCH                  | SIMPLE                                                |           |             |                 |                |            |   |
| defaultStatementTimeout          | 设置超时时间，它决定驱动等待数据库响应的秒数                                                                                                                    | 任意正整数                             | 未设置                                                |           |             |                 |                |            |   |
| defaultFetchSize                 | 为驱动的结果集获取数量(fetchSize)设置一个提示值。                                                                                                               | 任意正整数                             | 未设置                                                |           |             |                 |                |            |   |
| safeRowBoundsEnabled             | 允许在嵌套语句中使用分页（RowsBounds）如果允许使用则设置为false                                                                                                 | true                                   | false                                                 | false     |             |                 |                |            |   |
| safeResultHandlerEnabled         | 允许在嵌套语句中使用分页（ResultHandler）。如果允许使用则设置为 false。                                                                                         | true                                   | false                                                 | True      |             |                 |                |            |   |
| mapUnderscoreToCamelCase         | 是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名 A_COLUMN 到经典 Java 属性名 aColumn 的类似映射。                                                 | true                                   | false                                                 | false     |             |                 |                |            |   |
| localCacheScope                  | MyBatis 利用本地缓存机制（Local Cache）防止循环引用（circular references）和加速重复嵌套查询。 默认值为 SESSION，这种情况下会缓存一个会话中执行的所有查询。 若设置值为 STATEMENT，本地会话仅用在语句执行上，对相同 SqlSession 的不同调用将不会共享数据。 | SESSION                                | STATEMENT                                             | SESSION   |             |                 |                |            |   |
| jdbcTypeForNull                  | 当没有为参数提供特定的 JDBC 类型时，为空值指定 JDBC 类型。 某些驱动需要指定列的 JDBC 类型，多数情况直接用一般类型即可，比如 NULL、VARCHAR 或 OTHER。            | JdbcType 常量，常用值：NULL, VARCHAR 或 OTHER。 | OTHER                                                 |           |             |                 |                |            |   |
| lazyLoadTriggerMethods           | 指定哪个对象的方法触发一次延迟加载。                                                                                                                            | 用逗号分隔的方法列表。                 | equals,clone,hashCode,toString                        |           |             |                 |                |            |   |
| defaultScriptingLanguage         | 指定动态 SQL 生成的默认语言。                                                                                                                                   | 一个类型别名或完全限定类名。           | org.apache.ibatis.scripting.xmltags.XMLLanguageDriver |           |             |                 |                |            |   |
| defaultEnumTypeHandler           | 指定 Enum 使用的默认 `TypeHandler` 。（新增于 3.4.5）                                                                                                           | 一个类型别名或完全限定类名。           | org.apache.ibatis.type.EnumTypeHandler                |           |             |                 |                |            |   |
| callSettersOnNulls               | 指定当结果集中值为 null 的时候是否调用映射对象的 setter（map 对象时为 put）方法，这在依赖于 Map.keySet() 或 null 值初始化的时候比较有用。注意基本类型（int、boolean 等）是不能设置成 null 的。 | true                                   | false                                                 | false     |             |                 |                |            |   |
| returnInstanceForEmptyRow        | 当返回行的所有列都是空时，MyBatis默认返回 =null=。 当开启这个设置时，MyBatis会返回一个空实例。 请注意，它也适用于嵌套的结果集 （如集合或关联）。（新增于 3.4.2） | true                                   | false                                                 | false     |             |                 |                |            |   |
| logPrefix                        | 指定 MyBatis 增加到日志名称的前缀。                                                                                                                             | 任何字符串                             |                                                       |           |             |                 |                |            |   |
| logImpl                          | 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。                                                                                                           | SLF4J                                  | LOG4J                                                 | LOG4J2    | JDK_LOGGING | COMMONS_LOGGING | STDOUT_LOGGING | NO_LOGGING |   |
| proxyFactory                     | 指定 Mybatis 创建具有延迟加载能力的对象所用到的代理工具。                                                                                                       | CGLIB                                  | JAVASSIST                                             | JAVASSIST |             |                 |                |            |   |
| vfsImpl                          | 指定 VFS 的实现                                                                                                                                                 | 自定义 VFS 的实现的类全限定名，以逗号分隔。 |                                                       |           |             |                 |                |            |   |
| useActualParamName               | 允许使用方法签名中的名称作为语句参数名称。 为了使用该特性，你的项目必须采用 Java 8 编译，并且加上 `-parameters` 选项。（新增于 3.4.1）                          | TRUE                                   | FALSE                                                 | TRUE      |             |                 |                |            |   |
| configurationFactory             | 指定一个提供 `Configuration` 实例的类。 这个被返回的 Configuration 实例用来加载被反序列化对象的延迟加载属性值。 这个类必须包含一个签名为=static Configuration getConfiguration()= 的方法。（新增于 3.2.3） | 类型别名或者全类名                     |                                                       |           |             |                 |                |            |   |


### 类型别名 typeAliases {#类型别名-typealiases}

类型别名是为Java类型设置一个短名字。它只和XML配置有关，存在的意义公在于用来减少类完全限定名的冗余。

这是一些为常见的 Java
类型内建的相应的类型别名。它们都是不区分大小写的，注意对基本类型名称重复采取的特殊命名风格。

| 别名       | 映射的类型 |
|----------|-------|
| \_byte     | byte       |
| \_long     | long       |
| \_short    | short      |
| \_int      | int        |
| \_integer  | int        |
| \_double   | double     |
| \_float    | float      |
| \_boolean  | boolean    |
| string     | String     |
| byte       | Byte       |
| long       | Long       |
| short      | Short      |
| int        | Integer    |
| integer    | Integer    |
| double     | Double     |
| float      | Float      |
| boolean    | Boolean    |
| date       | Date       |
| decimal    | BigDecimal |
| bigdecimal | BigDecimal |
| object     | Object     |
| map        | Map        |
| hashmap    | HashMap    |
| list       | List       |
| arraylist  | ArrayList  |
| collection | Collection |
| iterator   | Iterator   |


### 类型处理器（typeHandlers） {#类型处理器typehandlers}

无论是 MyBatis
在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时，都会用类型处理器将获取的值以合适的方式转换成 Java
类型。下表描述了一些默认的类型处理器。

**提示** 从 3.4.5 开始，MyBatis 默认支持 JSR-310（日期和时间 API） 。

| 类型处理器                   | Java 类型                       | JDBC 类型                                      |
|-------------------------|-------------------------------|----------------------------------------------|
| `BooleanTypeHandler`         | `java.lang.Boolean`, `boolean`  | 数据库兼容的 `BOOLEAN`                         |
| `ByteTypeHandler`            | `java.lang.Byte`, `byte`        | 数据库兼容的 `NUMERIC` 或 `BYTE`               |
| `ShortTypeHandler`           | `java.lang.Short`, `short`      | 数据库兼容的 `NUMERIC` 或 `SMALLINT`           |
| `IntegerTypeHandler`         | `java.lang.Integer`, `int`      | 数据库兼容的 `NUMERIC` 或 `INTEGER`            |
| `LongTypeHandler`            | `java.lang.Long`, `long`        | 数据库兼容的 `NUMERIC` 或 `BIGINT`             |
| `FloatTypeHandler`           | `java.lang.Float`, `float`      | 数据库兼容的 `NUMERIC` 或 `FLOAT`              |
| `DoubleTypeHandler`          | `java.lang.Double`, `double`    | 数据库兼容的 `NUMERIC` 或 `DOUBLE`             |
| `BigDecimalTypeHandler`      | `java.math.BigDecimal`          | 数据库兼容的 `NUMERIC` 或 `DECIMAL`            |
| `StringTypeHandler`          | `java.lang.String`              | `CHAR`, `VARCHAR`                              |
| `ClobReaderTypeHandler`      | `java.io.Reader`                | -                                              |
| `ClobTypeHandler`            | `java.lang.String`              | `CLOB`, `LONGVARCHAR`                          |
| `NStringTypeHandler`         | `java.lang.String`              | `NVARCHAR`, `NCHAR`                            |
| `NClobTypeHandler`           | `java.lang.String`              | `NCLOB`                                        |
| `BlobInputStreamTypeHandler` | `java.io.InputStream`           | -                                              |
| `ByteArrayTypeHandler`       | `byte[]`                        | 数据库兼容的字节流类型                         |
| `BlobTypeHandler`            | `byte[]`                        | `BLOB`, `LONGVARBINARY`                        |
| `DateTypeHandler`            | `java.util.Date`                | `TIMESTAMP`                                    |
| `DateOnlyTypeHandler`        | `java.util.Date`                | `DATE`                                         |
| `TimeOnlyTypeHandler`        | `java.util.Date`                | `TIME`                                         |
| `SqlTimestampTypeHandler`    | `java.sql.Timestamp`            | `TIMESTAMP`                                    |
| `SqlDateTypeHandler`         | `java.sql.Date`                 | `DATE`                                         |
| `SqlTimeTypeHandler`         | `java.sql.Time`                 | `TIME`                                         |
| `ObjectTypeHandler`          | Any                             | `OTHER` 或未指定类型                           |
| `EnumTypeHandler`            | Enumeration Type                | VARCHAR 或任何兼容的字符串类型，用以存储枚举的名称（而不是索引值） |
| `EnumOrdinalTypeHandler`     | Enumeration Type                | 任何兼容的 `NUMERIC` 或 `DOUBLE` 类型，存储枚举的序数值（而不是名称）。 |
| `SqlxmlTypeHandler`          | `java.lang.String`              | `SQLXML`                                       |
| `InstantTypeHandler`         | `java.time.Instant`             | `TIMESTAMP`                                    |
| `LocalDateTimeTypeHandler`   | `java.time.LocalDateTime`       | `TIMESTAMP`                                    |
| `LocalDateTypeHandler`       | `java.time.LocalDate`           | `DATE`                                         |
| `LocalTimeTypeHandler`       | `java.time.LocalTime`           | `TIME`                                         |
| `OffsetDateTimeTypeHandler`  | `java.time.OffsetDateTime`      | `TIMESTAMP`                                    |
| `OffsetTimeTypeHandler`      | `java.time.OffsetTime`          | `TIME`                                         |
| `ZonedDateTimeTypeHandler`   | `java.time.ZonedDateTime`       | `TIMESTAMP`                                    |
| `YearTypeHandler`            | `java.time.Year`                | `INTEGER`                                      |
| `MonthTypeHandler`           | `java.time.Month`               | `INTEGER`                                      |
| `YearMonthTypeHandler`       | `java.time.YearMonth`           | `VARCHAR` 或 `LONGVARCHAR`                     |
| `JapaneseDateTypeHandler`    | `java.time.chrono.JapaneseDate` | `DATE`                                         |

你可以重写类型处理器或创建你自己的类型处理器来处理不支持的或非标准的类型。具体做法为：实现 `org.apache.ibatis.type.TypeHandler` 接口，或继承一个很便利的类 =org.apache.ibatis.type.BaseTypeHandler=，然后可以选择性地将它映射到一个 JDBC 类型。


### 处理枚举类型 {#处理枚举类型}

若想映射枚举类型 `Enum=，则需要从 =EnumTypeHandler` 或者
`EnumOrdinalTypeHandler` 中选一个来使用。

比如说我们想存储取近似值时用到的舍入模式。默认情况下，MyBatis 会利用
`EnumTypeHandler` 来把 `Enum` 值转换成对应的名字。

注意 `EnumTypeHandler`
在某种意义上来说是比较特别的，其他的处理器只针对某个特定的类，而它不同，它会处理任意继承了
`Enum` 的类。

不过，我们可能不想存储名字，相反我们的 DBA
会坚持使用整形值代码。那也一样轻而易举： 在配置文件中把
`EnumOrdinalTypeHandler` 加到 `typeHandlers` 中即可， 这样每个
`RoundingMode` 将通过他们的序数值来映射成对应的整形数值。

```text
<!-- mybatis-config.xml -->
<typeHandlers>
  <typeHandler handler="org.apache.ibatis.type.EnumOrdinalTypeHandler" javaType="java.math.RoundingMode"/>
</typeHandlers>
```

但是怎样能将同样的 `Enum` 既映射成字符串又映射成整形呢？

自动映射器（auto-mapper）会自动地选用 `EnumOrdinalTypeHandler` 来处理，所以如果我们想用普通的 =EnumTypeHandler=，就必须要显式地为那些 SQL
语句设置要使用的类型处理器。

（下一节才开始介绍映射器文件，如果你是首次阅读该文档，你可能需要先跳过这里，过会再来看。）

```text
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="org.apache.ibatis.submitted.rounding.Mapper">
    <resultMap type="org.apache.ibatis.submitted.rounding.User" id="usermap">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="funkyNumber" property="funkyNumber"/>
        <result column="roundingMode" property="roundingMode"/>
    </resultMap>

    <select id="getUser" resultMap="usermap">
        select * from users
    </select>
    <insert id="insert">
        insert into users (id, name, funkyNumber, roundingMode) values (
            #{id}, #{name}, #{funkyNumber}, #{roundingMode}
        )
    </insert>

    <resultMap type="org.apache.ibatis.submitted.rounding.User" id="usermap2">
        <id column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="funkyNumber" property="funkyNumber"/>
        <result column="roundingMode" property="roundingMode" typeHandler="org.apache.ibatis.type.EnumTypeHandler"/>
    </resultMap>
    <select id="getUser2" resultMap="usermap2">
        select * from users2
    </select>
    <insert id="insert2">
        insert into users2 (id, name, funkyNumber, roundingMode) values (
            #{id}, #{name}, #{funkyNumber}, #{roundingMode, typeHandler=org.apache.ibatis.type.EnumTypeHandler}
        )
    </insert>

</mapper>
```

注意，这里的 select 语句强制使用 `resultMap` 来代替 =resultType=。


### 对象工厂（objectFactory） {#对象工厂objectfactory}

MyBatis
每次创建结果对象的新实例时，它都会使用一个对象工厂（ObjectFactory）实例来完成。默认的对象工厂需要做的仅仅是实例化目标类，要么通过默认构造方法，要么在参数映射存在的时候通过参数构造方法来实例化。如果想覆盖对象工厂的默认行为，则可以通过创建自己的对象工厂来实现。比如：

```text
// ExampleObjectFactory.java
public class ExampleObjectFactory extends DefaultObjectFactory {
  public Object create(Class type) {
    return super.create(type);
  }
  public Object create(Class type, List<Class> constructorArgTypes, List<Object> constructorArgs) {
    return super.create(type, constructorArgTypes, constructorArgs);
  }
  public void setProperties(Properties properties) {
    super.setProperties(properties);
  }
  public <T> boolean isCollection(Class<T> type) {
    return Collection.class.isAssignableFrom(type);
  }}
<!-- mybatis-config.xml -->
<objectFactory type="org.mybatis.example.ExampleObjectFactory">
  <property name="someProperty" value="100"/>
</objectFactory>
```

ObjectFactory
接口很简单，它包含两个创建用的方法，一个是处理默认构造方法的，另外一个是处理带参数的构造方法的。最后，setProperties 方法可以被用来配置 ObjectFactory，在初始化你的
ObjectFactory 实例后， objectFactory 元素体中定义的属性会被传递给
setProperties 方法。


### 插件（plugins） {#插件plugins}

MyBatis
允许你在已映射语句执行过程中的某一点进行拦截调用。默认情况下，MyBatis
允许使用插件来拦截的方法调用包括：

-   Executor (update, query, flushStatements, commit, rollback,
    getTransaction, close, isClosed)
-   ParameterHandler (getParameterObject, setParameters)
-   ResultSetHandler (handleResultSets, handleOutputParameters)
-   StatementHandler (prepare, parameterize, batch, update, query)

这些类中方法的细节可以通过查看每个方法的签名来发现，或者直接查看 MyBatis
发行包中的源代码。如果你想做的不仅仅是监控方法的调用，那么你最好相当了解要重写的方法的行为。因为如果在试图修改或重写已有方法的行为的时候，你很可能在破坏 MyBatis
的核心模块。 这些都是更低层的类和方法，所以使用插件的时候要特别当心。


### 环境配置（environments） {#环境配置environments}

MyBatis 可以配置成适应多种环境，这种机制有助于将 SQL
映射应用于多种数据库之中，现实情况下有多种理由需要这么做。例如，开发、测试和生产环境需要有不同的配置；或者想在具有相同
Schema 的多个生产数据库中 使用相同的 SQL 映射。有许多类似的使用场景。

**不过要记住：尽管可以配置多个环境，但每个 SqlSessionFactory
实例只能选择一种环境。**

所以，如果你想连接两个数据库，就需要创建两个 SqlSessionFactory
实例，每个数据库对应一个。而如果是三个数据库，就需要三个实例，依此类推，记起来很简单：

-   **每个数据库对应一个 SqlSessionFactory 实例**

为了指定创建哪种环境，只要将它作为可选的参数传递给
SqlSessionFactoryBuilder 即可。可以接受环境配置的两个方法签名是：

```text
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader, environment);
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader, environment, properties);
```

如果忽略了环境参数，那么默认环境将会被加载，如下所示：

```text
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader, properties);
```

环境元素定义了如何配置环境。

```text
<environments default="development">
  <environment id="development">
    <transactionManager type="JDBC">
      <property name="..." value="..."/>
    </transactionManager>
    <dataSource type="POOLED">
      <property name="driver" value="${driver}"/>
      <property name="url" value="${url}"/>
      <property name="username" value="${username}"/>
      <property name="password" value="${password}"/>
    </dataSource>
  </environment>
</environments>
```

注意这里的关键点:

-   默认使用的环境 ID（比如：default="development"）。
-   每个 environment 元素定义的环境 ID（比如：id="development"）。
-   事务管理器的配置（比如：type="JDBC"）。
-   数据源的配置（比如：type="POOLED"）。

默认的环境和环境 ID 是自解释的，因此一目了然。你可以对环境随意命名，但一定要保证默认的环境 ID 要匹配其中一个环境 ID。

**事务管理器（transactionManager）**

在 MyBatis 中有两种类型的事务管理器（也就是 type=”[JDBC|MANAGED]”）：

-   JDBC -- 这个配置就是直接使用了 JDBC
    的提交和回滚设置，它依赖于从数据源得到的连接来管理事务作用域。

-   MANAGED --
    这个配置几乎没做什么。它从来不提交或回滚一个连接，而是让容器来管理事务的整个生命周期（比如
    JEE 应用服务器的上下文）。默认情况下它会关闭连接，然而一些容器并不希望这样，因此需要将
    closeConnection 属性设置为 false 来阻止它默认的关闭行为。例如:
    ```text
    <transactionManager type="MANAGED">
      <property name="closeConnection" value="false"/>
    </transactionManager>
    ```

\*提示\*如果你正在使用 Spring + MyBatis，则没有必要配置事务管理器， 因为
Spring 模块会使用自带的管理器来覆盖前面的配置。

这两种事务管理器类型都不需要设置任何属性。它们其实是类型别名，换句话说，你可以使用
TransactionFactory 接口的实现类的完全限定名或类型别名代替它们。

```text
public interface TransactionFactory {
  void setProperties(Properties props);
  Transaction newTransaction(Connection conn);
  Transaction newTransaction(DataSource dataSource, TransactionIsolationLevel level, boolean autoCommit);
}
```

任何在 XML 中配置的属性在实例化之后将会被传递给 setProperties()
方法。你也需要创建一个 Transaction 接口的实现类，这个接口也很简单：

```text
public interface Transaction {
  Connection getConnection() throws SQLException;
  void commit() throws SQLException;
  void rollback() throws SQLException;
  void close() throws SQLException;
  Integer getTimeout() throws SQLException;
}
```

使用这两个接口，你可以完全自定义 MyBatis 对事务的处理。

**数据源（dataSource）**

dataSource 元素使用标准的 JDBC 数据源接口来配置 JDBC 连接对象的资源。

-   许多 MyBatis
    的应用程序会按示例中的例子来配置数据源。虽然这是可选的，但为了使用延迟加载，数据源是必须配置的。

有三种内建的数据源类型（也就是 type=”[UNPOOLED|POOLED|JNDI]”）：

**UNPOOLED**--
这个数据源的实现只是每次被请求时打开和关闭连接。虽然有点慢，但对于在数据库连接可用性方面没有太高要求的简单应用程序来说，是一个很好的选择。不同的数据库在性能方面的表现也是不一样的，对于某些数据库来说，使用连接池并不重要，这个配置就很适合这种情形。UNPOOLED
类型的数据源仅仅需要配置以下 5 种属性：

-   `driver` -- 这是 JDBC 驱动的 Java 类的完全限定名（并不是 JDBC
    驱动中可能包含的数据源类）。
-   `url` -- 这是数据库的 JDBC URL 地址。
-   `username` -- 登录数据库的用户名。
-   `password` -- 登录数据库的密码。
-   `defaultTransactionIsolationLevel` -- 默认的连接事务隔离级别。

作为可选项，你也可以传递属性给数据库驱动。只需在属性名加上“driver.”前缀即可，例如：

-   `driver.encoding=UTF8`

这将通过 DriverManager.getConnection(url,driverProperties) 方法传递值为
`UTF8` 的 `encoding` 属性给数据库驱动。

**POOLED**-- 这种数据源的实现利用“池”的概念将 JDBC
连接对象组织起来，避免了创建新的连接实例时所必需的初始化和认证时间。这是一种使得并发 Web 应用快速响应请求的流行处理方式。

除了上述提到 UNPOOLED 下的属性外，还有更多属性用来配置 POOLED 的数据源：

-   `poolMaximumActiveConnections` --
    在任意时间可以存在的活动（也就是正在使用）连接数量，默认值：10
-   `poolMaximumIdleConnections` -- 任意时间可能存在的空闲连接数。
-   `poolMaximumCheckoutTime` -- 在被强制返回之前，池中连接被检出（checked
    out）时间，默认值：20000 毫秒（即 20 秒）
-   `poolTimeToWait` --
    这是一个底层设置，如果获取连接花费了相当长的时间，连接池会打印状态日志并重新尝试获取一个连接（避免在误配置的情况下一直安静的失败），默认值：20000
    毫秒（即 20 秒）。
-   `poolMaximumLocalBadConnectionTolerance` --
    这是一个关于坏连接容忍度的底层设置，作用于每一个尝试从缓存池获取连接的线程。如果这个线程获取到的是一个坏的连接，那么这个数据源允许这个线程尝试重新获取一个新的连接，但是这个重新尝试的次数不应该超过
    `poolMaximumIdleConnections` 与
    `poolMaximumLocalBadConnectionTolerance` 之和。 默认值：3 （新增于
    3.4.5）
-   `poolPingQuery` --
    发送到数据库的侦测查询，用来检验连接是否正常工作并准备接受请求。默认是“NO
    PING QUERY SET”，这会导致多数数据库驱动失败时带有一个恰当的错误消息。
-   `poolPingEnabled` -- 是否启用侦测查询。若开启，需要设置
    `poolPingQuery` 属性为一个可执行的 SQL 语句（最好是一个速度非常快的
    SQL 语句），默认值：false。
-   `poolPingConnectionsNotUsedFor` -- 配置 poolPingQuery
    的频率。可以被设置为和数据库连接超时时间一样，来避免不必要的侦测，默认值：0（即所有连接每一时刻都被侦测
    --- 当然仅当 poolPingEnabled 为 true 时适用）。

**JNDI** -- 这个数据源的实现是为了能在如 EJB
或应用服务器这类容器中使用，容器可以集中或在外部配置数据源，然后放置一个
JNDI 上下文的引用。这种数据源配置只需要两个属性：

-   `initial_context` -- 这个属性用来在 InitialContext
    中寻找上下文（即，initialContext.lookup(initial_context)）。这是个可选属性，如果忽略，那么将会直接从
    InitialContext 中寻找 data_source 属性。
-   `data_source` -- 这是引用数据源实例位置的上下文的路径。提供了
    initial_context 配置时会在其返回的上下文中进行查找，没有提供时则直接在
    InitialContext 中查找。

和其他数据源配置类似，可以通过添加前缀“env.”直接把属性传递给初始上下文。比如：

-   `env.encoding=UTF8`

这就会在初始上下文（InitialContext）实例化时往它的构造方法传递值为
`UTF8` 的 `encoding` 属性。

你可以通过实现接口 `org.apache.ibatis.datasource.DataSourceFactory`
来使用第三方数据源：

```text
public interface DataSourceFactory {
  void setProperties(Properties props);
  DataSource getDataSource();
}
```

`org.apache.ibatis.datasource.unpooled.UnpooledDataSourceFactory`
可被用作父类来构建新的数据源适配器，比如下面这段插入 C3P0
数据源所必需的代码：

```text
import org.apache.ibatis.datasource.unpooled.UnpooledDataSourceFactory;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class C3P0DataSourceFactory extends UnpooledDataSourceFactory {

  public C3P0DataSourceFactory() {
    this.dataSource = new ComboPooledDataSource();
  }
}
```

为了令其工作，记得为每个希望 MyBatis 调用的 setter
方法在配置文件中增加对应的属性。 下面是一个可以连接至 PostgreSQL
数据库的例子：

```text
<dataSource type="org.myproject.C3P0DataSourceFactory">
  <property name="driver" value="org.postgresql.Driver"/>
  <property name="url" value="jdbc:postgresql:mydb"/>
  <property name="username" value="postgres"/>
  <property name="password" value="root"/>
</dataSource>
```


### 数据库厂商标识（databaseIdProvider） {#数据库厂商标识databaseidprovider}

MyBatis
可以根据不同的数据库厂商执行不同的语句，这种多厂商的支持是基于映射语句中的
`databaseId` 属性。 MyBatis 会加载不带 `databaseId`
属性和带有匹配当前数据库 `databaseId` 属性的所有语句。 如果同时找到带有
`databaseId` 和不带 `databaseId` 的相同语句，则后者会被舍弃。为支持多厂商特性只要像下面这样在 mybatis-config.xml 文件中加入
`databaseIdProvider` 即可：

```text
<databaseIdProvider type="DB_VENDOR" />
```

DB_VENDOR 对应的 databaseIdProvider 实现会将 databaseId 设置为
=DatabaseMetaData#getDatabaseProductName()=返回的字符串。由于通常情况下这些字符串都非常长而且相同产品的不同版本会返回不同的值，所以你可能想通过设置属性别名来使其变短，如下：

```text
<databaseIdProvider type="DB_VENDOR">
  <property name="SQL Server" value="sqlserver"/>
  <property name="DB2" value="db2"/>
  <property name="Oracle" value="oracle" />
</databaseIdProvider>
```

在提供了属性别名时，DB_VENDOR 的 databaseIdProvider 实现会将 databaseId
设置为第一个数据库产品名与属性中的名称相匹配的值，如果没有匹配的属性将会设置为
"null"。 在这个例子中，如果 `getDatabaseProductName()` 返回“Oracle
(DataDirect)”，databaseId 将被设置为“oracle”。

你可以通过实现接口 `org.apache.ibatis.mapping.DatabaseIdProvider` 并在
mybatis-config.xml 中注册来构建自己的 DatabaseIdProvider：

```text
public interface DatabaseIdProvider {
  void setProperties(Properties p);
  String getDatabaseId(DataSource dataSource) throws SQLException;
}
```


### 映射器（mappers） {#映射器mappers}

既然 MyBatis 的行为已经由上述元素配置完了，我们现在就要定义 SQL
映射语句了。 但是首先我们需要告诉 MyBatis 到哪里去找到这些语句。 Java
在自动查找这方面没有提供一个很好的方法，所以最佳的方式是告诉 MyBatis
到哪里去找映射文件。 你可以使用相对于类路径的资源引用，或完全限定资源定位符（包括 `file:///` 的 URL），或类名和包名等。例如：

```text
<!-- 使用相对于类路径的资源引用 -->
<mappers>
  <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
  <mapper resource="org/mybatis/builder/BlogMapper.xml"/>
  <mapper resource="org/mybatis/builder/PostMapper.xml"/>
</mappers>
<!-- 使用完全限定资源定位符（URL） -->
<mappers>
  <mapper url="file:///var/mappers/AuthorMapper.xml"/>
  <mapper url="file:///var/mappers/BlogMapper.xml"/>
  <mapper url="file:///var/mappers/PostMapper.xml"/>
</mappers>
<!-- 使用映射器接口实现类的完全限定类名 -->
<mappers>
  <mapper class="org.mybatis.builder.AuthorMapper"/>
  <mapper class="org.mybatis.builder.BlogMapper"/>
  <mapper class="org.mybatis.builder.PostMapper"/>
</mappers>
<!-- 将包内的映射器接口实现全部注册为映射器 -->
<mappers>
  <package name="org.mybatis.builder"/>
</mappers>
```

这些配置会告诉了 MyBatis 去哪里找映射文件，剩下的细节就应该是每个 SQL
映射文件了，也就是接下来我们要讨论的。


## XML映射文件 {#xml映射文件}
