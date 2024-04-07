+++
title = "Rust笔记"
lastmod = 2024-04-07T23:32:39+08:00
tags = ["Rust"]
categories = ["Rust"]
draft = false
+++

## Rust基础 {#rust基础}


### 数据类型 {#数据类型}


#### 说明 {#说明}

<!--list-separator-->

-  Rust不会自动进行隐式类型转换。

    Rust的整数类型都实现了From&lt;T&gt;和Into&lt;T&gt;trait, 使得我们可以在它们之间进行转换。From&lt;T&gt;trait包含from()方法，Into&lt;T&gt;trait包含into()方法。类型通过实现这些trait来表达它将被如何转换为另一个类型。


#### String 和 &amp;str {#string-和-and-str}

&amp;str 是一个指向字符串片段的不可变引用
String是一个可变字符串缓冲区
**对于String类型来说，应该倾向于使用&amp;str,而不是&amp;String.**

1.  String
    String可以看作由三个变量所组成的结构体，第一个变量为指向一块堆上连续内存的指针，第二个变量为这块内存里已经使用的总大小。第三个变量为这块内存的总长度capacity。
    String在new的时候从堆里申请内存，在drop的时候释放内存。
    String内部的指向的连续内存可以看作为u8的数组，String的使用接口确保了内部存储的确实为合法的UTF-8编码的字节。
2.  &amp;str
    &amp;str是对String的一种借用形式，被称为字符串切片。
    由于&amp;str的特殊性让其与普通的引用区分开，这种携带了元数据的特殊引用也被称为胖指针。
    ＆str非常有用，它能够引用String类型的多个不同子字符串而无需复制，避免复制。


#### 元组 {#元组}


#### 数组 {#数组}

```rust
let 变量名称:[数据类型;数组长度] = [默认值;数组长度]
let 变量名称:[数据类型;数组长度] = [数据值1,数据值2...]
```

<!--list-separator-->

-  做为参数

    可以进行值传递也可以进行引用传递.值传递方法内的修改不会影响方法外的数据.引用传递会同步修改.


#### 集合 {#集合}

<!--list-separator-->

-  分类

<!--list-separator-->

-  迭代器

    <!--list-separator-->

    -  分类

        1.  iter()
            返回一个只读可重入迭代器,迭代器元素的类型为&amp;T
        2.  into_iter()
            返回一个只读不可重入迭代器,迭代器元素的类型为T
        3.  inter_mut()
            返回一个可修改可重入迭代器,迭代器元素的类型为&amp;mut T


#### 类型别名 {#类型别名}

<!--list-separator-->

-  说明

    <!--list-separator-->

    -  类型别名仅仅是别名,只是为了让可读性更好,并不是全新的类型

    <!--list-separator-->

    -  类型别名无法实现为外部类型实现外部特征等功能


#### newtype {#newtype}

<!--list-separator-->

-  为什么要使用newtype

    <!--list-separator-->

    -  自定义类型可以让我们给出更有意义和可主读性的类型名

    <!--list-separator-->

    -  对于某些场景,只有newtype可以很好的解决

        <!--list-separator-->

        -  为外部类型实现外部特征

    <!--list-separator-->

    -  危险期内部类型的细节


#### Sized和不定长类型DST {#sized和不定长类型dst}

<!--list-separator-->

-  动态大小类型DST

    编译器无法在编译期间得知该类型值的大小,只有到了程序运行时,才能动态获知. 正因为编译器无法在编译期获知类型大小,若你试图在代码中直接使用DST类型,将无法通过编译,所以DST类型只能保存在堆上,在栈上存一个引用类型.
    Rust中常见的DST类型有: str, [T], dyn Trait, 它们都无法单独被使用,必须要通过引用或者Box来间接使用


### 变量 {#变量}

rust里的变量默认是不可变的，如需需要声明可变变量，需要添加mut声明在变量名的前边。


#### &amp; {#and}

&amp;放在参数前边表明变量是引用类型。


### 常量 {#常量}


#### 常量与变量的区别 {#常量与变量的区别}

1.  关键字是const而不是let
2.  定义常量必须指明类型，不能省略
3.  定义常量时变量的命名规则一般是全部大写
4.  常量可以在任意作用域进行定义，其生命周期贯穿整个程序的生命周期。编译时编译器会尽可能将其内联到代码中，所以在不同地方对同一常量的引用并不能保证引用到相同的内存地址
5.  常量的赋值只能是常量表达式/数学表达式，也就是说必须是在编译期就能计算出的值，如果需要在运行时才能得出结果的值比如函数，则不能赋值给常量表达式
6.  对于变量出现重复的定义（绑定）会发生变量遮盖，后面定义的变量会遮住前面定义的变量，常量则不允许出现重复的定义


### 静态变量 {#静态变量}


#### 静态变量与常量的区别 {#静态变量与常量的区别}

1.  静态变量不会被内联，在整个程序中，静态变量只有一个实例，所有的引用都会指向相同一个地址
2.  存储在静态变量中的值必须要实现Sync trait


### 全局变量 {#全局变量}


#### 类型 {#类型}

1.  编译期初始化的全局变量，const创建常量，static创建静态变量，Atomic创建原子类型
2.  运行期初始化的全局变量，lazy_static用于懒初始化，Box::leak利用内存泄漏将一个变量的生命周期变为'static


### 错误处理 {#错误处理}


#### 组合器 {#组合器}

<!--list-separator-->

-  or()

    表达式按照顺序求值,任何一个表达式的结果是Some或Ok,则该值会立即返回

<!--list-separator-->

-  and()

    若两个表达式的值都是Some或Ok,则第二个表达式中的值被返回.

<!--list-separator-->

-  or_else()

<!--list-separator-->

-  and_then()

<!--list-separator-->

-  Option.filter()

    对Option进行过滤

<!--list-separator-->

-  map()

    可以将Some或Ok中的值映射为另一个

<!--list-separator-->

-  map_err()

    将Err中的值进行改变

<!--list-separator-->

-  map_or()

    在map()的基础上提供了一个默认值

<!--list-separator-->

-  map_or_else()

    与map_or()类似,不过是通过闭包提供默认值

<!--list-separator-->

-  ok_or()

    将Option类型转换为Result类型,ok_or一个默认的Err参数

<!--list-separator-->

-  ok_or_else()

    与ok_or()类似,不过是接受一个闭包作为Err参数


#### 自定义错误类型 {#自定义错误类型}

<!--list-separator-->

-  最简单的错误

    ```rust
    #[derive(Debug)]
    struct AppError;

    impl fmt::Display for AppError {
        fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
            write!(f, "An Error Occurred, Please Try Again!")
        }
    }

    fn produce_error() -> Result<(), AppError> {
        Err(AppError)
    }
    ```


#### 归一化不同的错误类型 {#归一化不同的错误类型}

<!--list-separator-->

-  实现归一化的三种方式

    1.  使用特征对象Box&lt;dyn Error&gt;
    2.  自定义错误类型
    3.  使用thiserror
        ```rust
        #[derive(thiserror::Error, Debug)]
        enum MyError {
            #[error("Environment variable not found")]
            EnvironmentVariableNotFound(#[from] std::env::VarError),
            #[error(transparent)]
            IOError(#[from] std::io::Error)
        }

        fn render() -> Result<String, MyError> {
            let file = std::env::var("MARKDOWN")?;
            // let source = read_to_string(file)?;
            Ok(file)
        }
        ```


#### 处理未知异常 {#处理未知异常}

```rust
fun_name().expect("error happen");
```


### 结构体 {#结构体}


#### 语法 {#语法}

```rust
struct StructName {
  file_name: file_type,
  ...
}
let struct_var = StructName {
   file_name: filed_value,
   ...
}
println!("{}", struct_var.file_name);
```

exp:

```rust
  fn main() {
    println!("Hello, world!");

    let rec = Rectangle {
        length: 64.1,
        width: 32.3
    };

    let rec2 = Rectangle {
        length: 32.2,
        width: 21.1
    };

    let area1 = area(&rec);
    println!("rec area: {}", area1);
    println!("{:?}", rec2);

    println!("rec and rec2 area sub: {}", rec.area_sub(rec2));
}

#[derive(Debug)]
struct Rectangle {
    length: f64,
    width: f64,
}

impl Rectangle {
     // 实例方法
    fn area_sub(&self, rec2: Rectangle) -> f64 {
        return self.length * self.width - rec2.length * rec2.width;
    }
    // 静态方法
    fn get_instance(length: f64, width: f64) -> Rectangle {
        Rectangle(length, width)
    }
}
 // 函数
fn area(rec: &Rectangle) -> f64 {
    return rec.length * rec.width;
}
```


#### 范型结构体 {#范型结构体}

```rust
stuct GenericPoint<T> {
  x: T,
  y: T,
}
impl <T: std::fmt::Debug> GenericPoint<T> {
    fn print_point(&self) {
      println!("x: {:?}", x)
   }
}
```


#### 元组结构体 {#元组结构体}

```rust
// 实例化一个元组结构体
let pair = (String::from("名称"), 18)
// 访问元组结构体中的字段
println!("pair 包含{:?} and {:?}", pair.0, pair.1);
// 解构一个元组结构体
let (name, age) = pair
```


