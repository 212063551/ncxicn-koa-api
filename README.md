# 基于koa开发的api
#### 开始
本人初学koa没多久，项目api可能存在不规范，或者存在bug，多请谅解。欢迎各位大佬指点。最后求一个Star ✨

  一,首先在根目录下创建一个.env文件，填写内容如下。
``` js
  

    PORT // 项目运行端口，默认为3000段端口

    MYSQL_PORT  // 数据库端口,默认为3306

    MYSQL_HOST  // 数据库ip地址
    
    MYSQL_USER // 数据库表名
    
    MYSQL_PWD // 数据库表的密码
    
    JWT_SECRET // jwt认证

```
二,安装依赖:

```bash
npm i && yarn
```

三 运行项目
```bash
node main.js
```