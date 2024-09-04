+++
title = "Flask Web开发实战"
author = ["WhatsUpeng!!!"]
date = 2024-09-04
categories = ["Python"]
draft = false
+++

## Flask Web开发实战 {#flask-web开发实战}


### 基础 {#基础}


#### 初识 {#初识}

<!--list-separator-->

-  开发环境

    <!--list-separator-->

    -  pipenv工作流

        > pip install pipenv

        <!--quoteend-->

        > pipenv install # 创建虚拟环境

        <!--quoteend-->

        > pipenv shell # 进入虚拟环境
        > pipenv run command #使用虚拟环境执行命令

        <!--quoteend-->

        > pipenv graph # 查看当前环境的依赖

    <!--list-separator-->

    -  Hello，Flask

        <!--list-separator-->

        -  创建程序实例

            新建app.py(可以是除flask.py之外任意名字)

            > from flask import Flask
            > app = Flask(<span class="underline"><span class="underline"><span class="underline"><span class="underline">name</span></span></span></span>)

        <!--list-separator-->

        -  注册路由

            概括：

            1.  用户在浏览器输入URL访问某个资源
            2.  Flask接收用户请求并分析请求的URL
            3.  为这个URL找到对应的处理函数
            4.  执行函数并生成响应，浏览器
            5.  浏览器接收并解析响应，将信息显示在页面中。

            > ?? (????)('/')
            > def index():
            > ​return '
            >
            > <div class="html">
            >
            > &lt;h1&gt;
            >
            > </div>
            >
            > hello, world
            >
            > <div class="html">
            >
            > &lt;/h1&gt;
            >
            > </div>
            >
            > '

            可以为视图绑定多个URL

            > ?? ()('hi')
            > ?? ()('/hello')
            > def say_hello():
            > ​return '
            >
            > <div class="html">
            >
            > &lt;h1&gt;
            >
            > </div>
            >
            > Hello, Flask!
            >
            > <div class="html">
            >
            > &lt;/h1&gt;
            >
            > </div>
            >
            > '

            动态URL

            > ?? ()('_greet', defaults={'name': 'Programmer'}) #
            > 给name默认值
            > ?? ()('/greet_')
            > def greet(name = 'Programmer'):
            > ​return '
            >
            > <div class="html">
            >
            > &lt;h1&gt;
            >
            > </div>
            >
            > Hello, $s!
            >
            > <div class="html">
            >
            > &lt;/h1&gt;
            >
            > </div>
            >
            > ' % name

    <!--list-separator-->

    -  启动开发器

        > $ flask run
        > $ flask run --host=127.0.0.1 --port=8888

        会从当前目录寻找app.py和wsgi.py,并从中寻找名为app或application的程序实例从环境变量FLASK_APP对应的值寻找名为app或application的程序实例

        <!--list-separator-->

        -  管理环境变量

            python-dotenv
            安装python-dotenv后，使用 flask
            run会自动从.flaskenv文件和.env文件中加载环境变量

        <!--list-separator-->

        -  Python shell

            $ flask shell
            进入Python shell

        <!--list-separator-->

        -  Flask扩展

            > e.g.
            > from flask import Flask
            > from flask_foo import Foo
            > app = Flask(<span class="underline"><span class="underline"><span class="underline"><span class="underline">name</span></span></span></span>)
            > foo = Foo(app)

        <!--list-separator-->

        -  项目配置

            配置方式

            1.  像字典一样添加

            > app.config['ADMIN_NAME'] = 'Peter'

            2.  使用update()方法则可以一次加载多个值

            > app.config.update(
            > ​TESTING=True,
            > ​SECRET_KEY='ASDFXCVAEQWER'
            > )

            读取值

            > value = app.config['ADMIN_NAME']

        <!--list-separator-->

        -  URL与端点

            > url_for('endpoint')

            默认会生成相对于项目的URL
            如果将_external参数设置为True，将会生成完整的URL

        <!--list-separator-->

        -  Flask命令

            -   自定义命令

            > ?? (a)('hello')
            > def hello():
            > ​click.echo('Hello, Human!')
            > $ flask hello
            > \#+begin_quote
            > Hello, Human!

            \#+end_quote

        <!--list-separator-->

        -  模板与静态文件

        <!--list-separator-->

        -  Flask与MVC架构


#### Flask 与 HTTP {#flask-与-http}

<!--list-separator-->

-  Http请求

    <!--list-separator-->

    -  Request对象

        > from flask import Flask request

    <!--list-separator-->

    -  在Flask中处理请求

        <!--list-separator-->

        -  路由匹配

            > flask routes # 显示所有可匹配路由

        <!--list-separator-->

        -  设置监听的HTTP方法

            > ?? ()('/hello', methods=['GET', 'POST'])
            > def hello():
            > ​return 'Hello, World!!!'

        <!--list-separator-->

        -  URL处理

            内置的URL变量转换器

            -   string
            -   int
            -   float
            -   path
            -   any
            -   uuid

            > e.g.
            > ?? ()('goback/&lt;&gt;')
            > def go_back(year):
            > ​return 'Welcome to %d' % (2018 - year)

            <!--quoteend-->

            > e.g.
            > ?? ()('/colors/&lt;any(blue, white, red):color') #
            > 只接收blue, white red
            > def three_colors(color):
            > ​return 'Love is patient and kind, Love is not jealous or boastful or
            > proud or rude.'

    <!--list-separator-->

    -  请求钩子

        默认的请求钩子

        -   before_first_request: 在处理第一个请求前运行
        -   before_request: 在处理每个请求前运行
        -   after_request: 如果没有未处理的异常，会在每个请求结束后运行
        -   teardown_request:
            即使有异常抛出，也会在每个请求结束后运行。如果发生异常，会传入异常对象作为参数到注册的函数中
        -   after_this_request: 会在这个请求结束后运行

        > e.g.
        > ?? (a)
        > def do_something_before_request():
        > ​pass #这个函数会在每个请求之前执行

<!--list-separator-->

-  HTTP响应

    <!--list-separator-->

    -  响应报文

    <!--list-separator-->

    -  在Flask中生成响应

        普通的响应可以只包含主体内容，默认状态码为200，如有需要可以修改

        > e.g.
        > ?? ()('/hello')
        > def hello():
        > ​...
        > ​return '返回体', 201 # 返回体, 返回码

        <!--quoteend-->

        > e.g.
        > ?? ()('/hello')
        > def hello():
        > ​...
        > ​return '', 302, {'Location', 'Http://www.baidu.com'}

        <!--list-separator-->

        -  重定向

            > e.g.
            > from flask import Flask, redirect
            > ?? ()('/hello')
            > def hello():
            > ​return redirect('http://www.baidu.com')

            <!--quoteend-->

            > from flask import Flask, redirect, url_for
            > ?? ()('/hi')
            > def hi():
            > ​return redirect(url_for('hello'))
            > ?? ()('/hello'):
            > ​return "Hello"

        <!--list-separator-->

        -  错误响应

            Flask提供abort()函数

            > e.g.
            > from flask import Flask, abort
            > ?? ()('/404')
            > def not_found():
            > ​abort(404)

    <!--list-separator-->

    -  响应格式

        默认的响应格式为HTML
        修改返回格式

        > e.g.
        > from flask import make_response
        > ?? ()('/foo')
        > def foo():
        > ​response = make_response('Hello, World')
        > ​response.mimetype = 'text/plain'
        > ​return response

        -   格式例子
            -   text/plain
            -   text/html
            -   application/xml
            -   application/json

    <!--list-separator-->

    -  Cookie

        <!--list-separator-->

        -  设置Cookie

            > response.set_cookie('name', name)

        <!--list-separator-->

        -  获取Cookie

            > request.cookies.get('name', 'Human')

    <!--list-separator-->

    -  session： 安全的cookie

        <!--list-separator-->

        -  设置程序密钥

            > app.secret_key = 'secret string'

            <!--quoteend-->

            > app.secret_key = os.getenv('SECRET_KEY', 'secret string')

            <!--quoteend-->

            > e.g.
            > from flask import redirect, session, url_for
            > ?? ()('/login')
            > def login():
            > ​session['logged_in'] = True # 写入session
            > ​return redirect（url_for('hello'))

        <!--list-separator-->

        -  删除session

            > e.g.
            > from flask import session
            > ?? ()('/logout')
            > def logout():
            > ​if 'logged_in' in session:
            > ​session.pop('logged_in')
            > ​return redirect(url_for('hello'))

            默认情况下，session
            cookie会在用户关闭浏览器时删除，通过将session.permanent属性设为True可以将session的有效期延长为Flask.permanent_session_lifetime属性值对应的datetime.timedelta对象，也可以通过PERMEANENT_SESSION_LIFETIME设置，默认为31天。

<!--list-separator-->