### 枚举 enum {#枚举-enum}

枚举关键字允许创建一个从数个不同取值中选其一的枚举类型, 任何一个在struct中合法的取值在enum中也合法.
在日常生活中很常见.比如:1年有12个月.

```rust
  fn main() {
    let up = Move::Up;
    let down = Move2::Down(1.1, 2.2);
    println!("up: {:?}, down: {:?}", up, down)
}

#[derive(Debug)]
enum Move {
    Up,
    Down,
    Left,
    Right
}

#[derive(Debug)]
enum Move2 {
    Up(f64, f64),
    Down(f64, f64),
    Left(f64, f64),
    Right(f64, f64)
}

#[derive(Debug)]
enum Move3 {
    Up {x: f64, y: f64},
    Down {x: f64, y: f64},
    Left {x: f64, y: f64},
    Right {x: f64, y: f64},
}

#[derive(Debug)]
enum Light {
    On = 1,
    Off = 0,
}
```


#### 范型枚举 {#范型枚举}

```rust
enum GenericPoint<T> {
    x(T, T),
    Y(T, T)
}
```


### 模式匹配 {#模式匹配}


#### if {#if}

```rust
 if condition {
}
 else if condition {}
 else {}
```


#### match {#match}

模式匹配, 使用关键字match对一个值进行模式匹配.进行模式匹配时,会从上至下依次进行比较,并选定一个匹配成功的结果.

```rust
  match key {
  pattern => expression,
  pattern1 | pattern2 => expression1,
  _ => other expression,
}
```

<!--list-separator-->

-  模式匹配的语法糖

    <!--list-separator-->

    -  |

        或语法

    <!--list-separator-->

    -  ..

        范围

    <!--list-separator-->

    -  _

        通配符

<!--list-separator-->

-  其他用法

    <!--list-separator-->

    -  解构枚举

    <!--list-separator-->

    -  解构结构体

    <!--list-separator-->

    -  解构数组

<!--list-separator-->

-  匹配守卫

    匹配时,可以向模式中添加"守卫", 这是一个任意布尔表达式,如果模式匹配,就会执行该表达式. 如果该表达式失败,系统不会考虑原始match中的其他分支.

    ```rust
      #[rustfmt::skip]
    fn main() {
        let pair = (2, -2);
        println!("Tell me about {pair:?}");
        match pair {
            (x, y) if x == y     => println!("These are twins"),
            (x, y) if x + y == 0 => println!("Antimatter, kaboom!"),
            (x, _) if x % 2 == 1 => println!("The first one is odd"),
            _                    => println!("No correlation..."),
        }
    }
    ```


### 函数 {#函数}


#### 说明 {#说明}

<!--list-separator-->

-  如果函数没有return语句,那么rust使用函数的最后一句语句的结果做的返回值,并且数据类型要保持一致.

<!--list-separator-->

-  传参

    <!--list-separator-->

    -  基础类型值传递 mut

        值传递,函数内外各自保存了相同的值,互不影响

    <!--list-separator-->

    -  &amp;mut

        引用传递,把当前变量的内在地址传递给函数.

    <!--list-separator-->

    -  复合类型传参

<!--list-separator-->

-  函数重载

    不支持重载

    1.  每个函数都只有一种实现
        1.  始终接受固定个数的形参
        2.  始终接受一组形参类型
    2.  不支持提供默认值
        1.  实参的数量在所有调用的地方都是一样的。
        2.  有时可以用宏作为替代


#### 范型函数 {#范型函数}

<!--list-separator-->

-  语法


#### if let {#if-let}

能让你根据某个值是否与模式相匹配来执行不同的代码.

```rust
let str:Option<i32> = None;
let flag = false;
if let Some(i) = str {
    println!("Matched{:??}", i);
} else if flag {
    println!("不匹配");
} else {
    prinln!("默认分支");
}
```

<!--list-separator-->

-  1.65后的 let-else

    ```rust
      #[test]
      fn second_word_upper_test() {
          let str = "foo bar";
          assert_eq!("BAR".to_string(), let_test::second_word_to_upper(str).unwrap())
      }

    pub fn second_word_to_upper(s: &str) -> Option<String> {
      let mut it = s.split(" ");
      let (Some(_), Some(item)) = (it.next(), it.next()) else {
          return None;
      };
      Some(item.to_uppercase())
    }
    ```


#### while let {#while-let}

```rust
  let mut num = Some(0);
while let Some(i) = num {
    if i > 9 {
        println!("{}, quit!", i);
        num = None;
    } else {
        prinln!("i is {:?} Try again", i);
        num = Some(i + 1);
    }
}
```


### 范型函数 {#范型函数}


#### 语法 {#语法}

```rust
fn func_name<T>(params: T) -> T {
  params
}
 fn func_name<T, V>(x: T, y: V) -> T {
    x
 }
```


### trait {#trait}


#### 基本语法 {#基本语法}

```rust
  fn main() {
    let rec = Rectangle{
        length: 4.5,
        width: 2.4,
    };
    println!("rec, length: {}, width: {}, area: {} ", rec.length, rec.width, rec.area())
}


trait Method {
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;
}

struct Rectangle {
    length: f64,
    width: f64,
}

impl Method for Rectangle {
    fn area(&self) -> f64 {
        self.length * self.width
    }
    fn perimeter(&self) -> f64 {
        (self.length + self.width) * 2.0
    }
}

struct Circle {
    radius: f64,
}

impl Method for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius.powf(2.0)
    }
    fn perimeter(&self) -> f64 {
        std::f64::consts::PI * self.radius * 2.0
    }
}
```


### 链式方法调用 {#链式方法调用}

方法本身返回实例本身


### 闭包 {#闭包}


#### 基础语法 {#基础语法}

```rust
let add = |a: i32, b: i32| -> i32 {a + b}
let add2 = | a, b | a + b;
```


#### Fn, FnMut, FnOnce {#fn-fnmut-fnonce}

<!--list-separator-->

-  三者特性

    1.  FnOnce 只能调用一次，一旦调用，Closure将丧失所有权。
    2.  FnMut 能调用多次，每次调用Closure的内部状态会变化。
    3.  Fn 能多次调用，每次调用Closure不变。

<!--list-separator-->

-  如何区分

    1.  如果是不可变引用的方式捕获的，那肯定是Fn
    2.  如果是可变引用捕获的，可能是FnMut,也可能是Fn, 得再看闭包行为
        1.  如果闭包行为只是“不可变引用”式的使用捕获变量，那还是Fn（就退化成不可变引用捕获了）
        2.  如果闭包行为改变了捕获变量，那就是FnMut
    3.  如果是所有权转移捕获的，可能是FnOnce, 也可能是FnMut,也可能是Fn
        1.  如果捕获的是复制语义的变量，是Fn
        2.  如果捕获的是移动主义的变量，再看闭包行为
            1.  如果闭包行为没有消费转移走所有权，那就还是Fn/FnMut
            2.  如果闭包行为消费转移走了所有权，那才是FnOnce


#### tips {#tips}

-   rust编译器会在第一次使用闭包时自动推断闭包的参数和返回值的类型
-   如果闭包两次调用传参类型不一致会报错。


### 所有权和移动 {#所有权和移动}

在rust中第个资源只能有一个所有者，并非所有的变更都有资源．


#### 内存 {#内存}

１．栈
    后进先出，类型大小是固定的，如i32
２．堆
    编译时大小未知或者不确定，用户自己管理．

```rust
let a = 32;
let b = a;
println!("{}, {}", a, b);

let arr1 = vec!["a", "b", "c", "d"];
// 所有权已经发生转移了
let arr2 = arr1;
// println!("{}", arr1);  // 会报错
println!("{:?}", arr2);
```


#### 所有权转移 {#所有权转移}

所有权转移只会发生在堆上分配的资源.
值在賳值或做以参数传递,从函数返回的时候也会移动所有权


#### 借用 borrow {#借用-borrow}

&amp;变量名
从一个函数中的变量传递给另外一个函数作为参数暂时使用.函数离开后将所有权返回给当初传递给他的变量.


#### 可变引用 {#可变引用}

&amp;mut 变量名
定义时候和使用时候都得使用&amp;mut


### 切片 {#切片}

切片是指向一段连续内存的指针.在Rust中,连续内存中能够存储的数据结构:数组,字符串,向量.切片可以和它们一起使用.
切片也使用数字索引访问数据.下标索引从0开始.
slice可以指向数组中的一部分.越界下标会引发致命错误.
切片是运行时才能确定的,并不像数组那样编译时就能确定.


### 测试 {#测试}


#### 常用说明 {#常用说明}

<!--list-separator-->

-  #[cfg(test)]

    标注测试模块

<!--list-separator-->

-  #[test]

    标测试方法

<!--list-separator-->

-  #[ignore]

    忽略指定的测试

<!--list-separator-->

-  #[should_panic(excepted = "xxx")]

    测试方法是否报指定的panic

<!--list-separator-->

-  cargo test test_func_name

    运行指定测试


### 不安全的Rust {#不安全的rust}

不安全的代码通常内容很少而且与其他代码隔离,其正确性也应得到仔细记录.这类代码通常封闭在安全的抽象中.
不安全的Rust提供了五种新功能:

