> 中国大学生医药数学建模报名系统v2 `开发日志`

## 项目目录说明

```JavaScript
|----v2/
    |----bin/
        |----www          服务启动配置
    |----database/
        |----config.db.js 数据库连接配置
        |----member.db.js 队员数据模型
        |----team.db.js   队伍数据模型
        |----user.db.js   用户数据模型
    |----node_modules/    项目依赖的node模块
    |----public/
        |----build/       webpack编译输出目录
            |----admin.bundle.js 管理后台编译后的js
            |----signup.bundle.js 报名系统编译后的js
            |----vendor.bundle.js react+redux单独打包编译后的js
        |----css/
            |----loader.css 页面加载的css3动画
        |----img/           静态图片
        |----js/            额外的js库
    |----routes/
        |----services/      控制器层
            |----member.ctrl.js 成员控制器
            |----team.ctrl.js 队伍控制器
            |----user.ctrl.js 用户控制器
        |----api.js         API层的路由
        |----helper.js      路由层的工具方法
        |----index.js       默认路由
    |----src/               前端层源码
        |----components/    自定义组件
        |----containers/    容器页面
        |----entries/       webpack打包入口
        |----mixins/        一些混入混出的方法
        |----redux/         redux核心架构
        |----routes/        前端路由
        |----royal          我自己的react组件库
        |----config.js      前端配置文件
    |----views/   
        |----admin.ejs      后台模板页
        |----error.ejs      错误提示模版页
        |----index.ejs      默认引导页
        |----signup.ejs     报名系统模版页
    |----.babelrc           babel配置文件
    |----.gitignore         git忽略文件
    |----app.js             项目启动入口
    |----package.json       项目包结构
    |----readme.md          项目文档
    |----webpack.config.js  webpack配置文件
```

## restful接口规范
接口系统采用 `mysql` + `express`搭建，遵循 `restful` 规范。

### 动词

 - GET（SELECT）：从服务器取出资源（一项或多项）。
 - POST（CREATE）：在服务器新建一个资源。
 - PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
 - PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
 - DELETE（DELETE）：从服务器删除资源。

### 状态码

 - 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
 - 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
 - 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
 - 204 NO CONTENT - [DELETE]：用户删除数据成功。
 - 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
 - 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
 - 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
 - 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
 - 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
 - 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
 - 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
 - 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
 - 501 Not Implemented - 服务不支持：服务器不承认对应的响应请求方法,不能够支持任何资源。
 - 502 Bad Gateway - 无效网管：收到无效的访问头无法继续访问。
 - 503 Service Unavailable - 服务不可用：服务未启动或异常关闭。
 - 504 Gateway Timeout - 等待时间超时：服务长时间未响应而被挂起。
 - 505 HTTP Version Not Supported - HTTP版本不支持。

### 身份验证
OAuth在"客户端"与"服务提供商"之间，设置了一个授权层（authorization layer）。"客户端"不能直接登录"服务提供商"，只能登录授权层，以此将用户与客户端区分开来。"客户端"登录授权层所用的令牌（token），与用户的密码不同。用户可以在登录的时候，指定授权层令牌的权限范围和有效期。"客户端"登录授权层以后，"服务提供商"根据令牌的权限范围和有效期，向"客户端"开放用户储存的资料。


## sql封装


## 日志系统
使用开源模块log4j配合express做日志系统 