-  Flask上下文

    分为程序上下文和请求上下文

    <!--list-separator-->

    -  上下文全局变量

        Flask提供了四个上下文全局变量

        -   current_app： 请求上下文，指向处理请求的当前程序实例
        -   g:
            程序上下文，替代Python的全局变量用法，确保仅在当前请求中可用。用于存储全局数据，每次请求都会重设
        -   request: 请求上下文，封装客户端发出的请求报文数据
        -   session: 请求上下文，用于记住请求之间的数据，通过签名的Cookie实现

    <!--list-separator-->

    -  激活上下文

        -   当我们使用flask run 命令启动程序时
        -   使用旧的app.run()方法启动程序时
        -   执行使用@app.cli.command()装饰器注册的flask命令时
        -   使用flask shell命令启动Python shell时

    <!--list-separator-->

    -  上下文钩子

        teardown_appcontext钩子，它注册的函数会在程序上下文和请求上下文被销毁时调用

        > e.g.
        > ?? (a)
        > def deardown_db(exception):
        > ​...
        > ​db.close()

<!--list-separator-->

-  HTTP进阶实战

    <!--list-separator-->

    -  重定向回上一个页面

        <!--list-separator-->

        -  获取上一个页面的URL

            有两种方式可以获取

            1.  HTTP referer

            > return redirect(request.referrer)

            <!--quoteend-->

            > return redirect(request.referrer or url_for('hello'))

            2.  查询参数

            > 'do something' % url_for('do_something', next=request.full_path)

            <!--quoteend-->

            > return redirect(request.args.get('next'))

            <!--quoteend-->

            > e.g.
            > def redirect_bak(default='dello', \*\*kwargs):
            > ​for target in request.args.get('next'), request.referrer:
            > ​if target:
            > ​return redirect(target)
            > ​return redirect(url_for(default, \*\*kwargs))

        <!--list-separator-->

        -  对URL进行安全验证

            > from urllib import urlparse, urljoin
            > from flask import Flask
            > def is_safe_url(target):
            > ​ref_url = urlparse(request.host_url)
            > ​test_url=urlparse(urljoin(request.host_url, target))
            > ​return test_url.scheme in ('http', 'https') and ref_url.netloc ==
            > test_url.netloc

    <!--list-separator-->

    -  使用AJAx技术发送异步请求

        返回“局部数据”

        1.  纯文本或都HTML

        > e.g.
        > ?? ()("comments/&lt;int: post_id&gt;")
        > def get_comments(post_id):
        > ​return render_template('comments.html')

        2.  返回JSON数据

        > ?? ()('profile/&lt;int: user_id&gt;')
        > def get_profile(user_id):
        > ​return jsonify(username=username, bio=bio)

        3.  空值

        > ?? ()('/post/delete/&lt;int: post_id&gt;', methods=['delete'])
        > def delete_post(post_id):
        > ​return '', 204

        4.  异步加载长文章

    <!--list-separator-->

    -  HTTP 服务器端推送

        <!--list-separator-->

        -  常用的推送技术

            -   传统轮询
            -   长轮询
            -   Server-Sent Events(SSE): 通过HTML5中的EventSource
                API实现。SSE会在客户端和服务器建立 一个单向的通道。客户端监听来自服务器端的数据。
            -   WebSocket

    <!--list-separator-->

    -  Web安全规范

        -   注入攻击
        -   XSS攻击防范：

            1.  HTML转义

            > response = '
            >
            > <div class="html">
            >
            > &lt;h1&gt;
            >
            > </div>
            >
            > Hello, %s
            >
            > <div class="html">
            >
            > &lt;/h1&gt;
            >
            > </div>
            >
            > ' % escape(name)

            2.  验证用户输入
        -   CSRF攻击


#### 模板 {#模板}

<!--list-separator-->