-   解引用原始指针
-   访问或修改可变的静态变量
-   访问union字段
-   调用unsafe函数,包括extern函数
-   实现unsafe trait


### 并发 {#并发}


#### 多线程编程的风险 {#多线程编程的风险}

1.  竞态条件(race conditions), 多个线程以非一致性的顺序同时访问数据资源
2.  死锁(deadlocks), 两个纯种都想使用某个资源,但是又都在等待对方释放资源后才能使用,结果无法继续执行
3.  一些因为多纯种导致的很隐晦的BUG,难以复现和解决


#### 一些线程方法 {#一些线程方法}

<!--list-separator-->

-  创建线程

    -   thread::spawn(|| {});

<!--list-separator-->

-  让线程休眠

    thread::sleep(Duration::from_millis(1));

<!--list-separator-->

-  让当前线程阻塞

    handle.join().unwrap();


#### 线程屏障(Barrier) {#线程屏障--barrier}

在Rust中,可以使用Barrier让多个线程都执行到某个点后,才继续一起往后执行

```rust
let mut handles = Vec::with_capacity(6);
  let barrier = Arc::new(Barrier::new(6));
  for _ in 0..6 {
      let b = barrier.clone();
      handles.push(thread::spawn(move || {
          println!("before wait");
          b.wait();
          println!("after wait");
      }));
  }

  for handle in handles {
      handle.join().unwrap();
  }
```


#### thread_local {#thread-local}

使用thread_local宏可以初始化线程局部变量,然后在纯种内部使用该变量的with方法获取变量值

```rust
thread_local!(static FOO: RefCell<u32> = RefCell::new(1));
FOO.with(|f| {
    assert_eq!(*f.borrow(), 1);
    *f.borrow_mut() = 2;
    assert_eq!(*f.borrow(), 2);
});

let t = thread::spawn(move || {
    FOO.with(|f| {
        assert_eq!(*f.borrow(), 1);
        *f.borrow_mut() = 3;
        assert_eq!(*f.borrow(), 3);
    });
});

t.join().unwrap();

FOO.with(|f| {
    assert_eq!(*f.borrow(), 2);
});
```


#### 线程同步 {#线程同步}

<!--list-separator-->

-  共享内存

    <!--list-separator-->

    -  特点

        1.  共享内存相对消息传递能节省多次内存拷贝的成本
        2.  共享内存的实现简洁的多
        3.  共享内存的锁竞争更多

    <!--list-separator-->

    -  互斥锁 Mutex

        Mutex让多个并发线程的访问同一个值变成了排队访问: 同一时间,只允许一个线程访问该值

        <!--list-separator-->

        -  多线程中使用mutex

            ```rost
            let counter = Arc::new(Mutex::new(0));
                let mut handles = vec![];

                for _ in 0..10 {
                    let counter = Arc::clone(&counter);
                    let handle = thread::spawn(move || {
                        let mut num = counter.lock().unwrap();
                        *num += 1;
                    });
                    handles.push(handle);
                }

                for handle in handles {
                    handle.join().unwrap();
                }

                println!("Result: {}", *counter.lock().unwrap());
            ```

        <!--list-separator-->

        -  常用方法

            <!--list-separator-->

            -  mutex.lock()

                向mutex申请一个锁,该方法会阻塞当前线程,直到获取到锁,方法也有可能报错,例如当前正在持有锁的线程panic了.在这种情况下,其它线程不可能再获得锁,因此lock方法会返回一个错误.

        <!--list-separator-->

        -  注意

            <!--list-separator-->

            -  在使用前必须先获取锁

            <!--list-separator-->

            -  在数据使用完成后,必须及时的释放锁

        <!--list-separator-->

        -  死锁

            <!--list-separator-->

            -  lock

                下边代码会产生死锁

                ```rust

                use lazy_static::lazy_static;

                lazy_static! {
                    static ref MUTEX1: Mutex<i64> = Mutex::new(0);
                    static ref MUTEX2: Mutex<i64> = Mutex::new(0);
                }

                fn main() {

                    let mut children = vec![];
                    for i_thread in 0..2 {
                        children.push(thread::spawn(move || {
                            if i_thread % 2 == 0 {
                                let guard: MutexGuard<i64> = MUTEX1.lock().unwrap();
                                println!("线程{}锁住了MUTEX1,接着准备去锁MUTEX2!", i_thread);

                                sleep(Duration::from_secs(2));

                                let guard = MUTEX2.lock().unwrap();
                            } else {
                                let _guard = MUTEX2.lock().unwrap();
                                sleep(Duration::from_secs(2));
                                let _guard = MUTEX1.lock().unwrap();

                                println!("线程{}锁住了MUTEX2,准备去锁MUTEX1", i_thread);
                            }
                        }));
                    }

                    for child in children {
                        let _ = child.join();
                    }

                    println!("死锁没有发生");
                }
                ```

            <!--list-separator-->

            -  try_lock()

                把上边的代码中的lock()改成try_lock()则不会产生死锁
                与lock方法不同, try_lock()会尝试获取一次锁,如果无法获取锁会返回一个错误,因此不会发生阻塞

    <!--list-separator-->

    -  读写锁 RwLock

        Mutex会对每次读写都进行回销,但某些时候,我们需要大量的并发读, Mutex就无法满足需求了,此时我们就可以使用RwLock
        RwLock在使用上和Mutex区别不大,只有在多个读的情况下不阻塞程序,其他如读写,写读,写写情况下均会对后获取锁的操作进行阻塞.

        <!--list-separator-->

        -  例子

            ```rust
            let lock = RwLock::new(5);

            {
                let r1 = lock.read().unwrap();
                let r2 = lock.read().unwrap();

                assert_eq!(*r1, 5);
                assert_eq!(*r2, 5);
            }

            {
                let mut w = lock.write().unwrap();
                *w += 1;
                assert_eq!(*w, 6);

                // 以下代码会阻塞发生死锁, 因为读和写不允许同时存在
                // 写锁W直到该语句块结束才被释放,因此下面的读锁依然处于w的作用域中
                let r1 = lock.read();
                println!("{:?}", r1);
            }// 写锁在此处被drop
            ```

        <!--list-separator-->

        -  Tips

            1.  同时允许多个读,但最多只能有一个写
            2.  读和写不能同时存在
            3.  读可以使用read, try_read, 写write, try_write, 在实际项目中, try_xx会安全的多.

    <!--list-separator-->

    -  条件变量 Condvar

        <!--list-separator-->

        -  例子

            ```rust

            let flag = Arc::new(Mutex::new(false));
            let cond = Arc::new(Condvar::new());
            let cflag = flag.clone();
            let ccond = cond.clone();

            let handle1 = thread::spawn(move || {
                let mut lock = cflag.lock().unwrap();
                let mut counter = 0;

                while counter < 3 {
                    while !*lock {
                        // wait方法会接收一个MutexGuard<'a, T>, 且它会自动地暂时释放这个锁, 使用其它线程可以拿到锁并进行数据更新
                        // 同时当前线程在此处会被阻塞,直到被其它地方notify后,它会将原本的MutexGuard<'a, T>还给我们,即重新获取到了锁,同时唤醒了此线程
                        lock = ccond.wait(lock).unwrap();
                    }

                    *lock = false;

                    counter += 1;
                    println!("inner counter: {}", counter);
                }
            });

            let mut counter = 0;
            loop {
                sleep(Duration::from_millis(1000));
                *flag.lock().unwrap() = true;
                counter += 1;
                if counter > 3 {
                    break;
                }
                println!("outside counter: {}", counter);
                cond.notify_one();
            }
            handle1.join().unwrap();
            println!("{:?}", flag);
            ```

    <!--list-separator-->

    -  信号量 Semaphore

        推荐使用tokio提供的Semaphore

        <!--list-separator-->

        -  例子

            创建一个容量为3的信号量,当正在执行的任务超过3时,剩下的任务需要等等正在执行任务完成并减少信号量到3以内时,才能继续执行.

            ```rust
            let semaphore = Arc::new(Semaphore::new(3));
            let mut join_handles = Vec::new();

            for _ in 0..5 {
                let permit = semaphore.clone().acquire_owned().await.unwrap();
                join_handles.push(tokio::spawn(async move {
                    println!("todo...");
                    sleep(Duration::from_secs(1));
                    drop(permit);
                }));
            }

            for handle in join_handles {
                handle.await.unwrap();
            }
            ```

<!--list-separator-->

