//1.需要安装 express-session 和 connect-mongo 模块
//2.引入模块
// var session = require("express-session");
// const MongoStore = require('connect-mongo')(session);
// 3.配置中间件
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     rolling:true,
//     cookie:{
//         maxAge:100000
//     },
//     store: new  MongoStore({
//         url: 'mongodb://127.0.0.1:27017/test',
//         touchAfter: 24 * 3600 //通过设置touchAfter：24 * 3600来设置touchAfter：24 * 3600，在24小时内只会更新一次，无论请求的数量是多少（除了那些会改变会话数据的数据）
//     })
// }))

var express=require("express");
//引入express-session
var session=require("express-session");
//引入connect-mongo模块
var connectMongo=require("connect-mongo")(session);

var app=express();

//3.设置官方文档提供的中间件
app.use(session({
    secret: 'this is string key',
    name:"session_id",
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1000*60*30},
    rolling:true,
    store:new connectMongo({
        url:"mongodb://127.0.0.1:27017/test",  //服务器地址
        touchAfter:24*3600  //通过设置touchAfter：24 * 3600来设置touchAfter：24 * 3600，在24小时内只会更新一次，无论请求的数量是多少（除了那些会改变会话数据的数据）
    })
s
}));


app.get("/",function (req, res) {
    //5.获取session
    if (req.session.urseinfo){
        res.send("你好！欢迎"+req.session.urseinfo+"回来！");
    } else {
        res.send("你还未登陆！");
    }

});

app.get("/login",function (req, res) {
    //4设置session
    req.session.urseinfo="帮办";
    res.send("登陆成功！");
});
//req.session.cookie.maxAge=0; //重新设置 cookie 的过期时间 用于退出登陆
//或者用销毁登陆写法 req.session.destroy(function(err) { })      /*销毁 session*/

//6.退出登陆
app.get("/loginOut",function (req, res) {
    req.session.cookie.maxAge=0;

    res.send("退出登陆成功！");
})
app.listen(8005,"localhost");
console.log("服务器开启成功！");