-  模板基本用法

    <!--list-separator-->

    -  创建模板

        在templates目录下创建HTML文件

        <!--list-separator-->

        -  JinJa2常见的有三种定界符

            -   语句

            比如if判断、for循环等：

            > {%...%}

            -   表达式

            比如字符串、变量、函数调用等

            > {{...}}

            -   注释

            > {#...#}

    <!--list-separator-->

    -  模板语法

        -   for

        > {% for movie in moveies%}
        >
        > <div class="html">
        >
        > &lt;li&gt;
        >
        > </div>
        >
        > {{ movie.name}} - {{ movie.year }}
        >
        > <div class="html">
        >
        > &lt;/li&gt;
        >
        > </div>
        >
        > {% endfor %}

        for循环的完整变量列表： <http://jinja.pcoo.org/docs/2.10/templates/#for>

        <!--list-separator-->

        -  渲染模板

            > e.g.
            > from flask import Flask, render_template
            > ?? ()('/watchlist')
            > def watchlist():
            > ​return render_template('watchlist.html', user=user, movies=movies)

            Flask会在程序要目录下的templates文件夹里寻找模板文件。

<!--list-separator-->

-  模板辅助工具

    <!--list-separator-->

    -  上下文

        可以模板中定义变量，使用set标签

        > e.g.
        > {% set navigation = [('/', 'Home'), ('/about', 'About')]%}

        <!--quoteend-->

        > e.g.
        > {% set navigation%}
        >
        > <div class="html">
        >
        > &lt;li&gt;
        >
        > </div>
        >
        > Home
        >
        > <div class="html">
        >
        > &lt;/li&gt;
        >
        > </div>
        >
        >
        >
        > <div class="html">
        >
        > &lt;li&gt;
        >
        > </div>
        >
        > About
        >
        > <div class="html">
        >
        > &lt;/li&gt;
        >
        > </div>
        >
        > {% endset %}

        -   内置上下文变量
            -   config: 当前的配置对象
            -   request: 当前的请求对象，在已激活的请求环境下可用
            -   session: 当前的会话对象，在已激活的请求环境下可用
            -   g: 与请求绑定的全局变量，在已激活的请求环境下可用
        -   自定义上下文

            -   模板全局变量

            Flask提供了一个app.context_processor装饰器，可以用来注册模板上下文处理函数

            > ?? (a)
            > def inject_foo():
            > ​ foo = "I am foo."
            > ​ return dict(foo = foo) # 等同于return {'foo': foo}

            <!--quoteend-->

            > def inject_foo():
            > ​ foo = "I am foo."
            > ​ return dict(foo = foo)
            > app.context_processor(inject_foo)

            <!--quoteend-->

            > app.context_processor(lambda: dict(foo = 'I am foo.'))

    <!--list-separator-->

    -  全局对象

        <!--list-separator-->

        -  内置全局函数

            -   Jinjia2内置模板全局函数

                -   range([start, ] stop [, step]): 和Python中range()的用法相同
                -   lipsum(n=5, html=True, min=20, max=100)： 生成随机的文本（ lorem
                    ipsum）,
                    可以在测试时用来填充页面。默认生成5段HTML文本，每段包含20-100个单词。
                -   dict(\*\*items): 和Python中的dict()用法相同

                完整的访问：
                <http://jinja.pocoo.org/docs/2.10/templates/#list-of-global-functinos>
            -   Flask内置模板全局函数

                -   url_for(): 用于生成URL的函数
                -   get_finished_messages(): 用于获取flash消息的函数

                > e.g.  ← Return

        <!--list-separator-->

        -  自定义全局函数

            使用app.template_global装饰器直接将函数注册为模板全局函数

            > ?? (a)()
            > def bar():
            > ​return "I am bar."

    <!--list-separator-->

    -  过滤器

        > {{ obj | filterFunc }}

        <!--list-separator-->

        -  内置过滤器

            -   default(value, default_value='', boolean=False): 设置默认值，默认值做为参数传入，别名为d
            -   escape(s): 转义HTML文本，别名为e
            -   first(seq): 返回序列的第一个元素
            -   last(seq)：返回序列的最后一个元素
            -   length(object): 返回变量的长度
            -   random(seq): 返回序列中的随机元素
            -   safe(value): 将变量值标记为安全，避免转义
            -   trim(value): 清除变量值前后的空格
            -   max(value, case_sensitive=False, attribute=None): 返回序列中的最大值
            -   min(value, case_sensitive=False, attribute=None): 返回序列中的最小值
            -   unique(value,
                case_sensitive=False,attribute=None):返回序列中的不重复的值
            -   striptags(value): 清除变量值内的HTML标签
            -   urlize(value, trim_url_limit=None, nofollow=False, target=None,
                rel=None): 将URL文本转换为可单击的HTML链接
            -   wordcount(s): 计算单词数量
            -   tojson(value, indent=None): 将变量值转换为JSON格式
            -   truncate(s, length=255, killwords=False, end='...', leeway=None):
                截断字符串，常用于显示文章摘要，length参数设置截断长度，killwords参数设置是否截断单词，end参数设置结尾的符号

            完整列表： <http://jinja.pocoo.org/docs/2.10/templates/#builtin-filters>

        <!--list-separator-->

        -  自定义过滤器

            app.template_filter()装饰器

            > from flask import Markup
            > ?? (a)()
            > def musical(s):
            > ​return s + Markup('♫')

            或

            > app.add_template_filter(you_filter_function)

            <!--quoteend-->

            > {{ name | musical }}

            \#####　测试器

            > {% if age is number %}
            > {% else%}
            > {% endif %}

        <!--list-separator-->

        -  常用内置测试器

            -   callable(object): 判断对象是否可被调用
            -   defined(value): 判断变量是否已定义
            -   undefined(value)：判断变量是否未定义
            -   none(value): 断送变量是否为None
            -   number(value): 判断变量是否为数字
            -   string(value): 判断变量是否是字符串
            -   sequence(value): 判断变量是否是序列，比如字符串，列表，无组
            -   iterable(value): 判断变量是否要迭代
            -   mapping(value): 判断变量是否是匹配对象，比如字典
            -   sames(value, other): 判断变量与other是否指向相同内存地址

            完整列表：
            <http://jinja.pocoo.org/docs/2.10/templates/#list-of-builtin-tests>

        <!--list-separator-->

        -  自定义过滤器

            app.template_test()

            > ?? (a)()
            > def baz(n):
            > ​if n == 'baz':
            > ​return True
            > ​return False

    <!--list-separator-->

    -  模板环境对象

        在jinja2中，渲染行为由jinja2.Enviroment类控制，所有的配置选项、上下文变量、全局函数、过滤器和测试器都存储在Environment实例上。而与Flask结合后，使用Flask创建的Environment，它存储在app.jinja_env属性上

        <!--list-separator-->

        -  添加自定义全局对象

            > def bar():
            > ​return "I am bar."
            > foo = "I am foo"
            > app.jinia_env.globals['bar'] = bar
            > app.jinja_env.globals['foo'] = foo

        <!--list-separator-->

        -  添加自定义过滤器

            > def smiling(s):
            > ​return s + ' :)'
            > app.jinja_env.filters['smiling'] = smiling

        <!--list-separator-->

        -  添加自定义过滤器

            > def baz(n):
            > ​if n == 'baz':
            > ​return True
            > ​return False
            > app.jinja_env.tests['baz'] = baz

<!--list-separator-->

-  模板结构组织

    <!--list-separator-->

    -  局部模板

        使用include可以把局部模板插入标签位置, 使用当前文件的上下文

        > {% include '_banner.html' %}

    <!--list-separator-->

    -  宏

        可以把一部分代码封装到宏里，使用传递的参数来构建内容，最后返回构建后的内容。这个文件通常命名为macros.html或_macros.html.
        创建时使用macro和endmacro标签声明宏的开始和结束。

        > e.g.
        > \#声明
        > {% macro qux(amount = 1) %}
        > ​{% if amount == 1 %}
        > ​I am qux
        > ​{% elif amoutn &gt; 1 %}
        > ​We are quxs.
        > ​{% endif %}
        > {% endmacro %}

        <!--quoteend-->

        > e.g.
        > \#使用
        > {% from 'macros.html' import qux %}
        > 或
        > {% from 'macros.html' import qux with context %}
        > ...
        > {{ qux(amount = 5) }}

    <!--list-separator-->

    -  模板继承

        <!--list-separator-->

        -  编写基本模板

            通过在基模板上添加页头和页脚当子模板继承基模板后，子模板会自动 包含基模板 的内容的结构。为了能够让子模板方便地覆盖基模板或插入内容到基模板中，我们需要在基模板中定义块（block）,
            在子模板中可以通过定义同名的块来执行继承操作。
            e.g.
            我们可以创建六个块： head, title, styles, content, footer, scripts

            > {% block body %}
            > {% endblock body %}

    <!--list-separator-->

    -  编写子模板

        > e.g.
        > {% extends 'base.html'%}
        > {% from 'macros.html' import qux %}
        > {% block content %}
        > ​内容
        > {% endblock content %}

        注意： **extends必须是子模板的第一个标签**
        我们在子模板中可以对你模板中的块执行两种操作：

        -   覆盖内容

        创建同名的块时，会使用子块的内容覆盖父块的内容

        -   追加内容

        需要使用super()进行声明

        > e.g.
        > {% block styles %}
        > {{ super() }}
        > ...
        > {% endblock styles %}

<!--list-separator-->

-  模板进阶实践

    <!--list-separator-->

    -  空白控制

        空白行是为了增加可读必，可以在定界符内侧添加减号移除空白

        > e.g.
        > {%- endfor %}

        也可以使用模板环境的属性删除窄

        > app.jinja_env.trim_blocks = True: 删除jinja2语句后的第一个窄
        > app.jinja_env.lstrip_blocks = True:
        > 删除Jinja2语句所在行之前的空格和制表符

        注意宏内的空白不受trim_blocks 和 lstrip_blocks控制

    <!--list-separator-->

    -  加载静态文件

        静态文件默认存放在static文件夹中。

        > e.g.
        > url_for('static', filename='fileanme.jpg')
        > \#filename为static文件夹下的路径

    <!--list-separator-->

    -  消息闪现

        > e.g.
        > ?? ()('/flash')
        > def just_flash():
        > ​flash('闪现消息')
        > ​return redirector(url_for('index'))
        > \#渲染flash消息
        >
        > ```text
        > {% for message in get_flashed_messages() %}
        > <div class="alert">
        >     {{message}}
        > </div>
        > {% endfor %}
        > {% block content %}
        > {% endblock %}
        > ```

    <!--list-separator-->

    -  自定义错误页面

        > e.g. 404.html
        > {% extends 'base.html' %}
        > {% block title %} 404 - Page Not Found {% endblock%}
        > {% block content %}
        > ​Page Not Found
        > {% endblock %}
        > \#错误处理函数
        > ?? (a)(404)
        > def page_not_found(e):
        > ​return render_template('errors/404.html'), 404

    <!--list-separator-->

    -  JavaScript 和 CSS 中的jinja2

        -   使用行内、嵌入式Javascript和CSS
        -   定义为JavaScript、CSS变量

        > e.g.
        > {{ user.username}}


#### 表单 {#表单}

<!--list-separator-->

-  HTML表单

<!--list-separator-->

-  使用Flask-WTF处理表单

    Flask-WTF默认会认为每个表彰启用CSRF保护，它会为我们生成和验证CSRF令牌，默认Flask-WTF使用程序的密钥来对CSRF令牌进行签名，所以我们需要为程序设置密钥：

    > app.secret_key = 'secret string xxxx'

    <!--list-separator-->

    -  定义WTForms表单类

        > e.g.
        > from wtforms import Form, StringField, PasswordField, BooleanField,
        > SubmitField
        > from wtforms.validators import dataRequired,Length
        > class LoginForm(Form):
        > ​username = StringField('username', validators=[DataRequired()])
        > ​password = PasswordField('Password', validators=[DataRequired(),
        > Length(8, 128)])
        > ​remember = BooleanField('Remember Me')
        > ​submit = SubmitField('Login')

        <!--list-separator-->

        -  实例化常用参数

            -   label: 字段标签的值，也是渲染后显示在输入字段前的文字
            -   render_kw: 一个字典，用来应的HTML标签的属性，比如传入{'placeholder':
                'Your name'}, 渲染后的HTML代码会将标签的placeholder属性设置为Your name
            -   validators:
                一个列表，包含一系列验证器，会在表单提交后逐一调用验证表彰数据
            -   default: 字符串或可调用 对象，用来为表单字段设置默认值

        <!--list-separator-->

        -  验证器

            验证器（validator）是一系列用于验证字段数据的类，从wtforms.validators模板导入常用的验证器

            -   DataRequired(message=None): 验证数据是否有效
            -   Email(message=None)
            -   EqualTo(fieldname, message=None): 验证两个字段是否相同
            -   InputRequired(message=None): 验证是否有数据
            -   Length(min=-1, max=-1, message=None): 验证输入值否在给定范围内
            -   NumberRange(min=None, max=None, message=None):
                验证输入数字是否在给定范围内
            -   Optional(strip_whitespace=True): 允许输入值为空，并路过其他验证
            -   Regexp(regex, flags=0, message=None): 使用正则表达式验证输入值
            -   URL(require_tld=True, message=None)：验证URL
            -   AnyOf(values, message=None, values_formatter=None):确保输入值在可选值列表中
            -   NoneOf(values, message=None, values_formatter=None): 确保输入值不在可选值列表中

    <!--list-separator-->

    -  输出HTML代码

    <!--list-separator-->

    -  在模板中渲染表单

        > e.g.
        > from forms import LoginForm
        > ?? ()('/basic')
        > def basic():
        > ​form = LoginForm()
        > ​return render_template('login.html', form=form)

        在模板中只需要调用表单类的属性即可获取字段HTML代码，如果需要传入参数，也可以添加括号

        > e.g.
        >
        > <div class="html">
        >
        > &lt;form method="post"&gt;
        >
        > </div>
        >
        > {{ form.csrf_token }} #渲染CSRF令牌隐藏字段 {{ form.username.label }}{{
        > form.username }} {{ form.password.label }}{{ form.password }} {{
        > form.remember }}{{ form.remember.label}} {{ form.submit }}
        >
        > <div class="html">
        >
        > &lt;/form&gt;
        >
        > </div>

<!--list-separator-->

-  处理表单数据

    <!--list-separator-->

    -  提交表单

    <!--list-separator-->

    -  验证表单数据

        <!--list-separator-->

        -  客户端验证和服务端验证

            -   客户端验证
            -   服务端验证

        <!--list-separator-->

        -  WTForms验证机制

            > form = XXXForm()
            > form.validate()
            > False/True

        <!--list-separator-->

        -  在视图函数中验证表单

            > ?? ()('/basic', methods=['GET', 'POST'])
            > def basic():
            > ​form = LoginForm()
            > ​form.validate_on_submit():
            > \#返回True，表示用户提交了表单，且表单通过了验证​...
            > ​return render_template('basic.html', form=form)

            -   获取表单字段

            > form.字段名.data

    <!--list-separator-->

    -  在模板中渲染错误消息

        如果form.validate_on_submit()返回False，就说明验证没有通过。对于未验证通过的字段，WTForms会把错误消息添加到表单类的errors属性中，我们一般会通过字段名来获取对应字段的错误消息列表，即：

        > form.字段名.errors