-  Atomic原子类型与内存顺序

    Rust1.34版本后,就正式支持原子类型.原子指的是一系列不可被CPU上下文交换的机器指令,这些指令组合在一起就形成了原子操作.在某个CPU核心开始运行原子操作时,会先暂停其它CPU内核对内存的操作,以保证原子操作不会被其它CPU内核所干扰.
    由于原子操作是通过指令提供的支持,因此它的性能相比锁和消息传递会好很多.相比较于则言,原子类型不需要开发者处理回销和释放锁的问题,同时支持修改,读取等操作,还具备较高的并发性能.
    原子类型是无锁类型,但是无锁不代表无需等等,因为原子类型内部使用了CAS循环,当大量的冲突发生时,该等待还是得等待.

    <!--list-separator-->

    -  内存顺序 Ordering::

        内存顺序是指CPU在访问内存时的顺序, 该顺序可能受以下因素的影响:

        1.  代码中的先后顺序
        2.  编译器优化导致在编译阶段发生改变(内存重排序recordering)
        3.  运行阶段因CPU的缓存机制导致顺序被打乱

        <!--list-separator-->

        -  成员

            1.  Relaxed 最宽松的规则,它对编译器和CPU不做任何限制,可以乱序
            2.  Release 设定内在屏障(Memory barrier),保证它之前的操作永远在它之前,但是它后面的操作可能被重排到它前面
            3.  Acquire 设定内存屏障,保证在它之后的访问永远在它之后,但是它之前的操作却有可能被重排到它后面,往往和Release在不同线程中联合使用
            4.  AcqRel 是Acquire和Release的结合,同时拥有它们俩提供的保证.比如你要对一个atomic自增1,同时希望该操作之前和之后的读取或定入操作不会被重新排序
            5.  SeqCst 顺序一致性 SeqCst就像是AcqRel的加强版,它不管原子操作是属于读取还是写入的操作,只要某个线程有用到SeqCst的原子操作,线程中该SeqCst操作前的数据操作绝对不会被重新排在该SeqCst操作之后,且该SeqCst操作后的数据操作也绝对不会被重新排在SeqCst操作前.

    <!--list-separator-->

    -  多线程中使用Atomic

        在多线程环境中使用Atomic需要配合Arc

        <!--list-separator-->

        -  例子

            ```rust
            let spinlock = Arc::new(AtomicUsize::new(1));
            let spinlock_clone = Arc::clone(&spinlock);
            let thread = thread::spawn(move || {
                spinlock_clone.store(0, Ordering::SeqCst);
            });

            while spinlock.load(Ordering::SeqCst) != 0 {
                hint::spin_loop();
            }

            if let Err(panic) = thread.join() {
                println!("THread had an error: {:?}", panic);
            }
            ```

    <!--list-separator-->

    -  Atomic不能替代锁

        1.  对于复杂的场景下,锁的使用简单粗暴,不容易有坑
        2.  std::sync::atomic包中公提供了数值类型的原子操作:AtomicBool, AtomicIsize, AtomicUsize, AtomicI8, AtomicU16等,而锁可以应用于各种类型
        3.  在有些情况下,必须使用锁来,配合例如使用Mutex配合Condvar

    <!--list-separator-->

    -  应用场景

        1.  无锁数据结构
        2.  全局变量,例如全局自增ID
        3.  跨线程计数器,例如可以用于统计指标

<!--list-separator-->

-  消息传递

    <!--list-separator-->

    -  特点

        1.  需要可靠和简单的(简单不等于简洁)实现时
        2.  需要模拟现实世界,例如用消息去通知某个目标执行相应的操作时
        3.  需要一个任务处理流水线(管道)时

    <!--list-separator-->

    -  线程间的消息传递

        <!--list-separator-->

        -  多发送者,单接收者

            标准库提供了通道std::sync::mpsc, 其中mpsc是multiple producer, sinle consumer的缩写

            ```rust
            let (tx, rx) = mpsc::channel();
            let t1 = tx.clone();
            let thread1 = thread::spawn(move || {
                t1.send(1).unwrap();
            });

            let t2 = tx.clone();
            let thread2 = thread::spawn(move || {
                t2.clone().send(2).unwrap();
            });

            thread1.join().unwrap();
            thread2.join().unwrap();

            println!("receive {}", rx.recv().unwrap());
            println!("try receive {}", rx.try_recv().unwrap());
            println!("try receive {}", rx.try_recv().unwrap());
            ```

            使用for循环处理

            ```rust
              thread::spawn(move || {
                let vals = vec![
                    String::from("hi"),
                    String::from("from"),
                    String::from("the"),
                    String::from("thread"),
                ];
                for val in vals {
                    tx.send(val).unwrap();
                    thread::sleep(Duration::from_secs(1));
                }
            });

            for receive in rx {
                println!("Got {}", receive);
            }
            ```

        <!--list-separator-->

        -  消息通道

            rust通道(Channel)包含两个部分:Sender&lt;T&gt;和Receiver&lt;T&gt;.这两个部分通过通道进行连接,但你只能看到端点.

            ```rust
              use std::sync::mpsc;

            fn main() {
                let (tx, rx) = mpsc::channel();

                tx.send(10).unwrap();
                tx.send(20).unwrap();

                println!("Received: {:?}", rx.recv());
                println!("Received: {:?}", rx.recv());

                let tx2 = tx.clone();
                tx2.send(30).unwrap();
                println!("Received: {:?}", rx.recv());
            }
            ```

            <!--list-separator-->

            -  异步通道

                mpsc::channel();

            <!--list-separator-->

            -  同步通道

                mpsc::sync_channel(0);
                同步通道发送消息是阻塞的,只有在消息被接收后才解除阻塞, 其中的0表示无阻塞往通道中发送的消息条数


#### 范围线程 {#范围线程}

常规线程不能从它们所处的环境中借用数据:

```rust
  use std::thread;

fn foo() {
    let s = String::from("Hello");
    thread::spawn(|| {
        println!("Length: {}", s.len());
    });
}

fn main() {
    foo();
}
```

不过范围线程可以实现此目的

```rust
  use std::thread;

fn main() {
    let s = String::from("Hello");

    thread::scope(|scope| {
        scope.spawn(|| {
            println!("Length: {}", s.len());
        });
    });
}
```


#### Send和Sync {#send和sync}

<!--list-separator-->

-  Send: 如果跨线程边界移动T是安全的,则类型T为Send.

    如果将T值移动到另一个线程是安全的,则类型T为Send.将所有权转移到另一个线程的影响是,"析构函数"将在檅应线程中运行.因此,问题在于你何时可以在一个线程中分配某个值,然后在另一个线程中取消分配该值.

<!--list-separator-->

-  Sync: 如果跨线程边界移动&amp;T是安全的,则类型T为Sync.

    如果同时从多个线程访问T值是安全的,则类型T为Sync. 当且公当&amp;T为Sned时,T为Sync.

<!--list-separator-->

-  常见类型

    <!--list-separator-->

    -  Send + Sync

        你遇到的类型大都属于 Send + Sync：

        -   i8、f32、bool、char、&amp;str…
        -   (T1, T2)、[T; N]、&amp;[T]、struct { x: T }…
        -   String、Option&lt;T&gt;、Vec&lt;T&gt;、Box&lt;T&gt;…
        -   Arc&lt;T&gt;：明确通过原子引用计数实现线程安全。
        -   Mutex&lt;T&gt;：明确通过内部锁定实现线程安全。
        -   AtomicBool、AtomicU8…：使用特殊的原子指令。

        当类型参数为 Send + Sync 时，泛型类型通常 为 Send + Sync。

    <!--list-separator-->

    -  Send + !Sync

        这些类型可以移动到其他线程,但它们不是线程安全的.这通常是由内部可变性造成的.

        -   mpsc::Sender&lt;T&gt;
        -   mpsc::Receiver&lt;T&gt;
        -   Cell&lt;T&gt;
        -   RefCell&lt;T&gt;

    <!--list-separator-->

    -  !Send + Sync

        这些类型是线程安全的,但它们不能移动到另一个线程

        -   MutexGuard&lt;T&gt;: 使用操作系统级别的原语(必须在创建这些原语的纯种上取消分配)

    <!--list-separator-->

    -  !Send + !Sync

        这些类型不是线程安全的,不能移动到其他线程

        -   Rc&lt;T&gt;: 每个Rc&lt;T&gt;都具有对RcBox&lt;T&gt;的引用,其中包含非原子引用计数.
        -   \*const T, \*mut T: Rust会假定原始指针可能在并发方面有行后列的注意事项.

<!--list-separator-->

-  实现Send和Sync的类型

    在Rust中,几乎所有类型都默认实现了Send和Sync,而且由于这两个特征是可以自动派生的特征(通过derive派生),意味着一个复合类型(例如结构体),只要它内部的所有成员都实现了Send或者Sync,那么它就自动实现了Send或Sync

    <!--list-separator-->

    -  Rust中未实现Send和Sync的

        1.  裸指针两都都没实现，因为它本身就没有任何安全保证
        2.  UnsafeCell不是Sync,因此Cell和RefCell也不是
        3.  Rc两者都没实现（因为内部的引用计数不是线程安全的）

<!--list-separator-->

-  共享状态

    Rust使用类型系统来强制同步共享数据.
    这主要通过两种类型实现:

    -   Arc&lt;T&gt;: 对T进行原子计数,用于处理线程之间的共享,并负责在最后一个引用被丢弃时取消分配T.
        Arc&lt;T&gt;允许通过Arc::clone()实现共享只读权限.
        ```rust
            use std::thread;
        use std::sync::Arc;

        fn main() {
            let v = Arc::new(vec![10, 20, 30]);
            let mut handles = Vec::new();
            for _ in 1..5 {
                let v = Arc::clone(&v);
                handles.push(thread::spawn(move || {
                    let thread_id = thread::current().id();
                    println!("{thread_id:?}: {v:?}");
                }));
            }

            handles.into_iter().for_each(|h| h.join().unwrap());
            println!("v: {v:?}");
        }
        ```
    -   Mutex&lt;T&gt;: 确保对T值的互斥访问.
        Mutex&lt;T&gt;能确保互斥,并允许对只读接口后面的T进行可变访问.
        ```rust
            use std::sync::Mutex;

        fn main() {
            let v = Mutex::new(vec![10, 20, 30]);
            println!("v: {:?}", v.lock().unwrap());

            {
                let mut guard = v.lock().unwrap();
                guard.push(40);
            }

            println!("v: {:?}", v.lock().unwrap());
        }
        ```


