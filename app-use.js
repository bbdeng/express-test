//中间件：就是匹配路由之前和匹配路由之后做的一系列操作

var express=require("express");

var app=new express();

//1.应用级中间件 表示匹配任何路由
app.use(function (req, res ,next) {
    console.log(new Date());
    next();//路由继续向下匹配
})

app.get("/",function (req, res) {
    res.send("这是首页");
});

//2.路由中间件
// next()路由继续向下匹配
app.get("/news",function (req, res,next) {
    console.log("这是路由中间件");
    next();
})
app.get("/news",function (req, res) {
    res.send("这是路由中间件news2");
})

//3.内置中间件 托管静态页面
app.use(express.static("public"));

//5.第3方中间件
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

//安装body-parser模块 并引入  主要是用于获取post提交的数据
var bodyParser=require("body-parser");
//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//配置ejs引擎
app.set("view engine" ,"ejs");
//配置一个登陆路由
app.get("/login",function (req, res) {
    res.render("login");
});
//配置一个post路由接收登陆
app.post("/doLogin",function (req, res) {
    console.log(req.body)//通过req.body来获取post提交过来的数据
    res.send("登陆成功！");
});


//4.错误处理中间件
app.use(function (req, res) {
    res.status(404).send("404错误 表示路由没有匹配到");
})

app.listen(8002,"localhost");
console.log("服务器开启成功！");