<!--list-separator-->

-  表单进阶实践

    <!--list-separator-->

    -  设置错误消息语言

        > e.g. 设置错误消息语言为中文
        > from flask_wtf import FlaskForm
        > app = Flask(**name**)
        > app.config['WTF_I18N_ENABLED'] = False
        > class MyBaseForm(FlaskForm):
        > ​class Meta:
        > ​locales = ['zh']
        > class HelloForm(MyBaseForm):
        > ​pass

    <!--list-separator-->

    -  使用宏渲染表单

        在模板中渲染表单时，我们需要做：

        -   调用字段属性，获取定义
        -   调用对应的label属性，获取定义
        -   渲染错误消息。

        我们可以创建一个宏来渲染表单字段。

        ````jinja2
        {% macro form_field(field) %}
            {{ field.label  }}<br>
            {{ field(**kwargs) }}<br>
            {% if field.errors %}
                {% for error in field.errors %}
                    <small class="error">{{ error }}</small><br>
                {% endfor %}
             {% endif %}
         {% endmacro %}
        ````

        使用

        ````text
        {% form 'macros.html' import form_field %}
        ...
        <form methods="post">
            {{ form.csrf_token }}
            {{ form_field(form.username) }}<br>
            {{ form_field(form.password) }}<br>
            ...
        </form>
        ````

    <!--list-separator-->

    -  自定义验证器

        <!--list-separator-->

        -  行内验证器

            > e.g.
            > from wtforms import IntegerField, SubmitField
            > from wtforms.validators import ValidationError
            > class FortyTwoForm(FlaskForm):
            > ​answer = IntegerField('The Number')
            > ​submit = SubmitField()
            > def validate_answer(form, field):
            > ​if field.data != 42:
            > ​raise ValidationError('Must be 42.')

        <!--list-separator-->

        -  全局验证器

            ````python
            from wtforms.validators import ValidationError
            def is_42(form, field):
                if field.data != 42:
                    raise ValidationError('Must be 42)

            class FortyTwoForm(FlaskForm):
                answer = IntegerField('Thie Number', validators=[is_42])
                submit = SubmitField()
            ````

    <!--list-separator-->

    -  文件上传

        我们需要

        -   验证文件类型
        -   验证文件大小
        -   过滤文件名

        <!--list-separator-->

        -  定义上传表单

            创建上传表单

            ````python
            from flask wtf.file import FileField, FileRequired, FileAllowed
            class UploadForm(FlaskForm):
                photo = FileField('Upload Image', validators=[FileRequired(), FileAllowed(['jpg', 'jpeg', 'png', 'gif'])])
                submit = SubmitField()
            ````

            限制文件上传大小

            > app.config['MAX_CONTENT_LENGTH'] = 3\* 1024 \* 1024

            超过这个限制会返回413错误

        <!--list-separator-->

        -  渲染上传表单

            ````python
            @app.route('/upload), methods=['GET‘， ’POST‘]）
            def upload():
                form = UploadForm()
                ...
                return render_template('upload.html', form=form)
            ````

            ````html
            <form method="post" enctype="multipart/form-data">
                {{ form.csrf_token }}
                {{ form_field(form.photo) }}
                {{ form.submit }}
            </form>
            ````

        <!--list-separator-->

        -  处理上传文件

            ````python
            import os
            app.config['UPLOAD_PATH'] = os.path.join(app.root_path, 'uploads')
            @app.route('/upload', methods=['GET'， 'POST'])
            def upload():
                form = UploadForm()
                if form.validate_on_submit():
                    f = form.photo.data
                    filename = random_filename(f.filename)
                    f.save(os.path.join(app.config['UPLOAD_PATH'], filename))
                    flash('Upload success')
                    session['filenames'] = [filename]
                    return redirect(url_for('show_images'))
            return render_template('upload.html', form=form)
            ````

            文件名处理定义上传路径

            > app.config['UPLOAD_PATH'] = os.path.join(app.root_path, 'uploads')

            os.root_path相当于os.path.abspath(os.path.dirname(**file**)),
            为了保存文件，你需要手动创建这个文件夹对FileStorage对象调用save()方法即可保存，传入包含目标文件夹绝对路径和文件名在内的完整保存路径

            > f.save(os.path.join(app.config['UPLOAD_PATH'], filename))

            文件保存后，如果希望能够显示上传后的图片，我们需要创建一个视图来返回上传后的文件

            ````python
            @app.route('/uploads/<path:filename>')
            def get_file(filename):
                return send_from_directory(app.config['UPLOAD_PATH], filename)
            ````

            ````text
            <img src="{{ url_for('get_file', filename=filename) }}"
            ````

        <!--list-separator-->

        -  多文件上传

    <!--list-separator-->

    -  使用Flask-CKEditor集成富文本编辑器

        > $ pipenv install flask-ckeditor

        <!--quoteend-->

        > from flask-ckeditor import CKEditor
        > ckeditor = CKEditor(app)

        <!--list-separator-->

        -  配置富文本编辑器

            查看完整配置：
            <https://flask-ckeditor.readthedocs.io/en/latest/configuration.html>

        <!--list-separator-->

        -  渲染富文本编辑器

            ````python
            from flask_wtf import FlaskForm
            from wtforms import StringField, SubmitField
            from wtforms.validators import DatRequired, Length
            from flask_ckeditor import CKEditorField
            class RichTextForm(FlaskForm):
                title = StringField('Title', validators=[DataRequired(), Length(1, 50)])
                body = CKEditorField("Body", validators=[DataRequired()])
                submit = SubmitField('Publish')
            ````

            html渲染包含CKEditor编辑器的表单需要使用{{ ckeditor.load()
            }}方法加载资源（相应的js,css）,默认会从CDN加载，可以修改CKEDITOR_SERVE_LOCAL设置为True，会使用扩展内置的本地资源。如果你使用配置变量设置了编辑器的调试，宽度和语言或是其他插件配置，需要使用ckeditor.config()方法加载配置，传入对应表彰字段的name属性值，即对应表单类属性名。这个方法需要在加载CKEditor资源后调用：

            > {{ ckeditor.config(name='body') }}

    <!--list-separator-->

    -  单个表单多个提交按钮

        e.g. form/forms.py

        ````python
        class NewPostForm(FlaskForm):
            title = StringField('Title', validators=[DataRequired(), Length(1, 50)])
            body = TextAreaField('Body', validators=[DataRequired()])
            save = SubmitField('Save')
            publish = SubmitField('Publish')
        ````

        WTForms会对数据做进一眇处理。对于提交字段的值，它会将其转换成布尔值：被单击的提交字段的值将是True，未被单击的值则是False
        e.g. form/app.py

        ````python
        @app.route('two-submits', methods=['GET', 'POST'])
        def two_submits():
            form = NewPostForm()
            if form.validate_on_submit():
                if form.save.data:
                    # save it...
                    flash('you click the "Save" button.')
                elif form.publish.data:
                    # publish it...
                    flash('you click the "Publish" button')
                return redirect(url_for('index'))
            return render_template('2submit.html', form=form)
        ````

    <!--list-separator-->

    -  单页面多个表单

        <!--list-separator-->

        -  单视图处理

            通过为两个表单的提交字段设置不同的名称，通过提交字段的值来区分被提交的表单

        <!--list-separator-->

        -  多视图处理

            e.g. 渲染视图

            ````python
            @app.route('/multi-form-multi-view')
            def multi_form_multi_view():
                signin_form = SignForm2()
                register_form = RegisterForm2()
                return render_template('2form2view.html', signin_form = signin_form, register_form = register_form)
            ````

            e.g. 处理表单提交

            ````python
            @app.route('/handle-signin', methods=['POST'])
            def handle_signin():
                signin_form = SigninForm2()
                register_form = RegisterForm2()
                if signin_form.validate_on_submit():
                    username = signin_form.username.data
                    flash('%s, you just submit the Signin Form.' % username)
                    return redirect(url_for('index'))
                return render_template('2form2view.html', signin_form=signin_form, register_form=register_form)
            @app.route('/handle-register', methods=['POST'])
            def handle_register():
                signin_form = SigninForm2()
                register_form = RegisterForm2()

                if register_form.validate_on_submit():
                    username = register_form.username.data
                    flash('%s, you just submit the Register form.' % username)
                    return redirect(url_for('index'))
                return render_template('2form2view.html', signin_form = signin_form, register_form = register_form)
            ````

            e.g. 表单页面

            ````html
            ...
            <h2>
                Login Form
            </h2>
            <form method="post" action="{{ url_for('handle_signin) }}">
                ...
            </form>
            <h2>
                Register Form
            </h2>
            <form method="post" action="{{ url_for('handle_register) }}">
                ...
            </form>
            ...
            ````

            这样处理可以正常工作，但是有一个显著缺点。如果验证未通过，你需要将错误消息的form.errors字典传入模板中。解决方法是通过其他方式传递错误消息，然后统一定向到渲染表单页面的视图。比如：使用flash()函数迭代form.errors字典发送错误消息，然后重定向到用来渲染表单的multi_form_multi_view视图。

            ````text
            def flash_errors(form):
                for field, errors in form.errors.items():
                    for error in errors:
                        flash('ERROR in the %s field = %s)% (
                            getattr(form, field).label.text,
                            error
                        )
            ````


#### 数据库 {#数据库}

<!--list-separator-->

-  数据库分类

    <!--list-separator-->

    -  SQL

    <!--list-separator-->

    -  NoSQL

        <!--list-separator-->

        -  文档存储

            e.g.
            ​MongoDB
            ​CouchDB

        <!--list-separator-->

        -  键值对存储

            e.g.
            ​Redis
            ​Riak

<!--list-separator-->

-  ORM魔法

    优点：

    -   灵活性好
    -   提升效率
    -   可移植性好

<!--list-separator-->

-  使用Flask-SQLAlchemy管理数据库

    > $ pipenv install flask-sqlalchemy

    完成扩展初始化

    ````python
    from flask import Flask
    from flask_sqlalchemy import SQLAlchemy
    app = Flask(___name___)
    db = SQLAlchemy(app)
    ````

    <!--list-separator-->

    -  连接数据库服务器

        常用 的DBMS及其数据库URI格式

        | DBMS            | URI                                              |
        |-----------------|--------------------------------------------------|
        | PostgreSQL      | postgresql://username:password@host/databasename |
        | MySQL           | mysql://username:password@host/databasename      |
        | Oracle          | oracle://username:password@host:port/sidname     |
        | SQLite(UNIX)    | sqlite:////absolute/path/to/foo.db               |
        | SQLite(Windows) | sqlite:///absolute\path&rarr;\foo.db             |
        | SQLite(内存型)  | sqlite:///或sqlite:///:memory:                   |
        |                 |                                                  |

        app.py:配置数据库URI

        ````python
        import os
        ...
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(app.root_path, 'data.db))
        ````

    <!--list-separator-->

    -  定义数据库模型

        一个数据库模型类对应数据库中的一个表。定义模型即使用Python类定义表模式，并声明映射关系。所有的模型类都需要继承Flask-SQLAlchemy提供的db.Model类。
        e.g. Note类

        ````python
        class Note(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            body = db.Column(db.Text)
        ````

        <!--list-separator-->

        -  SQLAlchemy常用的字段类型

            | 字段        | 说明                               |
            |-----------|----------------------------------|
            | Integer     | 整数                               |
            | String      | 字符串，可选参数Length可以用来设置最大长度 |
            | Text        | 较长的Unicode文本                  |
            | Date        | 日期，存储Python的datetime.date对象 |
            | Time        | 时间，存储Python的datetime.time对象 |
            | DateTime    | 时间和日期，存储Python的datetime对象 |
            | Interval    | 时间间隔，存储Python的datetime.timedelta对象 |
            | Float       | 浮点数                             |
            | Boolean     | 布尔值                             |
            | pickleType  | 存储Pickle列化的Python对象         |
            | LargeBinary | 存储任意二进制数据                 |

            默认Flask-SQLAlchemy会根据模型类名生成一个表名称;
            ​Message --&gt; message
            ​FooBar --&gt; foo_bar
            如果想自己指定，可以通过定义_\*/tablename/\*_属性.
            字段名默认为类属性名，你可以通过构造方法的第一个参数指定，或使用关键字name。

        <!--list-separator-->

        -  实例化字段类常用的字段参数

            | 参数名      | 说明                            |
            |----------|-------------------------------|
            | primary_key | 如果设置为True，该字段为主键    |
            | unique      | 如果设置为True, 该字段不允许出现重复值 |
            | index       | 如果设为True，为该字段创建索引，以提高查询效率 |
            | nullable    | 确定字段值可否为空，值为True或False, 默认为True |
            | default     | 为字段设置默认值                |

    <!--list-separator-->

    -  创建数据库和表

        ````python
        $ flask shell
        >>> from app import db
        >>> db.create_all()
        ````

        如果是将模型类定义在单独的模块中，那么必须在调用db.create_all()方法前导入相应模块，以便让SQLAlchemy获取模型类被创建时生成的表信息，进而正确生成数据表。

        <!--list-separator-->

        -  查看模型对应的SQL模式

            ````python
            >>> from sqlalchemy.schema import CreateTable
            >>> print(CreateTable(Note.__table__))
            ````

            创建表后再对模型做的修改不会自动映射到数据库，最简单的方式是调用db.drop_all()删除数据库和表，再次调用db.create_all()重新生成。

    <!--list-separator-->

    -  数据库操作

        SQLAlchemy使用数据库会话来管理数据库操作，这里的数据库会话也称为事务（Transaction）。Flask-SQLAlchemy自动帮我们创建会话，可以通过db.session属性获取。只有执行了commit()方法时，改动才被提交到数据库，执行rollback()方法会撤消操作。

    <!--list-separator-->

    -  CRUD

        <!--list-separator-->

        -  Create

            步骤

            1.  创建Python对象（实例化模型类）作为一条记录。
            2.  添加新创建的记录到数据库会话。
            3.  提交数据库会话。

            <!--listend-->

            ````python
            from app import db, Note
            note = Note(body='Body')
            db.session.add(note)
            db.session.commit()
            ````

        <!--list-separator-->

        -  Read

            **_常用的SQLALchemy查询方法_**

            | 查询方法              | 说明                                  |
            |-------------------|-------------------------------------|
            | all()                 | 返回包含所有查询记录的列表            |
            | first()               | 返回查询的第一条记录，如果未找到，则返回None |
            | one()                 | 返回第一条记录，且仅允许有一条记录。如果记录大于1或小于1，抛出异常 |
            | get(ident)            | 传入键值作为参数，返回指定主键值的记录，如果未找到，则返回None |
            | count()               | 返回查询结果的数量                    |
            | one_or_none()         | 类似one(), 如果结果数量不为1，返回None |
            | first_or_404()        | 返回查询的第一条记录，如果未找到，则返回404响应错误 |
            | get_or_404(ident)     | 传入主键值作为参数，返回指定主键值的记录，如果未找到，则返回404错误响应 |
            | paginate()            | 返回一个Pagination对象，可以对记录进行分页处理 |
            | with_parent(instance) | 传入模型类实例作为参数，返回和这个实例相关联的对象 |

            **常用的过滤方法**

            | 查询过滤器名称 | 说明                              |
            |---------|---------------------------------|
            | filter()       | 使用指定的规则过滤记录，返回新产生的查询对象 |
            | filter_by()    | 使用指定规则过滤记录（以关键字表达式的形式），返回新产生的查询对象 |
            | order_by()     | 根据指定条件对记录进行排序，返回新产生的查询对象 |
            | limit(limit)   | 使用指定的值限制原查询返回的记录数量，返回新产生的查询对象 |
            | group_by()     | 根据指定条件对记录进行分组，返回新产生的查询对象 |
            | offset(offset) | 使用指定的值偏移原查询的结果，返回新产生的查询对象 |

            **打印查询对象对应的SQL**

            ````python
            print(Model.query.filter_by(column='columnValue'))
            ````

            filter()方法的详解

            -   Like

            > filter(Model.column.like('%Content%'))

            -   In

            > filter(Model.column.in_(['content', 'content2']))

            -   Not In

            > filter(~Model.column.in_(['content', 'content2']))

            -   And

                1.  使用and_()

                > filter(and_(Model.column1 `= 'content', Model.column2 =` 'content2'))

                2.  在filter中加入多个表达式，用逗号分隔

                > filter(Model.column `= 'content', Model.column2 =` 'content2')

                3.  叠加调用多个filter或filter_by方法

                > filter(Model.column `= 'content').filter(Model.column2 =` 'content2')
            -   Or

            > from sqlalchemy import or\_
            > filter(or_(Model.column `= 'content', Model.column2 =` 'content2'))

            filter_by()
            在filter_by()中，可以使用关键字表达式来指定过滤规则。更方便的是，你可以在这个过滤器中直接使用字段名称。

            > Model.query.filter_by(column = 'content').all()

        <!--list-separator-->

        -  Update

            更新一条记录只需要赋值给模型类的字段属性就可以改变字段值，然后调用
            commit()方法提交会话即可。

            ````python
            model = Model.query.get(idValue)
            model.column = 'new Content'
            db.session.commit()
            ````

        <!--list-separator-->

        -  Delete

            delete()

            ````python
            model = Model.query.get()
            db.session.delete(model)
            db.session.commit()
            ````

    <!--list-separator-->

    -  在视图函数里操作数据库

<!--list-separator-->

-  定义关系

    <!--list-separator-->

    -  配置Python Shell上下文

        使用app.shell_context_processor装饰器注册一个shell上下文处理器

        ````python
        @app.shell_context_processor
        def make_shell_context():
            return dict(db=db)
        ````

        当再次使用flask shell命令启动Python
        Shell时，所有使用app.shell_context_processor装饰器注册的shell上下文处理函数都会自动被执行。

    <!--list-separator-->

    -  一对多

        <!--list-separator-->

        -  定义外键

            ````text
            e.g.
            class Article(db.Model):
                ...
                author_id = db.Column(db.Integer, db.ForeignKey('author.id'))  # 表名.字段名
            ````

        <!--list-separator-->

        -  定义关系属性

            ````python
            class Author(db.Model):
                ...
                articles = db.relationship('Article')  # 为关系另一侧的模型名称
            ````

        <!--list-separator-->

        -  建立关系

            建立关系有两种方式第一种是\*为外键字段赋值\*

            ````python
            e.g.
            spam.author_id = 1
            db.session.commit()
            ````

            另一种是通过\*操作关系属性\*

            ````text
            foo.articles.append(spam)
            foo.articles.append(ham)
            db.session.commit()
            ````

            和append方法相对，可以使用remove()方法解除关系
            **常用的SQLAlchemy关系函数参数**

            | 参数名         | 说明                                    |
            |-------------|---------------------------------------|
            | back_populates | 定义反向引用，用于建立双向关系，在关系的另一侧也必须显示定义关系属性 |
            | backref        | 添加反向引用，自动在另一侧建立关系属性，是back_populates的简化版 |
            | lazy           | 指定如何加载相关记录，具体见下表        |
            | uselist        | 指定是否使用列表的形式加载记录，设为False则使用标量 |
            | cascade        | 设置级联操作                            |
            | order_by       | 指定加载相关记录时的排序方式            |
            | secondary      | 在多对多关系中指定关联表                |
            | primaryjoin    | 指定多对多关系中的一级联结条件          |
            | secondaryjoin  | 指定多对多关系中的二级联结条件          |

            \*\*常用的SQLAlchemy关系记录加载方式（lazy参数可选值）

            | 关系加载方式 | 说明                                            |
            |--------|-----------------------------------------------|
            | select    | 在必要时一次性加载记录，返回包含记录的列表（默认值）， 等同于lazy = True |
            | joined    | 和父查询一样加载记录，但使用联结，等同于lazy = False |
            | immediate | 一旦父查询加载就加载                            |
            | subquery  | 类似于joined, 不过将使用子查询                  |
            | dynamic   | 不直接加载记录，而是返回一个包含相关记录的query对象，发便再继续附加查询函数对结果进行过滤 |

        <!--list-separator-->

        -  建立双向关系

            关系双方都使用relationship()函数建立关系。

            ````python
            e.g.
            class Writer(db.Model):
                id = db.Column(db.Integer, primary_key=True)
                name = db.Column(db.String(70), unique=True)
                books = db.relationship('Book', back_populates='writer')
            class Book(db.Model):
                id = db.Column(db.Integer, primary_key=True)
                title = db.Column(db.String(50), index=True)
                writer_id = db.Column(db.Integer, db.ForeignKey('writer.id'))
                writer = db.relationship('Writer', back_populates='books')
            ````

        <!--list-separator-->

        -  使用backref简化关系定义

            backref可以简化双向关系的定义。

    <!--list-separator-->

    -  多对一

        ````python
        class Citizen(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(70), unique=True)
            city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
            city = db.relationship('City')
        class City(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(70), unique=True)
        ````

    <!--list-separator-->

    -  一对一

        ````python
        class Country(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(70), unique=True)
            capital = db.relationship('Capital', uselist=False)
        class Capital(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(70), unique=True)
            country_id = db.Column(db.Integer, db.Foreign('country.id'))
            country = db.relationship('Country')
        ````

    <!--list-separator-->

    -  多对多

        使用关联表

        ````python
        association_table = db.Table('association',
            db.Column('student_id', db.Integer, db.ForeignKey('student.id')),
            db.Column('teacher_id', db.Integer, db.ForeignKey('teacher.id')))

        class Student(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(70), unique=True)
            grade = db.Column(db.String(20))
            teachers = db.relationship('Teacher',
                secondary=association_table,
                back_populates='students')

        class Teacher(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(70), unique=True)
            offic = db.Column(db.String(20))
        ````

    <!--list-separator-->

    -  更新数据库表

    <!--list-separator-->

    -  使用Flask-Migrate迁移数据库

        安装Flask-Migrate

        > pipenv install flask-migrate

        实例化

        ````python
        from flask import Flask
        from flask_sqlalchemy import SQLAlchemy
        from flask_migrate import Migrate
        app = Flask(____name____)
        ...
        db = SQLAlchemy(app)
        migrate = Migrate(app, db)   # 在db对象创建后调用
        ````

        <!--list-separator-->

        -  创建迁移环境

            在开始迁移数据之前，需要先使用正面的命令创建一个迁移环境：

            > $ flask db init

            迁移环境只需要创建一次。这会在你的项目根目录下创建一个migrations文件夹，其中包含了自动生成的配置文件和迁移版本文件夹。

        <!--list-separator-->

        -  生成迁移脚本

            使用migrate子命令可以自动生成迁移脚本
            e.g.
            ​向表note新添加一个timestamp列，并且相应生成一个迁移脚本xxxx_add_note_timestamp.py

            > $ flask db migrate -m "add note timestamp"

        <!--list-separator-->

        -  更新数据库

            e.g.
            如果还没有创建数据库和表，这个命令会自动创建，如果已经创建，则会在不损坏数据的前提下执行更新。

            > $ flask db upgrade

            如果想回滚迁移，那么可以使用downgrade命令降级，它会撤消最后一次迁移在数据库中的改动。

    <!--list-separator-->

    -  开发时是否需要迁移？

<!--list-separator-->

-  数据库进阶实践

    <!--list-separator-->

    -  级联操作

        > comments = relationship('Comment', cascade='save-update, merge, delete')

        常用的配置组合：

        -   save-update, merge(默认值)
        -   save-update, merge, delete
        -   all
        -   all, delete-orphan

        <!--list-separator-->

        -  save-update

            是默认的级联行为，当cascade参数设置为save-update时，如果使用db.session.add()方法将Post对象添加到数据库会话时，那么与Post相关联的Comment对象也将被添加到数据库会话。

        <!--list-separator-->

        -  delete

            如果Post类的关系函数中cascade参数设为delete时，这些相关的Comment会在关联的Post对象删除时被一并删除。

        <!--list-separator-->

        -  delete-orphan

            这个模式是基于delete级联的，必须和delete级联一起使用，通常会设为all,
            delete-orphan,因为all包含delete.

    <!--list-separator-->

    -  事件监听

        Flask提供了多个装饰器注册请求的回调函数，它们会在特定的请求处理环节被执行。类似的SQLAlchemy也提供了一个listen_for()装饰器，可以用来注册事件回调函数。
        e.g.

        ````python
        class Draft(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            body = db.Column(db.Text)
            edit_time = db.Column(db.Integer, default=0)

            # 通过注册事件监听函数，我们可以实现在body列被修改时，自动叠加表示被修改次数的edit_time字段。
            @db.event.listens_for(Draft.body, 'set')
            def increment_edit_time(target, value, oldvalue, initiator):
                if target.edit_time is not None:
                    target.edit_time += 1
            # 或者
            @db.event.listens_for(Draft.body, 'set', named=True)
            def increment_edit_time(**kwargs):
                if kwargs['target'].edit_time is not None:
                    kwargs['target'].edit_time += 1
        ````

        SQLAlchemy作为SQL工具集本身包含两大主要组件： SQLAlchemy ORM
        和SQLAlchemy
        Core。前者提供了我们前面介绍的ORM功能，后者实现了数据库核心功能，这两类组件都提供了大量的监听事件，几科覆盖整个SQLAlchemy使用的生命周期。
        Core事件： <http://docs.sqlalchemy.org/en/latest/core/events.html>
        ORM事件：<http://docs.sqlalchemy.org/en/latest/orm/events.html>
        SQLAlchemy tutorial:
        <http://docs.sqlalchemy.org/en/latest/orm/tutorial.html>


#### 电子邮件 {#电子邮件}

<!--list-separator-->

-  使用Flask-Mail发送电子邮件

    安装

    > pipenv install flask-mail

    实例化

    > from flask_mail import Mail
    > app = Flask(<span class="underline"><span class="underline"><span class="underline"><span class="underline">name</span></span></span></span>)
    > ...
    > mail = Mail(app)

    <!--list-separator-->

    -  配置Flask-Mail

        <!--list-separator-->

        -  常用配置

            | 配置键              | 说明           | 默认值    |
            |------------------|--------------|--------|
            | MAIL_SERVER         | 用于发送邮件的SMTP服务器 | localhost |
            | MAIL_PORT           | 发信端口       | 25        |
            | MAIL_USE_TLS        | 是否使用STARTTLS | False     |
            | MAIL_USE_SSL        | 是否使用SSL/TLS | False     |
            | MAIL_USERNAME       | 发信服务器的用户名 | None      |
            | MAIL_PASSWORD       | 发信服务器的密码 | None      |
            | MAIL_DEFAULT_SENDER | 默认的发信人   | None      |

            e.g.

            ````python
            import os
            from flask import Flask
            from flask_mail import Mail
            app = Flask(__name__)
            app.config.update(
                ...
                MAIL_SERVER = os.getenv('MAIL_SERVER')
                MAIL_PORT = 587
                MAIL_USE_TLS = True
                MAIL_USERNAME = os.getenv('MAIL_USERNAME')
                MAIL_PASSWORD = os.getenv('MAIL_PASSWD')
                MAIL_DEFAULT_SENDER = ('Stone X', os.getenv('MAIL_USERNAME'))
            )
            mail = Mail(app)
            ````

    <!--list-separator-->

    -  构建邮件数据

        e.g.

        ````python
        from flask_mail import Message
        from app import mail
        ...
        message = Message(subject="Hello, world!!!",
                         recipients=['Zorn <zorn@example.com>'],
                         body='Across the Great Wall we can reach every corner in the world.')
        mail.send(message)
        ````

        e.g. 通用方法

        ````python
        from flask_mail import Mail, Message
        ...
        # 配置Flash-Mail配置，省略
        # 实例化
        mail = Mail(app)
        ...
        def send_mail(subject, to, body, html='')
        message = Message(subject, recipients=[to], body=body, html=html)
        # 使用jinja2渲染内容模板
        message.body = render_template('emails/subscribe.txt', **kwargs)
        message.html = render_template('emails/subscribe.html', **kwargs)
        mail.send(message)
        ````

        e.g. 异步发送邮件

        ````python
        from threading import Thread
        ...
        def _send_async_mail(app, message):
            with app.app_context():
                mail.send(message)

        def send_mail(subject, to, body, html=''):
            message = Message(subject, recipients=[to], body=body, html=html)
            thr = Thread(target=_send_async_mail, args=[app, message])
            thr.start()
            return thr
        ````


### 实战 {#实战}


#### 留言版 {#留言版}

<!--list-separator-->

-  使用包组织代码

    每一个包含_\*/init/\*_.py文件的文件夹都被视作包，包可以让你使用文件夹来组织模块。程序组织结构
    sayhello

    -   <span class="underline"><span class="underline"><span class="underline"><span class="underline">init</span></span></span></span>.py # 构造文件，包含程序实例
    -   templates # 模板文件夹
    -   static # 静态文件，其中又包含js和css文件夹
    -   vies.py # 视图
    -   forms.py 表单
    -   errors.py #错误处理
    -   models.py 数据库模型
    -   commands.py 自定义Flask命令
    -   settings.py 配置文件

    <!--list-separator-->

    -  配置文件

        ````python
        #！/usr/bin/env python
        # coding: utf-8
        import os
        from sayhello import app
        dev_db = 'mysql://sayhello:Admin!123@39.104.124.226:11306/sayhello'
        SECREY_KEY = os.getenv('SECREY_KEY', 'secret this ')
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', dev_db)
        ````

        <!--list-separator-->

        -  <span class="underline"><span class="underline"><span class="underline"><span class="underline">init</span></span></span></span>.py

            ````python
            #! /usr/bin/env python3
            # coding: utf-8
            from flask import Flask
            from flask_bootstrap import Bootstrap
            from flask_moment import Moment
            from flask_sqlalchemy import SQLAlchemy
            app = Flask('sayhello')
            app.config.from_pyfile('settings.py')
            app.jinja_env.trim_blocks = True
            app.jinja_env.lstrip_block = True
            db=  SQLAlchemy(app)
            bootstrap = Bootstrap(app)
            moment = Moment(app)
            # 避免循环依赖，在文件结尾导入
            from sayhello import views, errors, commands
            ````

            .flaskenv

            ````text
            FLASK_APP=sayhello
            ````

<!--list-separator-->

-  Web程序开发流程

    \*开发流程 \*

    1.  分析需求，列出功能清单或写需求说明书。
    2.  设计程序功能，写功能规格书和技术规格书。
    3.  进入开发与测试的迭代
    4.  调试和性能等专项测试
    5.  部署上线
    6.  运行维修与营销等。

    **前端主要流程**

    1.  根据功能规格书画页面草图(sketching)
    2.  根据草图做交互式原型图(prototyping)
    3.  根据原型图开发前端页面（HTML, CSS, JS）

    **后端主要流程**

    1.  数据库建模
    2.  编写表单类
    3.  编写视图函数和相关的处理函数
    4.  在页面中使用Jinja2替换虚拟数据。

<!--list-separator-->

-  使用Bootstrap-Flask简化页面编写

    安装

    > pipenv install bootstrap-flask

    实例化

    > from flask import Flask
    > from flask_bootstrap import Bootstrap
    > app = Flask(<span class="underline"><span class="underline"><span class="underline"><span class="underline">name</span></span></span></span>)
    > bootstrap = Bootstrap(app)

<!--list-separator-->

-  使用Flask-Moment本地化日期和时间

    安装及实例化相似。想要本地化日期，必须使源日期为不包含时区信息的纯正时间。例UTC时间。

    <!--list-separator-->

    -  使用Flask-Moment集成Moment.js

        Flask-Moment在模板中提供了moment对象，这个对象提供两个方法来加载资源：moment.include_moment()方法用来加载Moment.js的Javascript资源。moment.include_jquery()用来加载jQuery.这两个方法默认从CDN加载资源。传入local_js参数可以指定本地资源URL。

        ````text
        ...
        {{ moment.include_moment(local_js=url_for('static), filename='js/moment-with-locales.min.js') }}
        ````

        Flask-Moment默认以英文显示时间，我们可以传入区域字符串“zh-cn”设置为中文。

        ````text
        ...
        {{ moment.locale('zh-cn') }}
        ````

        也可以根据用户浏览器或计算机的语言来设置语言。

        ````text
        ...
        {{ moment.locale(auto_detect=True) }}
        ````

    <!--list-separator-->

    -  渲染时间日期

        ````text
        {{ moment(timestamp).format('格式字符串) }}
        ````

        Moment.js还支持相对时间，比如三分钟前，一个月前，等

        ````text
        {{ moment(message.timestamp).fromNow(refresh=True) }}
        ````

<!--list-separator-->

-  使用Faker生成虚拟数据

    ````python
    @app.cli.command()
    @click.option('--count', default=20, help='Quantity of messages, default is 20.')
    def forge(count):
        '''Generate fake messages.'''
        from faker import Faker
        db.drop_all()
        db.create_all()
        fake = Faker()
        click.echo('Working....')
        for i in range(count):
            message = Message(
                name=fake.name(),
                body=fake.sentence(),
                timestamp=fake.date_time_this_year()
            )
            db.session.add(message)
        db.session.commit()
        click.echo('Created %d fake messages.' % count)
    ````

<!--list-separator-->

-  使用Flask-DebugToolbar调试程序


#### 个人博客 {#个人博客}

<!--list-separator-->

-  大型项目结构

    ````text
    blueblog/
        blueprints/
            __init__.py
            blog.py
            auth.py
            admin.py
        templates/
            admin/
            auth/
            blog/
            base.html
            macros.html
        static/
        forms.py
        models.py
        emails.py
        utils.py
        fakes.py
        extensions.py
    ````

    <!--list-separator-->

    -  使用蓝本模块化程序

        实例化Flask提供的Blueprint类就创建 一个蓝本实例。就像程序 实例 一样，我们可以为蓝本实例注册路由、错误处理函数、上下文处理函数，请求处理函数，甚至是单独的静态文件文件夹和模板文件夹。在使用上，它和程序实例也很相似。比如，蓝本实例同样拥有一个route()装饰器，可以用来注册路由，但实际上蓝本对象和程序对象却有很大的不同.
        \###### 创建蓝本使用蓝本不仅仅是对视图函数分类，而是将程序某一部分的所有操作组织在一起。这个蓝本实例以及一系列注册在蓝本实例上的操作的集合被称为一个蓝本。你可以把蓝本想像成模子，它描述了程序某一部分的细节，定义了相应的路由、错误处理器、上下文处理器、请求处理器等一系列操作。但是它本身却不能发挥作用，因为它只是一个模子。只有当你把它注册到程序上时，它才会把物体相应的部分印刻出来--把蓝本中的操作附加到程序上。
        e.g.

        ````python
        from flask import Blueprint
        auth_bp = Blueprint('auth', __name__)
        ````

        <!--list-separator-->

        -  装配蓝本

            **视图函数**
            蓝本中的视图函数通过蓝本实例提供的route()装饰器注册，即auth_bp.route()。我们把和认证相关的视图函数移动到这个模块，然后注册到auth蓝本上。

            ````python
            #! /usr/bin/env python3
            # coding: utf-8
            from flask import Blueprint
            auth_bp = Blueprint('auth', __name__)
            @auth_bp.route('/login')
            def login():
                pass
            @auth_bp.route('/logout')
            def logout():
                pass
            ````

            **错误处理**
            使用蓝本实例的errorhandler()装饰器可以把错误处理吕注册到蓝本上，这些错误处理器只会捕捉蓝本中的路由发生的错误；使用蓝本实例的app_errorhandler()装饰器则可以注册一个全局的错误处理器。
            **请求处理函数**
            在蓝本中，使用before_request, after_request,
            teardown_request等装饰器注册的请求处理函数是蓝本独有的。也可以使用before_app_request,
            after_app_reuest, teardown_app_request, before_app_first_request方法，这些方法是全局的。
            **模板上下文处理函数**
            和请求钩子类似，蓝本实例可以使用context_processor装饰器注册蓝本特有的模板上下文处理吕在，使用app_context_processor则会注册全局的模板的上下文处理器。另外蓝本对象 也可以使用app_template_global(),
            app_template_filter()和app_template_test()装饰器，分别用来注册全局的模板全局函数，模板过滤器和模板测试器。

        <!--list-separator-->

        -  注册蓝本

            ````text
            #! /usr/bin/env python3
            # coding: utf-8
            from flask import Flask
            from blog.blueprints.auth import auth_bp
            app = Flask("StoneBlog")
            app.register_blueprint(auth_bp)
            ````

            我们使用url_prefix参数为auth蓝本下的所有视图URL附加一个URL前缀

            ````python
            app.register_blueprint(auth_bp, url_prefix='/auth')
            ````

            使用subdomain参数可以为蓝本下的路由设置子域名。

            ````python
            app.register_blueprint(auth_bp, subdomain='auth)
            ````

        <!--list-separator-->

        -  蓝本的路由端点

            两种方式

            1.  使用app.route()装饰器将视图函数注册为路由

            <!--listend-->

            ````python
            @app.route('/hello')
            def hello():
                return 'hello'
            ````

            2.  使用app.add_url_rule()方法注册路由

            <!--listend-->

            ````python
            app.add_url_rule('/hello', 'say_hello', say_hello)
            ````

            格式

            > app.add_url_rule(rule, endpoint, view_func)

            可以使用flask routes 命令查看当前程序注册的所有路由。

        <!--list-separator-->

        -  蓝本资源

            如果程序的不同蓝本的页面需要截然不同的样式，可以为蓝本定义独有的静态文件和模板。这时我们需要把蓝本模块升级为包，在构造文件中创建蓝本实例，并在蓝本包中创建静态文件夹static和模板文件夹templates，和程序实例一样，实例化时传入的_\*/name/\*_变量会被用来判断蓝本的根目录，并以此作为基础寻找模板文件文件夹。要使用蓝本独有的静态文件，你需要在定义蓝本时使用static_folder关键字指定蓝本的静态文件文件夹的路径

            > auth_bp = Blueprint('auth', **name**, static_folder='static',
            > static_url_path='auth/static')

            如果你在注册蓝本时为蓝本定义了URL前缀，即设置了url_prefix参数，那么最终的蓝本静态文件路径会自动设为“/蓝本前缀/static”，这时可以省略static_url_path的定义。在生成用来获取蓝本静态文件的URL时需要写出包含蓝本名称的完整端点，即“蓝本名称.static”

            ````python
            url_for('admin.static', filename='style.css)
            ````

            当蓝本包含独有的模板文件夹时，我们可以在实例化蓝本类时使用template_folder关键字指定模板文件夹的位置

            ````python
            admin = Blueprint('admin', __name__, template_folder='templates')
            ````

    <!--list-separator-->

    -  使用类组织配置

        ````python
        #! /usr/bin/env python3
        # coding: utf-8
        import os
        import sys
        basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        WIN = sys.platform.startswith('win')
        if WIN:
            prefix = 'sqlite:///'
        else:
            prefix = 'sqlite:////'
        class BaseConfig(object):
            SECRET_KEY = os.getenv('SECRET_KEY', 'DEV KEY')
            SQLALCHEMY_TRACK_MODIFICATIONS = False
            MAIL_SERVER = os.getenv('MAIL_SERVER')
            MAIL_PORT = 465
            MAILUSER_SSL = True
            MAIL_USERNAME = os.getenv('MAIL_USERNAME')
            MAIL_PASSORD = os.getenv('MAIL_PASSWORD')
            MAIL_DEFAULT_SENDER = os.getenv('StoneBlog Admin', MAIL_USERNAME)
            BLOG_EMAIL = os.getenv('BLOG_EMAIL')
            BLOG_POST_PER_PAGE = 10
            BLOG_MANAGE_POST_PER_PAGE = 15
            BLOG_COMMIT_PER_PAGE = 15
        class DevelopmentConfig(BaseConfig):
            SQLALCHEMY_DATABASE_URI = prefix + os.path.join(basedir, 'data-dev.db')
        class TestingConfig(BaseConfig):
            TESTING = True
            WTF_CSRF_ENABLE = False
            SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
        class ProductionConfig(BaseConfig):
            SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', prefix + os.path.join(basedir, 'data.db'))
        config = {
            "development": DevelopmentConfig,
            'testing': TestingConfig,
            'production': ProductionConfig
        }
        ````

        现在我们在创建程序实例后使用app.config.from_object()方法加载配置，传入配置类：

        ````python
        #! /usr/bin/env python3
        # coding: utf-8
        import os
        import click
        from flask import Flask, render_template
        from flask_bootstrap import Bootstrap
        from flask_ckeditor import CKEditor
        from flask_mail import Mail
        from flask_moment import Moment
        from flask_sqlalchemy import SQLAlchemy
        from blog.blueprints.auth import auth_bp
        from blog.blueprints.admin import admin_bp
        from blog.blueprints.blog import blog_bp
        from blog.settings import config
        app = Flask("StoneBlog")
        config_name = os.getenv('FLASK_CONFIG', 'development')
        app.config.form_object(config[config_name])
        bootstrap = Bootstrap(app)
        db = SQLAlchemy(app)
        ckeditor = CKEditor(app)
        mail = Mail(app)
        moment = Moment(app)
        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(admin_bp, url_prefix='/admin')
        app.register_blueprint(blog_bp)
        @app.shell_context_processor
        def make_shell_context():
            return dir(db=db)
        @app.errorhandler(400)
        def bad_request(e):
            return render_template('errors/400.html'), 400
        @app.errorhandler
        def page_not_found(e):
            return render_template('errors/404.html'), 404
        @app.errorhandler
        def internal_server_error(e):
            return render_template('errors/500.html'), 500
        @app.cli.command()
        @click.option('--drop', is_flag=True, help='Create after drop.')
        def initdb(drop):
            '''Initialize the database.'''
            if drop:
                click.confirm('This operation will delete the database, do you want to continue?', abort=True)
                db.drop_all()
                click.echo('Drop database.')
            db.create_all()
            click.echo('Initialized database.')

        ````

    <!--list-separator-->

    -  使用工厂函数创建程序实例

        ````python
        #! /usr/bin/env python3
        # coding: utf-8
        import os
        import click
        from flask import Flask, render_template
        from blog.extensions import db, mail, ckeditor, moment, bootstrap
        from blog.blueprints.auth import auth_bp
        from blog.blueprints.admin import admin_bp
        from blog.blueprints.blog import blog_bp
        from blog.settings import config
        app = Flask("StoneBlog")
        config_name = os.getenv('FLASK_CONFIG', 'development')
        app.config.form_object(config[config_name])
        def create_app(config_name=None):
            if config_name is None:
                config_name = os.getenv('FLASK_CONFIG', 'development')
            app = Flask('blog')
            app.config.from_object(config[config_name])
            register_logging(app)
            register_extensions(app)
            register_blueprints(app)
            register_shell_context(app)
            register_template_context(app)
            register_commands(app)
            register_erros(app)
            return app
        def register_logging(app):
            pass
        def register_extensions(app):
            bootstrap.init_app(app)
            db.init_app(app)
            ckeditor.init_app(app)
            mail.init_app(app)
            moment.init_app(app)
        def register_blueprints(app):
            app.register_blueprint(auth_bp, url_prefix='/auth')
            app.register_blueprint(admin_bp, url_prefix='/admin')
            app.register_blueprint(blog_bp)
        def register_shell_context(app):
            @app.shell_context_processor
            def make_shell_context():
                return dict(db=db)
        def register_template_context(app):
            pass
        def register_erros(app)
            @app.errorhandler(400)
            def bad_request(e):
                return render_template('errors/400.html'), 400
            @app.errorhandler
            def page_not_found(e):
                return render_template('errors/404.html'), 404
            @app.errorhandler
            def internal_server_error(e):
                return render_template('errors/500.html'), 500
        def register_commands(app):
            @app.cli.command()
            @click.option('--drop', is_flag=True, help='Create after drop.')
            def initdb(drop):
                '''Initialize the database.'''
                if drop:
                    click.confirm('This operation will delete the database, do you want to continue?', abort=True)
                    db.drop_all()
                    click.echo('Drop database.')
                db.create_all()
                click.echo('Initialized database.')
        ````

        extensions.py

        ````text
        #! /usr/bin/env python3
        # coding: utf-8
        from flask_bootstrap import Bootstrap
        from flask_sqlalchemy import SQLAlchemy
        from flask_ckeditor import CKEditor
        from flask_mail import Mail
        from flask_moment import Moment
        bootstrap = Bootstrap()
        db = SQLAlchemy()
        ckeditor = CKEditor()
        mail = Mail()
        moment = Moment()
        ````

        1.  加载配置

        工厂函数接收配置名称作为参数，这们在程序的不同位置传入不同的配置来创建程序实例。

        2.  初始化配置

        将扩展类实例化的工作转移到extensions.py脚本中。当我们需要在程序中使用扩展对象时，直接从这个extensions模块导入即可。在工厂函数中，我们导入所有的扩展对象，并对其调用init_app()方法

        3.  组织工厂函数

        除了扩展初始化操作，还有许多处理函数需要注册到程序上，比如错误处理函数，上下文处理函数等。

        4.  启动程序

        > $ flask run

        5.  current_app对象

    <!--list-separator-->

    -  数据库

        1.  创建数据库模型
        2.  邻接列表关系
        3.  生成虚拟数据

    <!--list-separator-->

    -  模板


### 进阶 {#进阶}