#### Asnyc编程 {#asnyc编程}

<!--list-separator-->

-  特征

    <!--list-separator-->

    -  OS线程

        它最简单,也无需改变任何编程模型(业务/代码逻辑),因此非常适合作为语言的原生并发模型,

    <!--list-separator-->

    -  事件驱动(Event driven)

    <!--list-separator-->

    -  协程(Coroutines)

    <!--list-separator-->

    -  actor模型

    <!--list-separator-->

    -  async/await

<!--list-separator-->

-  async: Rust vs 其它语言

    <!--list-separator-->

    -  Future在Rust中是惰性的

        只有在被轮询时才会运行

    <!--list-separator-->

    -  Async在Rust中使用开销是零

        只有你能看到的代码才有性能损耗

    <!--list-separator-->

    -  Rust没有内置异常调用所必需的运行时

        Rust社区生态中已经提供了运行时实现,例如tokio

    <!--list-separator-->

    -  运行时同时支持单线程和多线程

<!--list-separator-->

-  Rust: async vs 多线程

    <!--list-separator-->

    -  有大量IO任务需要并发运行时,选async模型

    <!--list-separator-->

    -  有部分IO任务需要并发运行时,选多纯种,如果想降低线程创建和销毁的开销,可以使用线程池

    <!--list-separator-->

    -  有大量CPU密集任务需要并行运行时,例如并行计算,选多纯种模型,且让纯种数等于或者稍大于CPU核心数

    <!--list-separator-->

    -  无所谓时,统一选多线程

<!--list-separator-->

-  完整使用async异步编程,你需要依赖以下特性和外部库

    <!--list-separator-->

    -  所必须的先特征(例如Future),类型和函数,由标准库提供实现

    <!--list-separator-->

    -  关键字async/await由RUST语言提供,并进行了编译器层面的支持

    <!--list-separator-->

    -  众多实用的类型,宏和函数由官方开发的futures包提供(不是标准库),它们可以用于任何async应用中

    <!--list-separator-->

    -  async代码的执行,IO操作,任务创建和调度等等复杂功能由社区的async运行时提供.例如tokio和async-std

<!--list-separator-->

-  Future

    Future是一个能产出值的异步计算（值可能是空）

<!--list-separator-->

-  Pin和Unpin

    <!--list-separator-->

    -  在Rust中,所有的类型可以分为两类

        1.  类型的值可以在内在中安全地被移动
        2.  自引用类型

    <!--list-separator-->

    -  将固定信的Future变为Unpin

        1.  Box::pin, 创建一个Pin&lt;Box&lt;T&gt;&gt;
        2.  pin_utils::pin_mut!, 创建一个Pin&lt;&amp;mut T&gt;

    <!--list-separator-->

    -  Tips

        <!--list-separator-->

        -  若T: Unpin(Rust类型的默认实现)，那么Pin&lt;'a, T&gt;跟&amp;'a mut T完全相同，也就是Pin将没有任何效果，该移动还是照常移动

        <!--list-separator-->

        -  绝大多数标准库类型都实现了Unpin,事实上，对于Rust中你能遇到的绝大多数类型，该结论依然成立，其中一个例外就是:async/await生成的Future没有实现Unpin

        <!--list-separator-->

        -  你可以通过以下方法为自己类型添加!Unpin约束：

            <!--list-separator-->

            -  使用文中提到的std::marker::PhantomPinned

            <!--list-separator-->

            -  使用nightly版本下的feature flag

        <!--list-separator-->

        -  可以将值到栈上，也可以固定到堆上

            <!--list-separator-->

            -  将!Unpin值固定到栈上需要使用unsfae

            <!--list-separator-->

            -  将!Unpin值固定到堆上无需要unsafe,可以通过Box::pin来简单的实现

        <!--list-separator-->

        -  将固定类型T: !Unpin时，你需要保证数据从被固定到被Drop这段时期内，其内存不会变得非法或者被重用

<!--list-separator-->

-  async/.await和Stream流处理

    <!--list-separator-->

    -  async/.await

        async/.await是Rust语法的一部分，它在遇到阻塞操作时（例如IO）会让出当前线程的所有权而不是阻塞当前线程，这样就允许当前线程继续去执行其它代码，最终实现并发。
        async是懒惰的，直到被执行器poll或者.await后才会开始运行，其中后者最常用的运行Future的方法。
        async fn 函数如果拥有引用类型的参数，那它返回的Future的生命周期就会被这些参数的生命周期所限制。
        async允许我们使用move关键字来将环境中变量的所有权转移支语句块内，就像闭包那样，好处是你不再发愁该如何解决借用生命周期的问题，坏处就是无法跟其它代码实现对变量的共享。
        全使用多线程Future执行器（executor）时，Future可能会在线程间被移动，因此async语句块中的变量必须要能在线程间传递。至于Future会在线程间移动的原因是：它内部的任何.await都可能导致它被切换到一个新线程上去执行。类似的原因，在.await时使用普通的锁也不安全，例如Mutex.原因是，它可能会导致线程池被锁：当一个任务获取锁A后，若它将线程的控制权还给执行器，然后执行器又调度运行另一个任务，该任务也去深度获取了锁A,结果当前线程会直接卡死，最终降入死锁中。因为为了避免这种情况的发生，我们需要使用futures包下的锁futures::lock来替代Mutex完成任务。

    <!--list-separator-->

    -  stream流处理

        关于Stream的一个常见例子是消息通道(futures包中的)的消费者Receiver.每次有消息从Send端发送后，它都可以接收到一个Some(val)值，一旦Send端关闭(drop)，且消息通道中没有消息后，它会接收到一个None值。

        <!--list-separator-->

        -  迭代和并发

            跟迭代器类似，我们也可以迭代一个Stream。例如使用map, filter, fold方法，以及它们的遇到错误提前返回的版本： try_map, try_filter, try_fold.
            但是跟迭代器又有所不同，for循环无法在这里使用，但是命令式风格的循环while let 是可以使用的，同时还可以使用next和try_next方法。

<!--list-separator-->

-  使用join!和select!同时运行多个Future

    <!--list-separator-->

    -  join!

        它允许我们同时等待多个不同Future的完成,且可以并发地运行这些Future

    <!--list-separator-->

    -  try_join!

        在某一个Future报错后就立即停止所有Future的执行.

    <!--list-separator-->

    -  select!

        join!只有等所有Future结束后,才能集中处理结果,如果你想同时等待多个Future,且任何一个Future结束后,都可以立即被处理,可以考虑使用futures::select!


### 生命周期 {#生命周期}


#### 生命周期消除规则 {#生命周期消除规则}

1.  每一个引用参数都会获得独自的生命周期
2.  若只有一个输入生命周期(函数参数中只有一个引用类型),那么该生命周期会被赋给所有的输出生命周期
3.  若存在多个输入生命周期,且其中一个是&amp;self或&amp;mut self,则&amp;self的生命周期被赋给所有的输出生命周期


### 注释 {#注释}

在 Rust 中，注释分为三个主要类型：代码注释、文档注释、包和模块注释，每个注释类型都拥有两种形式：行注释和块注释


#### 注释类型 {#注释类型}

<!--list-separator-->

-  代码注释

    <!--list-separator-->

    -  行注释 //

    <!--list-separator-->

    -  块注释 _\* .... \*_

<!--list-separator-->

-  文档注释

    <!--list-separator-->

    -  文档行注释  _/_

        <!--list-separator-->

        -  注意

            1.  文档注释需要位于lib类型的包中,例如src/lib.rs中
            2.  文档注释可以使用markdown语法,例如# Example的标题,以及代码块高亮
            3.  被注释的对象需要使用pub对外可见

    <!--list-separator-->

    -  文档块注释 _\*\* ... \*_

<!--list-separator-->

-  包和模块注释

    <!--list-separator-->

    -  行注释 //!

    <!--list-separator-->

    -  块注释 _\*! ... \*_


#### 查看文档 cargo doc --open {#查看文档-cargo-doc-open}


#### 文档测试 {#文档测试}

<!--list-separator-->

