// session  是另一种记录客户状态的机制，不同的是 Cookie  保存在客户端浏览器中，而 session  保存在服务器上。
// session 与cookie的区别 关闭浏览器记录会清空
// session设置中间件时候的一些属性
// secret 可以随便设置加密,一个 String 类型的字符串，作为服务器端生成 session 的签名。
// name  返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置。
// resave 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
// saveUninitialized  强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）。建议手动添加。
// cookie 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
// rolling  在每次请求时强行设置 cookie，如果将其设置为true,这将重置 cookie 过期时间（默认：false）
// 1.安装 express-session
// 2.引入 express-session
var express=require("express");
//引入express-session
var session=require("express-session");

var app=express();

//3.设置官方文档提供的中间件
app.use(session({
    secret: 'this is string key',
    name:"session_id",
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1000*60*30},
    rolling:true
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
app.listen(8004,"localhost");
console.log("服务器开启成功！");