-  例子

    <!--list-separator-->

    -  正常的单元测试

        ```rust
        /// `add_one` 将指定值加1
        ///
        /// # Examples11
        ///
        /// ```
        /// let arg = 5;
        /// let answer = world_hello::compute::add_one(arg);
        ///
        /// assert_eq!(6, answer);
        /// ```
        pub fn add_one(x: i32) -> i32 {
            x + 1
        }
        ```

    <!--list-separator-->

    -  会panic的单元测试

        ```rust
        /// # Panics
        ///
        /// The function panics if the second argument is zero.
        ///
        /// ```rust,should_panic
        /// // panics on division by zero
        /// world_hello::compute::div(10, 0);
        /// ```
        ```

    <!--list-separator-->

    -  保留测试,隐藏文档

        在某些时候，我们希望保留文档测试的功能，但是又要将某些测试用例的内容从文档中隐藏起来：

        ```rust
        /// ```
        /// # // 使用#开头的行会在文档中被隐藏起来，但是依然会在文档测试中运行
        /// # fn try_main() -> Result<(), String> {
        /// let res = world_hello::compute::try_div(10, 0)?;
        /// # Ok(()) // returning from try_main
        /// # }
        /// # fn main() {
        /// #    try_main().unwrap();
        /// #
        /// # }
        /// ```
        pub fn try_div(a: i32, b: i32) -> Result<i32, String> {
            if b == 0 {
                Err(String::from("Divide-by-zero"))
            } else {
                Ok(a / b)
            }
        }
        ```


#### 文档注释中的代码跳转 {#文档注释中的代码跳转}

<!--list-separator-->

-  跳转到标准库

    ```rust
    /// `add_one` 返回一个[`Option`]类型
    pub fn add_one(x: i32) -> Option<i32> {
        Some(x + 1)
    }
    ```

    还可以使用路径的方式跳转

    ```rust
    use std::sync::mpsc::Receiver;

    /// [`Receiver<T>`]   [`std::future`].
    ///
    ///  [`std::future::Future`] [`Self::recv()`].
    pub struct AsyncReceiver<T> {
        sender: Receiver<T>,
    }

    impl<T> AsyncReceiver<T> {
        pub async fn recv() -> T {
            unimplemented!()
        }
    }
    ```

    同名项的跳转

    ```rust
    /// 跳转到结构体  [`Foo`](struct@Foo)
    pub struct Bar;

    /// 跳转到同名函数 [`Foo`](fn@Foo)
    pub struct Foo {}

    /// 跳转到同名宏 [`foo!`]
    pub fn Foo() {}

    #[macro_export]
    macro_rules! foo {
      () => {}
    }
    ```


#### 文档搜索别名 {#文档搜索别名}

Rust 文档支持搜索功能，我们可以为自己的类型定义几个别名，以实现更好的搜索展现，当别名命中时，搜索结果会被放在第一位

```rust
#[doc(alias = "x")]
#[doc(alias = "big")]
pub struct BigX;

#[doc(alias("y", "big"))]
pub struct BigY;
```


### 智能指针 {#智能指针}

指针是一个包含了内存地址的变量,该内存地址引用或者指向了另外的数据
智能指针则是一个复杂的家伙:通过比引用更复杂的数据结构,包含比引用更多的信息,例如f元数据,当前长度,最大可用长度等.
引用和智能指针的另一个不同在于前者仅仅是借用了数据,而后者往往可以拥有它们指向的数据,然后再为其它人提供服务.
智能指针往往是基于结构体实现,它与我们自定义的结构体最大的区别在于它实现了Deref和Drop特征

1.  Deref可以让智能指针像引用那样工作,这样你就可以写出同时支持智能指针和引用的代码,例如 \*T
    1.  三种Deref转换
        1.  T: Deref&lt;Target=U&gt; 可以将&amp;T转换成&amp;U
        2.  T: DerefMut&lt;Target=U&gt; 可以将&amp;mut T转换成&amp;mut U
            要实现DerefMut必须要先实现Deref特征
        3.  T: Deref&lt;Target=U&gt; 可以将&amp;mut T转换成&amp;U
2.  Drop允许你指定智能指针超出作用域后自动执行的代码,例如做一些数据收尾工作
    1.  Tips
        1.  Drop特征中的drop方法借用了目标的可变引用,而不是拿走了所有权
        2.  结构体中每个字段都有自己的Drop
        3.  Drop顺序
            1.  变量级别,按照逆序的方式
            2.  结构体内部,按照顺序的方式
        4.  Rust自动为几乎所有的类型都实现了Drop特征,因此就算你不手动为结构体实现Drop,它依然后调用默认实现的drop函数,同时再调用每个字段的drop方法.
    2.  手动回收
        当使用智能指针来管理锁的时候,你可能希望提前释放这个,锁然后让其它代码能及时获得,锁此时就需要提前去手动drop(obj)
    3.  互斥的Copy和Drop
        我们无法为一个类型同时实现Copyu和Drop特征.因为实现了Copy的特征会被编译器隐式的复制,因此非常难以预测析构函数执行的时间和频率.


#### 常见的智能指针 {#常见的智能指针}

<!--list-separator-->

-  Box&lt;T&gt; 可以将值分配到堆上

    Box是最简单的封闭,除了将值存储在堆上外,并没有其它性能上的损耗,因此Box相比其它智能指针,功能较为单一,可以在以下场景中使用它

    1.  特意的将数据分配在堆上
    2.  数据较大时,又不想在转移所有权时进行数据拷贝
    3.  类型的大小在编译期无法确定,但是我们又需要固定大小的类型时
    4.  特征对象,用于说明对象实现了一个特征,而不是某个特定的类型

    <!--list-separator-->

    -  常用函数

        <!--list-separator-->

        -  Box::leak

            它可以消费掉Box并强制目标值从内存中泄漏,将一个运行期的值转为'static. 例如,你可以把一个String类型变一个'static生命周期的&amp;str类型.

<!--list-separator-->

-  Rc&lt;T&gt; 引用计数类型,允许多所有权存在

    reference counting 引用计数,通过记录一个数据被引用的次数来确定该数据是否正在被使用.当引用次数归零时,就代表该数据不再被使用,因此可以被清理释放.

    <!--list-separator-->

    -  使用

        <!--list-separator-->

        -  Rc:new() 创建智能指针Rc

        <!--list-separator-->

        -  Rc:clone() 克隆智能指针

            复制智能指针并增加了引用计数,并没有克隆底层数据

        <!--list-separator-->

        -  Rc::strong_count() 获取引用计数的值

    <!--list-separator-->

    -  Tips

        1.  Rc&lt;T&gt;是指向底层数据的不可变引用,如果需要修改数据,那么单独使用Rc&lt;T&gt;无法满足我们的需求. 需要配合RefCell或者互斥锁Mutex
        2.  一旦最后一个拥有者消失,则资源会自动被回收,这个生命周期是经编译期就确定下来的.
        3.  Rc只能用于同一线程内部,想要用于线程之间的对象共享,你需要使用Arc
        4.  Rc&lt;T&gt;是一个智能指针,实现了Deref特征,因此你无需先解开Rc指针,再使用里边的T,而是可以直接使用T

<!--list-separator-->

-  Arc&lt;T&gt; 原子化的Rc&lt;T&gt;

    <!--list-separator-->

    -  Tips

        1.  Arc虽然可以带来纯种安全,但是会伴随着性能损耗
        2.  Arc和Rc拥有完全一样的API

<!--list-separator-->

-  Ref&lt;T&gt;和RefMut 允许将借用规则检查从编译期移动到运行期进行

<!--list-separator-->

-  Cell和RefCell

    Rust提供的Cell和RefCell用于内部可变化,可以在拥有不可变引用的同时修改目标数据, Cell和RefCell在功能上没有区别,区别在于Cell&lt;T&gt;适用于T实现Copy的情况, 当非要使用内部可变性时,首选Cell,只有你的类型没有实现Copy时,才去选择RefCell
    RefCell用于你确信代码是正确的,而编译器却发生了误判的情况.总之,当你确信编译器误报但不知道该如何解决时,或者你有一个引用类型,需要被四处使用和修改然后导致借用关系难以管理时,都可以优先考虑使用RefCell

    <!--list-separator-->

    -  RefCell总结

        1.  与Cell用于可Copy的值不同,RefCell用于引用
        2.  RefCell只是将借用规则从编译期推迟到程序运行期,并不能帮你绕过这个规则
        3.  RefCell适用于编译期误报或者一个引用被在多处代码使用,修改以至于难于管理借用关系时
        4.  使用RefCell时,违背借用规则会导致运行期的panic

<!--list-separator-->

-  Weak

    Weak非常类似于Rc,但是与Rc持有所有权不同,Weak不持有所有权,它仅仅保存一份指向数据的弱引用,如果你想要访问数据,需要通过Weak指针的upgrade方法获取类型为Option&lt;Rc&lt;T&gt;&gt;的值,如果值存在就返回Some,不存在就返回None.

    <!--list-separator-->

    -  特点

        1.  可访问,但没有所有权,不增加引用计数,因此不会影响被引用值的释放回收
        2.  可由Rc&lt;T&gt;调用downgrade方法转换成Weak&lt;T&gt;
        3.  Weak&lt;T&gt;可使用upgrade方法转换成Option&lt;Rc&lt;T&gt;&gt;,如果资源已经被释放,则Option的值是None
        4.  常用于解决循环引用的问题


#### Tips {#tips}

<!--list-separator-->

-  在表达式中智能指针不能隐匿的解引用


### unsafe {#unsafe}


#### unsafe赋予我们的5种能力 {#unsafe赋予我们的5种能力}

<!--list-separator-->

-  解引用裸指引

    裸指针又称原生指针，在功能上跟引用类似，同时它也需要地注明可变性。但是又和引用有所不同，其中\*const T 表示不可变裸指针， \*mut T表示可变裸指针。

    <!--list-separator-->

    -  裸指针与引用和智能指针的区别

        1.  可以绕过Rust的借用规则，可以同时拥有一个数据的可变、不可变指针，甚至还能拥有多个可变的指针
        2.  并不能保证指向合法的内存
        3.  可以是null
        4.  没有实现任何自动的回收(drop)

    <!--list-separator-->

    -  创建裸指针

        <!--list-separator-->

        -  基于引用创建裸指针

            创建裸指针是安全的行为，而解引用裸指针才是不安全的行为。

            ```rust
            let mut num = 5;
            let r1 = &num as *const i32;
            let r2 = *mut num as *mut i32;
            unsafe {
                println!("r1 is： {}", *r1);
            }
            ```

        <!--list-separator-->

        -  基于内存地址创建裸指针

            ```rust
            let address = 0x012345usize;
            let r = address as *const i32;

            ```

            ```rust
            fn get_memory_location() -> (usize, usize) {
                let string = "Hello world!";
                let pointer = string.as_ptr() as usize;
                let length = string.len();
                (pointer, length)
            }

            fn get_str_at_location(pointer: usize, length: usize) -> &'static str {
                unsafe {
                    from_utf8_unchecked(from_raw_parts(pointer as *const u8, length))
                }
            }

            fn main() {
                let (pointer, length) = get_memory_location();
                let message = get_str_at_location(pointer, length);
                println!(
                    "The {} bytes as 0x{:X} stored: {}",
                    length, pointer, message
                );
                let message = get_str_at_location(1000, 10);
                println!("{:?}", message);
            }
            ```

        <!--list-separator-->

        -  基于智能指针创建裸指针

            ```rust
            let a: Box<i32> = Box::new(10);
            //需要先解引用a
            let b: *const i32 = &*a;
            // 使用into_raw来创建
            let c: *const i32 = Box::into_raw(a);
            ```

    <!--list-separator-->

    -  解引用裸指针

        使用\*可以对裸指针进行解引用， 由于该指针的内存安全性并没有任何保证，因此我们需要使用unsafe来包裹引用的逻辑（unsafe诗句块的范围一定要尽可能的小）

        ```rust
        let a = 1;
        let b: *const i32 = &a as *const i32;
        let c: *const i32 = &a;
        unsafe {
            println!("{}", *c);
        }
        ```

        在上边代码，除了使用as来的转换，我们还使用了隐匿的转换方式let c: \*const i32 = \*a;。在实际使用中，我们建议使用as来转换。

<!--list-separator-->

-  调用一个unsafe或外部的函数

<!--list-separator-->

-  访问或修改一个可变的静态变量

<!--list-separator-->

-  实现一个unsafe特征

    之所以会有unsafe的特征，是因为该特征至少有一个方法包含有编译器无法验证的内容。

    <!--list-separator-->

    -  例

        ```rust
        unsafe trait Foo {}
        unsafe impl Foo for i32 {}
        fn main() {}
        ```

        通过unsafe impl的使用，我们告诉编译器：相应的正确性由我们自己来保证。

<!--list-separator-->

-  访问union中的字段

    它主要用于跟C代码进行交互，访问union的字段是不安全的，因为Rust无法保证当前存储在union实例中的数据类型。

    ```rust
    #[repr(C)]
    union MyUnion {
        f1: u32,
        f2: f32,
    }
    ```


#### 调用unsafe函数或方法 {#调用unsafe函数或方法}


#### 用安全抽象包裹unsafe代码 {#用安全抽象包裹unsafe代码}

一个函数包含了unsafe代码不代表我们需要将整个函数都定义为unsafe fn.


#### 一些实用工具 {#一些实用工具}

<!--list-separator-->

-  rust-bindgen

    自动生成在Rust中访问C的代码

<!--list-separator-->

-  cbindgen

    自动生成提供给C访问的代码

<!--list-separator-->

-  cxx

    提供跟C++代码交互

<!--list-separator-->

-  Miri

    可以生成Rust的中间层表示MIR， 可以通过rustup component add miri来安装它，并通过cargo miri来使用， 同时还可以使用cargo miri test来运行测试代码。

<!--list-separator-->

-  clippy

<!--list-separator-->

-  Prusti


#### 内联汇编 {#内联汇编}

Rust提供了asm!宏，可以让大家在Rust代码中嵌入汇编代码

<!--list-separator-->

-  基本用法

    ```rust
    use std::arch::asm;
    let x: u64
    unsafe {
        asm!("mov {}, 5", out(reg) x);
    }
    assert_eq!(x, 5);
    ```

<!--list-separator-->

-  显示指定寄存器

    ```rust
    use std::arch::asm;
    let cmd = 0xd1;
    unsafe {
        asm!("out 0x64, eax", in("eax") cmd);
    }
    ```

    上面的例子调用out指定将cmd变量的值输出到0x64内存地址中。由于out指令只接收eax和它的子寄存器，因此我们需要使用eax来指定特定的寄存器。


### FFI {#ffi}

foreign function interface 可以用来与其它语言进行交互


#### 一个例子 {#一个例子}

```rust
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

C语言的代码定义在了extern代码块中，而extern必须使用unsafe才能进行调用，原因在于其它语言的代码并不会强制执行Rust的规则，因此Rust无法对这些代码进行检查，最终还是要靠开发者自己来保证代码的正确性和程序的安全性。


#### ABI {#abi}

在extern "C"代码块中，我们列出了想要调用的外部函数的签名。其中”C"定义了外部函数所使用的应用二进制ABI（Application Binary Interface）：ABI定义了如何在汇编层面来调用该函数。在所有ABI中， C语言是最常见的。


#### 在其它语言中调用Rust函数 {#在其它语言中调用rust函数}

我们可以使用extern来创建一个接口，其它语言可以通过该接口来调用相关的Rust函数。

<!--list-separator-->

-  例子

    ```rust
    #[no_mangle]
    pub extern "C" fn call_from_c() {
        println!("Just called a Rust funnction from C!");
    }
    ```

    上面的代码可以让call_from_c函数被C语言的代码调用，当然，前提是将其编译成一个共享库，然后链接到C语言中。

    <!--list-separator-->

    -  #[no_mangle]

        它用于告诉Rust编译器：不要乱改函数的名称。


### 宏 {#宏}


#### 分类 {#分类}

<!--list-separator-->

-  声明式宏 declarative macros (macro_rules!)

    声明式宏允许我们写出类似match的代码.match表达式是一个控制结构,其接收一个表达式,然后将表达式的结果与多个模式进行匹配,一旦匹配了某个模式,则该模式相关联的代码将被执行:

    ```rust
    match target {
      模式1=> 表达式1,
      模式2 => {
        语句1;
        语句2;
        表达式2
      },
      _ => 表达式3
    }
    ```

    而宏也是将一个值跟对应的模式进行匹配,且该模式会与特定的代码相关联.但与match不同的是,宏里的值是一段Rust源代码(字面量),模式用于这段源代码的结构相比较,一旦匹配,传入宏的那段源代码将被模式的代码所替换,最终实现宏展开.值得注意的是,所有的这些都是在编译期发生,并没有运行期的性能损耗.

    <!--list-separator-->

    - <span class="org-todo todo WAITING">WAITING</span>  简单结构

        ```Rust
          #[macro_export]
        macro_rules! vec {
            ( $( $x:expr ),* ) => {
                {
                    let mut temp_vec = Vec::new();
                    $(
                        temp_vec.push($x);
                    )*
                    temp_vec
                }
            };
        }
        ```

        <!--list-separator-->

        -  #[macro_export]

            这个注释将宏进行了导出,这样其它的包就可以将该宏引入到当前作用域中,然后才能使用.

        <!--list-separator-->

        -  macro_rules!

            宏定义,需要注意的是宏的名称是vec,而不是vec!,后者的感叹号只在调用时才需要.

        <!--list-separator-->

        -  结构

            vec的定义结构跟match表达式很像,但这里我们只有一个分支,其中包含一个模式( $( $x:expr ),\* ),跟模式相关联的代码就在=&gt;之后.一旦模式成功匹配,那这段相关联的代码就会替换传入的源代码.

    <!--list-separator-->

    -  ( $( $x:expr ),\* )

        首先,我们使用圆括号将整个宏模式包裹其中.紧随基后的是$(),跟括号中的模式相匹配的值(传入的Rust源代码)会被捕获,然后用于代码替换.在这里,模式$x:expr会匹配任何Rust表达式并给予该模式一个名称:$x.
        \\(()之后的逗号说明在\\)()所匹配的代码的后面会有一个可选的逗号分隔符,紧随逗号之后的\*说明\*之前的模式会被匹配零次或任意多次(类似正则表达式).

<!--list-separator-->

-  过程宏 procedural macros

    从形式上来看,过程宏跟函数较为想像,但过程宏是使用源代码作为输入参数,基于代码进行一系列操作后,再输出一段全新的代码.注意,过程宏中的derive宏输出的代码并不会替换之前的代码,这一点与声明宏有很大的不同!

    <!--list-separator-->

    -  分类

        <!--list-separator-->

        -  #[derive] 派生宏 可以为目标结构体或枚举派生指定的代码

        <!--list-separator-->

        -  类属性宏（Attribute-like macro）,用于为目标添加自定义的属性

        <!--list-separator-->

        -  类函数宏（Function-like macro）, 看上支就像是调用函数

    <!--list-separator-->

    -  用过程宏为属性标记生成代码

        当创建过程宏时,它的定义必须要放入一个独立的包中,且包的类型也是特殊的,这么做的原因相当复杂.
        宏所在的包名自然也有要求,必须以derive为后缀,对于hello_macro宏而言,饭锅就应该是hello_macro_derive.在之前创建的hello_mac项目根目录下,运行如下命令,会创建一个单独的Lib包

        ```shell
        cargo new hello_macro_derive --lib
        ```

        <!--list-separator-->

        -  在主项目中引入hello_macro_derive

            1.  将hello_macro_derive发布到crates.io或github
                ```toml
                [dependencies]
                        hello_macro_derive = "0.0.1"
                ```
            2.  使用相对路径引入本地化方式
                ```toml
                [dependencies]
                hello_macro_derive = { path = "../hello_macro/hello_macro_derive" }
                ```

    <!--list-separator-->

    -  定义过程宏

        1.  在Cargo.toml中添加如下内容, 其中syn和quote依赖包都是定义过程宏所必须的,同时,还需要在[lib]中将过程宏的开关开启: proc-macro = true
            ```toml
            [lib]
            proc-macro = true
            [dependencies]
            syn = "1.0"
            quote = "1.0"
            ```
        2.  在 hello_macro_derive/src/lib.rs 中添加如下代码
            ```rust
                 extern crate proc_macro;

            use proc_macro::{TokenStream, TokenTree};

            #[proc_macro_derive(HelloMacro)]
            pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
                // 基于input构建ast语法树
                let ast::DeriveInput = syn::parse(input).unwrap();

                // 构建牲实现代码
                impl_hello_macro(&ast)
            }
            ```
            对于约大多数过程宏而言,这段代码往往只在impl_hello_macro(&amp;ast)中的实现有所区别,对于其它部分基本就是一致的,如包的引入,宏函数的签名,语法树构建等.
            proc_macro包是Rust自带的,它包含了相关的编译器API,可以用于读取和操作Rust源代码.
            由于我们为hello_macro_derive函数标记了#[proc_macro_derive(HelloMacro)],当用户使用#[derive(HelloMacro)]标记了他的类型后,hello_macro_derive函数就将被调用.
            syn将字符串形式的Rust代码解析为一个AST要的数据结构,该数据结构可以在随后的impl_hello_macro函数中进行操作.最后操作的结果又会被quote包转换回Rust代码.

    <!--list-separator-->

    -  展开宏

        我们可以使用cargo-expand工具


#### 宏与函数的区别 {#宏与函数的区别}

<!--list-separator-->

-  元编程

    从根本上讲,宏是通过一种代码来生成另一种代码

<!--list-separator-->

-  可变参数

    宏可以拥有可变参数

<!--list-separator-->

-  宏展开

    由于宏会被展开成其它代码,且这个展开过程是发生在编译器对代码进行解释之前.因此,宏可以为指定的类型实现某个牲tus:先将宏展开成实现特征的代码后,再被编译.


#### 宏的缺点 {#宏的缺点}

实现相比函数来说会更加复杂,再加上宏的语法更为复杂,最终导致定义宏的代码相当地难读,也难以理解和维护.


## cargo {#cargo}


### 创建新项目 {#创建新项目}

```shell
cargo new project_name
```


### 运行项目 {#运行项目}

```shell
cargo run
```


### 检查项目 {#检查项目}

```shell
cargo test
```


### 打包项目 {#打包项目}


#### snap {#snap}

```shell
cargo build
```


#### release {#release}

```shell
cargo build --release
```


## Tips {#tips}


### 修改源 {#修改源}

1.  修改~/.cargo/config文件，添加如下内容
    ```config
         [source.crates-io]
    registry = "https://github.com/rust-lang/crates.io-index"
    # 指定镜像replace-with = 'ustc' # 如：tuna、sjtu、ustc，或者 rustcc

    # 注：以下源配置一个即可，无需全部
    # 中国科学技术大学[source.ustc]
    registry = "https://mirrors.ustc.edu.cn/crates.io-index"

    # 上海交通大学[source.sjtu]
    registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index/"

    # 清华大学[source.tuna]
    registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

    # rustcc社区[source.rustcc]
    registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
    ```


## 学习路线 这下边是用ChatGPT生成的^_^ {#学习路线-这下边是用chatgpt生成的}


### 如果你想要学习 Rust 编程语言，以下是一个可能的学习路线： {#如果你想要学习-rust-编程语言-以下是一个可能的学习路线}

1.  了解 Rust 的基础知识和语法：可以从 Rust 官方文档中的《The Rust Programming Language》（<https://doc.rust-lang.org/book/%EF%BC%89%E5%BC%80%E5%A7%8B%E5%85%A5%E6%89%8B%E3%80%82%E8%AF%A5%E4%B9%A6%E6%98%AF> Rust 官方提供的入门教程，适合没有编程经验的初学者。该教程包括 Rust 的基础语法、所有权系统、生命周期等基本概念，并提供了许多实例帮助你理解这些概念。
2.  掌握 Rust 的高级特性：在掌握 Rust 的基本语法后，可以深入学习 Rust 的高级特性，如泛型、trait、闭包、模块化等等。Rust 官方文档的《Rust By Example》（<https://doc.rust-lang.org/stable/rust-by-example/%EF%BC%89%E6%98%AF%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A5%BD%E7%9A%84%E9%80%89%E6%8B%A9%EF%BC%8C%E5%AE%83%E6%8F%90%E4%BE%9B%E4%BA%86%E4%B8%B0%E5%AF%8C%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%B8%AE%E5%8A%A9%E4%BD%A0%E5%AD%A6%E4%B9%A0> Rust 的高级特性。
3.  学习 Rust 的异步编程：Rust 的异步编程是 Rust 语言的一个重要特性。在学习异步编程前，需要了解 Rust 中的 Future、async、await 等异步编程的基本概念。Rust 官方文档的《Asynchronous Programming in Rust》（<https://rust-lang.github.io/async-book/%EF%BC%89%E6%98%AF%E4%B8%80%E4%B8%AA%E5%BE%88%E5%A5%BD%E7%9A%84%E5%AD%A6%E4%B9%A0%E8%B5%84%E6%BA%90>。
4.  练习编写 Rust 项目：通过编写 Rust 项目来加深对 Rust 的理解和掌握技能。你可以选择一些 Rust 项目，如 Rust 实现的 HTTP 服务器（<https://github.com/hyperium/hyper%EF%BC%89%E3%80%81%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%88https://github.com/google/xi-editor%EF%BC%89%E7%AD%89%E7%AD%89%E3%80%82%E5%9C%A8%E5%AE%9E%E8%B7%B5%E4%B8%AD%EF%BC%8C%E4%BD%A0%E4%BC%9A%E5%8F%91%E7%8E%B0> Rust 的生命周期、所有权系统等特性对于编写高质量的代码非常有帮助。

总之，学习 Rust 需要一定的时间和耐心，但是如果你认真学习，掌握 Rust 的基本概念和特性，你将能够编写高效、安全、可靠的代码。


### 如果你想学习 Rust，以下是一些学习路线的建议： {#如果你想学习-rust-以下是一些学习路线的建议}

1.  先学习 Rust 的基础知识，包括 Rust 的语法、数据类型、函数、模块、所有权等概念。可以通过 Rust 官方文档或 Rustlings 等在线教程来学习。
2.  熟悉 Rust 的语法，包括基本数据类型、控制结构、函数和模块等。可以从官方文档的 The Rust Programming Language（TRPL）开始学习。
3.  Rust 的所有权和借用系统，这是 Rust 最显著的特点之一。可以查阅官方文档中关于所有权和借用的章节。
4.  学习 Rust 的标准库，了解 Rust 的常用数据结构和算法。可以通过 Rust 官方文档或 Rust by Example 等在线教程来学习。
5.  学习 Rust 的标准库和附加库，Rust 以安全、高效和可靠著称，拥有丰富的生态系统。可以通过官方文档中的 Rust by Example 和 Rust Cookbook 来学习 Rust 库的用法。
6.  学习 Rust 的异步编程，了解 Rust 的异步编程模型和 Futures。可以通过 Rust 官方文档或 Tokio 等在线教程来学习。
7.  学习 Rust 的并发编程，Rust 通过内置的线程安全机制和安全的多线程 API 提供了强大的并发支持。可以查阅官方文档中的 Rust for Systems Programming 和 Rust async book 学习 Rust 的并发编程。
8.  学习 Rust 的系统编程，了解 Rust 如何与操作系统进行交互。可以通过 Rust 官方文档或 Rust 系统编程等在线教程来学习。
9.  学习 Rust 的 Web 开发，了解 Rust 如何用于 Web 开发。可以通过 Rust 官方文档或 Rocket 等在线教程来学习。
10. 学习 Rust 生态系统中的一些库和框架，例如 Rocket、Actix、Tokio、Diesel 等。这些库和框架可以帮助开发者快速构建复杂的应用程序，提高生产效率和代码质量。
11. 探索 Rust 的应用场景，并使用 Rust 开发一些实际应用。例如系统级编程、Web 后端、数据库访问、网络编程等等。
